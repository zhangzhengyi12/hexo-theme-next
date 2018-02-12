const getData = require('./api.js')
const process = require('./process.js')
const saveDataToDb = require('../../common/db.js').setDbData
const logger = require('../../common/logger.js')
function reFresh() {
 logger.info('refresh movies',{timestamp: Date.now()})
  getData()
    .then(process,(err)=>{
     logger.info('get data error')
    })
    .then(res => {
      saveDataToDb(res, 'movies')
    },err=>{
      logger.info('process err')
    })
}

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
