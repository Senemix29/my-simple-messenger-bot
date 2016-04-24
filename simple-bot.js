'use strict'
const http = require('http')
const Bot = require('messenger-bot')
//Using environment variables.
//Feel free to fill the token, port and verify variables directly if you want.
const port = process.env.MY_BOT_PORT
let bot = new Bot({
  token: process.env.MY_PAGE_TOKEN,
  verify: process.env.MY_VERIFICATION_TOKEN,
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text
  var rep = ""
  text = text.toLowerCase();
  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err
    console.log("-------------------------------------------------------------------------")
    console.log("Incoming message from "+profile.first_name+" "+profile.last_name+":"+text)

    if(text.indexOf("hi")>-1 || text.indexOf("hello")>-1) {
      rep = "Hi "+profile.first_name+", how are you?"
    }
    else if (text.indexOf("fine")>-1 || text.indexOf("ok") >-1) {
      rep = "Well, good for you. Have a nice day !"
    }
    else {
      rep = "Sorry, i don't understand what you meant to say. I am new in this planet, just know a few words =/"
    }

    reply({ text: rep }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${rep}`)
    })
  })
})

http.createServer(bot.middleware()).listen(port)
console.log('Echo bot server running at port '+port)
