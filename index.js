
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./modules/person')

app.use(cors())

app.use( bodyParser.json())

morgan.token('json', function getJson(req) {
    return  JSON.stringify(req.body)
})

app.use( morgan(":method :url :json :status :res[content-length] - :response-time ms"))

app.use( express.static("build"))

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.get("/api/persons", (req,res) => {
    Person 
     .find({},{ __v : 0})
     .then( persons => {
         res.json( persons.map(formatPerson))
     })
})

app.get("/api/persons/:id", (req,res) => {
    Person 
     .findById( request.params.id)
     .then( person => {
         res.json(formatPerson(person))
     })
})

app.delete("/api/persons/:id", (req,res) => {

    Person
      .findByIdAndRemove({_id : req.params.id})
      .then( doc => {
          res.status(204).end();
      })
})


app.post("/api/persons", (req,res) => {
    
    const nimi = req.body.name
    const numero = req.body.number

    if( nimi === undefined) {
        return res.status(400).json({error : 'name missing.'})
    }
    if( numero === undefined) {
        return res.status(400).json({error: 'number missing.'})
    }

    const person = new Person({
        name: nimi,
        number: numero,
    })
    
    person
      .save()
      .then( savedPerson => {
          res.json(formatPerson(savedPerson))
      })

})

app.get("/info", (req,res) => {
  const date = new Date()
  const vastaus = 'Puhelinluettelossa ' + phones.length + ' henkilön tiedot \n\n'+ date
  res.writeHead(200, {"Content-type" : "text/plain; charset=utf-8"})  
  res.end(vastaus);
})




const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server running on port ${PORT}")
})