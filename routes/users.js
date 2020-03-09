const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const keys = require('../keys.json');
const auth = require('../auth');

router.get('/',(req,res)=>{
res.send("user.home");
})
router.get('/:id',(req,res)=>{
const id= req.params.id
userModel.findById(id)
.select('-password')
.exec()
.then(data=>{
res.json(data).status(200);
})

})

router.post('/login',(req,res)=>{
const email = req.body.email;
const password = req.body.password;

userModel.findOne({email:email})
.exec()
.then((data)=>{
if(data){
if(bcrypt.compareSync(password,data.password)){
    const token = jwt.sign({
        _id: data.id,
        email: data.email
    },keys.jwt_secret);
res.json({"msg":"login successful","token":token}).status(200);
}
else{
res.send("password incorrect").status(403);
}
}
else{
res.send("user does not exist").status(404);
}
})
})

router.post('/create',auth,(req,res)=>{
const email = req.body.email;
const password = req.body.password;
userModel.findOne({email:email})
.exec()
.then((data)=>{
if(data){
res.send("email already exist").status(401);
}
else{

const newUser = new userModel({
_id: new mongoose.Types.ObjectId(),
email:email,
password: bcrypt.hashSync(password)
})
newUser.save();
res.send("user created").status(201);
}
})
.catch((err)=>{
console.log(err);
})

})

router.delete('/:id',(req,res)=>{
const id = req.params.id
userModel.findByIdAndDelete(id)
.exec()
.then(data=>{
res.json(data).status(200);

})
.catch(err=>{
res.json(err).status(500);
})

})

router.post('/update_password',(req,res)=>{
const email = req.params.email;
const old_password = req.params.old_password;
const new_password = req.params.new_password;

userModel.findOne({email:email})
.exec()
.then(data=>{
if(data){
if(bcrypt.compareSync(old_password,data.password)){
data.password = bcrypt.hashSync(new_password);
data.save();
res.send("password updated").status(200);
}
else{
res.send("password incorrect").status(403);
}
}
else{
res.send("email not exist").status(401);
}
})
.catch(err=>{
res.json(err).status(500);
})

})

module.exports = router;