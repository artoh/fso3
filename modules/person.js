salainen = require('../salainen')

const mongoose = require('mongoose')

const url = "mongodb://" + salainen.salaisuus + "@ds229438.mlab.com:29438/fso3"

mongoose.connect(url, { useNewUrlParser : true})

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person