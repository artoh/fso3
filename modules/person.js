if( process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

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