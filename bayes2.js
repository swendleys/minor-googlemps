var bayes = require('bayes')

var classifier = bayes()

classifier.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive')
classifier.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive')
classifier.learn('terrible, shitty thing. Damn. Sucks!!', 'negative')

console.log(classifier.categorize('awesome, cool, amazing!! Yay.'))

var stateJson = classifier.toJson()


var revivedClassifier = bayes.fromJson(stateJson)
