import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin',
        };

        const conn = await mongoose.connect(mongoURI, options);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
