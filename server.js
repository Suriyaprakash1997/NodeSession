const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
const userRoute = require('./routers/user-router')
const employeeRoute = require('./routers/employee-router')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { authenticateToken, getClaim } = require('./utilis/auth-middleware')
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

mongoose.connect('mongodb://127.0.0.1:27017/Payroll')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.get("/",(req,res)=>{
     return res.json( "welcome" );
})
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "Admin" && password === "Admin@123") {
        const token = jwt.sign({
             userName :username,
             userId:1
            }, 
            SECRET_KEY,
            { expiresIn: "1h" });

            res.cookie("authToken", token, {
            httpOnly: true,
            secure: false, // set true in production with HTTPS
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
        });
        return res.json( {token: token, message: "Login Successfully" });
    }

    res.status(401).json({ message: "Invalid credentials" });
});
app.post("/logout", (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: false, // make sure it matches how you set it
        sameSite: "strict"
    });

    res.json({ message: "Logged out successfully" });
});
app.use('/api/user', userRoute)
app.use('/api/employee', employeeRoute)
app.get("/dashboard", authenticateToken, (req, res) => {
    const name = getClaim(req, 'userName');
    res.json({ message: `Welcome, ${name}!` });
});
const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});