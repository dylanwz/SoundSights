
import requests
import json
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
def getEvent(category = "concerts", country = "AU", title = "", userLoc = "-33.8843585 151.2144464"):
    if category == "\"\"":
        category = "community"
    if country == "\"\"":
        country = "AU"
    if title == "\"\"":
        title = ""
    if userLoc == "\"\"":
        userLoc = "-33.8843585 151.2144464"
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
            "within": f"5km@{userLoc.split()[0]},{userLoc.split()[1]}",
            "limit": 10
        }
    )
    
    # print(response.json())
    for i in range(len(response.json()['results'])):
        event = response.json()['results'][i]
        if (event['state'] == 'active'):
            temp = event['location'][1]
            event['location'][1] = event['location'][0]
            event['location'][0] = temp
            eventsInCountry.append({'title': event['title'],
                                       'details': [event['start'], event['location'], event['country'], event['category'], event['labels']]
                                       })
    print(eventsInCountry)
    return json.dumps(eventsInCountry, separators=(',',':'))
    
getEvent(category = arguments[0], country = arguments[1], title = arguments[2], userLoc = arguments[3])