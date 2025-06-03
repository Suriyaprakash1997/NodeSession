const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
const userRoute = require('./routers/user-router')
const employeeRoute = require('./routers/employee-router')

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/Payroll')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.get("/",(req,res)=>{
     return res.json( "welcome" );
})
app.use('/api/user', userRoute)
app.use('/api/employee', employeeRoute)

const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});