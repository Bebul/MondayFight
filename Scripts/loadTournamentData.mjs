import {LoadMFData} from "../js/tournamentsData.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

function process(data) {
  let games = []
  data.forEachGame(g => games.push(g.moves))

  games = games.sort()
  games.forEach(function(g) {
      if (g.startsWith("e4 e5 f4 exf4 Nf3 Be7 Bc4 Bh4+ Kf1")) console.log(g)
    })
}

function ndjson2array(text) {
  let json = "[" + text.replace(/\n{/g, ",{") + "]"
  return json
}

function parse(json) {
  return JSON.parse(json)
}

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

let loadedTounaments = parse(ndjson2array(loadData("../data/tournaments.ndjson")))
let loadedGames = parse(ndjson2array(loadData("../data/tournamentGames.ndjson")))

LoadMFData(process, loadedTounaments, loadedGames)
