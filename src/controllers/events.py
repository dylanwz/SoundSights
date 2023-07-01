import requests
import sys
# return value is denoted as R

# arguments are assumed to all be passed in, NULL valued will be passed as ""
arguments = sys.argv[1:]
for arg in arguments:
    print("arguemtn: " + arg)

# Can retrieve select information via RV['results'][index: int][id/parent_event/title/description/category/labels/rank/local_rank/aviation_rank/entities/duration/start/end/updated/timezone/location/geo/scope/country/place_heirarhies/state/private]
# NULL arguments break the get, set default to AU for now
def getEvent(category = "", country = "AU"):
    if country == "\"\"":
        country = "AU"
    response = requests.get(
        url="https://api.predicthq.com/v1/events/",
        headers={
        "Authorization": "Bearer wXve6QIrhxeqgp-jhLVGq37jrHAudfa2XB6ZYY9W",
        "Accept": "application/json"
        },
        params={
            "category": category,
            "country": country,
            # "id": "",
            "limit": 10
        }
    )
    
    print(response.json())
    return response.json()

getEvent(category = arguments[0], country = arguments[1])