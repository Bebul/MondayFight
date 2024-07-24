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

function setPlayerStatsValue(game, player, key, value) {
  let pl = null
  if (game.players.white.user.name.toLowerCase() === player.toLowerCase()) {
    pl = game.players.white
  } else if (game.players.black.user.name.toLowerCase() === player.toLowerCase()) {
    pl = game.players.black
  }
  if (pl) {
    let stats = pl.stats || {}
    stats[key] = value
    pl.stats = stats
  } else {
    console.log(`${player} not found!`)
  }
}

function process(data) {
  let players = allPlayers(data)

  LAPI.lichessAPI().perfs(players)
    .then(function(performances) {
      performances.forEach(p => {
        if (p.stat.highest) {
          let g = data.findGame(p.stat.highest.gameId)
          if (g) {
            console.log(`updating highest of ${p.user.name} to ${p.stat.highest.int}`)
            setPlayerStatsValue(g, p.user.name, "highest", p.stat.highest.int)
          }
        }
        if (p.stat.bestWins && p.stat.bestWins.results) {
          p.stat.bestWins.results.forEach( best => {
            let g = data.findGame(best.gameId)
            if (g) {
              console.log(`updating bestGame of ${p.user.name}`)
              setPlayerStatsValue(g, p.user.name, "best", true)
            }
          })
        }
        if (p.stat.worstLosses && p.stat.worstLosses.results) {
          p.stat.worstLosses.results.forEach( worst => {
            let g = data.findGame(worst.gameId)
            if (g) {
              console.log(`updating worstGame of ${p.user.name}`)
              setPlayerStatsValue(g, p.user.name, "worst", true)
            }
          })
        }
      })
      return data
    }).then(function(data) {
      fs.writeFileSync('../data/tournamentGames.ndjson', toNDJson(data.tournamentGames()))
    })
}

LoadMFData(process, loadedTounaments, loadedGames, loadedStreaks)
