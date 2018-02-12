const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults
db.defaults({movies:[]})
  .write()

// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write()


module.exports = {
  setDbData(data,prop) {
    db.set(prop, data)
      .write()
    return data
  },
  getDbData(prop) {
    return db.get(prop)
  }
}
