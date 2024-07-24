import {LoadMFData} from "../js/tournamentsData.mjs"
import {LAPI} from "../js/lichessAPIdownloader.mjs"
import {toNDJson} from "../js/mondayFight.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

function ndjson2array(text) {
  let json = "[" + text.replace(/\n{/g, ",{") + "]"
  return json
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

function allPlayers(data) {
  // get players
  let players = new Set()
  let allFights = data.jouzoleanAndBebulsTournaments()
  allFights.forEach(f => {
    f.standing.players.forEach(p => players.add(p.name))
  })
  return Array.from(players.values())
}

function process(data) {
  let players = allPlayers(data) // ["polgu"]

  LAPI.lichessAPI().perfs(players)
    .then(function(performances) {
      data.updatePerformances(performances)
      return data
    }).then(function(data) {
      fs.writeFileSync('../data/tournamentGames.ndjson', toNDJson(data.tournamentGames()))
    })
}

LoadMFData(process, loadedTounaments, loadedGames, loadedStreaks)
