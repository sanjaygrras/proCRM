const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const ObjectId = mongo.ObjectId;
const mongoClient = mongo.MongoClient;



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        if(file)
        {
        //console.log(file.originalname.substr(file.originalname.lastIndexOf('.')));
      cb(null, 'temp'+file.originalname.substr(file.originalname.lastIndexOf('.')))
    }
    else{
        cb(null, 'temp'+file.originalname.substr(file.originalname.lastIndexOf('.')))

    }
    }
  })
   
  var upload = multer({ storage: storage })




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

app.use(express.static(path.join(__dirname,'uploads')));


// let courses=[{title:"Mean Stack", prerequisite:"HTML,CSS,JS",description:"Something",duration:"3 Months",fee:"15000",brochure:"Something",keywords:"Web,Web Dev"}];
app.get('/get-course', (req,res)=>{
    let collection_instance = connection.db('procrm').collection('courses');

    collection_instance.aggregate([
        {
            $lookup:{
                from:"subjects",
                localField:"subjects",
                foreignField:"_id",
                as:"subject_Details"
            }
        }
    ]).toArray((err,docs)=>{
        res.send({status:"ok", docs:docs});
    })


})


app.post('/post-course', upload.single('brochureImage'),(req,res)=>{
    let collection_instance = connection.db('procrm').collection('courses');

    if(req.file) {
        req.body.brochureExt=req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
        collection_instance.insertOne(req.body, (err, data) => {
            if(err){
                res.send({status:"failed", message : "course could not be created"});
            } else {
                var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
                fs.rename(path.join(__dirname,'uploads/temp'+ext),path.join(__dirname, 'uploads/'+data.insertedId+ext), (err)=>{
                    if(!err)
                    {
                        res.send({status:"ok", message:"course created succeffully" } );
                    }
                    else{
                        res.send({status:"failed", message : "somer error occured in file renaming"})
                    }
                });
            }
        });
    } else {
        collection_instance.insertOne(req.body, (err, data) => {
            if(err){
                res.send({status:"failed", message : "Course Can't create"});
            }
            else{
                res.send({status:"ok", message:"Course created succeffully" } );
            }
        });
    }

})


app.post('/post-edit-course', upload.single('brochureImage'),(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    let collection_instance = connection.db('procrm').collection('courses');

    if(req.file) {
        req.body.brochureExt=req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
        
        collection_instance.updateOne(
                            {_id:ObjectId(req.body._id)}, 
                            { $set:{title:req.body.title, prerequisite:req.body.prerequisite, description:req.body.description,fee:req.body.fee,keywords:req.body.keywords,brochureExt:req.body.brochureExt}}, (err, data) => {
            if(err) {
                // console.log("error occured");
                res.send({status:"failed", message : "course could not be created"});
            } else {
                var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
                // console.log(path.join(__dirname, 'uploads',req.body._id+req.body.oldBrochureExt)); 
                try {
                        fs.unlinkSync(path.join(__dirname, 'uploads',req.body._id+req.body.oldBrochureExt));
                }
                catch(e) {
                    console.log("some Error occured");
                }
                // console.log("new name is "+path.join(__dirname, 'uploads',req.body._id+ext));
                fs.rename(path.join(__dirname,'uploads','temp'+ext),path.join(__dirname, 'uploads',req.body._id+ext), (err)=>{
                    if(!err) {
                        res.send({status:"ok", message:"course created succeffully" } );
                    }  else {
                        res.send({status:"failed", message : "somer error occured in file renaming"})
                    }
                });
            }
        });
    } else {
        collection_instance.updateOne({_id:ObjectId(req.body._id)}, { $set:{ title:req.body.title}}, (err, data) => {
            if(err) {
                res.send({status:"failed", message : "course could not be created"});
            } else {
                res.send({status:"ok", message:"course created succeffully" } );
            }
        });
    }
})

app.post('/delete-course', bodyParser.json(), (req,res)=> {
    let collection_instance = connection.db('procrm').collection('courses');
    let id = { _id : new mongo.ObjectID(req.body.id)};
    collection_instance.deleteOne(id, (err, obj)=>{
        if(err){
           res.send({status:'ok', message:'Some erors occured'});
        }
        else{
            res.send({status:"ok", message:"course deleted succeffully" } );
        }
    })
})

app.post('/subject-in-course', bodyParser.json(), (req,res)=> {
    console.log(req.body);
    let collection = connection.db('procrm').collection('courses');
    collection.updateOne({_id:ObjectId(req.body.courseId)},{$push: {subjects:ObjectId(req.body.subjectId)}}, (notOk,ok) => {

        if(!notOk && ok) {
            res.send({status:"ok", msg:"subject added in course Successfully", s:ok})
        } else {
            res.send({status:"error", msg:"Getting errors", s:notOk})
        }
    });
});

app.post('/subject-in-course-del',bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('courses');
    collection.updateOne({_id:ObjectId(req.body.courseId)},{$pull:{subjects:ObjectId(req.body.subjectId)}},(err,r) => {
        if(!err && r) {
            res.send({status:"ok", msg:"subject remove Successfully", data:r});
        }
        else {
            res.send({status:"failed", msg:"some error occured", data:err});
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
            res.send({status:'ok'});
        } else {
            res.send({status:'failed'});
        }
    })
});

