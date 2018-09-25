
const express = require("express")
const app = express()


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

    response.status(204).end()
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