//server creation

const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const port = 4000;



//middleware
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

// middleware
// app.use('*' , (req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// })

//....end points

// app.get('/' , (req,res)=>{
//     res.send("hello kaushal njnjdfnjd");
    
// })

// app.get('/first', (req,res)=>{
//     res.send("another endpoint wskskd");
// })

const user = require('./routes/users.js');
const product = require('./routes/products.js');

app.use('/user', user);
app.use('/product', product);






mongoose.connect("mongodb://127.0.0.1:27017/shop",{useNewUrlParser:true},(err)=>{
if(err)
{
console.log(err);
}
else{
console.log("DB connected");
}
})

app.get('/',(req,res)=>{
res.send("home");
})


app.listen(port,()=>{
console.log("serving running");
})
