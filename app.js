
const express = require("express");
const app = express();
const parser = require("body-parser");
app.use(parser.urlencoded({extended: true}));
const request = require("request");
const https = require(`https`)

// app.use(express.static("./public/imgs/mailletter.svg")); 
// app.use(express.static("./public/style/styleNodeForm.css")); 

// app.use("/", express.static('public'));
app.use("/", express.static(__dirname));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const email =  req.body.email;
    const name =  req.body.name;
    const number =  req.body.number;

  
const data = {  
    members: [
        { 
email_address: email,
status: "subscribed",
merge_fields: {
    FNAME: name,
    PHONE: number }
}]
}

const mailURL = "" //address
const jsonData = JSON.stringify(data);

const options = {
    method: "POST",
    auth:"" //API KEY
}
const requestMail = https.request(mailURL, options, function(response){
if (response.statusCode !== 200) {res.sendFile(__dirname + "/failure.html") }
else   { res.sendFile(__dirname + "/success.html")} 

    response.on("data", function(d){
        console.log(JSON.parse(d));
})
})
requestMail.write(jsonData);
requestMail.end(); 
})
app.listen(3000, function(){
    console.log("Jarvis, initialise a server " + 3000);
    
})



