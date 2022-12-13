import {LoadMFData} from "../js/tournamentsData.mjs"
import {LAPI} from "../js/lichessAPIdownloader.mjs"
import {Chess} from '../chess.js/chess.js'
import {addNewGamesStats} from "../js/analyze.mjs"
import {toNDJson} from "../js/mondayFight.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

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

function process(data) {
  let allFights = data.jouzoleanAndBebulsTournaments()
  let count = 0

  let chess = new Chess()

  LAPI.lichessTournamentsAPI(allFights, ["bebul","Jouzolean"]).downloadMissing(console.log)
    .then(function(downloadedTournaments) {
      if (downloadedTournaments.length) {
        data.addTournaments(downloadedTournaments) // updates mondayFights and everything
        LAPI.lichessAPI().downloadMissingTournamentGames(data, console.log)
          .then(function(games) {
            data.addGames(games)
            downloadedTournaments.forEach(t => data.addExtras(t))
            return addNewGamesStats(data, games, undefined, chess)
          })
          .then( v => {
            fs.writeFileSync('../data/tournaments.ndjson', toNDJson(data.jouzoleanAndBebulsTournaments()))
            fs.writeFileSync('../data/tournamentGames.ndjson', toNDJson(data.tournamentGames()))
          })
      }
    })
}

LoadMFData(process, loadedTounaments, loadedGames)
