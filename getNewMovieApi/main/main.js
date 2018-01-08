
const getData = require('./api.js')
const process = require('./process.js')
const saveDataToDb = require('./save.js').setDbData

function reFresh() {
  getData()
    .then(process)
    .then(res => {
      saveDataToDb(res, 'movies')
    })
}

reFresh()

module.exports = {
  timer: null,
  autoRefresh(timeOut) {
    reFresh()
    this.timer = setInterval(reFresh, timeOut)
  },
  stopRefresh() {
    clearInterval(this.timer)
  }
}
