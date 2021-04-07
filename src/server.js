
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer  = require('nodemailer');
const cors  = require('cors');
const path = require('path');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "client", "index.html"));

});


//app.get('/',()=>{
   // resizeBy.send('welcome to my form')
//})

app.post('/api/form', (req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail',
        port:465,
        auth:{
            user:'mnrashidm@gmail.com',
            pass:'@89Shama'
        }
    });

let mailOptions={
    from:data.email,
    to:'mnrashidm@gmail.com',
    subject:`Message from ${data.name}`,
    html:`
                 
        <h3>informations</h3>
         <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Message: ${data.message}</li>
         </ul>
            <h3>Message</h3>
            <p>${data.message}</p>
    `    
            
};

smtpTransport.sendMail(mailOptions,(error,response)=>{
    if(error){
        res.send(error)
    }
    else{
        res.send('Success')
    }

})

smtpTransport.close();

})

const PORT =process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server starting at port ${PORT}`);

})


