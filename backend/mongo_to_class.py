from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import User
from Driving import Driving
from Exercise import Exercise
from DietartyChoice import DietartyChoice
from Hobby import Hobby
from EnergyUsage import EnergyUsage



def init_all():
    data_init()
    user_info()
    user_driving()
    user_exercise()
    user_dietary_choice()
    user_hobby()
    user_energy_usage()

def data_init():
    uri = "mongodb+srv://ncmare01:aHfh4LO44P4p6fWo@cluster0.6l3vzy0.mongodb.net/?retryWrites=true&w=majority"

    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
        
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)


    db = client["EcoTracker"]
    col = db["user_data"]
    #user_info()
    return col.find()

data = data_init()

#print(user_id())
## TODO need to reface this so its not just at index 0 its for there specfic id
def user_info():
    user_one_id = data[0]['_id']
    user_one_first_name = data[0]['first_name']
    user_one_last_name = data[0]['last_name']
    user_one_gender = data[0]['gender']
    user_one_age = data[0]['age']
    user_one_weight_lb = data[0]['weight_lb']
    #print(f"{user_one_id} {user_one_first_name} {user_one_last_name} {user_one_gender} {user_one_age} {user_one_weight_lb}")

    user_one = User.User(user_one_id, user_one_first_name, user_one_last_name, user_one_gender, user_one_age, user_one_weight_lb)
    
    return user_one
    #print(user_one.name())
    
#user_info()
def user_driving():
    user_one_driving = data[0]['driving']
    user_one_year = user_one_driving["year"]
    user_one_make = user_one_driving["make"]
    user_one_model = user_one_driving["model"]
    user_one_avg_speed_mph = user_one_driving["avg_speed_mph"]
    user_one = Driving(user_one_year, user_one_make,user_one_model, user_one_avg_speed_mph )
   

    #print(user_one.car())
    return user_one

#user_driving()

def user_exercise():
    user_one_exercise = data[0]['exercise']
    user_one_activity = user_one_exercise["activity"]
    user_one_freq_per_week = user_one_exercise["freq_per_week"]
    user_one_duration_per_day_min = user_one_exercise["duration_per_day_min"]
    user_one = Exercise(user_one_activity, user_one_freq_per_week,user_one_duration_per_day_min )
   

    #print(user_one.exercise())
    return user_one
    
#user_exercise()


def user_dietary_choice():
    user_one_dietary_choice = data[0]['dietary_choice']
    user_one_diet_level = user_one_dietary_choice["diet_level"]
    user_one_food = user_one_dietary_choice["food"]
    user_one = DietartyChoice(user_one_diet_level, user_one_food )
   

    #print(user_one.food_level())
    return user_one
    
#user_dietary_choice()



def user_hobby():
    user_one_hobby = data[0]['hobby']
    user_one_activity = user_one_hobby["activity"]
    user_one_freq_per_week = user_one_hobby["freq_per_week"]
    user_one_duration_per_day_min = user_one_hobby["duration_per_day_min"]
    user_one = Hobby(user_one_activity, user_one_freq_per_week,user_one_duration_per_day_min )
   

    #print(user_one.activity_weekly())
    return user_one
    
#user_hobby()

def user_energy_usage():
    user_one_energy_usage = data[0]['energy_usage']
    user_one_appliance = user_one_energy_usage["appliance"]
    user_one_watts = user_one_energy_usage["watts"]
    user_one_hours_day = user_one_energy_usage["hours_day"]
    user_one = EnergyUsage(user_one_appliance, user_one_watts,user_one_hours_day )
   

    #print(user_one.watts_days())
    return user_one
    
#user_energy_usage()