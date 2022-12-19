const express = require("express");
const request = require("request");

const app = express();
app.set("view engine" , "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get("/", function(req, res){
    res.render("weatherblank");
    
}); 

app.post("/", function(req,res){

    var city_name = req.body.cityname;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=cd01448834b9fefb5cc68da53e05ac29`
    request(url, function(error, response, body){
        const weather_JSON = JSON.parse(body);

    var weather = {
    city : city_name,
    tempval : weather_JSON.main.temp,
    tempinfo : weather_JSON.weather[0].description,
    tempmax : weather_JSON.main.temp_max,
    tempmin : weather_JSON.main.temp_min,
    location : weather_JSON.name,
    country : weather_JSON.sys.country,
    image : weather_JSON.weather[0].icon,

};
    var weather_data = {weather : weather};
        res.render("weather", weather_data);
    });
})

app.listen(process.env.PORT);