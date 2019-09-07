const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

const mongoClient = mongo.MongoClient;
// let client = new mongoClient('mongodb://localhost:27017/proCRM', {useNewUrlParser: true});
// let connection;

// client.connect((err,db)=>{
//     if(err){
//         console.log('Something went wrong');
//     }
//     connection = db;
// })

const app= express();
// app.get('/db', (req,res)=>{ // Send the entire collection of student info
//     let collection_instance = connection.db('proCRM').collection('student');
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
//     let collection_instance = connection.db('proCRM').collection('student');
//     collection_instance.insertOne(doc, (err, records)=>{
//         if(err){
//             console.log("Something went wrong");
//         }
//     });
//     res.send({status: 'Record added'});
// })

// // Delete data requires ID of the object
// app.post('/delete', bodyParser.json(), (req,res)=>{
//     let id = { _id : new mongo.ObjectID(req.body.id) };
//     console.log(id);
//     let collection_instance = connection.db('proCRM').collection('student');
//     collection_instance.deleteOne(id, (err, obj)=>{
//         if(err){
//             console.log("Something went wrong");
//         }
//         console.log('Deleted');
//     })
// })


app.listen(3000,()=>{
    console.log("Server started at Port: 3000");
});
