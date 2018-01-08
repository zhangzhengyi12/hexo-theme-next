const superagent = require('superagent-charset')

const URI = 'http://www.6vhao.tv/'

module.exports = function get66ysHomePageDataPromify() {
  return new Promise((resolve, reject) => {
    superagent
      .get(URI)
      .charset('gbk')
      .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        resolve(res.text)
      }
    })
  })
}