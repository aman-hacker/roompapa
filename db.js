const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
mongoose.connect("mongodb://localhost/authRoomPapa",{ useNewUrlParser: true })

const userSchema=new mongoose.Schema({
   username:String,
   passport:String
});

userSchema.plugin(passportLocalMongoose);
var user= mongoose.model('user',userSchema);

module.exports=user;
