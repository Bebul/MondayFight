import {LoadMFData} from "../js/tournamentsData.mjs"
import {exploreLine} from "../js/explorer.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

let openingLine = "e4 e5 f4 d5 exd5 exf4 Nf3 Nf6 Bc4 Nxd5"

function logOpening(exp) {
  console.log(exp.opening)
  let color = "white"
  if (exp.opening.split(" ").length % 2 === 1) color = "black"
  exp.lines.forEach(line => {
      let players = new Map()
      line.games.forEach(g => {
        let name = g.players[color].user.name
        if (players.has(name)) players.set(name, players.get(name)+1)
        else players.set(name, 1)
      })
      let maxPl = ["", 0]
      for(let pl of players.entries()) {
        if (pl[1] > maxPl[1]) maxPl = pl
      }
      console.log(` -> ${line.move} ${line.w} (${line.d}) ${line.b} [${maxPl[0]} ${maxPl[1]}x] ${line.name || ""}`)
      if (line.games.length <=10) {
        line.games.forEach(g => {
            let result = ""
            if (g.winner === "black") result = "0-1"
            else if (g.winner === "white") result = "1-0"
            else result = "½-½"
            console.log(`      ${g.players.white.user.name} : ${g.players.black.user.name} ${result}`)
        })
      }
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

LoadMFData(d => logOpening(exploreLine(d, openingLine)), loadedTounaments, loadedGames)
