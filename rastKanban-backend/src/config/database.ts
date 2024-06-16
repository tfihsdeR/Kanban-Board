import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
        console.log(`MongoDB Database connected with HOST: ${mongoose.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
    }
};