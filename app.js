const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser') // simplifies access to request body
const app = express()  // make express app
const port = process.env.PORT || 8081
const logfile = '/access.log'

// Automatic mailing
const fs = require('fs')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
// 2 include public assets and use bodyParser
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request
// 6 respond with 404 if a bad URI is requested

console.log(process.env);

// 1 set up the view engine
app.set('views', path.resolve(__dirname, 'views')) // path to views
app.set('view engine', 'ejs') // specify our view engine

// 2 include public assets and use bodyParser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.render('index.ejs')
})

// 4 http GET /tic-tac-toe
app.get('/About', function (req, res) {
  res.render('About.ejs')
})

// 4 http GET /about
app.get('/Contact', function (req, res) {
  res.render('Contact.ejs')
})


app.get('/Game', function (req, res) {
  res.render('Game.ejs')
})



app.get('/Home', function (req, res) {
  res.render('Home.ejs')
})



app.post('/Contact', function (req, res) {
  const name = req.body.inputname
  const email = req.body.inputemail
  const phone = req.body.inputphone
  const comment = req.body.inputcomment
  const isError = false

  // logs to the terminal window (not the browser)
  const s = '\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + phone + ' ' + comment + '\n'
  console.log(s)

  /* const mailOptions = {
    from: 'Denise Case <denisecase@gmail.com>', // sender address
    to: 'dcase@nwmissouri.edu, denisecase@gmail.com', // list of receivers
    subject: 'Message from Website Contact page', // Subject line
    text: s,
    err: isError
  }
  try {
    const auth = require('./config.json')
    // create transporter object capable of sending email using the default SMTP transport
    const transporter = nodemailer.createTransport(mg(auth))
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('\nERROR: ' + error + '\n')
        res.render('contact-error.ejs')
      } else {
        console.log('Sending email...')
        if (info) { console.log('\nres SENT: ' + info.res + '\n') }
        res.render('contact-confirm.ejs')
      }
    })
  }
  catch (e) {
    console.log(e.message)
    res.render('contact-error.ejs')
  } */
})

app.get(function (req, res) {
  res.render('404')
})

app.listen(port, function () {
  console.log('\nWeb app started and listening on http://localhost:' + port + '.')
  console.log('\nLogs will be sent to this terminal and ' + logfile + '.')
  console.log('\nKeep this open while serving, and use CTRL-C to quit.')
})