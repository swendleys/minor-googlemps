var Credulous = require('credulous');

var model = new Credulous();
// .train can take a single object or an array of objects
// The objects must be of the form { data: 'some data', class: 'a string representing the class name' }
model.train({ data: 'Great viagra for you!', class: 'spam' });
model.train([{ data: 'UTOSC is the best conference ever!', class: 'not spam'},
  { data: 'Some more strings that are not spam!', class: 'not spam'}]);

var result = model.classify('Great opportunity in Nigeria!');
console.log('result is', result);
// 'result is spam'
