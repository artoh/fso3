salainen = require('../salainen')

const mongoose = require('mongoose')

const url = "mongodb://" + salainen.salaisuus + "@ds229438.mlab.com:29438/fso3"

mongoose.connect(url, { useNewUrlParser : true})

var personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}


const Person = mongoose.model('Person', personSchema)


module.exports = Person