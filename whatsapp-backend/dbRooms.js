import mongoose from 'mongoose'


const whatsappSchemaRooms = new mongoose.Schema({
    name: String
})

const Rooms = mongoose.model('Room',whatsappSchemaRooms)


export default Rooms