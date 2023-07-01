import requests
import sys
# return value is denoted as RV

# arguments are assumed to all be passed in, NULL valued will be passed as ""
arguments = sys.argv[1:]
for arg in arguments:
    print("arguemtn: " + arg)

# Can retrieve select information via RV['results'][index: int][id/type/name/region/country/country_alpha2/location]
def getPlace(country = "", id = "", location = "", q = ""):
    if location == '\"\"':
        location = ""
    if q == '\"\"':
        q == ""
    if country == '\"\"':
        country = ""
    response = requests.get(
        url="https://api.predicthq.com/v1/places/",
        headers={
        "Authorization": "Bearer wXve6QIrhxeqgp-jhLVGq37jrHAudfa2XB6ZYY9W",
        "Accept": "application/json"
        },
        params={
            "country": country,
            "id": id,
            "location": location,
            "q": q,
            "limit": 100
        }
    )

    print(response.json())
    # for i in range(len(response.json()['results'])):
    #     place = response.json()['results'][i]
    #     print(f"{place['name']} - {place['region']}, {place['country']}")
    return response.json()


getPlace(country = arguments[0], id = arguments[1], location = arguments[2], q = arguments[3])