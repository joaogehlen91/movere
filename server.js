const { Phrases } = require('./models')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static('static'))

app.get('/', (req, res) => {
  Phrases.findAll({
    limit: 1,
    order: [[ 'id', 'DESC']]
  }).then(phrase => {
    res.render('index.ejs', {msg: phrase[0].phrase, author: phrase[0].author})
  })

  
})

// get messages
app.get('/messages', (req, res) => {
  Phrases.all().then(phrase => {
    res.json(phrase)
  })
})

// create message
app.post('/messages', (req, res) => {
  phrase = req.body
  Phrases.create(phrase).then(phrase => {
    res.send(phrase)
  })
})

// retrieve message
app.get('/messages/:id', (req, res) => {
  Phrases.findById(req.params.id).then(msg => {
    if (!msg) res.status(404).send('Message not found')
    res.send(msg)
  })
})

// update message
app.put('/messages/:id', (req, res) => {
  newPhrase = req.body
  Phrases.findById(req.params.id).then(phrase => {
    if (!phrase) res.status(404).send('Message not found')
    phrase.update(newPhrase).then(() => {
      res.send(phrase)
    })
  })
})

app.listen(3000);