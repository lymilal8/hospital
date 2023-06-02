
const express = require('express');
var morgan = require('morgan');

const app = new express();
const api=require('./routes/sample');
require('dotenv').config();
app.use(morgan('dev'));
app.use('/hospitals',api);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
const dataPath = './hospital.json';
