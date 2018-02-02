

let json = require('./elements.json');

let out = Array.from(Array(4000), (_,x) => x);
let geenInbraak = [];

this.json = json;
for (let i=0; i< json.length; i++) {
for (let j=i; j< json.length; j++)
{
  if(out[i] === parseInt(json[j].postcode)) {
    geenInbraak.push(out[i]);
  }
}
}
 //console.log(out);
console.log(geenInbraak)
