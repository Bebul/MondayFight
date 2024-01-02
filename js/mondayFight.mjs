import {MF} from "./tournamentsData.mjs"
import {LAPI} from "./lichessAPIdownloader.mjs"
import {addNewGamesStats} from "./analyze.mjs"
import {Avatars, getTrophies, getTipHtml, MFPodium} from "./podium.mjs"
import {tournamentSpec} from "../data/tournamentSpecs.mjs";

function playerRank(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined) return undefined
  return player.rank
}

function playerScore(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return player.score
}

function playerPresence(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return 1
}

function playerRatingDiff(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return player.diff
}

function playerFastestMate(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return player.mate
}

function playerFastestGame(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return player.fast
}

function playerSensation(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return player.sensation
}


function playerPerformance(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  return player.performance
}

function playerAvgOponent(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || player.avgOponent === undefined) return 0
  return player.avgOponent
}

function playerPoints(fight, playerName) {
  if (!fight) return [0,0]
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || player.points === undefined || !MF.playedAGame(player)) return [0,0]
  return player.points
}

function playerPointsOld(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return [0, 0]
  let myPts = 0
  let opPts = 0
  if (Array.isArray(player.sheet.scores)) {
    player.sheet.scores.forEach( score => {
      let pts = 0
      if (Array.isArray(score)) {
        if (score[0] <= 1) pts = score[0]/2
        else if (score[0] == 2) {
          if (score[1] == 3) pts = 0.5
          else pts = 1
        } else pts = 1
      } else pts = score / 2
      myPts += pts
      opPts += 1-pts
    })
  } else if (typeof player.sheet.scores == "string" || player.sheet.scores instanceof String){
    let streak = 0
    player.sheet.scores.split("").reverse().forEach(function(score) {
      // 0 is always loss
      // 1 is always draw
      // 2 is win for no fire and draw otherwise
      // 3 is always win with berserk and no fire
      // 4 is always win
      // 5 is always win
      let pts = 1 // assume we won
      if (streak < 2) pts = Math.min(score,2) / 2
      else if (score <=2) pts = score / 4
      if (pts === 1) streak++
      else streak = 0
      myPts += pts
      opPts += 1-pts
    })
  }
  return [myPts, opPts]
}

function jouzocoins(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !MF.playedAGame(player)) return 0
  let plCount = MF.playersCountWhoPlayed(fight)
  let rank = player.rank
  if (plCount >= 10 && rank <= 6) return [11, 8, 6, 4, 2, 2][rank-1]
  else if (rank <= 4) return [10, 7, 5, 3][rank-1]
  return 1
}

function getTotalScore(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player) total += pl.score
    })
  })
  return total
}

function getTotalPresence(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player && MF.playedAGame(pl)) total += 1
    })
  })
  return total
}

function getTotalRatingDiff(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player && pl.diff) total += pl.diff
    })
  })
  return total
}

function getTotalMates(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player && pl.mate) total += pl.mate
    })
  })
  return total
}

function getTotalFastest(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player && pl.fast) total += pl.fast
    })
  })
  return total
}

function getTotalSensations(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player && pl.sensation) total += pl.sensation
    })
  })
  return total
}

function getTotalGames(player, theFights) {
  let total = 0
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player) total += pl.sheet.scores.length
    })
  })
  return total
}

function getTotalPoints(playerName, theFights) {
  let total = 0
  theFights.forEach( fight => total += playerPoints(fight, playerName)[0] )
  return total
}

function getAvgPerformance(playerName, theFights) {
  let games = getTotalGames(playerName, theFights)
  if (games > 0) {
    let total = 0
    theFights.forEach(
      fight => {
        let fgames = playerPoints(fight, playerName)[0] + playerPoints(fight, playerName)[1]
        total += playerPerformance(fight, playerName) * fgames
      }
    )
    return Math.round(total / games)
  } else return 0
}

function getAvgOponent(playerName, theFights) {
  let games = getTotalGames(playerName, theFights)
  if (games > 0) {
    let total = 0
    theFights.forEach(
      fight => {
        let fgames = playerPoints(fight, playerName)[0] + playerPoints(fight, playerName)[1]
        total += playerAvgOponent(fight, playerName) * fgames
      }
    )
    return Math.round(total / games)
  } else return 0
}

function getTotalJouzocoinsList(playerName, theFights) {
  let total = []
  theFights.forEach(fight => {
    fight.standing.players.forEach( pl => {
      if (pl.name==playerName) total.push(jouzocoins(fight, playerName))
    })
  })
  return total
}

function getTotalJouzocoins(playerName, theFights) {
  let total = 0
  theFights.forEach( fight => total += jouzocoins(fight, playerName) )
  return total
}

export function getPlayers(theFights) {
  let playersAr = []
  theFights.forEach(fight => {
    fight.standing.players.forEach((player) => {
      if (MF.playedAGame(player) && !playersAr.includes(player.name)) playersAr.push(player.name)
    })
  })
  return playersAr
}

function addFightsPoints(playerOut, playerName, theFights) {
  var ix = 1
  theFights.forEach(fight => {
    let rank = playerRank(fight, playerName)
    if (rank === undefined) playerOut['t' + ix++] = undefined
    else playerOut['t' + ix++] = {
      players: MF.playersCountWhoPlayed(fight),
      rank: playerRank(fight, playerName),
      jouzoCoins: jouzocoins(fight, playerName),
      score: playerScore(fight, playerName),
      points: playerPoints(fight, playerName)[0],
      present: playerPresence(fight, playerName),
      games: playerPoints(fight, playerName)[0]+playerPoints(fight, playerName)[1],
      performance: playerPerformance(fight, playerName),
      oponent: playerAvgOponent(fight, playerName),
      diff: playerRatingDiff(fight, playerName),
      mate: playerFastestMate(fight, playerName),
      fast: playerFastestGame(fight, playerName),
      sensation: playerSensation(fight, playerName)
    }
  })
}

function getDataOfPlayers(theFights) {
  let players = getPlayers(theFights)
  let tableData = []
  players.forEach( player => {
      let averagePerformance = getAvgPerformance(player, theFights)
      let averageOponent = getAvgOponent(player, theFights)
      let totalPoints = getTotalPoints(player, theFights) + averagePerformance / 10000
      let thePlayer = {
        name: player,
        nameUrl: "https://lichess.org/@/" + player,
        jouzoCoins: getTotalJouzocoins(player, theFights),
        totalScore: getTotalScore(player, theFights),
        totalPts: totalPoints,
        present: getTotalPresence(player, theFights),
        games: getTotalGames(player, theFights),
        avgPerformance: averagePerformance,
        avgOponent: averageOponent,
        ratingDiff: getTotalRatingDiff(player, theFights),
        fastestMates: getTotalMates(player, theFights),
        fastestGames: getTotalFastest(player, theFights),
        sensations: getTotalSensations(player, theFights)
      }
      addFightsPoints(thePlayer, player, theFights)
      tableData.push(thePlayer)
    }
  )
  return tableData
}

