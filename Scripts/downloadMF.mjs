/* jshint -W033, esversion: 8 */
import {LoadMFData} from "../js/tournamentsData.mjs"
import {LAPI} from "../js/lichessAPIdownloader.mjs"
import {Chess} from '../chess.js/esm-1.4.0/chess.mjs'
import {addNewGamesStats} from "../js/analyze.mjs"
import {download, toNDJson} from "../js/mondayFight.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

function ndjson2array(text) {
  let json = "[" + text.replace(/\n{/g, ",{") + "]"
  return json
}

function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

function parse(json) {
  return JSON.parse(json, reviver)
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
let loadedStreaks = parse(loadData("../data/streaks.json"))

function fixBadlyNamedTournaments(tournaments) {
  let badlyNamed = ['GbJ6hYbC']
  tournaments.forEach(t => {
    if (badlyNamed.includes(t.id)) {
      t.fullName = "Monday Fight Fixed"
    }
  })
}

function process(data) {
  let allFights = data.jouzoleanAndBebulsTournaments()
  let count = 0

  let chess = new Chess()

  LAPI.lichessTournamentsAPI(allFights, ["bebul","Jouzolean"]).downloadMissing(console.log)
    .then(function(downloadedTournaments) {
      if (downloadedTournaments.length) {
        fixBadlyNamedTournaments(downloadedTournaments)
        data.addTournaments(downloadedTournaments) // updates mondayFights and everything
        LAPI.lichessAPI().downloadMissingTournamentGames(data, console.log)
          .then(function(games) {
            data.addGames(games)
            downloadedTournaments.forEach(t => data.addExtras(t))
            return addNewGamesStats(data, games, undefined, chess)
          }).then( v => {
            let players = new Set()
            downloadedTournaments.forEach(t => {
              t.standing.players.forEach(p => players.add(p.name))
            })
            LAPI.lichessAPI().perfs(Array.from(players.values()))
              .then( performances => {
                data.updatePerformances(performances)
                fs.writeFileSync('../data/tournaments.ndjson', toNDJson(data.jouzoleanAndBebulsTournaments()))
                fs.writeFileSync('../data/tournamentGames.ndjson', toNDJson(data.tournamentGames()))
                fs.writeFileSync('../data/streaks.json', JSON.stringify(data.streaks(), replacer))
              })
          })
      }/* else {
        addNewGamesStats(data, [])
          .then(function(result) {
            fs.writeFileSync('../data/tournaments.ndjson', toNDJson(data.jouzoleanAndBebulsTournaments()))
            fs.writeFileSync('../data/tournamentGames.ndjson', toNDJson(data.tournamentGames()))
            fs.writeFileSync('../data/streaks.json', JSON.stringify(data.streaks(), replacer))
          })
      }*/
    })
}

LoadMFData(process, loadedTounaments, loadedGames, loadedStreaks)
