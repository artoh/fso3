
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use( bodyParser.json())

morgan.token('json', function getJson(req) {
    return  JSON.stringify(req.body)
})

app.use( morgan(":method :url :json :status :res[content-length] - :response-time ms"))


let phones = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id:4
    }
]

app.get("/api/persons", (req,res) => {
    res.json(phones)
})

app.get("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    const person = phones.find(person => person.id === id)

    if( person ) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    phones = phones.filter( phone => phone.id !== id)

    res.status(204).end()
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
    if( phones.find(person => person.name === nimi) )
    {
        return res.status(400).json({error: 'name must be unique.'})
    }

    const person = {
        name: nimi,
        number: numero,
        id: Math.floor(Math.random() * 99999)
    }
    
    console.log(person)

    phones = phones.concat( person )
    res.json(person)
})

app.get("/info", (req,res) => {
  const date = new Date()
  const vastaus = 'Puhelinluettelossa ' + phones.length + ' henkilön tiedot \n\n'+ date
  res.writeHead(200, {"Content-type" : "text/plain; charset=utf-8"})  
  res.end(vastaus);
})




const PORT = 3001
app.listen(PORT, () => {
    console.log("Server running on port ${PORT}")
})