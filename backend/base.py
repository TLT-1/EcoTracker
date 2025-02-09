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
import Email
import PasswordResetEmail
from bson import ObjectId
from CarbonInterface import calculate_carbon_emissions


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

    #data = []
    #for doc in cursor:
        # Assuming you want to send back both the name and the _id fields
        #entry = {
            
           # "_id": str(doc)  # Convert ObjectID to string
             #"_id": str(doc["_id"]) # this just gets the id whereas the top one is the entire userdata array made into a string
           # }
        #data.append(entry)

    #return jsonify(data)
    return jsonify(user.first_name, user.last_name, user.gender, user.age, user.weight_lb, user.dob)



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
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Invalid input, JSON required"}), 400
    email = data.get('email')
    password = data.get('password')
    
    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["users_ids"]
    user = col.find_one({"email": email})

    #return jsonify(response)
    if user and password:
        # The password matches the one in the database
        return jsonify({"success": "Logged in successfully"}), 200
    else:
        # The user was not found or the password does not match
        return jsonify({"error": "Invalid email or password"}), 401



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first = data.get('first')
    password = data.get('password')
    email = data.get('email')
    last = data.get('last')
    verification_code = data.get('code')
    #data['verification_code'] = verification_code
    

    uri = ""
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
        verification_code = data.get('code')
        
        
        # Your existing code to process the username and password goes here
        
        response = {
            "first_name": first,
            "last_name": last,
            "email": email,
            "password": password,
            "code": verification_code
        }
        Email.email(email, verification_code)
        apple = col.insert_one({"id": rand_user_id,"first_name": first, "last_name": last, "email": email, "password": password})
        return jsonify(response)
    else:
        return jsonify({"error": "Invalid input, JSON required"}), 400  # Bad Request  
    


@app.route('/inuseemail')
def inuseemail():
    emails = mongo_to_class.all_users_email()
    response = {
        "emails" : emails
        }
    #print(response)
    return jsonify(response)
    #return jsonify({"error": "Invalid input, JSON required"}), 200  # Bad Request  
 


current_code = None

@app.route('/verify', methods=['POST'])
def store_code():
    global current_code
    data = request.json
    if not data or 'code' not in data:
        return jsonify({"error": "Invalid input, 'code' required"}), 400
    
    current_code = data['code']  # Store the code
    return jsonify({"message": "Code stored successfully"}), 200

@app.route('/verify', methods=['GET'])
def retrieve_code():
    if current_code:
        # Return the stored code
        return jsonify({"code": current_code}), 200
    else:
        return jsonify({"error": "No code stored"}), 404
    

@app.route('/changename', methods=['POST'])
def change_name():
    data = request.json
    old_first = data.get('old_first')
    old_last = data.get('old_last')
    new_first = data.get('new_first')
    new_last = data.get('new_last')
    #current_code = data['code'] 

    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["user_data"]

    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        old_first = data.get('old_first')
        old_last = data.get('old_last')
        new_first = data.get('new_first')
        new_last = data.get('new_last')
        user = col.find_one({"first_name": old_first, "last_name": old_last})
        
        new_names = {
            "first_name": new_first,
            "last_name": new_last
        }
        result = col.update_one(
            user,  # Query to find the document
            {"$set": new_names}  # The update operation
        )


    return jsonify({"message": "Code stored successfully"}), 200




@app.route('/changeemail', methods=['POST'])
def change_email():
    data = request.json
    old_first = data.get('old_first')
    old_last = data.get('old_last')
    new_email = data.get('new_email')
    #current_code = data['code'] 

    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["users_ids"]
    
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        old_first = data.get('old_first')
        old_last = data.get('old_last')
        new_email = data.get('new_email')
        # Define the filter as a dictionary
        user_filter = {"first_name": old_first, "last_name": old_last}

        
        # Attempt to find the user by first and last name and update their email
        result = col.update_one(
            user_filter,  
            {"$set": {"email": new_email}}
        )

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "Email updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made to the email"}), 200
    else:
        return jsonify({"message": "Request must be JSON"}), 400

@app.route('/sendPasswordEmail', methods=['POST'])
def sendPasswordEmail():
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        email = data.get('email')
        PasswordResetEmail.email(email)
        return jsonify({"message": "Email updated successfully"}), 200
    else:
        return jsonify({"message": "Email did not send"}), 400
        
        

@app.route('/changepassword', methods=['POST'])
def change_password():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["users_ids"]
    
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        email = data.get('email')
        password = data.get('password')
        # Define the filter as a dictionary
        user_filter = {"email": email}

        
        # Attempt to find the user by first and last name and update their email
        result = col.update_one(
            user_filter,  
            {"$set": {"password": password}}
        )

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "Password updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made to the password"}), 200
    else:
        return jsonify({"message": "Request must be JSON"}), 400


