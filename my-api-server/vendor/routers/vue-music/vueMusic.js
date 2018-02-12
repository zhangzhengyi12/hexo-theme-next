var express = require('express')
var apiRoutes = express.Router()
var axios = require('axios')
var getMovies = require('../../common/db.js').getDbData

apiRoutes.get('/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com'
      },
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

apiRoutes.get('/getDissData', (req, res) => {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'http://y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      var ret = response.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^]+})\)$/
        var mathes = ret.match(reg)
        if (mathes) {
          ret = JSON.parse(mathes[1])
        }
      }
      res.set('Access-Control-Allow-Origin', '*')
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/lyric', (req, res) => {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'http://c.y.qq.com',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      var ret = response.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var mathes = ret.match(reg)
        if (mathes) {
          ret = JSON.parse(mathes[1])
        }
      }
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})

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


apiRoutes.get('/itpk', (req, res) => {

  var url = 'http://i.itpk.cn/api.php'
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


apiRoutes.get('/myule', (req, res) => {

  var url = 'http://myule.cc/api/chat.php'
  axios
    .get(url, {
      params: req.query
    })
    .then(response => {
      res.set('Access-Control-Allow-Origin', '*')
       res.set({ 'content-type':'text/html; charset=gbk2312' })
res.type
      res.send(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/getNewMovie', (req, res) => {
  res.json(getMovies('movies'))
})

module.exports = apiRoutes
