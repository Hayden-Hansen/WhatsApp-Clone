import mongoose from 'mongoose'

const whatsappSchema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    roomId: String,
    received: Boolean
});


const Messages = mongoose.model('Message',whatsappSchema);


export default Messages

//export default Rooms
//export default mongoose.model('message',whatsappSchema)