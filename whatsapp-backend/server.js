import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Rooms from './dbRooms.js'
import Pusher from 'pusher'
import cors from 'cors'

//app config
const app = express()

const port = process.env.PORT || 9000

const pusher = new Pusher({
    /*YOUR PUSHER CODE WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */
  });
  

//middleware
app.use(express.json());
app.use(cors({origin: true, credentials: true}))   //THIS REPLACES THE HEADERS BELOW


/*
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})
*/


//DB config
const url = /*YOUR mONGOdb cONFIG url CODE WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB is connected!!');

    const msgCollection = db.collection('messages');
    const changeStream = msgCollection.watch();


    changeStream.on('change',(change) => {
        console.log(change)
    

    if (change.operationType === 'insert') {
        const msgDetails = change.fullDocument;
        
        pusher.trigger('messages','inserted', {
            name: msgDetails.name,
            message: msgDetails.message,
            timestamp: msgDetails.timestamp,
            roomId: msgDetails.roomId,
            received: msgDetails.received
        });
    } else {
        console.log('Error triggering Pusher')
    }
    });
})


db.once('open', () => {
    console.log('DB is connected!!');

    const roomCollection = db.collection('rooms');
    const changeStream = roomCollection.watch();


    changeStream.on('change',(change) => {
        console.log(change)
    

    if (change.operationType === 'insert') {
        const roomDetails = change.fullDocument;
        
        pusher.trigger('rooms','inserted', {
            id: roomDetails.id,
            name: roomDetails.name
        });
    } else {
        console.log('Error triggering Pusher')
    }
    });
})
//api routes 

app.get('/',(req,res) => {
    res.status(200).send('hello world!')
})


app.get('/messages/sync', (req,res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/rooms', (req,res) => {
    Rooms.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})



app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;

     Messages.create(dbMessage, (err,data) => {
        if (err) {
            res.status(500).send(err);
            console.log(err)
        } else {
            res.status(201).send(data)
        }
    })
})


app.post('/rooms', (req,res) => {
    const dbRooms = req.body;

     Rooms.create(dbRooms, (err,data) => {
        if (err) {
            res.status(500).send(err);
            console.log(err)
        } else {
            res.status(201).send(data)
        }
    })
})



//listen
app.listen(port, () => {
    console.log(`listening on localhost${port}`)
})