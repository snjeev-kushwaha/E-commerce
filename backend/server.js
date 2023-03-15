const app = require('./app');
const cloudinary = require('cloudinary');
require('dotenv').config();
const connectDb = require('./config/dbConnection');

// Handling Uncaught Exeception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exeception`);

    process.exit(1);
});

// connection to database
connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// const server = app.listen
app.listen(process.env.PORT, (err) => {
    console.log(`server is connected on port http://localhost:${process.env.PORT}`);
});

// unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    ServiceWorkerRegistration.close(() => {
        process.exit(1);
    });
});