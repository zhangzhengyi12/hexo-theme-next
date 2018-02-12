let movies = require('./movies/movies.js')

const logger = require('../common/logger.js')

logger.info('run background.js')
module.exports = {
  run(){
  movies.autoRefresh(3600000)
  }
}
