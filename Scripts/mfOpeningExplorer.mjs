import {LoadMFData} from "../js/tournamentsData.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

let opening = "e4 e5 f4 exf4"

function getPts(g) {
  if (g.winner && g.winner==="black") return -1
  else if (g.winner && g.winner==="white") return 1
  else return 0
}

function process(data) {
  let games = []
  data.forEachGame(g => games.push(g))

  let nextMoveIx = opening.split(" ").length
  let cont = new Map()
  games = games.sort()
  games.forEach(function(g) {
      if (g.moves.startsWith(opening)) {
        let moves = g.moves.split(" ")
        let nextMove = moves[nextMoveIx]
        if (nextMove) {
          let games = cont.get(nextMove) || []
          games.push(g)
          cont.set(nextMove, games)
        }
      }
    })

  console.log(opening)
  for (let entry of cont.entries()) {
    let white = 0
    let black = 0
    let draws = 0
    let openSub = new Set()
    let openPart = new Set()
    let openAll = new Set()
    entry[1].forEach(function(g) {
      if (g.opening && g.opening.name) {
        openSub.add(g.opening.name.split(":")[0])
        openPart.add(g.opening.name.split(",")[0])
        openAll.add(g.opening.name)
      }
      let pts = getPts(g)
      if (pts < 0) black++
      else if (pts > 0) white++
      else draws++
    })
    let opening = ""
    if (openAll.size==1) opening = openAll.values().next().value
    else if (openPart.size==1) opening = openPart.values().next().value
    else if (openSub.size==1) opening = openSub.values().next().value
    console.log(` -> ${entry[0]} ${white} (${draws}) ${black} ${opening}`)
  }
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
let loadedStreaks = parse(loadData("../data/streaks.json"))

let data = LoadMFData(process, loadedTounaments, loadedGames, loadedStreaks)
