const express = require('express');
require('dotenv').config();
const app = express();
const connectDb = require('./config/dbConnection');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// Handling Uncaught Exeception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exeception`);

    process.exit(1);
});

connectDb();
const errorMiddleware = require('./middleware/error');

// User cured operation
const { userRoute } = require('./routes/userRoutes');
app.use('/api/v1', userRoute);

// Product curd operation 
const { productRoute } = require('./routes/productRoutes');
app.use('/api/v1', productRoute);

// Order curd operation
const { orderRoute } = require('./routes/orderRoutes');
app.use('/api/v1', orderRoute);

// middleware for Error
app.use(errorMiddleware);

// const server = app.listen
app.listen(process.env.PORT, (err) => {
    console.log(`server is connected on port http://localhost:${process.env.PORT}`);
});


// unhandled Promise Rejection

// process.on("unhandledRejection", (err) =>{
//     console.log(`Error: ${err.message}`)
//     console.log(`Shutting down the server due to unhandled Promise Rejection`);

//     ServiceWorkerRegistration.close(() =>{
//         process.exit(1)
//     })
// })