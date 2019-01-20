
/*
 * Request Handlers
 *
 */ 

// Dependencies

var mongodb = require('mongodb');
var helper = require('../helpers');
var _data   = require('../data');
// Define all the handlers
var handlers = {};

//Ping handler
handlers.ping = function(data,callback)
{
  console.log("i am ping");  
  callback(200);
};

// Not found handler
handlers.notFound = function(data,callback)
{
  callback(404);
};



// Tokens
handlers.tokens = function(data,callback)
{
    var acceptableMethods = ['post','get','put','delete'];
    console.log(data.method);
    if(acceptableMethods.indexOf(data.method) > -1)
    {
        
        handlers._tokens[data.method](data,callback);
    }
    else
    {
        callback(405);
    }
}

// Container for all the tokens methods
handlers._tokens = {};


// Tokens - post
// Required data: username, password
// Optional data: none

handlers._tokens.post = function(data,callback)
{   
     
    // check that all required fields are field out. 
    var username = typeof(data.payload.username) == 'string' && data.payload.username.trim().length > 0 ? data.payload.username.trim() : false;

    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
   // if condition statisfied.
    if(username && password)
    {
            
            
            // Get  a Moongo client to work with the Mongo server.
            var mongoClient = mongodb.MongoClient;
            
            // Define where the the mongDb server is.
        
            var url = 'mongodb://localhost:27017';
        
            // Connect to the server
            mongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
                if(err)
                {
                    console.log('Unable to connect to the server:',err);
                }
                else
                {
                    
                        // Database Name
                        const dbName = 'Delmond';
                        const db = client.db(dbName);
                        // get the document collection
                        const collection = db.collection('admins');
                        // find document.
                        collection.find({$and:[{'username':username},{'password':password},{'status':1}]}).toArray((err,docs)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            
                            if(docs.length == 0)
                            {    
                                                        
                                callback(404,{err:"username and password doesnot matched!!"});
                            }
                            else
                            {
                                // matched result.
                                // if valid, create a new token with a random name. Set an expiration date 1 hour in the future.
                                var tokenId = helper.createRandomString(20);
                                var expires = Date.now() + 1000 * 60 * 60;
                                
                                var tokenObject = {
                                    'username' : username,
                                    'id' : tokenId,
                                    'expires' : expires
                                };
                                
                                // Store the token
                                _data.create('tokens',tokenId,tokenObject,function(err){
                                    if(!err)
                                    {
                                    callback(200,tokenObject);
                                    }
                                    else
                                    {
                                    callback(500,{'Error':'Could not create the new token'});
                                    }
                                });

                               
                            }
                        
                            
                        }
                        
                    });
                    
                }
        
                client.close();
            });

   }
   else
   {
            callback(400,{err:"Missing Required Fields"});
   }

}

// Tokens - get
// Required data: id
// Optional data: none

handlers._tokens.get = function(data,callback)
{
  // Check that id is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

    if(id)
    {
       // Lookup the token
       _data.read('tokens',id,function(err,tokenData)
       { 
           if(!err && tokenData)
           {
               callback(200,tokenData);
           }
           else
           {
               callback(404);
           }

       });
    }
    else
    {
        callback(400,{'Error':'Missing Required field, or field Invalid'});

    }
  
};

// Tokens - put 
// Required data: id, extend
// Optional data: none

handlers._tokens.put = function(data,callback)
{
   var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
   
   var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

   if(id && extend)
   {
       // Lookup the existing token
       _data.read('tokens',id,function(err,tokenData){
       
        if(err && tokenData)
        {
          // Check to make sure the token isn't already expired
          if(tokenData.expires > Date.now())
          {
             // Set the expiration an hour from now
             tokenData.expires = Date.now() + 1000 * 60 * 60;
             
             // Store the new updates
             _data.update('tokens',id,tokenData,function(err){
                if(!err)
                {
                   callback(200);
                }
                else
                {
                   callback(500,{"Error":"Could not update the token\'s expiration. "});
                }
             });
          }
          else
          {
              callback(400,{'Error':'The token has already expired, and cannot be extended.'});
          }   
        }
        else
        {
              callback(400,{'Error': 'Specified user doesnot exist.'});
        } 

       });
   }
   else
   {
      callback(400,{"Error":"Missing required field(s) or field(s) are invalid."});
   }
};

