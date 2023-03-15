const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
const { userRoute } = require('./routes/userRoutes');
const { productRoute } = require('./routes/productRoutes');
const { orderRoute } = require('./routes/orderRoutes');

app.use('/api/v1', userRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', orderRoute);

app.use(errorMiddleware);

module.exports = app;
