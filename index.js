const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){


var crypto=req.body.cryptos;
var fiat=req.body.fiat;
var amount=req.body.amount;



var option={
  url: "https://apiv2.bitcoinaverage.com/convert/global",
  method: "GET",
  qs: {
    from:crypto,
    to:fiat,
    amount: amount
  }

};

request(option,function(error,response,body){

  var data=JSON.parse(body);
  var price=data.price;
console.log(price);
  var currdate=data.time;
  res.write("The current date is "+currdate);
  res.write("<h1>T "+ amount +crypto+" is "+ price + fiat+ "</h1>");

  res.send();
})
});

app.listen(3000,function(){
  console.log("Server running at port 3000");
});
