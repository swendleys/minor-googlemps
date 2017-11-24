var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var CircularJSON = require('circular-json');

var dataset = require('./inbraak.json')


app.get('/scrape', function(req, res){

  var jsonarr = []
  for(var i = 0; i < dataset.length; i++){
    url = 'https://nld.youbianku.com/nl/postcode/'+dataset[i]._id;


    request(url, function(error, response, html) {


      if (!error) {
        var $ = cheerio.load(html);



        var lat = $("*[itemprop = 'addressLocality']").get(2);
        var lon = $("*[itemprop = 'addressLocality']").get(3);
        var contentLat = $(lat).text().trim();
        var contentLon = $(lon).text().trim();

        var data = $(this);


       // console.log(contentLat, contentLon)

        var json = {lat: "", lon: ""};
        json.lat = contentLat;
        json.lon = contentLon;

        jsonarr.push(json)
      }

        fs.writeFile('output.json', JSON.stringify(jsonarr, null, 4), function(err){
          //console.log('File successfully written! - Check your project directory for the output.json file');
        })
    });

  }



// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

  });



app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