@app.route('/driving', methods=['POST'])
def driving():
    # MongoDB connection URI
    uri = ""
    
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["user_data"]

    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        user_id = data.get('user_id')
        year = data.get('year')
        make = data.get('make')
        model = data.get('model')
        avg_speed = data.get('avg_speed')
        miles_driven = data.get('miles_driven')

        # Calculate carbon emissions (You need to implement this function)
        carbon_emissions = calculate_carbon_emissions(make, model, miles_driven)
        #carbon_g = carbon_emissions['data']['attributes']['carbon_g']
        # Define the filter and update dictionary for MongoDB
        user_filter = {"_id": ObjectId(user_id)}
        update_dict = {
            "$set": {
                "driving.year": year,
                "driving.make": make,
                "driving.model": model,
                "driving.avg_speed_mph": avg_speed,
                "driving.miles_driven": miles_driven,
                "driving.carbon_emissions": carbon_emissions
            }
        }

        # Update the user data
        result = col.update_one(user_filter, update_dict)

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "driving updated successfully", "carbon_emissions": carbon_emissions}), 200
        else:
            return jsonify({"message": "No changes made to the driving"}), 400
    else:
        return jsonify({"message": "Request must be JSON"}), 400

# Implement the calculate_carbon_emissions function based on your requirements




@app.route('/exercise', methods=['POST'])
def exercise():
    data = request.json
    user_id = data.get('user_id')
    activity = data.get('activity')
    freqPerWeek = data.get('freqPerWeek')
    durationPerDayMin = data.get('durationPerDayMin')


    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["user_data"]
    
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        user_id = data.get('user_id')
        activity = data.get('activity')
        freqPerWeek = data.get('freqPerWeek')
        durationPerDayMin = data.get('durationPerDayMin')
        # Define the filter as a dictionary
        user_filter = {"_id": ObjectId(user_id)}

        #print(year, make, model)
        # Attempt to find the user by first and last name and update their email
        update_dict = {
        "$set": {
            "exercise.activity": activity,
            "exercise.freq_per_week": freqPerWeek,
            "exercise.duration_per_day_min": durationPerDayMin,
            }
        }
         
    # Attempt to find the user by first and last name and update the document
        result = col.update_one(
            user_filter,
            update_dict
        )

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "exercise updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made to the exercise"}), 400
    else:
        return jsonify({"message": "Request must be JSON"}), 400




@app.route('/diet', methods=['POST'])
def diet():
    data = request.json
    user_id = data.get('user_id')
    dietLevel = data.get('dietLevel')
    food = data.get('food')


    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["user_data"]
    
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        user_id = data.get('user_id')
        dietLevel = data.get('dietLevel')
        food = data.get('food')
        # Define the filter as a dictionary
        user_filter = {"_id": ObjectId(user_id)}

        #print(year, make, model)
        # Attempt to find the user by first and last name and update their email
        update_dict = {
        "$set": {
            "dietary_choice.diet_level": dietLevel,
            "dietary_choice.food": food,
            }
        }
         
    # Attempt to find the user by first and last name and update the document
        result = col.update_one(
            user_filter,
            update_dict
        )

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "diet updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made to the diet"}), 400
    else:
        return jsonify({"message": "Request must be JSON"}), 400






@app.route('/energy', methods=['POST'])
def energy():
    data = request.json
    user_id = data.get('user_id')
    appliance = data.get('appliance')
    watts = data.get('watts')
    hoursDay = data.get('hoursDay')


    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["user_data"]
    
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        user_id = data.get('user_id')
        appliance = data.get('appliance')
        watts = data.get('watts')
        hoursDay = data.get('hoursDay')
        # Define the filter as a dictionary
        user_filter = {"_id": ObjectId(user_id)}

        #print(year, make, model)
        # Attempt to find the user by first and last name and update their email
        update_dict = {
        "$set": {
            "energy_usage.appliance": appliance,
            "energy_usage.watts": watts,
            "energy_usage.hours_day": hoursDay,
            }
        }
         
    # Attempt to find the user by first and last name and update the document
        result = col.update_one(
            user_filter,
            update_dict
        )

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "energy updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made to the energy"}), 400
    else:
        return jsonify({"message": "Request must be JSON"}), 400





@app.route('/leaderboard', methods=['POST'])
def leaderboard():
    data = request.json
    name = data.get('name')
    score = data.get('score')


    uri = ""
    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["EcoTracker"]
    col = db["leaderboard"]
    
    if request.is_json:  # Check if the request has a JSON content type
        data = request.json
        name = data.get('name')
        score = data.get('score')
        # Define the filter as a dictionary
        user_filter = {"_id": ObjectId(name)}

        #print(year, make, model)
        # Attempt to find the user by first and last name and update their email
        update_dict = {
        "$set": {
            "leaderbaord.name": name,
            "leaderboard.score": score,
            }
        }
         
    # Attempt to find the user by first and last name and update the document
        result = col.update_one(
            user_filter,
            update_dict
        )

        # Check if the update was successful
        if result.modified_count > 0:
            return jsonify({"message": "energy updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made to the energy"}), 400
    else:
        return jsonify({"message": "Request must be JSON"}), 400










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

















