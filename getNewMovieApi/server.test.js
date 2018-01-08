var express = require('express')
var app = express()
var axios = require('axios')

var getMovies = require('./main/save.js').getDbData

var port = process.env.PORT || 8080

var apiRoutes = express.Router()

apiRoutes.get('/getNewMovie', (req, res) => {
  res.json(getMovies('movies'))
})

app.use('/api', apiRoutes)
app.use(express.static('./dist/'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
  }
})