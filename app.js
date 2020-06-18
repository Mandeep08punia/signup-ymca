   const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
//statucally create
app.use(express.static("public"));
app.get("/",function(req,res)
{
	res.sendFile(__dirname+"/signup.html");
	
});
app.post("/",function(req,res)
{
   const num1=req.body.num1;
   const num2=req.body.num2;
   const email=req.body.num3;
   //create javascript object
   const data=
   {
      members: [{
      email_address: email,
      status:"subscribed",
      merge_fields:
      {
         FNAME:num1,
         LNAME:num2,
      }
   }
      ]
   };
   const jsondata=JSON.stringify(data);
   const url="https://us10.api.mailchimp.com/3.0/lists/3432b13f26";
   const options={
      method:"POST",
      auth:"jyotir:02f693affe2f4724ca7a1a9c414927ae-us10",

   }
    const request=https.request(url,options,function(response)
   {
    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
     res.sendFile(__dirname+"/failure.html");
    }
       response.on("data",function(data)
       {
         console.log(JSON.parse(data))
         // response.write(jsondata);
         // response.end();
       });
   });
 request.write(jsondata);
 request.end();
});

app.listen(process.env.PORT||3000 ,function()
{
	console.log("haanji");
})
//apikey
//02f693affe2f4724ca7a1a9c414927ae-us10
//apiid
//3432b13f26
// heroku link
//https://git.heroku.com/lit-ravine-59815.git