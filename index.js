var express=require("express")
var app=new express();
var request = require('request');



app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get("/slack/",function(req,res){
  
	console.log(req.query);
	var result =null;
	var reg=/^(\d+)\s([A-Z]+)\sto\s([A-Z]+)$/;



	//fCoyCZ2Ey7iqkjpL90o2zLWS

	if(req.query && req.query["text"])
	{
		if(req.query.token!="fCoyCZ2Ey7iqkjpL90o2zLWS") res.status(200).send("bad token");



		var text=req.query["text"];
		result = text.match(reg);
		if(result){
			request('https://www.mataf.net/fr/conversion/monnaie-EUR-DZD?m1='+result[1], function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    //console.log(body)
			    //<title>100 Euro = 11764.7 Dinar Algérien (EUR/DZD = 117.59) - Mataf</title>

			    var arr = /<title>(.*)<\/title>/gm.exec(body);
			    if(arr){
			    	res.status(200).send("well "+req.query["user_name"]+", "+arr[1]);
			    }else{
			    	res.status(200).send("sorry "+req.query["user_name"]+" nothing to show :(");
			    }
			    
			  }
			})
		}else{
		res.status(200).send("bad text");
		}
		
	}else{
		res.status(200).send("bad text");
	}
	
	

   
})




app.get("/",function(req,res){

	res.render("welcome");

})

var server=app.listen(process.env.PORT || 8080,function(){
  console.log("start waiting x slackeuro")
});
