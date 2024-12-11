const express = require("express");
const cors = require('cors');
const userRouter = require('./router/user');
const ck = require('cookie-parser')
const mongoose = require('mongoose')


const app = express();
let port = 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(ck())
app.use(express.json())
app.use(userRouter)


mongoose.connect('mongodb://localhost:27017/mykhatabook')
.then(()=>{
  const port = 4000;
  app.listen(port, () => {
    console.log("server Start " + port);

})
})
.catch(err =>{
  console.log(err)
})


