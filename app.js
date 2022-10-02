const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("node:https");
const { response } = require("express");

app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');



app.get("/",(req,res)=>{
   // res.send("Server Is Running :) ");
   res.sendFile(__dirname + "/page.html");
});




// app.post start

app.post("/" , function(req,res){

    const city_name = req.body.cityname;
    console.log(city_name);

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city_name+'&appid=f77a091dce46056f9e65abca041f9b91&units=metric';




    https.get(url , function(response){        // https.get start

        response.on("data" , (data)=>{        // response.on start

            const weather_data = JSON.parse(data);
            const temp = weather_data.main.temp;
            const weatherDescription = weather_data.weather[0].description;

             console.log(response.statusCode);
            if(response.statusCode === 200){

               // res.sendFile(__dirname + "/weather.html")
               res.render("lists",{city: city_name, temperature: temp});
             //  res.write("<p> The Weather is Currently " + weatherDescription + "</p>");
              // res.write("<h1>The Temperature in "+city_name+" is " + temp + " degrees Celcius.</h1>");
              
             //   res.send();
                
            }else{

               // res.sendFile("/weather.html")
             //   res.write("<p> The Weather is Currently " + weatherDescription + "</p>");
             //  res.write("<h1>The Temperature in "+city_name+" is " + temp + " degrees Celcius.</h1>");
              
              //s  res.send();

            }

            




        });     // response.on end



    });                 // https.get end!



    


});    // app.post end!













app.listen(process.env.PORT || 3000,()=>{

    console.log("Server Running At Port 3000 ");

});










// appid = f77a091dce46056f9e65abca041f9b91 ;