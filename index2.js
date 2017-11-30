var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var CircularJSON = require('circular-json');
var axios = require('axios')
var dataset = require('./inbraak.json')
var jsonarr = []
var json = {lat: "", lon: "", aantal: ""};

var kukar = 'TEST'

app.get('/scrape', function(req, res){

  for(var i = 0; i < 5; i++) {
    var aantallen = dataset[i].count
   //console.log(aantallen)
    json.aantal = aantallen;
    var j = i;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + dataset[i]._id + '+Netherlands&key=AIzaSyAap9hU5GyKW10ITaMEOfc-YKa4gr7RZYQ')
      .then(function (response) {

       // console.log(i)
        var contentlat = (response.data.results[0].geometry.location.lat);
        var contentlon = (response.data.results[0].geometry.location.lng);


        json.lat = contentlat;
        json.lon = contentlon;
        json.aantal= aantallen;

        console.log(j)
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
