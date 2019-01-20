
/*
* Request users
*
*/

// Dependencies

var mongodb = require('mongodb');
var helper = require('../../libs/helpers');
var _data =  require('../data');
const {ObjectId} = require('mongodb');
// Defines all users handlers.
var users = {};

// Define Constant.
const url = 'mongodb://localhost:27017';
const dbName = 'Delmond';

//Ping handler
users.ping = function(data,callback)
{
    console.log('users ping');
    callback(200);
}

// Not Found handler
users.notFound = function(data,callback)
{
    console.log('Not found user handler');
    callback(404);
}

users.getUserDetails = function(data,callback)
{
    if(data.method == 'get')
    {
        //console.log(data.queryStringObject.id);
        let id = data.queryStringObject.id;
        if(id)
        {
            // Get a mongo client to work with mongo server.
            var mongoClient = mongodb.MongoClient;

            // Connect to the server.

              mongoClient.connect(url,{useNewUrlParser: true},(err,client)=>{
                  if(err)
                  {
                      console.log('Unable to connect to the server', err);
                  }
                  else
                  {
                      var db = client.db(dbName);
                      //console.log(id);
                      //get the document collection
                      const collection = db.collection('users');

                      // find the _id details.
                      collection.find({_id:ObjectId(id)}).toArray((err,doc)=>{
                         if(err)
                         {
                            console.log(err);
                         }
                         else
                         {
                           callback(200,doc);
                         }
                      });

                  }
                  client.close();
              });
        }
    }
}

users.getAllUser = function(data,callback)
{
    if(data.method == 'get')
    {
        // Get a mongo client to work with mongo server.

        var mongoClient = mongodb.MongoClient;

        // Connect to the server.

            mongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
                if(err)
                {
                    console.log('Unable to connect to the server',err);
                }
                else
                {
                        var db = client.db(dbName);
                        // get the document collection
                        const collection = db.collection('users');

                        // find all data.
                        collection.find().toArray((err,doc)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            callback(200,doc);    
                        }
                        });
                }
                //client.close();
            });

    }
}

users.addUser = function(data,callback)
{
   console.log(data);
    if(data.method == 'post')
    {
       // check that all required field are filled out
       var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
       
       var username = typeof(data.payload.username) == 'string' && data.payload.username.trim().length > 0 ? data.payload.username.trim() : false;

       var password = typeof(data.payload.password) == 'string' &&
       data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

       var gender = typeof(data.payload.gender) == 'string' && data.payload.gender.trim().length > 0 ? data.payload.gender.trim() : false;

       var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;

       var contact = typeof(data.payload.contact) == 'string' && data.payload.contact.trim() ? data.payload.contact.trim() : false;

       var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;

       var city = typeof(data.payload.city) == 'string' && data.payload.city.trim().length > 0 ? data.payload.city.trim() : false;

       var image = typeof(data.payload.image) == 'string' && data.payload.image.trim().length > 0 ? data.payload.image.trim() : false;
       
       // if condition satisfied
       if(name && username && password && gender && email && contact && address && city && image)
       {
           // Get a mongo client to work with mongo server.

               var mongoClient = mongodb.MongoClient;

            // Connect to the server.

               mongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
                   if(err)
                   {
                      console.log('Unable to connect to the server',err);
                   }
                   else
                   {
                      var db = client.db(dbName);
                      // get the document collection
                      const collection = db.collection('users');
                      // find email exist or not.

                      collection.find({email:email}).toArray((err,doc)=>{
                         if(err)
                         {
                             console.log(err);
                         }
                         else
                         {
                            
                             if(doc.length > 0)
                             {
                                callback(400,{err:'email already exist'});
                             }
                             else
                             {
                                var user = { name:name,username:username,password:password,gender:gender,email:email,contact:contact,address:address,city:city,image:image };

                                //Insert the user data into the database.
                                collection.insert([user],(err,result)=>
                                {
                                   if(err)
                                   {
                                      console.log(err);
                                   }
                                   else
                                   {
                                      callback(200,{msg:'inserted successfully'});
                                   }
                                });
                             }
                         }
                      });
                   }
                   //client.close();
               });
               
               
       }
       else
       {
           callback(400,{err:'Missing Required Field'});
       }

    }
    else
    {
       callback(405); 
    }
}

users.deleteUser = function(data,callback)
{
            //console.log(data.queryStringObject.id);
            let id = data.queryStringObject.id;
            if(id)
            {
                // Get a mongo client to work with mongo server.
                var mongoClient = mongodb.MongoClient;
    
                // Connect to the server.
    
                  mongoClient.connect(url,{useNewUrlParser: true},(err,client)=>{
                      if(err)
                      {
                          console.log('Unable to connect to the server', err);
                      }
                      else
                      {
                          var db = client.db(dbName);
                          //console.log(id);
                          //get the document collection
                          const collection = db.collection('users');
    
                          // find the _id details.
                          collection.find({_id:ObjectId(id)}).toArray((err,doc)=>{
                             if(err)
                             {
                                console.log(err);
                             }
                             else
                             {
                               if(doc.length > 0)
                               {
                                   collection.deleteOne({_id:ObjectId(id)},(err,result)=>{
                                      if(err)
                                      {
                                          console.log(err);
                                      }
                                      else
                                      {
                                          callback(200,{msg:'Deleted Successfully'});
                                      }
                                   });
                               }
                               else
                               {
                                   callback(404,{err:'Id is not available in database'});
                               }  
                               
                             }
                          });
    
                      }
                      //client.close();
                  });
            }
        
}

//Export the user handlers
module.exports = users;

