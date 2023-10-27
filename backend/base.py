from flask import Flask
from pymongo import collection
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#import pymongo
from flask import jsonify
from flask_cors import CORS
from User import User
import mongo_to_class



app = Flask(__name__)
CORS(app)




@app.route('/profile')
def my_profile():
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