const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
var cors = require('cors');
const fs = require('fs');
const axios = require('axios')
app.use(cors());
app.use(bodyParser.json());
const mongoURI='mongodb+srv://pranpullwork:D43ZEqLrElZ1uNW7@cluster0.obic1nl.mongodb.net/reactnodeaws?retryWrites=true&w=majority';
mongoose.connect(mongoURI);
const keys = require('./keys/keys');

const AWS = require('aws-sdk');
let s3= new AWS.S3({
    region:'us-east-1',
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

/* s3.createBucket({
    Bucket: 'my-bucket-created-from-sdk-pranavpullabhotla-123904jndssfka'
}, (error, success)=>{
    if(error){
        console.log(error);
    }
    console.log(success);
}) */


const filesPayloadExists = require('./middleware/FilesPayloadExists');
const fileExtLimiter= require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

app.post('/fileupload', fileUpload({createParentPath: true}),
filesPayloadExists, fileExtLimiter(['.png', '.jpg', '.jpeg']),fileSizeLimiter,
    (req, res)=>{
        const files = req.files;
        //console.log(files);
        Object.keys(files).forEach(async (key)=>{
            const filePath = path.join(__dirname, files[key].name);

            await new Promise((resolve, reject) => {
                files[key].mv(filePath, (err) => {
                    if (err) {
                        return res.status(500).json({status: "error", message: err});
                    }
                    resolve();
                });
            });
           
            const blob = fs.readFileSync(filePath);

            s3.putObject({
                Bucket: 'my-bucket-created-from-sdk-pranavpullabhotla-123904jndssfka',
                Key: files[key].name,
                Body: blob
            }).promise();

            fs.unlinkSync(filePath);
            
            const response = await axios.post("https://unun3h68ja.execute-api.us-east-1.amazonaws.com/test/rekognition", {
                "Records": [
                  {
                    "s3": {
                      "bucket": {
                        "name": "my-bucket-created-from-sdk-pranavpullabhotla-123904jndssfka",
                        "ownerIdentity": {
                          "principalId": "EXAMPLE"
                        },
                        "arn": "arn:aws:s3:::my-bucket-created-from-sdk-pranavpullabhotla-123904jndssfka"
                      },
                      "object": {
                        "key": `${files[key].name}`,
                        "eTag": "d03688743fde31b37e81ca3814aee190",
                        "sequencer": "0A1B2C3D4E5F678901"
                      }
                    }
                  }
                ]
            });
            res.send(response.data);

        })
    }
)


const {Schema} = mongoose;
const taskModel = mongoose.model('Task', new Schema({task: String}));

app.post('/todoitems', async(req, res)=>{
    const task = req.body.task;
    //connect to the mongoDB database, add it 
    //to the list, get the whole list, 
    //return the whole list back to the frontend

    const currentTask = new taskModel({task: task});
    await currentTask.save();
    res.send('You can discard this');

});

app.get('/findall', async(req, res)=>{
    const tasks = await taskModel.find({});
    const alltasks =[];
    tasks.forEach((item)=>{
        alltasks.push({task: item.task, id:item.id});
    });
    res.send(alltasks);
});

app.post('/deleteitem', async(req, res)=>{
    const id= req.body.data;
    await taskModel.deleteOne({ _id: id });
    res.send("UPDSTATE")
});


const PORT = 5004;
app.listen(PORT);

