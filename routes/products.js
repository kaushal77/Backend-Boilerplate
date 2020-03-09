const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("product home")
})

//  .../user/one
router.get('/one',(req,res)=>{
    res.send("product second")
})

module.exports = router;