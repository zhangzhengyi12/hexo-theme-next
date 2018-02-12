var express = require('express')
var app = express()
var vueMusicApiRouter = require('./routers/vue-music/vueMusic.js')
var PORT = process.env.PORT || 80

var back = require('./background/background.main.js')
back.run()
app.use('/api', vueMusicApiRouter)
module.exports  = app.listen(PORT, function(err){
  if(err){
    console.log(err)
  }
  console.log('server at listening prot'+ PORT + '....')
})



