const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;
const mongoClient = mongo.MongoClient;
// let client = new mongoClient('mongodb://localhost:27017/procrm', {useNewUrlParser: true});
let client  = new mongoClient("mongodb+srv://sanjayrathore144:sanjayrathore144@cluster0-wtjik.mongodb.net/test?retryWrites=true&w=majority" , {useNewUrlParser:true});

let connection;

client.connect((err,db)=>{
    if(err){
        console.log('Something went wrong');
    }
    connection = db;
})

const app= express();
app.use(cors()); // Allow multi domain access to express server


// app.get('/db', (req,res)=>{ // Send the entire collection of student info
//     let collection_instance = connection.db('procrm').collection('student');
//     collection_instance.find().toArray((err,docs)=>{
//         if(!err)
//             res.send(docs);
//     })
// })

// // Insert data requires adjustment
// app.post('/insertdata', bodyParser.json(), (req,res)=>{
//     let name = req.body.name ;
//     let age = req.body.age ;
//     let course = req.body.course;
//     let doc = {name, age, course};
//     console.log(doc);
//     let collection_instance = connection.db('procrm').collection('student');
//     collection_instance.insertOne(doc, (err, records)=>{
//         if(err){
//             console.log("Something went wrong");
//         }
//     });
//     res.send({status: 'Record added'});
// })

// // Delete data requires ID of the object
// app.post('/delete', bodyParser.json(), (req,res)=>{
// let id = { _id : new mongo.ObjectID(req.body.id) };
//     console.log(id);
//     let collection_instance = connection.db('procrm').collection('student');
//     collection_instance.deleteOne(id, (err, obj)=>{
//         if(err){
//             console.log("Something went wrong");
//         }
//         console.log('Deleted');
//     })
// })

let courses=[{title:"Mean Stack", prerequisite:"HTML,CSS,JS",description:"Something",duration:"3 Months",fee:"15000",brochure:"Something",keywords:"Web,Web Dev"}];
app.get('/get-course', (req,res)=>{
    let collection_instance = connection.db('procrm').collection('courses');

    collection_instance.find().toArray((err,docs)=>{
        if(err)
            console.log("Something went wrong");
        else
            res.send(docs);
    })
})
app.post('/post-course', bodyParser.json(),(req,res)=>{
    
    let collection_instance = connection.db('procrm').collection('courses');

    collection_instance.insert(req.body, (err, data)=>{
        if(err){
            console.log('Something went wrong');
        }
        else{
            console.log(data);
        }
    })
})

app.post('/delete-course', bodyParser.json(), (req,res)=>{
    
    let collection_instance = connection.db('procrm').collection('courses');
    console.log(req.body);
    let id = { _id : new mongo.ObjectID(req.body.id)};
    console.log(id);
    collection_instance.deleteOne(id, (err,obj)=>{
        if(err){
            console.log('Something went wrong');
        }
        else{
            console.log("Deleted");
        }
        
    })
    
})
app.get('/get-roles', (req,res)=>{
    let collection_instance = connection.db('procrm').collection('roles');
    collection_instance.find().toArray((err,docs)=>{
        if(err)
            console.log('something went wrong');
        else    
            res.send(docs);
    })
})

app.post('/post-roles', bodyParser.json(), (req,res)=> {
    
    let collection_instance = connection.db('procrm').collection('roles');

    collection_instance.insert(req.body, (err,abc) => {
        if(!err) {
            console.log('insrted');
            res.send({status:'ok'});
        } else {
            console.log('getting error');
            res.send({status:'failed'});
        }
    })
});

app.post('/delete-roles', bodyParser.json(), (req,res)=>{
    let collection_instance = connection.db('procrm').collection('roles');
    console.log(req.body);
    let id = { _id : new mongo.ObjectID(req.body.id)};
    console.log(id);
    collection_instance.deleteOne(id, (err,obj)=>{
        if(err){
            console.log('Something went wrong');
        }
        else{
            console.log("Deleted");
        }
        
    })
})

// by sanjay rathore till 187
app.get('/getPermisions/:role', (req,res)=>{
console.log(req.params.role);
    let collection = connection.db('procrm').collection('roles');
    collection.find({role:req.params.role}).toArray((err,docs)=>{
        if(!err)
        {
            res.send({status:"ok", msg:"data fetched successfully", data:docs})
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err})
        }
    })
})

app.get('/getAllFeatures', (req,res)=>{
    // console.log(req.params.role);
    let collection = connection.db('procrm').collection('crm_features');
    collection.find().toArray((err,docs)=>{
        if(!err)
        {
            res.send({status:"ok", msg:"data fetched successfully", data:docs})
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err})
        }
    })
})

app.post('/updateRolePermissions/:role', bodyParser.json(), (req,res)=>{
    // console.log("updating permission for ");
    // console.log(req.params.role);
    let collection = connection.db('procrm').collection('roles');
    collection.update({role:req.params.role},{$set:{permissions:req.body}},(err,r)=>{
        if(!err && r)
        {
            res.send({status:"ok", msg:"permissions updated successfully for"+req.params.role, data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err});
        }
    })
})
    
app.post('/login', bodyParser.json(), (req,res)=>{
    let collection = connection.db('procrm').collection('users');
    collection.find({email:req.body.email, pass:req.body.pass}).toArray((err,docs)=>{
        if(!err && docs.length>0)
        {
            res.send({status:"ok", msg:"Login Succesfull", data:docs});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err});
            
        }
    })
})

