var express=require("express")
var app=new express();

app.all(/\/js\/.*js$/, function (req,res, next) {

   //ngsafi.herokuapp.com
   if(!req.header('Referer') || req.header('Referer').indexOf("ngsafi.herokuapp.com")<0){
     res.status(403).send({
        message: 'ngSafi Access Forbidden'
     });
   }else next();


});


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get("/euro",function(req,res){
  



  res.status(200).send({message:"euro"});
})

app.get("/",function(req,res){
	
	res.render("test");

})

var server=app.listen(process.env.PORT || 8080,function(){
  console.log("start waiting x")
});
