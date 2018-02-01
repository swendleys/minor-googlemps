var json = require('./elements.json');

var BayesClassifier = require('bayes-classifier')
var classifier = new BayesClassifier()


this.json = json;

//console.log(json)

for (let i=0; i< json.length; i++) {
  json[i]= JSON.stringify(json[i]).replace('{', '').replace('}', '').replace(/"/g, '')
}
//console.log(json)

var eersteDocuments = json;

var tweedeDocuments = [
  'postcode: 3999, dag: Zondag',
  'postcode: 4001, dag: Maandag'
]

classifier.addDocuments(eersteDocuments, `inbraak`)
classifier.addDocuments(tweedeDocuments, `Geen inbraak`)
classifier.train()

console.log(classifier.classify('postcode:3035,dag:izandag'))




//var element = {postcode: "3011", dag: "ewfwef"};

//console.log(JSON.stringify(element).replace('{','').replace('}',''))


