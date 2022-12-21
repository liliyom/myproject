const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");

});
app.post("/", function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
const data = {
    members : [
        {
           email_adress: email,
           status: "subscribed",
           merge_fields:{
            FNAME: firstName,
            LNAME: lastName,
           }
        }
    ]
    
};
const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/065df2f1ee";
const options = {
    method: "POST",
    auth: "liliyom:3cdf4ccfe092576c355e11383e669ca1-us17",
}

 const request = https.request(url,options,function(response){
    response.on("data", function(data){
console.log(JSON.parse(data));
    });

});
request.write(jsonData);
request.end();




});







app.listen(3000, function(){
    console.log("server is running on port 30000");
});
// 3cdf4ccfe092576c355e11383e669ca1-us17
// 065df2f1ee