app.post('/delete-roles', bodyParser.json(), (req,res)=>{
    let collection_instance = connection.db('procrm').collection('roles');

    let id = { _id : new mongo.ObjectID(req.body.id)};

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
    // console.log(req.body);
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
    let collection = connection.db('procrm').collection('subjects');
    collection.updateOne({_id:ObjectId(req.body._id), 
                          Topics: { $elemMatch: { topicTitle: req.body.topicTitleOld } }
                        },{$set:{ 'Topics.$.topicTitle':req.body.title, 'Topics.$.topicDuration': req.body.duration, 'Topics.$.topicDescription': req.body.description}},(err,r)=>{
        if(!err && r) {
            res.send({status:"ok", msg:"Topic updated Successfully", data:r});
        }
        else {
            res.send({status:"failed", msg:"some error occured", data:err});
        }
    })
})

app.post('/student-new-lead', bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('student_lead');
    collection.insertOne(req.body, (notOk,ok) => {
        if(!notOk && ok) {
            res.send({status:"ok", msg:"Lead added Successfully", s:ok})
        } else {
            res.send({status:"error", msg:"Getting errors", s:notOk})
        }
    });
})

app.get('/get-lead',(req,res) => {
    let collection = connection.db('procrm').collection('student_lead');
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


app.post('/folloup-student',bodyParser.json(), (req,res) => {
    let collection = connection.db('procrm').collection('student_lead');
    collection.updateOne({_id:ObjectId(req.body.followupId)},{$push: {followup:{
                followup_result:req.body.fResult, next_date:req.body.nDate, followupTitle:req.body.followupTitle, 
                currentDate:req.body.currentDate
            }}}, (err,docs) => {
        if(!err)
        {
            res.send({status:"ok", msg:"Followup updated successfully", data:docs})
        }
        else{
            res.send({status:"failed", msg:"some error occured", data:err})
        } 
    }
    )
})

app.post('/student-register', upload.single('sPhoto'), (req,res) => {
    // console.log('Register as student');
    // console.log(req.file);

    let collection = connection.db('procrm').collection('student');

    if(req.file) {
        req.body.sPhotoExt = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
    
        const sData = {
            sName:req.body.sName, 
            sMobile:req.body.sMobile, 
            sEmail:req.body.sEmail, 
            sRequest:req.body.sRequest, 
            sCourse:ObjectId(req.body.sCourse),
            sAddress:req.body.sAddress,
            sPhotoExt:req.body.sPhotoExt,
            leadId:req.body.leadId,
        }
        collection.insertOne(sData, (err,data) => {
            if(err)
            {
                console.log('registering student error');
                res.send({status:"ok", msg:"getting error", data:docs})
            }
            else{
                var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
               
                fs.rename(path.join(__dirname,'uploads/temp'+ext),path.join(__dirname, 'uploads/'+data.insertedId+ext), (err)=>{
                    if(!err)
                    {
                        res.send({status:"failed", message : "Student Can't register"});
                    }
                    else{
                        res.send({status:"ok", message:"Student created succeffully" } );
                    }
                });
            }
        })
    } else {
        collection.insertOne(req.body, (err, data) => {
            if(err){
                res.send({status:"failed", message : "Student Can't register"});
            }
            else{
                res.send({status:"ok", message:"Student created succeffully", LeadStatus: "Registered" } );
                // let collection = connection.db('procrm').collection('student_lead');
                //     collection.updateOne(
                //         {_id:ObjectId(req.body._id)},{$push: {status:'Registered'}}, (err,docs) => {
                //         if(!err)
                //         {
                //             res.send({status:"ok", msg:"Followup updated successfully", data:docs})
                //         }
                //         else{
                //             console.log('Lead Status change');
                //             res.send({status:"failed", msg:"some error occured", data:err})
                //         } 
                //     }
                // );
            }
        });
    }


})


app.get('/registered-students',(req,res) => {
    let collection = connection.db('procrm').collection('student');
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

app.post('/edit-student', upload.single('sPhoto'),(req,res)=>{
    // console.log(req.body);

    let collection_instance = connection.db('procrm').collection('student');

    if(req.file) {
    req.body.sPhotoExt=req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
    
    collection_instance.updateOne(
                        {_id:ObjectId(req.body._id)}, 
                        { $set:{sName:req.body.sName, sMobile:req.body.sMobile, sEmail:req.body.sEmail, sRequest:req.body.sRequest,sCourse:req.body.sCourse,sAddress:req.body.sAddress,sPhotoExt:req.body.sPhotoExt}}, (err, data) => {
        if(err){
            res.send({status:"failed", message : "course could not be created"});
        }
        else{
            var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
           try{
           fs.unlinkSync(path.join(__dirname, 'uploads',req.body._id+req.body.oldsPhotoExt));
           }
           catch(e)
           {
                console.log("student edit - some Error occured");
           }

            fs.rename(path.join(__dirname,'uploads','temp'+ext),path.join(__dirname, 'uploads',req.body._id+ext), (err)=>{
                if(!err)
                {
                    res.send({status:"ok", message:"course created succeffully" } );
                }
                else{
                    res.send({status:"failed", message : "somer error occured in file renaming"})
                }
            });
            }
        });
    } 
    else{
        collection_instance.updateOne(
                            {_id:ObjectId(req.body._id)}, 
                            { $set:{sName:req.body.sName, sMobile:req.body.sMobile, sEmail:req.body.sEmail, sRequest:req.body.sRequest,sCourse:req.body.sCourse,sAddress:req.body.sAddress}}, (err, data) => {
            if(err){
                res.send({status:"failed", message : "course could not be created"});
            }
            else{
                res.send({status:"ok", message:"course created succeffully" } );
            }
        });
    }
})

app.listen(3000,()=>{
    console.log("Server started at Port: 3000");
});