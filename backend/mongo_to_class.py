from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import User
from Driving import Driving
from Exercise import Exercise
from DietartyChoice import DietartyChoice
from Hobby import Hobby
from EnergyUsage import EnergyUsage


uri = "mongodb+srv://ncmare01:aHfh4LO44P4p6fWo@cluster0.6l3vzy0.mongodb.net/?retryWrites=true&w=majority"

#Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

#Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    

#Database Name
db = client["EcoTracker"]

#Collection Name
col = db["user_data"]
#x = col.find_one()


#for data in col.find():

 #   print(data['_id'])

#print(col.find()[0]['_id'])


## TODO need to reface this so its not just at index 0 its for there specfic id
def user_info():
    user_one_id = col.find()[0]['_id']
    user_one_first_name = col.find()[0]['first_name']
    user_one_last_name = col.find()[0]['last_name']
    user_one_gender = col.find()[0]['gender']
    user_one_age = col.find()[0]['age']
    user_one_weight_lb = col.find()[0]['weight_lb']
    #print(f"{user_one_id} {user_one_first_name} {user_one_last_name} {user_one_gender} {user_one_age} {user_one_weight_lb}")

    user_one = User.User(user_one_id, user_one_first_name, user_one_last_name, user_one_gender, user_one_age, user_one_weight_lb)

    print(user_one.name())


def user_driving():
    user_one_driving = col.find()[0]['driving']
    user_one_year = user_one_driving["year"]
    user_one_make = user_one_driving["make"]
    user_one_model = user_one_driving["model"]
    user_one_avg_speed_mph = user_one_driving["avg_speed_mph"]
    user_one = Driving(user_one_year, user_one_make,user_one_model, user_one_avg_speed_mph )
   

    print(user_one.car())

#user_driving()

def user_exercise():
    user_one_exercise = col.find()[0]['exercise']
    user_one_activity = user_one_exercise["activity"]
    user_one_freq_per_week = user_one_exercise["freq_per_week"]
    user_one_duration_per_day_min = user_one_exercise["duration_per_day_min"]
    user_one = Exercise(user_one_activity, user_one_freq_per_week,user_one_duration_per_day_min )
   

    print(user_one.exercise())
    
#user_exercise()


def user_dietary_choice():
    user_one_dietary_choice = col.find()[0]['dietary_choice']
    user_one_diet_level = user_one_dietary_choice["diet_level"]
    user_one_food = user_one_dietary_choice["food"]
    user_one = DietartyChoice(user_one_diet_level, user_one_food )
   

    print(user_one.food_level())
    
#user_dietary_choice()



def user_hobby():
    user_one_hobby = col.find()[0]['hobby']
    user_one_activity = user_one_hobby["activity"]
    user_one_freq_per_week = user_one_hobby["freq_per_week"]
    user_one_duration_per_day_min = user_one_hobby["duration_per_day_min"]
    user_one = Hobby(user_one_activity, user_one_freq_per_week,user_one_duration_per_day_min )
   

    print(user_one.activity_weekly())
    
#user_hobby()

def user_energy_usage():
    user_one_energy_usage = col.find()[0]['energy_usage']
    user_one_appliance = user_one_energy_usage["appliance"]
    user_one_watts = user_one_energy_usage["watts"]
    user_one_hours_day = user_one_energy_usage["hours_day"]
    user_one = EnergyUsage(user_one_appliance, user_one_watts,user_one_hours_day )
   

    print(user_one.watts_days())
    
user_energy_usage()