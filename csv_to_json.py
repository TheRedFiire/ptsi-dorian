import os
import pandas as pd
import json
from datetime import datetime, timedelta
import unicodedata

Semestre = "2"

# Charger le fichier Excel
excel_data = pd.read_excel(f'./public/documents/groupesS{Semestre}.xlsx')

# Extraire les informations nécessaires
session_types = excel_data.iloc[0, 3:].fillna(method='ffill').values
professors_or_types = excel_data.iloc[1, 3:].fillna(method='ffill').values
days_times = excel_data.iloc[2, 3:].values

# Variables et dictionnaires pour le mapping
default_room = "B302"

day_mapping = {'Lu': 'Lundi', 'Ma': 'Mardi', 'Me': 'Mercredi', 'Je': 'Jeudi', 'Ve': 'Vendredi'}
# Mapping pour l'attribution des professeurs
session_to_professor = {
    ('Maths', 'TD maths'): 'M. Darreye',
    ('Physique', 'TD Physique', 'TP Physique', 'TD physique'): 'M. Aubert',
    ('Soutien SI'): 'M. Costadoat',
    ('Français'): 'M. Chabot',
    ('Anglais'): 'Mme. Pichon',
    ('TIPE'): 'Costadoat/Aubert'
}
# Durées des différents types de cours
course_durations = {
    ('TD Physique', 'TD physique', 'TD maths'): '1:30',
    ('TP Physique', 'TD SI', 'Soutien SI', 'TP INFO Salle B306'): '2:00',
    ('TP SI'): '2:30'
}
# Couleurs des différents types de cours
session_to_color = {
    ('Maths', 'TD maths'): '#f0593f',
    ('Physique', 'TD Physique', 'TP Physique', 'TD physique'): '#E1AB20',
    ('Soutien SI', 'TD SI', 'TP SI', 'SI'): '#22659c',
    ('TP INFO Salle B306'): '#ff8b94',
    ('Français'): '#744700',
    ('Anglais'): '#c026d3',
    ('TIPE'): '#16a34a'
}
# Liste des cours fixes à ajouter
tasks = [
    {   "day": "Lundi",
        "start": "8:00",
        "end": "10:30",
        "subject": "Maths",
    },
    {
        "day": "Mardi",
        "start": "8:00",
        "end": "10:30",
        "subject": "Physique",
    },
    {
        "day": "Mardi",
        "start": "10:30",
        "end": "12:00",
        "subject": "Maths",
    },
    {
        "day": "Mercredi",
        "start": "8:00",
        "end": "10:00",
        "subject": "SI",
    },
    {
        "day": "Mercredi",
        "start": "10:00",
        "end": "12:00",
        "subject": "Français",
    },
    {
        "day": "Mercredi",
        "start": "13:00",
        "end": "15:30",
        "subject": "Physique",
    },
    {
        "day": "Jeudi",
        "start": "14:00",
        "end": "16:00",
        "subject": "Anglais",
    },
        {
        "day": "Jeudi",
        "start": "16:00",
        "end": "18:00",
        "subject": "TIPE",
    },
    {
        "day": "Vendredi",
        "start": "8:00",
        "end": "10:30",
        "subject": "Maths",
    }
]

# Récupérer un élément d'un dictionnaire
def get_attribute(session, attribute_dict, default_value):
    for sessions, attribute in attribute_dict.items():
        if session in sessions:
            return attribute
    return default_value

for task in tasks:
    task["room"] = default_room  # Définir la salle par défaut pour chaque cours fixe
    task["professor"] = get_attribute(task["subject"], session_to_professor, 'Inconnu')
    task["color"] = get_attribute(task["subject"], session_to_color, '#ffffff')

def format_time(time_str):
    return time_str.replace('h', ':') + ('00' if time_str.endswith('h') else '')

def calculate_end_time(start_time, duration):
    start_time_formatted = format_time(start_time)
    start = datetime.strptime(start_time_formatted, '%H:%M')
    duration_hours, duration_minutes = map(int, duration.split(':'))
    end_time = start + timedelta(hours=duration_hours, minutes=duration_minutes)
    return end_time.strftime('%H:%M')

