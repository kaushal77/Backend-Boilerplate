const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
email: {
type: String,
unique : true,
required:true

},
password :{
type : String,
required : true,
},
name : String
});

module.exports = mongoose.model('user', userSchema);