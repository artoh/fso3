salainen = require('./salainen')

const mongoose = require('mongoose')

const url = "mongodb://" + salainen.salaisuus + "@ds229438.mlab.com:29438/fso3"
console.log(url)

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})



Person
  .find({})
  .then(result => {
      result.forEach( person => {
          console.log(person)
      })
      mongoose.connection.close()
  })