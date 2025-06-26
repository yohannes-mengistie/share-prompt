import mongoose from 'mongoose';

//HFeNYcMxoljIqLqF
let isConnected = false;

 export const connectedToDB = async () => {    
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'promptopia',
        });
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }}