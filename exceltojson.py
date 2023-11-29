import pandas as pd
import json
from datetime import datetime, timedelta
import unicodedata

# Charger le fichier Excel
excel_data = pd.read_excel('./public/documents/groupesS1.xlsx')

# Extraire les informations nécessaires
session_types = excel_data.iloc[0, 3:].fillna(method='ffill').values  # Types de séances de la première ligne
professors_or_types = excel_data.iloc[1, 3:].fillna(method='ffill').values  # Professeurs ou types de la deuxième ligne
days_times = excel_data.iloc[2, 3:].values  # Jours et horaires de la troisième ligne

# Dictionnaire pour convertir les abréviations de jours en noms complets
day_mapping = {'Lu': 'Lundi', 'Ma': 'Mardi', 'Me': 'Mercredi', 'Je': 'Jeudi', 'Ve': 'Vendredi'}

# Mapping pour l'attribution des professeurs
session_to_professor = {
    'TD maths': 'M. Darreye',
    'TD Physique': 'M. Aubert',
    'Soutien SI': 'M. Costadoat',
    'TP Physique': 'M. Aubert',
    'TD physique': 'M. Aubert'
}

# Durées des différents types de cours
course_durations = {
    'TD Physique': '1:30', 'TD physique': '1:30', 'TP Physique': '2:00', 'TP SI': '2:30', 'Tp Info': '2:00', 'TD SI': '2:00', 'TD maths': '1:30', 'Soutien SI': '2:00', 'TP INFO Salle B306': '2:00'
}

session_to_color = {
    'TD maths': '#f0593f',
    'TD Physique': '#E1AB20',
    'TP Physique': '#E1AB20',
    'TD physique': '#E1AB20',
    'Soutien SI': '#22659c',
    'TD SI': '#22659c',
    'TP SI': '#22659c',
    'TP INFO Salle B306': '#ff8b94'
}

# Créer un dictionnaire structuré pour les données
final_corrected_data = {}

def formate_start_time(start_time):
    if 'h' in start_time:
        if start_time.endswith('h'):  # Cas où l'heure est comme '14h'
            start_time_formatted = start_time.replace('h', ':00')
        else:  # Cas où l'heure est comme '14h30'
            start_time_formatted = start_time.replace('h', ':')
    else:
        start_time_formatted = start_time
    return start_time_formatted

def calculate_end_time(start_time, duration):
    # Traitement de l'heure de début pour correspondre au format HH:mm
    if 'h' in start_time:
        if start_time.endswith('h'):  # Cas où l'heure est comme '14h'
            start_time_formatted = start_time.replace('h', ':00')
        else:  # Cas où l'heure est comme '14h30'
            start_time_formatted = start_time.replace('h', ':')
    else:
        start_time_formatted = start_time

    # Conversion de l'heure de début en objet datetime
    start = datetime.strptime(start_time_formatted, '%H:%M')

    # Extraction des heures et minutes de la durée
    duration_hours, duration_minutes = map(int, duration.split(':'))

    # Calcul de l'heure de fin
    end_time = start + timedelta(hours=duration_hours, minutes=duration_minutes)

    # Retourner l'heure de fin au format HH:mm
    return end_time.strftime('%H:%M')

def determine_room(day, time, activity_type, professor):
    if activity_type == 'TD maths':
        if day == 'Lundi':
            return 'B305' if time.startswith('10') else 'C204'
        elif day == 'Mardi':
            return 'C204'
    elif activity_type == 'TD physique':
        return 'B302'
    elif activity_type == 'TP SI':
        return 'E109-110'
    elif activity_type == 'TP INFO Salle B306':
        return 'B306'
    elif activity_type == 'Soutien SI':
        return 'B302'
    elif activity_type == 'TP Physique':
        return 'C01'
    elif activity_type == 'TD SI':
        if day == 'Lundi':
            return 'B302'
        elif day == 'Vendredi':
            if time.startswith('10'):
                return 'B302'
            elif professor == 'Mme Puig':
                return 'B304'
            else:
                return 'B302'
    return 'To be determined'  # Valeur par défaut si aucune condition n'est remplie

def add_additional_course_if_needed(week_data):
    td_math_groups_at_13 = set()
    td_physique_groups_at_13 = set()

    # Identifier les groupes avec TD Maths ou TD Physique à 13:00
    for course in week_data:
        if course['start'] == "13:00" and course['end'] == "14:30":
            if course['subject'] == "TD maths":
                td_math_groups_at_13.add(course['group'])
            elif course['subject'] == "TD physique":
                td_physique_groups_at_13.add(course['group'])

    # Ajouter un TD physique après TD maths, et vice versa
    for course in week_data:
        if course['group'] in td_math_groups_at_13 and course['subject'] == "TD maths" and course['end'] == "14:30":
            week_data.append(create_course("TD physique", "14:30", "16:00", course['group'], course['day']))
        elif course['group'] in td_physique_groups_at_13 and course['subject'] == "TD physique" and course['end'] == "14:30":
            week_data.append(create_course("TD maths", "14:30", "16:00", course['group'], course['day']))

def create_course(subject, start, end, group, day):
    professor = session_to_professor.get(subject, "Inconnu")
    room = determine_room(day, start, subject, professor)
    color = session_to_color.get(subject, "#ffffff")

    return {
        'day': day,
        'start': start,
        'end': end,
        'subject': subject,
        'professor': professor,
        'room': room,
        'color': color,
        'group': group
    }
    
def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return "".join([c for c in nfkd_form if not unicodedata.combining(c)])

# Traitement des données pour chaque semaine
for index, row in excel_data.iterrows():
    if index > 2 and pd.notna(row['Groupes semestre 1']) and isinstance(row['Groupes semestre 1'], int):
        week_date = remove_accents(row['Unnamed: 1'])
        week_data = []
        final_corrected_data[week_date] = []

        for i, group in enumerate(row[3:]):
            if pd.notna(group):
                # Déterminer le type d'activité et le professeur
                if i < 2:  # TP INFO Salle B306
                    activity_type = session_types[i]
                    professor = professors_or_types[i]
                elif i >= 9:  # TD SI et TP SI à partir de la 10ème colonne
                    activity_type = session_types[i]
                    professor = professors_or_types[i]
                else:  # Autres activités
                    activity_type = professors_or_types[i]
                    professor = session_to_professor.get(activity_type, professors_or_types[i])

                day_time = days_times[i]
                day, time = day_time.split(' ') if ' ' in day_time else (None, day_time)
                day = day_mapping.get(day, day)
                color = session_to_color.get(activity_type, "#ffffff")
                
                # Calculer l'heure de fin
                duration = course_durations.get(activity_type, '1:00')  # Durée par défaut si non trouvée
                start_time = formate_start_time(time)
                end_time = calculate_end_time(time, duration)
                
                # Déterminer la salle
                room = determine_room(day, time, activity_type, professor)

                entry = {
                    'day': day,
                    'start': start_time,
                    'end': end_time,
                    'subject': activity_type,
                    'professor': professor,
                    'room': room,
                    'color': color,
                    'group': group
                }
                week_data.append(entry)
                
        # Vérifier et ajouter des cours supplémentaires si nécessaire
        add_additional_course_if_needed(week_data)

        final_corrected_data[week_date] = week_data
            

# Convertir les données structurées en format JSON
final_corrected_json = json.dumps(final_corrected_data, indent=4, ensure_ascii=False)

# Enregistrer les données JSON dans un fichier
with open('./public/schedule_final.json', 'w') as file:
    file.write(final_corrected_json)