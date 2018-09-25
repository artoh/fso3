salainen = require('./salainen')

const mongoose = require('mongoose')

const url = "mongodb://" + salainen.salaisuus + "@ds229438.mlab.com:29438/fso3"

mongoose.connect(url, { useNewUrlParser : true})

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})


if( process.argv.length > 2 ) {
    const uusi = new Person({
        name: process.argv[2],
        number: process.argv[3],
        id: Math.floor( Math.random() * 99999)
    })
    
    uusi
      .save()
      .then( res => {
          console.log("Lisättiin henkilö " + uusi.name + " numero " + uusi.number + " luetteloon")
          mongoose.connection.close()
      })
}

else
{
Person
  .find({})
  .then(result => {
      console.log("puhelinluettelo: ")
      result.forEach( person => {
          console.log(person.name + " " + person.number)
      })
      mongoose.connection.close()
  })
}