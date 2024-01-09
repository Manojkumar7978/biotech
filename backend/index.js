const express = require('express')
const cors = require('cors')
const main=require('./db/config')
const User=require('./db/user.model')

//json web token
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const app = express()
app.use(express.json())
app.use(cors())

//api for register user

app.post('/signup',async (req,res)=>{
 try {
  const{Email,Password}=req.body
  let user=await User.create({
    Email:Email
    ,Password:Password
  })
  res.send("User Created Sucessfully.")

 } catch (error) {
  if(error.code)
  res.send("User already registered.")
 }
})

//api for sign in user if user exist

app.post('/signin',async (req,res)=>{
  try {
    const{Email,Password}=req.body
    let user=await User.findOne({Email:Email,Password:Password})
    if(user){

      let token=jwt.sign({
        Email:Email,
        Password:Password,
        id:user._id
      },secretKey) //create a jwt token

      res.send({
        token:token,
        ...user
      })
    }else{
      res.send("User not registered")
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})


const PORT = process.env.PORT || 8080

main()
.then(()=>{
  app.listen(PORT, () => {
    // console.log('hii')
    console.log(`App listen to ${PORT}`)
  })
})