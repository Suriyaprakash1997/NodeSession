const User = require('../models/user-model')

exports.create = async (req, res) => {
    try {
        const { userName, email } = req.body;
         const saveData = new User({
            UserName:userName,
            Email:email
         });
        const result= await saveData.save();

        if(result){
            res.status(200).json({status:1, message:"User saved"});
        }
        else{
            res.status(400).json({status:-1, message:"User not saved"});
        }
       
    } 
    catch (error) {
        throw new Error(error.message);
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await User.find();

        if( data && data.length > 0 ){
             res.status(200).json({total:data.length,rows: data});
        }
        else{
            res.status(404).json({ message:"No records found" });
        }
       
    }
     catch (error) {
        throw new Error(error.message);
    }
};