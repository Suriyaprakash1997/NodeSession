const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    Email: { type: String,required:true },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date,default:null },
    IsDelete: { type: Number, default: 0 }
   
});
const UserModel = mongoose.model('UserModel', userSchema, 'tblUser');

module.exports = UserModel;