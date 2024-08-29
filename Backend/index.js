import express from 'express'
import morgan from 'morgan'
const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config();


const port = process.env.PORT || 5000
const app = express();

mongoose.connect(process.env.URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>console.log('> Connected...'.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))
app.use(morgan('dev'));

app.get('/' , (req , res)=>{
   res.send('hello from the notes server)')
})


app.listen(port , () => console.log('Server is up and running on port : ' + port))