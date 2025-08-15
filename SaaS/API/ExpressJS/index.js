const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const cors = require('cors')

const connectDB = require('./DB/DB');

connectDB()

app.use(cors({
    origin: 'http://localhost:3000'||'http://localhost:3001',
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    console.log("Node JS API has been called")
    return({message:"This is node JS API"})
})
const Usersignup = require('./AUTH/UserAUTH/HandleSignup')
const Userlogin = require('./AUTH/UserAUTH/HandleLogin')
const UserUpdate = require('./AUTH/UserAUTH/HandleDataUpdate')
const AdminSignup = require('./AUTH/AdminAUTH/Adminsingup')
const AdminLogin = require('./AUTH/AdminAUTH/AdminLogin')
const UserActivityRoutes = require('./Routes/UserActivity')
const isAUTH = require('./AUTH/isAUTH')

app.use('/apiAUTH/user',Usersignup)
app.use('/apiAUTH/user',Userlogin)

app.use('/apiAUTH/user',UserUpdate)

app.use('/apiAUTH/admin',AdminSignup)
app.use('/apiAUTH/admin',AdminLogin)

app.use('/apiAUTH',isAUTH)

app.use('/api/user-activity', UserActivityRoutes)


app.listen(port,()=>{
    console.log(`Node API running on Port ${port}`)
})