function generatePlayersTableColumns(theFights, enableJouzocoins) {
  let leaderboardColumns = [
    {formatter: "rownum", headerSort: false, resizable:false}, //add auto incrementing row number
    {title: "Hráč", field: "nameUrl", resizable:false, formatter:"link", formatterParams:{ labelField:"name", target:"_blank"}},
    {title: "Pt", field: "totalPts", resizable:false, headerSortStartingDir:"desc", headerTooltip:"celkový počet bodů", formatter: totalPtsFormatter},
    {title: "Sc", field: "totalScore", resizable:false, headerSortStartingDir:"desc", headerTooltip:"celkové skóre"},
    {title: "G", field: "games", resizable:false, headerSortStartingDir:"desc", headerTooltip:"počet her"},
    {title: "P", field: "avgPerformance", resizable:false, headerSortStartingDir:"desc", headerTooltip:"průměrná performance"},
    {title: "O", field: "avgOponent", resizable:false, headerSortStartingDir:"desc", headerTooltip:"průměrný oponent"},
    {title: "R", field: "ratingDiff", resizable:false, headerSortStartingDir:"desc", headerTooltip:"změna ratingu"},
    {title: "M", field: "fastestMates", resizable:false, headerSortStartingDir:"desc", headerTooltip:"nejrychlejší mat"},
    {title: "S", field: "sensations", resizable:false, headerSortStartingDir:"desc", headerTooltip:"senzace turnaje"},
    {title: "F", field: "fastestGames", resizable:false, headerSortStartingDir:"desc", headerTooltip:"nejrychlejší hra"},
    {title: "#", field: "present", resizable:false, headerSortStartingDir:"desc", headerTooltip:"počet odehraných turnajů"}
  ]
  if (enableJouzocoins) leaderboardColumns.push({title: "Jz", field: "jouzoCoins", resizable:false, headerSortStartingDir:"desc", headerTooltip:"slavné Jouzocoins"})
  let columnsBuilder = [
    {//create column group
      title: "Monday Fights Leaderboard",
      frozen:true,//frozen column group on left of table
      columns: leaderboardColumns
    }
  ]
  let curMonth = undefined
  let curColumns = []
  let colNo = 1

  let mainMFURL = window.location.origin + "/MondayFight"

  function pushFight(fight, tooltip) {
    curColumns.push(
      {
        title: `<a href='${mainMFURL}/?mf=${fight.id}'>${colNo}</a>`,
        field: "t" + colNo++,
        headerTooltip: tooltip,
        headerSort: false,
        align: "center",
        resizable: false,
        formatter: jouzoCoinsFormatter,
        bottomCalc: "count"
      }
    )
  }

  function pushMonth() {
    columnsBuilder.push(
      {
        title: curMonth,
        columns: curColumns
      }
    )
    curColumns = []
  }

  theFights.forEach( fight => {
    let date = new Date(fight.startsAt)
    let month = ['Leden','Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'][date.getMonth()]
    if (curMonth !== month) {
      if (curMonth !== undefined) pushMonth()
      curMonth = month
    }
    pushFight(fight, date.toDateString())
  })
  pushMonth()

  return columnsBuilder
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parse.pgn demo
function loadDoc() {

  function logger(logLine) {
    document.getElementById("gamesJson").innerHTML = logLine
  }
  let downloadedTournamentsGames = LAPI.lichessAPI().downloadMissingTournamentGames(logger)
  document.getElementById("gamesJson").innerHTML = JSON.stringify(downloadedTournamentsGames, null, 0)

  /*
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // see https://github.com/mliebelt/pgn-parser and https://github.com/Bebul/MondayFight/issues/7#issuecomment-721996465
      let gameList = parsePgn(this.responseText, {startRule: "games"})   // or sample: '[White "Me"] [Black "Magnus"] 1. f4 e5 2. g4 Qh4#'
      let theList = "<ol>"
      gameList.forEach(function(x) {
        theList += '<li>'+ x.tags.UTCTime + ' ' + x.tags.White + ' : ' + x.tags.Black + ' ' + x.tags.Result + '</li>'
      })
      theList += "</ol>"
      document.getElementById("demoRequest").innerHTML = theList
    }
  }
  // CORS policy problem: FIX - Enabling "Allow Unsigned Requests" in Build Execution and Deployment -> Debugger setting of Webstorm fixed it for now.
  //xhttp.open("GET", "https://lichess.org/api/tournament/5upWReOp/results", true)   // Pgn can be downloaded like this: "https://lichess.org/api/tournament/5upWReOp/games?pgnInJson=true"
  xhttp.open("GET", "https://lichess.org/api/tournament/5upWReOp/games", true)
  xhttp.send()
*/
}

const zeroPad = (num, places) => String(num).padStart(places, '0')
function formatTime(time) {
  let minutes = Math.floor(time / 60)
  let seconds = time % 60
  return minutes + ":" + zeroPad(seconds, 2)
}

export function gameListData(games) {
  let tableData = []
  games.games.forEach( g => {
    let result = ""
    if (g.winner === "black") result = "0-1"
    else if (g.winner === "white") result = "1-0"
    else result = "½-½"
    let opening = ""
    if (g.opening !== undefined) opening = g.opening.name
    let ply = g.ply
    let time = Math.floor((g.lastMoveAt - g.createdAt) / 1000)

    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1
      return len > 0? new Array(len).join(chr || '0')+this : this
    }
    let d = new Date(0) // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(g.createdAt/1000)
    let date = [d.getFullYear().padLeft(), (d.getMonth()+1).padLeft(), d.getDate().padLeft()].join('/')+' '+ [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':')

    let url = "https://lichess.org/" + g.id

    let mainMFURL = window.location.origin + "/MondayFight"

    let row = {
      "id": g.id,
      "date": {date: date, html: `<a href="${mainMFURL}/?mf=${g.tournament}" class="result-url">${date}</a>`},
      "speed": g.speed,
      "white": g.players.white.user.name,
      "black": g.players.black.user.name,
      "result": {result: result, html: `<a href="${url}" class="result-url">${result}</a>`},
      "moves": ply,
      "time": time,
      "opening": opening,
      "status": g.status,
      "trophy": getTrophies(g)
    }
    tableData.push(row)
  })
  return tableData
}

