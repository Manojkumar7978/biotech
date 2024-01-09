const mongoose=require('mongoose')
require('dotenv').config()

const main=async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb started')
    } catch (error) {
        console.log(error)
    }
}

module.exports=main;