
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

app.get("/api/persons", (req,res) => {
    Person 
     .find({},{ __v : 0})
     .then( persons => {
         res.json( persons.map( Person.format ))
     })
     .catch(error => {
         console.log( error )
     })
})

app.get("/api/persons/:id", (req,res) => {
    Person 
     .findById( req.params.id)
     .then( person => {
         res.json(Person.format(person))
     })
     .catch(error => {
         console.log(error)
         return res.status(400).send({error: "malformatted id"})
     })
})

app.delete("/api/persons/:id", (req,res) => {

    Person
      .findOneAndDelete({_id: req.params.id})
      .then( result => {
          res.status(204).end();
      })
      .catch( error => {
          console.log(error)
          return res.status(400).send({ error: "malformatted id"})
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

    Person
        .findOne({name: nimi})
        .then( result => {
            console.log( result )
            if( result !== null ) {
                // On jo olemassa
                res.status(409).send({error: 'name already exists'})

            } else {
                
                // Voidaan lisätä
                person
                .save()
                .then( savedPerson => {
                    res.json(Person.format(savedPerson))
                })
                .catch( error => { 
                    res.status(400).send({error : "bad request"})
                })
          

            }
        })    
})

app.put("/api/persons/:id", (req, res) => {
    const body = req.body;
    const person = {
        name: body.name,
        number: body.number
    }

    Person
      .findOneAndUpdate({ _id: req.params.id}, person, {new: true})
      .then( paivitetty => {
          res.json( Person.format(paivitetty))
      })
      .catch( error => {
          console.log( error)
          res.status(400).send({error: "malformed id"})
      })
})

app.get("/info", (req,res) => {
    const date = new Date()
    Person 
     .find({},{ __v : 0})
     .then( persons => {
        const vastaus = 'Puhelinluettelossa ' + persons.length + ' henkilön tiedot \n\n'+ date
        res.writeHead(200, {"Content-type" : "text/plain; charset=utf-8"})  
        res.end(vastaus);             
     })
     .catch(error => {
         console.log( error )
     })
 })


const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})