export var gameListTable
export function createGameListTable(games, tableId, addDate, noStats, winner) {
  let gamesData = gameListData(games)

  function detectWhiteWinner(cell, pars) {
    if (cell._cell.row.data.result.result=="1-0") return "<b>"+cell.getValue()+"</b>"
    else return cell.getValue()
  }
  function detectBlackWinner(cell, pars) {
    if (cell._cell.row.data.result.result=="0-1") return "<b>"+cell.getValue()+"</b>"
    else return cell.getValue()
  }
  let columnsAr = [{formatter: "rownum", headerSort: false, resizable:false}] //add auto incrementing row number
  if (addDate) {
    columnsAr.push({title: "date", field: "date", resizable:false, formatter: (cell, pars) => cell.getValue().html, sorter: (a, b) => a.date.localeCompare(b.date)})
  }
  columnsAr = columnsAr.concat([
    {title: "speed", field: "speed", resizable:false, align: "center"},
    {title: "white", field: "white", resizable:false, formatter: detectWhiteWinner},
    {title: "black", field: "black", resizable:false, formatter: detectBlackWinner},
    {title: "result", field: "result", resizable:false, align: "center", formatter: (cell, pars) => cell.getValue().html, sorter: (a, b) => a.result.localeCompare(b.result)},
    {title: "moves", field: "moves", align: "center", resizable:false, formatter: (cell, pars) => Math.floor((cell.getValue()+1)/2) },
    {title: "time", field: "time", align: "center", resizable:false, formatter: (cell, pars) => formatTime(cell.getValue()) },
    {title: "opening", field: "opening", resizable:false},
    {title: "status", field: "status", align: "center", resizable:false},
    {title: "trophy", field: "trophy", align: "center", resizable:false, formatter: (cell, pars) => cell.getValue()}
  ])
  gameListTable = new Tabulator(tableId, {
    layout: "fitDataTable",
    reactiveData: true, // we want setData having effect
    rowFormatter: function(row){
      if (row.getData().date && row.getData().date.html.match(/playOFF/)) {
        let col = '#def'
        if (row.getPosition(false) % 2 > 0) col = '#d0e0f0'
        const children = row.getElement().childNodes[1].style.backgroundColor = col
      }
    },
    columns: columnsAr
  })
  gameListTable.setData(gamesData)

  if (noStats != true) createStatisticsBars(gamesData, tableId, winner)
}


function myLinkFormatter(cell, formatterParams) {
  let cellValue = cell.getValue()
  let data = cell.getData()
  let label = data["name"]
  let rank = data["rank"]
  let prank = data["prank"]


  let color = "red"
  if (rank < 5) color = "green"
  else if (rank < 13) color = "blue"

  let arrow = ""
  if (rank - prank < 0) arrow = "<span style='color: green'><b>&#9650;</b></span>"
  else if (rank - prank > 0) arrow = "<span style='color: red'><b>&#9660;</b></span>"

  return `<a class="league-link" href="${cellValue}" target="_blank" style="color: ${color}">${label}${arrow}</a>`
}

function rankFormatter(cell, formatterParams) {
  let cellValue = cell.getValue()
  let rank = cell.getData()["rank"]

  let color = "red"
  if (rank < 5) color = "green"
  else if (rank < 13) color = "blue"

  cell.getElement().style.backgroundColor = color
  return `<span style="color:lightgray"><b>${cellValue}</b></span>`
}

export function getLeagueDataOfPlayers(theFights, mfId) {
  let lastFight = theFights.find(fight =>
    fight.id === mfId
  )
  let players = getPlayers(theFights)
  let tableData = []
  players.forEach( player => {
      let averagePerformance = getAvgPerformance(player, theFights)
      let totalPoints = getTotalPoints(player, theFights) + averagePerformance / 10000
      let thePlayer = {
        name: player,
        nameUrl: "https://lichess.org/@/" + player,
        totalPts: totalPoints,
        prevPts: totalPoints - playerPoints(lastFight, player)[0],
        games: getTotalGames(player, theFights),
        ratingDiff: getTotalRatingDiff(player, theFights)
      }
      tableData.push(thePlayer)
    }
  )
  let sorted = tableData.sort( (a,b) => {
    if (a.prevPts > b.prevPts) return -1
    else if (a.prevPts < b.prevPts) return 1
    else return 0
  })
  sorted.forEach(
    (player, index) =>
      player.prank = index + 1
  )

  sorted = tableData.sort( (a,b) => {
    if (a.totalPts > b.totalPts) return -1
    else if (a.totalPts < b.totalPts) return 1
    else return 0
  })

  sorted.forEach(
    (player, index) =>
      player.rank = index + 1
  )

  return sorted
}


let leagueHistory = new Map()
function initLeagueHistory(data, date) {
  leagueHistory = new Map()

  let theFights = MF.filterUpTo(data.mondayFights(), date)

  getPlayers(theFights).forEach(p => leagueHistory.set(p, {p: 0, e: 0, g: 0, history: []}))

  theFights.forEach(f => {
     f.standing.players.forEach(p => {
       let pl = leagueHistory.get(p.name)
       if (pl) {
         pl.p += p.points[0]
         let games = p.sheet.scores.length
         if (games > 0) {
           pl.e = (pl.e * pl.g + p.performance * games) / (pl.g + games)
           pl.g += games
         }
       }
     })
    Array.from(leagueHistory.keys()).forEach(p => {
        let pl = leagueHistory.get(p)
        pl.history.push({p: pl.p, g: pl.g, e: pl.e})
      }
    )
  })

  let showNames = function() {
    let plAr = Array.from(leagueHistory.keys())
    let pls = plAr.map(name => {
      return {name: name, d: leagueHistory.get(name) }
    })
    pls.sort(function(a,b) {
      return b.d.p - a.d.p
    })
    return pls.splice(0,8).map(p => p.name)
  }()

  let plAr = Array.from(leagueHistory.keys())
  let datasets = plAr.map(function(name) {
    let history = leagueHistory.get(name).history.map(h => h.p || undefined)
    return {
      label: name,
      data: history,
      hidden: showNames.indexOf(name) < 0
    }
  })
  datasets.sort(function(a,b) {
    return leagueHistory.get(b.label).p - leagueHistory.get(a.label).p
  })
  let tableData = {
    labels: theFights.map(f => {
        let d = new Date(f.startsAt)
        return [d.getDate(), d.getMonth() + 1].join('.')
      }
    ),
    datasets: datasets
  }

  return tableData
}

export function changeChartDataType(type) {
  function getData(h) {
    switch (type) {
      case "games": return h.g || undefined
      case "performance": return Math.round(h.e) || undefined
      default: return h.p || undefined
    }
  }

  myChart.data.datasets.forEach(function(d) {
    d.data = leagueHistory.get(d.label).history.map(h => getData(h))
  })

  myChart.data.datasets.sort(function(a,b) {
    return getData(leagueHistory.get(b.label)) - getData(leagueHistory.get(a.label))
  })
  myChart.update()
}

export function getLeagueData(data) {
  let mfId = data.tournamentGames()[data.currentGameListTableIx].id
  let date = new Date(data.findTournament(mfId).startsAt)

  let fights = MF.filterUpTo(data.mondayFights(), date)
  return {
    league: getLeagueDataOfPlayers(fights, mfId),
    count: fights.length
  }
}

export async function downloadUserDataIntoLeague(league) {
  let ids = league.map(p => p.name).join(',')
  return await LAPI.lichessAPI().users(ids).then( users => {
    for (let i=0; i<league.length; i++) {
      let data = users.find(u => u.username === league[i].name)
      league[i].data = data
    }
    return league
  })
}

