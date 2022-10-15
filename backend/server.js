const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./config/db');
const categoryRouter = require('./routes/categoryRoute');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoutes');
const complainRouter = require('./routes/complainRoute');
var cors = require('cors');
require('dotenv').config();
const app = express();

//connect to mongodb
connect();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/', categoryRouter);
app.use('/api/', productRouter);
app.use('/api/', userRouter);
app.use('/api/', complainRouter);

app.use('/uploads/', express.static('uploads'));



const port = 3005;
app.listen(port, () => console.log(`Server is running on port ${port}`));