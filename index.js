const express = require('express');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const port = process.env.PORT || 8000;
const app  = express();

connectDb();
app.use(express.json());

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//Always use error handler as the last middleware after the route declarations
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})