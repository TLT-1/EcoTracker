from flask import Flask
from pymongo import collection
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#import pymongo
from flask import jsonify
from flask_cors import CORS




app = Flask(__name__)
CORS(app)


@app.route('/profile')
def my_profile():
    #response_body = {
     #   "name": "Nagato",
     #   "about" :"Hello! I'm a full stack developer that loves python and javascriptdoes this work"
    #}

    #return response_body
    return jsonify({"members": ["mem1","mem2"]})



@app.route('/usersdata')
def user_data():
   
    uri = "mongodb+srv://ncmare01:aHfh4LO44P4p6fWo@cluster0.6l3vzy0.mongodb.net/?retryWrites=true&w=majority"

    #Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))

    db = client["EcoTracker"]
    col = db["user_data"]
    cursor = col.find()

    data = []
    for doc in cursor:
        # Assuming you want to send back both the name and the _id fields
        entry = {
            
            "_id": str(doc)  # Convert ObjectID to string
             #"_id": str(doc["_id"]) # this just gets the id whereas the top one is the entire userdata array made into a string
            }
        data.append(entry)

    return jsonify(data)


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not Found"}), 404



#//    // this code fetches the backend user data and displays it on the front end 
#//     const [data, setData] = useState([])
#//     useEffect(() => {
#//         fetch("http://localhost:5000/usersdata").then(
#//             res => res.json()
#//         ).then(
#//             data => {
#//                 setData(data)
#//                 console.log(data)
#//             }
#//         )
#//     }, []);#

#//     return (
#//         <View>
#//             <TitleScreen />
#//             <div>
#//                 <h1>Data from MongoDB</h1>
#//                 <ul>
#//                     {data.map((item, index) => (
#//                         <li key={index}>ID: {item._id}</li>
#//                     ))}
#//                 </ul>
#//             </div>    
#//             <StatusBar style="auto" />
#//         </View>
#//     );