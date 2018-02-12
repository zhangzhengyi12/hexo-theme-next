var express = require('express')
var apiRoutes = express.Router()
var axios = require('axios')

apiRoutes.get('/qinyunke', (req, res) => {

  var url = 'http://api.qingyunke.com/api.php'
  axios
    .get(url, {
      params: req.query
    })
    .then(response => {
      res.set('Access-Control-Allow-Origin', '*')
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

module.exports = apiRoutes