app.post('/createRole', bodyParser.json(), (req,res)=>{

    let collection = connection.db('procrm').collection('roles');
    collection.insertOne(req.body,(err,r)=>{
        if(!err && r)
        {
            res.send({status:"ok", msg:"Role Created Successfully", data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err});
            
        }
    })

})

app.post('/user-register', bodyParser.json(), (req,res)=>{
    console.log("Express Hit");
    console.log(req.body);
    let collection = connection.db('procrm').collection('users');
    collection.insertOne(req.body,(err,r)=>{
        if(!err && r)
        {
            res.send({status:"ok", msg:"User Created Successfully", data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err});
            
        }
    })
})

app.get('/user-get',(req,res) => {
    let collection = connection.db('procrm').collection('users');
    collection.find().toArray((err,docs)=>{
        if(!err)
        {
            res.send({status:"ok", msg:"data fetched successfully", data:docs})
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err})
        }
    })    
})

app.post('/user-del',bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('users');
    collection.deleteOne({_id:ObjectId(req.body.d)},(err,r)=>{
        if(!err && r)
        {
            res.send({status:"ok", msg:"User deleted Successfully", data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err});
            
        }
    })
})

app.post('/user-edit', bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('users');
    collection.updateOne({_id:ObjectId(req.body._id)}, { $set:{ name:req.body.name, email:req.body.email, pass:req.body.pass, role:req.body.role, contact:req.body.contact } }, (err,r) => {
        if(!err && r)
        {
            res.send({status:"ok", msg:"User edited Successfully", data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err});
            
        }
    })
})


app.post('/add-subject', bodyParser.json(),(req,res) => {
    let collection = connection.db('procrm').collection('subjects');
    collection.insertOne(req.body, (notOk,ok) => {
        if(!notOk && ok) {
            res.send({status:"ok", msg:"Subject added Successfully", s:ok})
        } else {
            res.send({status:"error", msg:"Getting errors", s:notOk})
        }
    });
})

app.get('/get-subject', (req,res) => {
    let collection = connection.db('procrm').collection('subjects');
    collection.find().toArray( (err,docs) => {
        if(!err) {
            res.send({status:"ok", msg:"Subject retriving successfully", s:docs})
        } else {
            res.send({status:"error", msg:"Something wrong", s:err})
        }
    })
})

app.post('/delete-subject',bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('subjects');
    collection.deleteOne({_id:ObjectId(req.body.del)},(err,r)=>{
        if(!err && r)
        {
            res.send({status:"ok", msg:"subject deleted Successfully", data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err}); 
        }
    })
})

app.post('/edit-subject',bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('subjects');
    collection.updateOne({_id:ObjectId(req.body._id)},{$set:{title:req.body.title, duration: req.body.duration, description: req.body.description, brochure:req.body.brochure}},(err,r)=>{
        if(!err && r) {
            res.send({status:"ok", msg:"subject deleted Successfully", data:r});
        }
        else {
            res.send({status:"failed", msg:"some error occured", data:err});
        }
    })
})

app.post('/add-topic', bodyParser.json(),(req,res) => {
    let collection = connection.db('procrm').collection('subjects');
    collection.updateOne({_id:ObjectId(req.body.subjectId)},{$push: {Topics:{topicTitle: req.body.title, topicDuration: req.body.duration, topicDescription: req.body.description }}}, (notOk,ok) => {
        if(!notOk && ok) {
            res.send({status:"ok", msg:"Topic added Successfully", s:ok})
        } else {
            res.send({status:"error", msg:"Getting errors", s:notOk})
        }
    });
})

// app.get('/get-topics', (req,res) => {
//     let collection = connection.db('procrm').collection('topics');
//     collection.find().toArray( (err,docs) => {
//         if(!err) {
//             res.send({status:"ok", msg:"Topics retriving successfully", s:docs})
//         } else {
//             res.send({status:"error", msg:"Something wrong", s:err})
//         }
//     })
// })

app.post('/delete-topic',bodyParser.json(), (req,res) => {
    console.log(req.body);
    let collection = connection.db('procrm').collection('subjects');
    collection.updateOne({_id:ObjectId(req.body.subID)}, {$pull:{Topics:{topicTitle: req.body.del}}},(err,r)=>{
        if(!err && r)
        {
            res.send({status:"ok", msg:"Topic updated Successfully", data:r});
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err}); 
        }
    })
})

app.post('/edit-topic',bodyParser.json(), (req,res) => {
    console.log(req.body);
    let collection = connection.db('procrm').collection('subjects');
    collection.updateOne({_id:ObjectId(req.body._id), 
                          Topics: { $elemMatch: { title: 'data type' } }
                        },{$set:{ 'Topics.$.topicTitle':req.body.title, 'Topics.$.topicDuration': req.body.duration, 'Topics.$.topicDescription': req.body.description}},(err,r)=>{
        if(!err && r) {
            res.send({status:"ok", msg:"Topic updated Successfully", data:r});
        }
        else {
            res.send({status:"failed", msg:"some error occured", data:err});
        }
    })
})

app.listen(3000,()=>{
    console.log("Server started at Port: 3000");
});