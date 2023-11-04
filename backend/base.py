from urllib import response
from flask import Flask, json
from pymongo import collection
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#import pymongo
from flask import request, jsonify
from flask_cors import CORS
from User import User
from Driving import Driving
import mongo_to_class
import time


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",  # allow requests from any origin
        "allow_headers": ["Content-Type"],  # explicitly allow Content-Type header
        "methods": ["OPTIONS", "POST"]  # explicitly allow OPTIONS and POST methods
    }
})




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



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    uri = "mongodb+srv://ncmare01:aHfh4LO44P4p6fWo@cluster0.6l3vzy0.mongodb.net/?retryWrites=true&w=majority"
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["users_ids"]
    current_time = time.time()
    user_id = 12345
    custom_number1 = int(current_time) + user_id
    formatted_time = time.strftime('%Y%m%d%H%M%S', time.localtime())
    # Now append or prepend a custom value
    custom_number = int(formatted_time) * 10 + user_id
    rand_user_id = (custom_number * custom_number1)//11777111770


    #return jsonify(response)
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        username = data.get('username')
        password = data.get('password')
        
        # Your existing code to process the username and password goes here
        
        response = {
            "username": username,
            "password": password
        }
        
        apple = col.insert_one({"id": rand_user_id,"username": username, "password": password})
        return jsonify(response)
    else:
        return jsonify({"error": "Invalid input, JSON required"}), 400  # Bad Request



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first = data.get('first')
    password = data.get('password')
    email = data.get('email')
    last = data.get('last')
    
    uri = "mongodb+srv://ncmare01:aHfh4LO44P4p6fWo@cluster0.6l3vzy0.mongodb.net/?retryWrites=true&w=majority"
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["users_ids"]
    current_time = time.time()
    user_id = 12345
    custom_number1 = int(current_time) + user_id
    formatted_time = time.strftime('%Y%m%d%H%M%S', time.localtime())
    # Now append or prepend a custom value
    custom_number = int(formatted_time) * 10 + user_id
    rand_user_id = (custom_number * custom_number1)//251375121790


    #return jsonify(response)
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        first = data.get('first')
        password = data.get('password')
        email = data.get('email')
        last = data.get('last')
        
        # Your existing code to process the username and password goes here
        
        response = {
            "first_name": first,
            "last_name": last,
            "email": email,
            "password": password,
        }
        
        apple = col.insert_one({"id": rand_user_id,"first_name": first, "last_name": last, "email": email, "password": password})
        return jsonify(response)
    else:
        return jsonify({"error": "Invalid input, JSON required"}), 400  # Bad Request  
    





@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not Found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
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

















