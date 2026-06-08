const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);//only way to connect to mongo from my device,everything else failed to connect.

require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db') 
const router = require('./routes/routing')

const shareShedServer = express()
shareShedServer.use(cors())
shareShedServer.use(express.json()) 
shareShedServer.use(router)
// const PORT = 3000

shareShedServer.get('/',(request,response)=>{
    response.status(200).send("server ok...")
})
shareShedServer.listen(3000,()=>{
    console.log(`ShareShed Server started...`);  
})