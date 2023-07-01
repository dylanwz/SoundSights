import requests
# return value is denoted as RV

# Can retrieve select information via RV['results'][index: int][id/type/name/region/country/country_alpha2/location]
def getPlace(country = "", id = "", location = "", q = ""):
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

    # print(response.json()['results'])
    for i in range(len(response.json()['results'])):
        place = response.json()['results'][i]
        print(f"{place['name']} - {place['region']}, {place['country']}")
    return response.json()


getPlace(country = "AU", location = [], q = "Opera House")