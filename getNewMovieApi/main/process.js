
const cheerio = require('cheerio')

module.exports = function getJsonObjForHTML(text) {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(text)
    const tjList = $('.wrap > div.tjlist > ul > li')
    let result = []

    for (let i = 0; i < tjList.length; i++) {
      let currentItem = tjList.eq(i)
      let title = currentItem.find('p > a').attr('title')
      let link = currentItem.find('p > a').attr('href')
      let imgSrc = currentItem.find('a > img').attr('src')
      result.push({ title, link, imgSrc })
    }
    resolve(result)
  })
}
