const fs = require('fs')

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

let games = JSON.parse(loadData("./games.json"));

console.log(`ahoj, nacetl jsem ${Object.keys(games[1].games[0])}`);

storeData(games, "./games.saved");
