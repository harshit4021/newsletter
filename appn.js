const express = require("express");
const bodyParser=require ("body-parser");
const request=require ("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("static"));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
})
app.post("/",function(req,res){
  const fName=req.body.firstname;
  const lName=req.body.lastname;
  const email=req.body.email;
  const url= "https:us14.api.mailchimp.com/3.0/lists/5a7070f156";
    const data = {

   members: [

     {

       email_address: email,

       status: "subscribed",

       merge_fields: {

         FNAME: fName,

         LNAME: lName

     }

   }

 ]

};
const jsonData = JSON.stringify(data);
const options = {
  method:"POST",
  auth:"harshit1:54628a3bbcfebf5df943c8a119ab6dca-us14"
}
const request =  https.request(url ,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
    if(response.statusCode===200){
      res.sendFile(__dirname +"/success.html");
    }
    else{
      res.sendFile(__dirname +"/failure.html");
    }
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});
//54628a3bbcfebf5df943c8a119ab6dca-us14 appi
//5a7070f156 list_id
