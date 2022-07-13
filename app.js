/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

'use strict'
// require('dotenv').config()

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
// const token = process.env.WHATSAPP_TOKEN;
// const token = process.env.TOKEN

// Imports dependencies and set up http server
const request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  axios = require('axios'),
  app = express().use(body_parser.json()) // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening ' + process.env.PORT || 1337))

app.post('/webhook', async (req, res) => {
  let body = req.body

  console.log(JSON.stringify(body, null, 2))

  if (body?.object) {
    if (
      body?.entry &&
      body?.entry[0]?.changes &&
      body?.entry[0]?.changes[0] &&
      body?.entry[0]?.changes[0]?.value?.messages &&
      body?.entry[0]?.changes[0]?.value?.messages[0]
    ) {
      console.log('Se valida que tiene mensaje')
      let phone_number_id = body?.entry[0]?.changes[0]?.value?.metadata?.phone_number_id
      let messages = body?.entry[0]?.changes[0]?.value?.messages
      let from = messages ? messages[0].from : null
      let msg_body = messages ? messages[0]?.text?.body : null

      console.log('-----------------------------------------------------')
      console.log(phone_number_id, from, msg_body)
      console.log('-----------------------------------------------------')
    }
    res.sendStatus(200)
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    console.log('No es un mensaje')
    res.sendStatus(404)
  }
})

app.get('/webhook', (req, res) => {
  const verify_token = 'token'
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  console.log(mode, token, challenge)

  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      console.log('WEBHOOK_NOT_VERIFIED')
      console.log(token, verify_token)
      res.sendStatus(403)
    }
  }
})