// Tokens - delete
// Required data: id,
// Optional data: none

handlers._tokens.delete = function(data,callback)
{
    console.log(' i am delete');

    // Check that id is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

    if(id)
    {
        // Lookup the token
        _data.read('tokens',id,function(err,tokenData){
           if(!err && tokenData)
           {
               // Delete the token
               _data.delete('tokens',id,function(err){
                   if(!err)
                   {
                       callback(200,{'Msg':'Token removed Successfully'});
                   }
                   else
                   {
                       callback(500,{'Error':'Could not delete the specified token'}); 
                   }
               });
           }
           else
           {
               callback(400,{'Error':'Could not find the specified token'});
           }
        });
    }
    else
    {
        callback(400,{'Error': 'Missing required field'});
    }

};

// token has been deleted.

handlers.tokenDeleted = function(data,callback)
{
    // reject any request that isn't a POST
    if(data.method == 'post')
    {     
       // Check that id is valid.

       var id = typeof(data.payload.tokenId) == 'string' && data.payload.tokenId.trim().length == 20 ? data.payload.tokenId.trim():false;
       
       if(id)
       {
           // lookup the token.
           _data.read('tokens',id,function(err,token){
                if(!err && token)
                {
                   // delete token.
                   _data.delete('tokens',id,function(err)
                   { 
                       if(!err)
                       {
                           callback(200,{'Msg':'Token deleted Successfully'});
                       }
                       else
                       {
                           callback(500,{'Err':'Couldnot able to delete specified token'});
                       }   
                   });
                }
                else
                {
                    callback(400,{'Err':'Couldnot able to find specified token'});
                } 
           });
       }

       
    }
    else
    {
        callback(405);
    }
}


// Admins

handlers.admins = function(data,callback)
{
     var acceptableMethods = ['post','get','put','delete'];
     
     if(acceptableMethods.indexOf(data.method) > -1) 
     {   
        
         handlers._admins[data.method](data,callback);
        
         
     }
     else
     {
        callback(405);  
     }
    
    
    //callback(405);
};

// Container for all the admins methods

handlers._admins = {};

// Admins - post
// Required data: username, password.
// Optional data: none


handlers._admins.post = function(data,callback)
{  
    
    // check that all required fields are field out.

    var username = typeof(data.payload.username) == 'string' && data.payload.username.trim().length > 0 ? data.payload.username.trim() : false;

    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
    // if condition statisfied.
    if(username && password)
    {
           
           
            // Get  a Moongo client to work with the Mongo server.
            var mongoClient = mongodb.MongoClient;
            
            // Define where the the mongDb server is.
        
            var url = 'mongodb://localhost:27017';
        
            // Connect to the server
            mongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
                if(err)
                {
                    console.log('Unable to connect to the server:',err);
                }
                else
                {
                    
                        // Database Name
                        const dbName = 'Delmond';
                        const db = client.db(dbName);
                        // get the document collection
                        const collection = db.collection('admins');
                        // find document.
                        collection.find({$and:[{'username':username},{'password':password},{'status':1}]}).toArray((err,docs)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            
                            if(docs.length == 0)
                            {    
                                                       
                                callback(404,{err:"username and password doesnot matched!!"});
                            }
                            else
                            {
                                
                                // if valid, create a new token with a random name. Set an expiration date 1 hour in the future.
                                var tokenId = helper.createRandomString(20);
                                var expires = Date.now() + 1000 * 60 * 60;
                                
                                var tokenObject = {
                                    'token' : tokenId,
                                    'expires' : expires,
                                    'data': docs
                                };
                                
                                // Store the token
                                _data.create('tokens',tokenId,tokenObject,function(err){
                                    if(!err)
                                    {
                                    callback(200,tokenObject);
                                    }
                                    else
                                    {
                                    callback(500,{'Error':'Could not create the new token'});
                                    }
                                });

                                

                                // callback(200,docs); 
                            }
                        
                            
                        }
                        
                        });
                }
        
                client.close();
            });

    }
    else
    {
             callback(400,{err:"Missing Required Fields"});
    }


}

handlers._admins.get = function(data,callback)
{
   
    callback(200,{msg:"get method"});
}

handlers._admins.delete = function(data,callback)
{
    console.log("i am admin delete");  
    callback(200);
}

// Export the handlers
module.exports = handlers;