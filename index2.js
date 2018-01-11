var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var CircularJSON = require('circular-json');
var axios = require('axios')
var dataset = require('./inbraak.json')
var jsonarr = []




app.get('/scrape', function(req, res){

  for(let i = 0; i < dataset.length; i++) {

   //key=AIzaSyAap9hU5GyKW10ITaMEOfc-YKa4gr7RZYQ

    axios.get('https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?geoquery=Den+Haag%2C+Nederland&distance=5.0&categorie=1&categorie=2&pageSize=500')
      .then(function (response) {


        var contentlat = (response.data.results[0].geometry.location.lat);
        var contentlon = (response.data.results[0].geometry.location.lng);
        var aantallen = dataset[i].count
        var json = {lat: "", lon: "", aantal: ""};
        json.lat = contentlat;
        json.lon = contentlon;
        json.aantal= aantallen;
        console.log(dataset[i]._id)

        //console.log(dataset[2].count)


        jsonarr.push(json)
        fs.writeFile('output.json', JSON.stringify(jsonarr, null, 4), function(err){
          // console.log('File successfully written! - Check your project directory for the output.json file');
        })
      })
      .catch(function (error) {
        console.log(error);
      });


  }


  res.send('Check your console!')
});








app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
