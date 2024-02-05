import json
from icalendar import Calendar, Event
from datetime import datetime, timedelta
from pytz import timezone

daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

# Fonction pour remplacer les mois français par des mois en anglais
def replace_french_months(date_str):
    french_to_english = {
        "janv": "Jan", "fevr": "Feb", "mars": "Mar", "avr": "Apr",
        "mai": "May", "juin": "Jun", "juil": "Jul", "aout": "Aug",
        "sept": "Sep", "oct": "Oct", "nov": "Nov", "dec": "Dec"
    }
    for fr, en in french_to_english.items():
        date_str = date_str.replace(fr + '.', en)
    return date_str

# Fonction pour convertir une date française en objet datetime
def french_date_to_datetime(date_str, time_str, year):
    date_str = replace_french_months(date_str)
    day, month_str = date_str.split(" ")
    month = datetime.strptime(month_str, '%b').month
    hour, minute = map(int, time_str.split(":"))
    return datetime(year, month, int(day), hour, minute, tzinfo=timezone('Europe/Paris'))

# Chargez les données de l'emploi du temps
with open('public/config/schedule_final.json', encoding='utf-8') as f:
    schedule_data = json.load(f)

current_month = datetime.now().month
current_year = datetime.now().year
school_year_start = current_year if current_month >= 9 else current_year - 1

groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]
ical_files = {group: Calendar() for group in groups}


for week_start_str, tasks in schedule_data.items():
    week_start_str = replace_french_months(week_start_str)
    print(f"week_start_str after replacement: {week_start_str}")  # Debug: Imprimez pour vérifier

    # Assurez-vous d'ajouter l'année à week_start_str avant de parser
    year_to_add = school_year_start if "janv" in week_start_str or "fevr" in week_start_str or "mars" in week_start_str else school_year_start + 1
    week_start_str_with_year = f"{week_start_str} {year_to_add}"
    
    try:
        week_start = datetime.strptime(week_start_str_with_year, '%d %b %Y')
    except ValueError as e:
        print(f"Error parsing date: {week_start_str_with_year}, error: {e}")
        continue  # Sautez cette itération en cas d'erreur
    
    for task in tasks:
        day_index = daysOfWeek.index(task['day'])
        event_date = week_start + timedelta(days=day_index)
        start_dt = french_date_to_datetime(event_date.strftime('%d %b'), task['start'], event_date.year)
        end_dt = french_date_to_datetime(event_date.strftime('%d %b'), task['end'], event_date.year)

        for group in task['group']:
            if group in groups:
                event = Event()
                summary_with_room = f"{task['subject']} (Salle {task['room']})"
                event.add('summary', summary_with_room)
                event.add('dtstart', start_dt)
                event.add('dtend', end_dt)
                description = f"Avec {task['professor']}"
                event.add('description', description)
                ical_files[group].add_component(event)

for group, cal in ical_files.items():
    # Ajouter les propriétés juste après avoir créé l'objet Calendar
    cal.add('prodid', '-//PTSI Calendar//mxm.dk//')
    cal.add('version', '2.0')
    cal.add('X-WR-CALNAME', 'PTSI')  # Nom du calendrier
    cal.add('NAME', 'PTSI')   
    file_path = f'public/documents/ical/EDT_group_{group}.ics'
    with open(file_path, 'wb') as f:
        f.write(cal.to_ical())

print("Fichiers iCal générés avec succès.")