api_key = 'PiksmePK9KR6tM0CyXpSPA'

import requests
import json

def get_vehicle_make_id(api_key, make_name):
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    makes_url = "https://www.carboninterface.com/api/v1/vehicle_makes"
    response = requests.get(makes_url, headers=headers)
    if response.status_code == 200:
        response_json = response.json()
        for item in response_json:  # Iterate directly over the list
            make_data = item['data']
            if make_data['attributes']['name'].lower() == make_name.lower():
                return make_data['id']
        raise ValueError(f"Make {make_name} not found")
    else:
        raise ValueError(f"Failed to get vehicle makes: {response.text}")




def get_vehicle_model_id(api_key, make_id, model_name):
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    models_url = f"https://www.carboninterface.com/api/v1/vehicle_makes/{make_id}/vehicle_models"
    response = requests.get(models_url, headers=headers)
    if response.status_code == 200:
        models = response.json()
        for item in models:  # Iterate directly over the list
            model_data = item['data']
            if model_data['attributes']['name'].lower() == model_name.lower():
                return model_data['id']
        raise ValueError(f"Model {model_name} not found")
    else:
        raise ValueError(f"Failed to get vehicle models: {response.text}")


def create_vehicle_estimate(api_key, vehicle_model_id, distance_value):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        "type": "vehicle",
        "distance_unit": "mi",
        "distance_value": distance_value,
        "vehicle_model_id": vehicle_model_id
    }
    estimates_url = "https://www.carboninterface.com/api/v1/estimates"
    response = requests.post(estimates_url, headers=headers, data=json.dumps(data))
    if response.status_code == 201:
        return response.json()
    else:
        raise ValueError(f"Failed to create vehicle estimate: {response.text}")


make_name = 'subaru'
model_name = 'Wrx'
distance_value = 17  # miles


try:
    make_id = get_vehicle_make_id(api_key, make_name)
    model_id = get_vehicle_model_id(api_key, make_id, model_name)
    estimate = create_vehicle_estimate(api_key, model_id, distance_value)
    print(json.dumps(estimate, indent=4))
except ValueError as e:
    print(e)


