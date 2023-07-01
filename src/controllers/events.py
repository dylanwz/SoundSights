import requests
import sys
# return value is denoted as R

# arguments are assumed to all be passed in, NULL valued will be passed as ""
arguments = sys.argv[1:]
for arg in arguments:
    print("argument: " + arg)

# Can retrieve select information via RV['results'][index: int][id/parent_event/title/description/category/labels/rank/local_rank/aviation_rank/entities/duration/start/end/updated/timezone/location/geo/scope/country/place_heirarhies/state/private]
# NULL arguments break the get, set defaults for now
def getEvent(category = "concerts", country = "AU", title = ""):
    if category == "\"\"":
        category = "performing-arts"
    if country == "\"\"":
        country = "AU"
    if title == "\"\"":
        title = ""
    eventsInCountry = {};
    response = requests.get(
        url="https://api.predicthq.com/v1/events/",
        headers={
        "Authorization": "Bearer wXve6QIrhxeqgp-jhLVGq37jrHAudfa2XB6ZYY9W",
        "Accept": "application/json"
        },
        params={
            "category": category,
            "country": country,
            "title": title,
            # "id": "",
            "limit": 10
        }
    )
    
    # print(response.json())
    for i in range(len(response.json()['results'])):
        event = response.json()['results'][i]
        # print("hi" + place['name'].strip())
        if (event['state'] == 'active'):
            # print(f"{event['title']}: {event['start']} - {event['location']}, {event['country']}")
            eventsInCountry[event['title']] = [event['start'], event['location'], event['country']]
            temp = event['location'][1]
            event['location'][1] = event['location'][0]
            event['location'][0] = temp
    print(eventsInCountry)
    return eventsInCountry

getEvent(category = arguments[0], country = arguments[1], title = arguments[2])