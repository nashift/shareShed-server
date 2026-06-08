const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING)
.then(()=>{
    console.log('DB Connected...');
}).catch((err)=>{
    console.log('connection failed');
    console.log(err);
})