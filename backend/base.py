from flask import Flask
from pymongo import collection
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#import pymongo
from flask import jsonify
from flask_cors import CORS
from User import User
from Driving import Driving
import mongo_to_class



app = Flask(__name__)
CORS(app)




@app.route('/profile')
def my_profile():
    mongo_to_class.init_all()
    response_body = {
        "id": f"{mongo_to_class.user_info().id}",
        
    }

    return response_body
    #cursor = mongo_to_class.init_all()
    #return jsonify(mongo_to_class.user_info().id)



User_id = mongo_to_class.user_info().id

@app.route(f'/{User_id}/info/usersdata')
def user_data():
    cursor = mongo_to_class.data_init()
    user = mongo_to_class.user_info()

    data = []
    for doc in cursor:
        # Assuming you want to send back both the name and the _id fields
        entry = {
            
            "_id": str(doc)  # Convert ObjectID to string
             #"_id": str(doc["_id"]) # this just gets the id whereas the top one is the entire userdata array made into a string
            }
        data.append(entry)

    #return jsonify(data)
    return jsonify(user.first_name, user.last_name, user.gender, user.age, user.weight_lb)



@app.route(f'/{User_id}/info/dietarychoice')
def user_dietarychoice():
    cursor = mongo_to_class.data_init()
    user = mongo_to_class.user_dietary_choice()

    return jsonify(user.diet_level, user.food)


@app.route(f'/{User_id}/info/driving')
def user_driving():
    cursor = mongo_to_class.data_init()
    user = mongo_to_class.user_driving()

    return jsonify(user.year, user.make, user.model, user.avg_speed)


@app.route(f'/{User_id}/info/exercise')
def user_exercise():
    cursor = mongo_to_class.data_init()
    user = mongo_to_class.user_exercise()

    return jsonify(user.activity, user.freq_per_week, user.duration_per_day_min)

@app.route(f'/{User_id}/info/hobby')
def user_hobby():
    cursor = mongo_to_class.data_init()
    user = mongo_to_class.user_hobby()

    return jsonify(user.activity, user.freq_per_week, user.duration_per_day_min)


@app.route(f'/{User_id}/info/energyusage')
def user_energyusage():
    cursor = mongo_to_class.data_init()
    user = mongo_to_class.user_energy_usage()

    return jsonify(user.appliance, user.watts, user.hours_day)




@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not Found"}), 404



#//    // this code fetches the backend user data and displays it on the front end 
#const [data, setData] = useState([]);
# const [data_to, setData_to] = useState([]);
# 
#     useEffect(() => {
#         fetch('http://localhost:5000/profile')
#             .then(res => res.json())
#             .then(initialData => {
#                 setData(initialData);
# 
#                 // Now fetch the second piece of data using the id from the initial data
#                 return fetch('http://localhost:5000/' + initialData.id + '/info/dietarychoice');
#             })
#             .then(res => res.json())
#             .then(secondaryData => {
#                 setData_to(secondaryData);
#             })
#             .catch(error => {
#                 console.error("There was an error fetching the data:", error);
#             });
#     }, []);

# <div>
#     <h1>Data from MongoDB</h1>
#     <ul>
#         <li>ID: {data.id}</li>
#         <li>ID: {data_to}</li>
#     </ul>
# </div>






#old code might still be usefull though
#// need to add the user id thing
 #   const [data, setData] = useState([])
  #  useEffect(() => {
   #     fetch("http://localhost:5000/"+data+"usersdata").then(
    #        res => res.json()
     #   ).then(
      #      data => {
       #         setData(data)
        #        console.log(data)
         #   }
    #    )
   # }, []);

















