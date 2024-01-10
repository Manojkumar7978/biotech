const express = require('express')
const cors = require('cors')
const main=require('./db/config')
const User=require('./db/user.model')
//json web token
const jwt = require('jsonwebtoken');
const { createToken, verifyToken } = require('./jwt');
const { error } = require('console');
const UserData = require('./db/userdata.model');

const secretKey = process.env.SECRET_KEY;

const bodyParser = require('body-parser');
const app = express()
app.use(express.json())
app.use(cors())

// Increase payload limit for JSON and URL-encoded data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//multer
const multer = require('multer');
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,"./uploads")
  },
  filename:function(req,file,cb){
    return cb(null,`${Date.now()}_${file.originalname}`)
  }
})
const upload=multer({storage})

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

      let token=createToken(user) //create a jwt token

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

//api for verify the token and return user data
app.get('/user',verifyToken,async(req,res)=>{
  try {
    let user=req.user
    if(user){
      res.send(user)
    }  
  }catch (error){
    console.log(error)
  }
})

// API for post user information and save in the database as per respective id
app.post('/userData',verifyToken,upload.single('file'), async (req,res)=>{
  try {
      let user=req.user
      let{Name,Age,Address}=req.body
      let{filename}=req.file
      let response=await UserData.create({
        Name:Name,
        Age:Age,
        Address:Address,
        Userid:user.id,
        Photo:filename
      })
      res.send(response)
      
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

//api for getting userdata by formid
app.get('/data/:id',verifyToken,async (req,res)=>{
  try {
    let {id}=req.params

    let data=await UserData.findById(id)
    res.send(data)
  } catch (error) {
    res.send(error)
  }
})


app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8080

main()
.then(()=>{
  app.listen(PORT, () => {
    // console.log('hii')
    console.log(`App listen to ${PORT}`)
  })
})