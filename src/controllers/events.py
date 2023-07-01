import requests
import sys
# return value is denoted as R

# arguments are assumed to all be passed in, NULL valued will be passed as ""
arguments = sys.argv[1:]
for arg in arguments:
    print("argument: " + arg)
    
def findRadius(location, industry = "other"):
    locStr = f"{location.split()[0]}, {location.split()[1]}"
    response = requests.get(
        url="https://api.predicthq.com/v1/suggested-radius/",
        headers={
        "Authorization": "Bearer wXve6QIrhxeqgp-jhLVGq37jrHAudfa2XB6ZYY9W",
        "Accept": "application/json"
        },
        params={
            "location.origin": locStr,
            "industry": industry,
            "radius_unit": "km"
        }
    )
    return response.json();

# Can retrieve select information via RV['results'][index: int][id/parent_event/title/description/category/labels/rank/local_rank/aviation_rank/entities/duration/start/end/updated/timezone/location/geo/scope/country/place_heirarhies/state/private]
# NULL arguments break the get, set defaults for now
def getEvent(category = "concerts", country = "AU", title = "", userLoc = "0 0"):
    if category == "\"\"":
        category = "performing-arts"
    if country == "\"\"":
        country = "AU"
    if title == "\"\"":
        title = ""
    eventsInCountry = []
    # radiusToSearch = findRadius(userLoc, "other")
    # print(radiusToSearch)
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
            # "labels": ["instrument"],
            # "within": f"{radiusToSearch['radius']}{radiusToSearch['radius_unit']}@{radiusToSearch['location']['lat']},{radiusToSearch['location']['lon']}",
            "within": f"5km@{userLoc.split()[0]},{userLoc.split()[1]}",
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
            temp = event['location'][1]
            event['location'][1] = event['location'][0]
            event['location'][0] = temp
            eventsInCountry.append({'title': event['title'],
                                       'details': [event['start'], event['location'], event['country']]
                                       })
    print(eventsInCountry)
    return eventsInCountry

getEvent(category = arguments[0], country = arguments[1], title = arguments[2], userLoc = "-33.86862 151.20503")