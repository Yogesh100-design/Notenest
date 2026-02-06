import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://chavanyogesh8600:Chayogesh1209@yogesh.vczqb7r.mongodb.net/";


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectToMongo;

