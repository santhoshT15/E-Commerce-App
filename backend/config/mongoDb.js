import mongoose from "mongoose";

const connectDb = async() =>{
    mongoose.connection.on('connected', () =>{
        console.log('MongoDb is connected successfully')
    })
    await mongoose.connect(`${process.env.MONGO_DB}`)

    
}

export default connectDb;