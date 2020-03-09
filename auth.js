const keys = require('./keys.json');
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,keys.jwt_secret);
        req.body.data = decoded;
        next();
    }
    catch(err){
        console.log(err)
        res.send("Authorization failed").status(403);
    }
}


module.exports = auth;