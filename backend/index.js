const express = require('express')
const cors = require('cors')
const main=require('./db/config')


const app = express()
app.use(express.json())
app.use(cors())

app.post('/signup',async (req,res)=>{
 try {
  res.send('hii')
 } catch (error) {
  
 }
})

const PORT = process.env.PORT || 8080

main()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`App listen to ${PORT}`)
  })
})