const express = require('express')
require('dotenv').config()
const cors = require('cors')
require('./config/db')

const shareShedServer = express()

shareShedServer.use(cors())

shareShedServer.use(express.json())

const PORT = 3000

shareShedServer.listen(PORT,()=>{
    console.log(`ShareShed Server started on port ${PORT}...`);  
})

shareShedServer.get('/',(request,response)=>{
    response.status(200).send("server ok...")
})