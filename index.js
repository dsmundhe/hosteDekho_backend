const express = require('express');
const app = express();
const PORT = 4000;
const cors=require('cors');

app.use(cors());

require('dotenv').config();



/* The code `const {dbConnection}=require('./config/dbConnection/dbConnection'); dbConnection();` is
importing the `dbConnection` function from the file located at
`./config/dbConnection/dbConnection.js` and then immediately calling the `dbConnection` function. */
const { dbConnection } = require('./config/dbConnection/dbConnection');
dbConnection();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
const userRouter = require('./routes/userRoutes');
const hostelRouter = require('./routes/hostelRoutes');
app.use('/user', userRouter);
app.use('/hostel', hostelRouter);


app.get('/', (req, res) => {
    res.send('<h1>Backend connected!</h1>');
})

app.listen(PORT, () => {
    console.log("Server started at PORT : " + PORT);
})