def determine_room(day, time, activity_type, professor):
    room_mapping = {
        ('TD maths', 'Lundi'): ('B305' if time.startswith('10') else 'C204'),
        ('TD maths', 'Mardi'): 'C204',
        ('TD physique',): 'B302',
        ('TP Physique',): 'C01',
        ('TP SI',): 'E109-110',
        ('TP INFO Salle B306',): 'B306',
        ('Soutien SI',): 'B302',
        ('TD SI', 'Lundi'): 'B302',
        ('TD SI', 'Vendredi'): ('B304' if professor == 'Mme Puig' else 'B302'),
    }

    # Retourne la salle correspondante ou 'To be determined' si aucune correspondance n'est trouvée.
    return room_mapping.get((activity_type, day), room_mapping.get((activity_type,), 'To be determined')) #Garder la virgule (activity_type,)

def create_course(subject, start, end, group, day):
    professor = get_attribute(subject, session_to_professor, "Inconnu")
    room = determine_room(day, start, subject, professor)
    color = get_attribute(subject, session_to_color, '#ffffff')

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
    return unicodedata.normalize('NFKD', input_str).encode('ascii', 'ignore').decode('utf-8')

def add_fixed_courses(week_data):
    # Ajoute tous les cours sauf 'TIPE' par défaut
    for task in tasks:
        if task['subject'] != 'TIPE' or (task['subject'] == 'TIPE' and Semestre == "2"):
            # Ajoute le cours si ce n'est pas 'TIPE' ou si c'est 'TIPE' et que le semestre est "2"
            week_data.append({**task, 'group': 'ABCDEFGHIJKLMN'})

    
def add_additional_td_courses(week_data):
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
    
final_corrected_data = {}
for index, row in excel_data.iterrows():
    if index <= 2 or pd.isna(row[f'Groupes semestre {Semestre}']) or not isinstance(row[f'Groupes semestre {Semestre}'], int):
        continue

    week_data = []
    week_date = remove_accents(row['Unnamed: 1'])

    for i, group in enumerate(row[3:]):
        if pd.notna(group):
            activity_type = session_types[i] if i < 2 or i >= 9 else professors_or_types[i]
            professor = professors_or_types[i] if activity_type in ['TD SI', 'TP SI', 'TP INFO Salle B306'] else get_attribute(activity_type, session_to_professor, 'Inconnu')
            day_time = days_times[i].split(' ')
            day, time = (day_mapping.get(day_time[0], None), day_time[1]) if len(day_time) > 1 else (None, day_time[0])
            color = get_attribute(activity_type, session_to_color, '#ffffff')
            start_time = format_time(time)
            duration = get_attribute(activity_type, course_durations, '1:00')
            end_time = calculate_end_time(time, duration)
            room = determine_room(day, start_time, activity_type, professor)

            # Gérer le cas spécial pour 'TP INFO Salle B306' marqué comme 'Cours'
            if group == 'Cours':
                activity_type = 'INFO'
                group = 'ABCDEFGHIJKLMN'  # Groupe de A à N
                room = 'B302'  # Salle définie en B302
                color = '#ff8b94'
            
            week_data.append({
                'day': day,
                'start': start_time,
                'end': end_time,
                'subject': activity_type,
                'professor': professor,
                'room': room,
                'color': color,
                'group': group
            })

    # Ajouter les cours supplémentaires de TD si nécessaire
    add_additional_td_courses(week_data)
    add_fixed_courses(week_data)
    final_corrected_data[week_date] = week_data

file_path = './public/config/schedule_final.json'
if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            existing_data = json.load(file)
    except json.JSONDecodeError:
        existing_data = {}  # Fichier existant mais vide ou mal formé
else:
    existing_data = {}

for month, data in final_corrected_data.items():
    existing_data[month] = data

with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(existing_data, file, indent=4, ensure_ascii=False)