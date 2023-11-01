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



#@app.route('/login', methods=['POST'])
#def login():
   # print(request.data)  # Output raw request data to the console
    #data = request.get_json()
    #print("hallo")
    #print(data) 
#    data = request.json
#    username = data.get('username')
#    password = data.get('password')
    
    # You can now use the username and password
    # Add your processing code here


#    uri = "mongodb+srv://ncmare01:aHfh4LO44P4p6fWo@cluster0.6l3vzy0.mongodb.net/?retryWrites=true&w=majority"
#    client = MongoClient(uri, server_api=ServerApi('1'))
#    db = client["EcoTracker"]
#    user_data_collection = db['user_data']
#    result = user_data_collection.insert_one(data)

    
#    if result.inserted_id:
#        return jsonify({"message": "User data inserted successfully", "id": str(result.inserted_id)})
#    else:
#        return jsonify({"message": "An error occurred while inserting user data"})

    #data = request.json
    #username = data.get('username')
    #password = data.get('password')
    #response = {
      #      "id": str(username),
      #  "email": str(password)
      #  }

    
    # You can now use the username and password
    # Add your processing code here
    
    #return jsonify(response)
    #data = request.get_json()
    
    #username = data.get('username')
    #password = data.get('password')
    
    # You can now use the username and password
    # Add your processing code here
    
    # For demonstration, just sending a response back
    #response_data = {
     #   "id": f"{password}",
     #   "email": f"{username}@gmail.com"
    #}
    
    #return jsonify(response_data), 200
    #data = request.get_json()
    
    #username = data.get('username')
    #password = data.get('password')
    
    # ... (your existing code)
    
   # username = request.json['username']
    #password = request.json['password']
    #response_data = {
    #    "id": f"{password}",
    #    "email": f"{username}@gmail.com"
    #}
    #return jsonify(response_data), 200
   # request_data = json.loads(request.data)
    #searchData = request_data['data']
    #return jsonify(searchData)
    



@app.route('/login', methods=['POST'])
def handle_form_submission():
    user_input = request.form['user_input']
    # Process the user input here
    return 'Form submitted!'

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

















