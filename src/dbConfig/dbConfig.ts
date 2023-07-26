import mongoose from "mongoose";

export const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const dbConnect = mongoose.connection;

        dbConnect.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        dbConnect.on('error', (error) => {
            console.error('MongoDB connection error:', error);
            process.exit();
        });

        dbConnect.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });

    } catch (error) {
        console.log(`Database connection error : ${error}`);
    }
}