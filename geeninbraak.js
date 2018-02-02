

let json = require('./elements.json');
var fs = require('fs');

let postcodes = Array.from(new Array(3000), (x,i) => i + 1000)
let geenInbraak = [];

for(let i = 0; i < postcodes.length; i++) {
geenInbraak.push(postcodes[i]);
}


//console.log(geenInbraak)

fs.writeFile('geenInbraak.json', JSON.stringify(geenInbraak, null, 4), function(err){
})




 //let out = Array.from(Array(1000), (_,x) => x);
 // let postcodes = Array.from(new Array(4000), (x,i) => i + 1000)
 // let geenInbraak = [];
 //
 //
 //  for(let i = 0; i < 4000; i++) {
 //    for (let j = 0; j < 500; j++) {
 //      if (postcodes[i] !== json[j].postcode){
 //        geenInbraak.push(postcodes[i]);
 //      }
 //    }
 //  }


//console.log(geenInbraak)