export var leagueTable
export function createLeagueTable(data, tableId, leagueNoId, spiderId, challengeAvgId, challengerId) {
  document.getElementById(tableId.substring(1)).innerHTML = ""

  const {league: dataOfPlayers, count: fightsCount} = getLeagueData(data)

  leagueTable = new Tabulator(tableId, {
    layout: "fitDataTable",
    reactiveData:true, // we want setData having effect
    data: dataOfPlayers,
    columns: [
      {title: "", field: "rank", headerSort: false, resizable:false, align: "center", formatter:rankFormatter},
      {title: "Hráč", field: "nameUrl", headerSort: false, resizable:false, formatter:myLinkFormatter},
      {title: "Pt", field: "totalPts", headerSort: false, resizable:false, headerSortStartingDir:"desc", headerTooltip:"celkový počet bodů", formatter: totalPtsFormatter},
      {title: "G", field: "games", headerSort: false, resizable:false, headerSortStartingDir:"desc", headerTooltip:"počet her"},
      {title: "R", field: "ratingDiff", headerSort: false, resizable:false, headerSortStartingDir:"desc", headerTooltip:"změna ratingu"},
    ]
  })

  if (spiderId) {
    let mfId = data.tournamentGames()[data.currentGameListTableIx].id
    let date = new Date(data.findTournament(mfId).startsAt)
    drawSpider(dataOfPlayers, spiderId, date.getFullYear())
  }

  if (leagueNoId) {
    document.getElementById(leagueNoId).innerHTML = `${fightsCount}.týden`
  }
  if (challengeAvgId) {
    let weeksLeft = 52 - fightsCount
    let text = "** mission failed **"
    if (weeksLeft > 0) {
      let jouzoPts = Math.round(2 * dataOfPlayers[0].totalPts) / 2
      let avg = Math.round(10 * (371.5 - jouzoPts) / weeksLeft) / 10
      text = avg.toString()
    } else if (dataOfPlayers[0].totalPts >= 371.5) text = "** mission accomplished **"
    let id1 = document.getElementById(challengeAvgId)
    if (id1) id1.innerHTML = `${text}`
    let id2 = document.getElementById(challengerId)
    if (id2) id2.innerHTML = `${dataOfPlayers[0].name}`
  }
}

let myChart = undefined
export function createLeagueHistoryChart(data, chartId, date) {
  if (chartId) {
    const chartDiv = document.getElementById(chartId);

    const typeSelector = document.createElement("form")
    let lbl = document.createElement("b")
    lbl.appendChild(document.createTextNode("Data v grafu: "))
    typeSelector.appendChild(lbl)
    const selData = {
      points: false,
      games: false,
      performance: false
    }
    let first = true
    for (let key in selData) {
      let input = document.createElement("input");
      input.type = "radio";
      input.setAttribute("name", "type")
      input.setAttribute("value", key)
      input.addEventListener('click', function() {
        changeChartDataType(key)
      })
      if (first) {
        input.setAttribute("checked", true)
        first = false
      }

      let label = document.createElement("label");
      label.innerText = key;
      typeSelector.appendChild(input);
      typeSelector.appendChild(label);
    }
    chartDiv.appendChild(typeSelector)

    let ctx = document.createElement("canvas")
    ctx.setAttribute("class", "league-chart")
    let someDiv = document.createElement("div")
    someDiv.appendChild(ctx)
    chartDiv.appendChild(someDiv)

    if (! date) {
      let mfId = data.tournamentGames()[data.currentGameListTableIx].id
      date = new Date(data.findTournament(mfId).startsAt)
    }
    let tableData = initLeagueHistory(data, date)

    myChart = new Chart(ctx, {
      type: 'line',
      data: tableData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 10
            }
          }
        }
      }
    });


  }
}

function getGameListResultStats(gamesData) {
  let white = 0, draw = 0, black = 0
  gamesData.forEach(row => {
    if (row.result.result == '1-0') white++
    else if (row.result.result == '0-1') black++
    else draw++
  })
  return ['', white, draw, black]
}

function getGameListMostActivePlayerStats(gamesData, winner) {
  let bossPlayer = ""
  if (winner) {
    bossPlayer = winner
  } else {
    let players = new Map()
    function incrementPlayer(player) {
      let data = players.get(player)
      if (data === undefined) data = 0
      data++
      players.set(player, data)
    }
    gamesData.forEach(row => {
      incrementPlayer(row.white)
      incrementPlayer(row.black)
    })
    let max = ["", -1]
    for(let [pl, num] of players){
      if (num > max[1]) max=[pl, num]
    }
    bossPlayer = max[0]
  }
  let bossWhite = {win: 0, draw: 0, loss: 0}
  let bossBlack = {win: 0, draw: 0, loss: 0}
  gamesData.forEach(row => {
    if (row.white==bossPlayer) {
      if (row.result.result == "1-0") bossWhite.win++
      else if (row.result.result == "0-1") bossWhite.loss++
      else bossWhite.draw++
    } else if (row.black==bossPlayer) {
      if (row.result.result == "0-1") bossBlack.win++
      else if (row.result.result == "1-0") bossBlack.loss++
      else bossBlack.draw++
    }
  })
  return {player: bossPlayer, whiteStats: bossWhite, blackStats: bossBlack}
}

var myGoogleCharts = new Map()

export function updateMostActivePlayer(id, gamesData, winner) {
  let plStats = getGameListMostActivePlayerStats(gamesData, winner)

  let barData = myGoogleCharts.get(id+'plwhite')
  if (barData !== undefined) {
    let data = google.visualization.arrayToDataTable([
      ['Genre', plStats.player + ' wins', 'Draw', 'Black wins'],
      [plStats.player + ' White', plStats.whiteStats.win, plStats.whiteStats.draw, plStats.whiteStats.loss]
    ])
    barData.chart.draw(data, barData.options)
  }
  let barData2 = myGoogleCharts.get(id+'plblack')
  if (barData2 !== undefined) {
    let data = google.visualization.arrayToDataTable([
      ['Genre', 'White wins', 'Draw', plStats.player + ' wins'],
      [plStats.player + ' Black', plStats.blackStats.loss, plStats.blackStats.draw, plStats.blackStats.win]
    ])
    barData2.chart.draw(data, barData2.options)
  }
  let barData3 = myGoogleCharts.get(id+'plall')
  if (barData3 !== undefined) {
    let data = google.visualization.arrayToDataTable([
      ['Genre', plStats.player + ' wins', plStats.player + ' draw', plStats.player + ' loss'],
      ['', plStats.whiteStats.win+plStats.blackStats.win, plStats.whiteStats.draw+plStats.blackStats.draw, plStats.whiteStats.loss+plStats.blackStats.loss]
    ])
    barData3.chart.draw(data, barData3.options)
  }
}

export function updateGoogleBar(barid, gamesData) {
  let barData = myGoogleCharts.get(barid)
  if (barData !== undefined) {
    let statsData = getGameListResultStats(gamesData)
    let data = google.visualization.arrayToDataTable([
      ['Genre', 'White wins', 'Draw', 'Black wins'],
      statsData
    ])
    barData.chart.draw(data, barData.options)
  }
}

