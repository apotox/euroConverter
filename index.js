var express=require("express")
var app=new express();




app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get("/slack/",function(req,res){
  
	console.log(req.query);

//{message:req.query["r"]}
  res.status(200).send("thank you");
})




app.get("/",function(req,res){

	res.render("welcome");

})

var server=app.listen(process.env.PORT || 8080,function(){
  console.log("start waiting x slackeuro")
});
