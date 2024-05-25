const { EventEmitterAsyncResource } = require('events')
const express = require('express')
const fs = require('fs')
const port = 8080

const server = express()
const dbOfKoders = "koders.json"
const dbExists = fs.existsSync(dbOfKoders)

server.use(express.json())

if (!dbExists) {
  fs.writeFileSync(dbOfKoders,JSON.stringify({koders:[]}))
}

// mostrar los koders
function getKoders() {
  const allkoders = fs.readFileSync(dbOfKoders, 'utf8')
  return JSON.parse(allkoders).koders
}

// agregar un bro
function addKoders(koders) {
  const newKoder = JSON.stringify({koders: koders})
  fs.writeFileSync(dbOfKoders, newKoder)
}


server.get('/koders', (request, response) => {
  const kodersArray = getKoders()
  response.status(200)
  response.json({
    message: "Here's your Koders!",
    koders: kodersArray
  })
})

server.post('/koders', (request, response) => {

})

server.listen(port, () => {
  console.log(`Server ready on port ${port}`)
})