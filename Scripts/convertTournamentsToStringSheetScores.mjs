import {LoadMFData} from "../js/tournamentsData.mjs"
import { createRequire } from 'module'
import {toNDJson} from "../js/mondayFight.mjs";

const require = createRequire(import.meta.url)
const fs = require('fs')

function process(data) {
  data.jouzoleanAndBebulsTournaments().forEach(t =>
    t.standing.players.forEach(function(player) {
      if (Array.isArray(player.sheet.scores)) {
        let scores = []
        player.sheet.scores.forEach(function (score) {
          if (Array.isArray(score)) scores.push(score[0])
          else scores.push(score)
        })
        player.sheet.scores = scores.reverse().join("")
      }
    })
  )
  storeData(data.jouzoleanAndBebulsTournaments(), "../data/tournaments-fixed.ndjson")
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

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, toNDJson(data))
  } catch (err) {
    console.error(err)
  }
}

let loadedTounaments = parse(ndjson2array(loadData("../data/tournaments.ndjson")))
let loadedGames = parse(ndjson2array(loadData("../data/tournamentGames.ndjson")))

LoadMFData(process, loadedTounaments, loadedGames)