function createStatisticsBars(gamesData, tableId, winner) {
  let wbStat = getGameListResultStats(gamesData)
  let wbArrayData = [['Genre', 'White wins', 'Draw', 'Black wins'], wbStat]
  let id = null
  let idHash = tableId.match(/#(.+)/)
  if (Array.isArray(idHash)) id = idHash[1]
  if (id != null) {
    // see: https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
    //const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vw = Math.max(document.documentElement.clientWidth || 0, 360)

    createStatsBar4GameList(wbArrayData, id+"Bar", vw)

    let plStats = getGameListMostActivePlayerStats(gamesData, winner)
    let plwhiteData = [
      ['Genre', plStats.player + ' wins', 'Draw', 'Black wins'],
      [plStats.player + ' White', plStats.whiteStats.win, plStats.whiteStats.draw, plStats.whiteStats.loss]
    ]
    createStatsBar4GameList(plwhiteData, id+"plwhite", vw)
    let plblackData = [
      ['Genre', 'White wins', 'Draw', plStats.player + ' wins'],
      [plStats.player + ' Black', plStats.blackStats.loss, plStats.blackStats.draw, plStats.blackStats.win]
    ]
    createStatsBar4GameList(plblackData, id+"plblack", vw)
    let plallData = [
      ['Genre', plStats.player + ' wins', plStats.player + ' draw', plStats.player + ' loss'],
      ['', plStats.whiteStats.win+plStats.blackStats.win, plStats.whiteStats.draw+plStats.blackStats.draw, plStats.whiteStats.loss+plStats.blackStats.loss]
    ]
    createStatsBar4GameList(plallData, id+"plall", vw, ['#9c0', 'grey', 'red'])
  }
}

function createStatsBar4GameList(arrayData, id, vw, colorListPar) {
    let colorList = (colorListPar !== undefined) ? colorListPar : ['white', 'grey', 'black']
    let barElement = document.getElementById(id)
    if (barElement != null) {
      // Load google charts
      google.charts.load('current', {'packages':['corechart']})

      google.charts.setOnLoadCallback(drawChart)

      // Draw the chart and set the chart values
      function drawChart() {
        var data = google.visualization.arrayToDataTable(arrayData)

        var options = {
          width: Math.min(vw, 600),
          height: 80,
          legend: { position: 'top', maxLines: 3 },
          bar: { groupWidth: '75%' },
          colors: colorList,
          backgroundColor: '#E4E4E4',
          isStacked: 'percent'
        }
        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.BarChart(barElement)
        myGoogleCharts.set(id, {'chart': chart, 'options': options})
        chart.draw(data, options)
      }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fetch demo
function textFile2String(path) {
  fetch(path)
    .then(response => response.text())
    .then((data) => {
      console.log(data)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main initialization

function updateHTMLWithDownloadedTournaments(data, downloadedTournaments) {
  let tag = document.getElementById("finalJson")
  tag.innerHTML = JSON.stringify(downloadedTournaments, null, 0);

  // recalculate data and tables
  if (downloadedTournaments.length > 0) {
    let table10 = allMyTables.get("#last10")
    if (table10 !== undefined) {
      let theFights = MF.last10(data.mondayFights())
      table10.setColumns(generatePlayersTableColumns(theFights))
      table10.setData(getDataOfPlayers(theFights))
    }

    let tableAll = allMyTables.get("#mondayFightsLeaderboard")
    if (tableAll !== undefined) {
      let theFights = MF.filterYear(data.mondayFights(), 2022)
      tableAll.setColumns(generatePlayersTableColumns(theFights))
      tableAll.setData(getDataOfPlayers(theFights))
    }
  }
}

export function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function toNDJson(arr) {
  return arr.reduce(function(ndjson, obj) {
    return ndjson + JSON.stringify(obj) + "\n"
  }, "")
}

export function processAdmin(data) {

  // nice is: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  //textFile2String('pgn/parsePgn.js')

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  const admin = urlParams.get('bebul')!=null
  if (admin) {
    let allFights = data.jouzoleanAndBebulsTournaments()

    document.getElementById("adminStuff").style.display = "block"
    let text = ""
/*
    let text = "<table><th>Url</th><th>Players</th><th>Games</th><th>Date</th><th>Gold</th><th>Score</th><th>ELO</th><th>Silver</th><th>Score</th><th>ELO</th><th>Bronze</th><th>Score</th><th>ELO</th>"
    allFights.forEach( function myFunction(value) {
      let info = '<td><a href="https://lichess.org/tournament/' + value.id + '">' + value.id + '<\a></td>'
      info += '<td>' + value.nbPlayers + '</td>'
      info += '<td>' + value.stats.games + '</td>'
      info += '<td>' + value.startsAt + '</td>'
      let winner = value.standing.players[0]
      info += '<td>' + winner.name + '</td>'
      info += '<td>' + winner.score + '</td>'
      info += '<td>' + winner.rating + '</td>'
      winner = value.standing.players[1]
      info += '<td>' + winner.name + '</td>'
      info += '<td>' + winner.score + '</td>'
      info += '<td>' + winner.rating + '</td>'
      if (value.nbPlayers > 2) {
        winner = value.standing.players[2]
        info += '<td>' + winner.name + '</td>'
        info += '<td>' + winner.score + '</td>'
        info += '<td>' + winner.rating + '</td>'
      }
      text += "<tr>" + info + "</tr>"
    })
    text += "</table>"
*/
    text += "      <div style=\"margin: 10px 0\">\n" +
      "                <button id=\"dwnlALL\">Download ALL new Monday Fight Tournamens</button>\n" +
      "            <div>Zadej id konkrétního turnaje, který chceš downloadovat:\n" +
      "                <input type=\"text\" id=\"tournamentDwnlID\" style=\"width:100%\">\n" +
      "                <input type='checkbox' id='rename' checked='true'>Rename</input>" +
      "                <br>\n" +
      "                <button id=\"dwnl\">Download</button>\n" +
      "            </div>\n" +
      "        </div>\n" +
      "  <hr><pre id='tournamentDwnlResult'>Tady se objeví výsledek downloadu</pre>" +
      "  <hr><pre id='tournamentGamesResult'>Tady se objeví výsledek downloadu her</pre>"

    document.getElementById("demo").innerHTML = text
    document.getElementById("dwnl").onclick = function() {
      let rename = document.getElementById("rename").checked
      LAPI.onDwnlTournamentClicked(data, rename)
    }

    document.getElementById("dwnlALL").onclick = function() {
      LAPI.lichessTournamentsAPI(allFights, ["bebul","Jouzolean"]).downloadMissing(LAPI.updateHTMLurlRequestsList)
        .then(function(downloadedTournaments) {
            if (downloadedTournaments.length) {
              data.addTournaments(downloadedTournaments) // updates mondayFights and everything
              updateHTMLWithDownloadedTournaments(data, downloadedTournaments)
              LAPI.lichessAPI().downloadMissingTournamentGames(data, LAPI.updateHTMLurlRequestsList)
                .then(function(games) {
                  data.addGames(games)
                  downloadedTournaments.forEach(t => data.addExtras(t))
                  addNewGamesStats(data, games)
                    .then(function(result) {
                      download("tournaments.ndjson", toNDJson(data.jouzoleanAndBebulsTournaments()))
                      download("tournamentGames.ndjson", toNDJson(data.tournamentGames()))
                    })
                })
            }
          }
        )
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Table helpers, formatters etc.
function jouzoCoinsFormatter(cell, formatterParams) {
  let cellValue = cell.getValue()
  if (cellValue===undefined) return ""
  if (cellValue.rank == 1) cell.getElement().style.backgroundColor = "gold"
  else if (cellValue.rank == 2) cell.getElement().style.backgroundColor = "silver"
  else if (cellValue.rank == 3) cell.getElement().style.backgroundColor = "#cd7f32"
/*
  else if (cellValue.rank == 4) cell.getElement().style.backgroundColor = "lightgreen"
  else if (cellValue.rank <= 6 && cellValue.players >= 10) cell.getElement().style.backgroundColor = "orange"
*/
  let value = ''
  let mfMode = this.table.mfMode
  if (mfMode === 'jouzoCoins') value = cellValue.jouzoCoins
  else if (mfMode === 'present') value = cellValue.present
  else if (mfMode === 'totalScore') value = cellValue.score
  else if (mfMode === 'totalPts') value = cellValue.points
  else if (mfMode === 'games') value = cellValue.games
  else if (mfMode === 'avgPerformance') value = cellValue.performance
  else if (mfMode === 'avgOponent') value = cellValue.oponent
  else if (mfMode === 'ratingDiff') value = cellValue.diff
  else if (mfMode === 'fastestMates') value = cellValue.mate
  else if (mfMode === 'fastestGames') value = cellValue.fast
  else if (mfMode === 'sensations') value = cellValue.sensation

  if (cellValue.present) return value
  else return ""
}

function totalPtsFormatter(cell, formatterParams) {
  let cellValue = cell.getValue()
  if (cellValue===undefined) return ""
  return Math.floor(2 * cellValue) / 2
}

function dataSortedFunc(sorters) {
  let newMode = undefined
  sorters.forEach( function(srt) {
      if (srt.field === 'jouzoCoins' ||
        srt.field === 'totalScore' ||
        srt.field === 'totalPts' ||
        srt.field === 'games' ||
        srt.field === 'avgPerformance' ||
        srt.field === 'avgOponent' ||
        srt.field === 'ratingDiff' ||
        srt.field === 'fastestMates' ||
        srt.field === 'fastestGames' ||
        srt.field === 'sensations'
      ) newMode = srt.field
    }
  )
  if (newMode !== undefined && this.mfMode != newMode) {
    this.mfMode = newMode
    //and we must call something like row.reformat() or column.reformat for each column
   this.redraw(true)
  }
}

export var allMyTables = new Map()
export function createPlayersTable(theFights, tableId, enableJouzocoins) {
  document.getElementById(tableId.substring(1)).innerHTML = ""
  let playersTable = new Tabulator(tableId, {
    layout: "fitDataTable",
    reactiveData:true, // we want setData having effect
    dataSorted: dataSortedFunc,
    data: getDataOfPlayers(theFights),
    columns: generatePlayersTableColumns(theFights, enableJouzocoins)
  })
  allMyTables.set(tableId, playersTable)
  if (enableJouzocoins) playersTable.setSort("jouzoCoins", "desc")
  else playersTable.setSort([{column: "totalPts", dir: "desc"}])
}

function tournamentSpecHtml(tournament, games) {
  function specTagRegExp(tag) {
    return new RegExp(`<${tag}[ ]+json='([^'<]*)'[ ]*([^<]*)\\/>`)
  }
  let s = tournamentSpec.find(s => s.id === tournament.id)
  if (s) {
    let html = s.html
    let playOFF = s.playOFF
    let init = []

    function parseHtml(html) {
      let specialTagList = ["tooltip", "board"]
      for (let tagIx in specialTagList) {
        let tag = specialTagList[tagIx]
        let done = false
        do {
          let regex = specTagRegExp(tag)
          let matches = html.match(regex)
          // 0 = "<tooltip json='id:"sachycvek", size:1.0' style='margin:80px 20px 150px 20px'/>"
          // 1 = "id:"sachycvek", size:1.0"
          // 2 = "style='margin:80px 20px 150px 20px'"
          if (matches) {
            let json = matches[1]
            let parsed = JSON.parse(matches[1]) // id, size
            let finalHtml = ""
            switch (tag) {
              case "tooltip":
                let tooltipHtml = getTipHtml(games.games, tournament, parsed.id, parsed.size)
                finalHtml = `<div class="tooltip no-dots" ${matches[2]}><div class="tooltiptext" style="visibility:visible; position:relative; font-size:${parsed.size}em">${tooltipHtml}</div></div>`
                html = html.replace(regex, `<div ${matches[2]}>${finalHtml}</div>`)
                break
              case "board":
                let game = games.games.find(g => g.id===parsed.id)
                let defaults = {
                  pgn: MFPodium.toPGN(game, false),
                  showCoords: false, coordsInner: false, headers: true,
                  theme: 'brown', movesHeight: 60
                }
                let config = {...defaults, ...parsed}  // merge with possible other values in json
                let boardId = `board-${parsed.id}`
                finalHtml = `<div class="boards board"><div id="${boardId}"></div></div>`
                html = html.replace(regex, `<div ${matches[2]}>${finalHtml}</div>`)
                init.push(() => {
                  console.log(document.getElementById(boardId).clientWidth)
                  PGNV.pgnView(boardId, {...config, ...{boardSize: document.getElementById(boardId).clientWidth - 10}})
                }) // margin compensation
                break
            }
          } else done = true
        } while (!done)
      }
      return html
    }
    if (html) html = parseHtml(html)
    if (playOFF) playOFF = parseHtml(playOFF)
    return {html: html, playOFF: playOFF, init: init}
  } else return s
}

export function updateSpecificTournamentHtml(divId, data, games) {
  let tournament = data.findTournament(games.id)
  let s = tournamentSpec.find(s => s.id === tournament.id)
  if (s) {
    let {html, playOFF, init} = tournamentSpecHtml(tournament, games)
    document.getElementById(divId).innerHTML = html
    if (playOFF) document.getElementById(divId + '-play-off').innerHTML = playOFF
    else document.getElementById(divId + '-play-off').innerHTML = ""
    if (s.init) s.init()
    init.forEach(f => f())
  }
  else {
    document.getElementById(divId).innerHTML = ""
    let playOff = document.getElementById(divId + '-play-off')
    if (playOff) playOff.innerHTML = ""
  }
}

export function updateTournamentHtmlAuto(divId, tournamentId, data) {
  let fight = data.findTournament(tournamentId)
  let borec = fight.standing.players.reduce(function(current, player) {
    if (current) {
      if (player.performance - player.rating > current.performance - current.rating &&
        player.points && player.points[0] >= 2 && player.points[0]+player.points[1] >= 4) return player
      else return current
    } else if (player.points && player.points[0] >= 2 && player.points[0]+player.points[1] >= 4) return player
    else return null
  }, null)
  let borecAvg = fight.standing.players.reduce(function(current, player) {
    if (current) {
      if (player.avgOponent > current.avgOponent &&
        player.points[0]+player.points[1] >= 4) return player
      else return current
    } else if (player.points[0]+player.points[1] >= 4) return player
    else return null
  }, null)
  document.getElementById(divId).innerHTML = `<span class="player-blue"><b>${borec.name}</b></span> zahrál o ${borec.performance - borec.rating} lépe, než odpovídá jeho ratingu. Gratulujeme!
     <span class="player-blue"><b>${borecAvg.name}</b></span> čelil nejtěžším soupeřům s ratingem ${borecAvg.avgOponent} v průměru.
     `
}

let withdrawals = [] // ['bebul','mozkomor']
async function drawSpider(dataOfPlayers, spiderId, year) {
  // filter withdrawals
  let playerList = dataOfPlayers.map(p => p.name).filter(p =>
    ! withdrawals.includes(p.toLowerCase())
  )
  let withdrawingPlayers = withdrawals.filter(p => dataOfPlayers.reduce(function(a,c,ix) {
      return a || (ix < 12 && c.name.toLowerCase()===p)
    } , false)
  )

  let GLOB = {
    width: 1190, height: 670,
    padX: 20, padTop: 60, padBottom: 20,
    centerWidth: 150,
    fontSize: 45,
    conex: 90
  }
  GLOB.netH = GLOB.height - GLOB.padTop - GLOB.padBottom
  GLOB.picH = 0.9 * GLOB.netH / 6
  GLOB.wPicH = GLOB.picH * 0.8

  let canvas = document.getElementById(spiderId)
  let ctx = canvas.getContext("2d")

  Promise.all([
    document.fonts.load("18px 'Bahnshrift Light'"),
    document.fonts.load("18px 'FjallaOne'")
  ]).then(function() {
    let img = new Image()
    img.onload = function () {
      ctx.drawImage(img, 0, 0)

      let topLine = GLOB.padTop
      ctx.font = `${1.3 * GLOB.fontSize}px FjallaOne`
      let text = "MONDAY FIGHT ARENA"
      let textInfo = ctx.measureText(text)
      let textX = 0.5 * GLOB.width - textInfo.width / 2
      ctx.fillText(text, textX, topLine + 10)

      let fs2 = 1.3 * GLOB.fontSize * 25 / 45
      ctx.font = `${fs2}px FjallaOne`
      let text2 = `TURNAJ ŠAMPIONŮ ${year}`
      let textInfo2 = ctx.measureText(text2)
      ctx.fillStyle = "red";
      //ctx.fillText(text2,  textX + textInfo.width - textInfo2.width, topLine + 1.2 * fs2 )
      ctx.fillText(text2, 0.5 * GLOB.width - textInfo2.width / 2, topLine + 1.2 * fs2 + 20)

      let fs3 = GLOB.fontSize * 13 / 45
      let fs4 = GLOB.fontSize * 20 / 45
      ctx.fillStyle = "#888";
      ctx.font = `condensed ${fs3}px Bahnshrift Light`
      let nums = [1, 8, 9, 4, 5, 12, 2, 7, 10, 3, 6, 11]

      function trLeft(x) {
        return x + GLOB.padX
      }

      function trRight(x) {
        return GLOB.width - x - GLOB.padX
      }

      function alignLeft(trans, x) {
        return trans(x)
      }

      function alignRight(trans, x, text) {
        let width = ctx.measureText(text).width
        return trans(x) - width
      }

      function drawWithdrawals() {
        if (withdrawingPlayers.length > 0) {
          let fs2 = 1.3 * GLOB.fontSize * 15 / 45
          ctx.font = `${fs2}px FjallaOne`
          let text2 = "ODSTOUPILI"
          let textInfo2 = ctx.measureText(text2)
          ctx.fillStyle = "red";
          ctx.fillText(text2, 0.5 * GLOB.width - textInfo2.width / 2, GLOB.netH - 10)

          let images = []
          for (let i = 0; i < withdrawingPlayers.length; i++) {
            let name = withdrawingPlayers[i]
            let avatar = Avatars.getAvatar(name, "img/achievements/kun.png")
            if (avatar) {
              let img = new Image();
              img.onload = function () {
                images.push(img)
                if (images.length === withdrawingPlayers.length) {
                  let space = 10
                  let totalLength = images.reduce(function f(a, img) {
                    let aspect = img.width / img.height
                    return a + aspect * GLOB.wPicH
                  }, 0)
                  totalLength += space * (withdrawingPlayers.length - 1)

                  let curX = (GLOB.width - totalLength) / 2
                  images.forEach( function(img) {
                    let aspect = img.width / img.height
                    ctx.drawImage(img, curX, GLOB.netH, aspect * GLOB.wPicH, GLOB.wPicH)
                    curX += aspect * GLOB.wPicH + space
                  })
                }
              }
              img.src = avatar
            }
          }
        }
      }

      drawWithdrawals()

      function drawNet(trans, right) {
        let img = new Image();
        img.onload = function () {
          // 60*121 i.e. 1:2
          ctx.drawImage(img, (GLOB.width - GLOB.centerWidth) / 2, 250, GLOB.centerWidth, 2 * GLOB.centerWidth)
        }
        img.src = "img/players/logo-kral.png"

        let x = trans(0)
        for (let i = 1; i <= 6; i++) {
          let y = GLOB.padTop + i * GLOB.netH / 6
          ctx.moveTo(x, y);
          let len = (GLOB.width - GLOB.centerWidth) / 2 - 2 * GLOB.conex
          if (i % 3 !== 1) len -= GLOB.conex
          ctx.lineTo(trans(len), y)

          // texts
          let no = nums.shift()
          let txNo = `${no}.`
          ctx.fillStyle = "#888";
          ctx.font = `condensed ${fs3}px Bahnshrift Light`
          let alx = right ? alignRight(trans, 0, txNo) : alignLeft(trans, 0)
          ctx.fillText(txNo, alx, y + 1.2 * fs3)
          ctx.fillStyle = "black";
          ctx.font = `condensed ${fs4}px Bahnshrift Light`
          let name = playerList[no - 1]
          if (i % 3 === 2) {
            alx = right ? alignLeft(trans, len, name) : alignRight(trans, len, name)
            ctx.fillText(name, alx, y - 0.3 * fs4)
            // avatar
            let avatar = Avatars.getAvatar(name, "img/achievements/kun.png")
            if (avatar) {
              let img = new Image();
              img.onload = function () {
                let aspect = img.width / img.height
                let imgX = right ? 0 : aspect * GLOB.picH
                ctx.drawImage(img, trans(imgX) - aspect * GLOB.picH, y - GLOB.picH - 1, aspect * GLOB.picH, GLOB.picH)
              }
              img.src = avatar
            }
          } else {
            alx = right ? alignRight(trans, 0, name) : alignLeft(trans, 0, name)
            ctx.fillText(name, alx, y - 0.3 * fs4)
            // avatar
            let avatar = Avatars.getAvatar(name, "img/achievements/strelec.png")
            if (avatar) {
              let img = new Image();
              img.onload = function () {
                let aspect = img.width / img.height
                let imgX = right ? aspect * GLOB.picH : 0
                ctx.drawImage(img, trans(imgX + len - aspect * GLOB.picH - 1), y - GLOB.picH - 1, aspect * GLOB.picH, GLOB.picH)
              }
              img.src = avatar
            }
          }

          if (i % 3 === 2) {
            ctx.lineTo(trans(len), y + GLOB.netH / 6)
            ctx.moveTo(trans(len), y + GLOB.netH / 12)
            ctx.lineTo(trans(len + GLOB.conex), y + GLOB.netH / 12)
          }
          if (i % 3 === 1) {
            ctx.lineTo(trans(len), y + GLOB.netH / 4)
            ctx.moveTo(trans(len), y + GLOB.netH / 8)
            ctx.lineTo(trans(len + GLOB.conex), y + GLOB.netH / 8)
            if (i === 1) {
              ctx.lineTo(trans(len + GLOB.conex), y + GLOB.netH / 8 + GLOB.netH / 2)
              ctx.moveTo(trans(len + GLOB.conex), y + GLOB.netH / 8 + GLOB.netH / 4)
              ctx.lineTo(trans(len + 1.75 * GLOB.conex), y + GLOB.netH / 8 + GLOB.netH / 4)
            }
          }
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.strokeStyle = "black";
      drawNet(trLeft, false)
      drawNet(trRight, true)
    }
    img.src = "img/players/background.jpg"
  })
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 ![https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details](https://bebul.github.io/MondayFight/img/elo.png)
*/
function playerOddsByELO(players) {
  let [rA, rB] = players.map(pl => pl.data.perfs.blitz.rating)
  let qA = Math.pow(10, rA / 400)
  let qB = Math.pow(10, rB / 400)
  let eA = qA / (qA + qB)
  let eB = qB / (qA + qB)
  return [eA, eB]
}
function playerOddsByHistory(players) {
  let cross = players[0].crossData.pl0 + players[0].crossData.pl1
  let nums = cross.split('-').map(n => Number.parseInt(n))
  if (nums.length < 2) nums = [0,0]
  let denom = nums[0] + nums[1] || 1
  return {
    count: nums[0] + nums[1],
    odds: [nums[0] / denom , nums[1] / denom]
  }
}
function playerOdds(players, f) {
  let factor = f || 0.5
  let byELO = playerOddsByELO(players)
  let {count: count, odds: byHistory} = playerOddsByHistory(players)
  if (count < 10) factor += (1 - factor) * (9 - count) / 9
  let odds = []
  console.log(`factor:${factor}`)
  for (let i=0; i<2; i++) {
    odds[i] = factor * byELO[i] + (1-factor) * byHistory[i]
  }
  return odds
}

export async function drawEpicCard(dataOfPlayers, crossData, title, cardId) {
  if (!Array.isArray(crossData) || crossData.length != 2) return;

  let GLOB = {
    width: 400, height: 600,
    padTop: 180, fontSize: 45, picH: 65
  }

  let canvas = document.getElementById(cardId)
  let ctx = canvas.getContext("2d")

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // find players in the dataOfPlayers to know their order
  let pl = crossData.map(p => {
      let ret = dataOfPlayers.find(pl => pl.name.toLowerCase() === p.name.toLowerCase())
      ret['crossData'] = p
      return ret
  })
  if (pl.length !== 2) return;
  let titans = pl.sort((a,b) => a.rank - b.rank)
  titans.forEach(p => p.avatar = Avatars.getAvatar(p.name))

  Promise.all([
    downloadUserDataIntoLeague(dataOfPlayers),
    document.fonts.load("18px 'BankGothicCondensed'"),
    document.fonts.load("18px 'BankGothic'"),
  ])
    .then(function() {
    let img = new Image()
    img.onload = function () {
      ctx.drawImage(img, 0, 0)

      ctx.fillStyle = "orange";
      let topLine = GLOB.padTop
      ctx.font = `${0.3 * GLOB.fontSize}px BankGothicCondensed`
      let text = title
      let textInfo = ctx.measureText(text)
      let textX = 0.5 * GLOB.width - textInfo.width / 2
      ctx.fillText(text, textX, topLine + 10)

      ctx.font = `22px BankGothicCondensed`
      let vsText = "Vs."
      let vsInfo = ctx.measureText(vsText)
      let vsX = 0.5 * GLOB.width - vsInfo.width / 2
      ctx.fillText(vsText, vsX, 212 + 30)

      for (let ix=0; ix<2; ix++) {
        // avatar
        let avatar = Avatars.getAvatar(titans[ix].name, "img/players/jouzolean.gif")
        if (avatar) {
          let img = new Image();
          img.onload = function () {
            let aspect = img.width / img.height
            let picW = aspect * GLOB.picH
            let imgX = (ix > 0) ? GLOB.width - 180 + (180 - picW)/2 : (180 - picW)/2
            ctx.drawImage(img, imgX, 174 - GLOB.picH, picW, GLOB.picH)
          }
          img.src = avatar
        }

        ctx.fillStyle = "#eee";
        let topLine = 212 + 40 * ix
        ctx.font = `22px BankGothic`
        let prettyName = capitalizeFirstLetter(titans[ix].name)
        let textInfo = ctx.measureText(prettyName)
        let textX = 0.5 * GLOB.width - textInfo.width / 2
        ctx.fillText(prettyName, textX, topLine + 10)
      }

      function percents(x) {
        return `${Math.round(x * 1000) / 10} %`
      }

      function fastMate(ply) {
        if (!ply) return ""
        return `${Math.floor((ply + 1) / 2)}. tahem`
      }

      let lines = [
        {c:'Nasazení', f: ix => titans[ix].rank, font: '15px BankGothic'},
        {c:'Lichess elo', f: ix => titans[ix].data.perfs.blitz.rating, font: '15px BankGothic'},
        {c:'Vzájemná bilance', f: ix => titans[ix].crossData.pl0 + titans[ix].crossData.pl1, font: '15px BankGothic'},
        {c:'Dal mat druhému', f: ix => fastMate(titans[ix].crossData.fastMate), font: '15px BankGothic'},
        {c:'Celková bilance', f: ix =>  titans[ix].crossData.score, font: '14px BankGothic'},
        {c:'Typické zahájení', f: ix => titans[ix].crossData.opening.name, font: '13px BankGothicCondensed'},
        {c:'Šance na výhru', f: ix => percents(playerOdds(titans)[ix]), font: '15px BankGothic'}
      ];

      function drawLine(n, lines, top, sz) {
        let line = lines[n]
        let h = (GLOB.height - top) / lines.length
        let hoff = h/2 - sz/2
        ctx.fillStyle = "#fff";
        let topLine = top + n * h + hoff
        ctx.font = `${sz}px BankGothic`
        let textInfo = ctx.measureText(line.c)
        let textX = 0.5 * GLOB.width - textInfo.width / 2
        ctx.fillText(line.c, textX, topLine + 10)

        ctx.fillStyle = "#EFB400";
        ctx.font = line.font || `${0.65 * sz}px BankGothicCondensed`

        let leftText = line.f(0)
        let leftX = 10
        ctx.fillText(leftText, leftX, topLine + 10)

        let rightText = line.f(1)
        let rightInfo = ctx.measureText(rightText)
        ctx.fillText(rightText, GLOB.width - leftX - rightInfo.width, topLine + 10)
      }

      for (let i=0; i<lines.length; i++) {
        drawLine(i, lines, 284, 17)
      }

      ctx.strokeStyle = "black";
    }
    img.src = "img/epicBackground.png"
  })
}
