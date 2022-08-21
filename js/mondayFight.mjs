import {MF} from "./tournamentsData.mjs"
import {LAPI} from "./lichessAPIdownloader.mjs"
import {addNewGamesStats} from "./analyze.mjs"
import {Avatars, getTrophies} from "./podium.mjs"

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
  let downloadedTournamentsGames = LAPI.gamesDownloaderAPI().downloadMissingTournamentGames(logger)
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

function getLeagueDataOfPlayers(theFights, mfId) {
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

export function getLeagueData(data) {
  let mfId = data.tournamentGames()[data.currentGameListTableIx].id
  let date = new Date(data.findTournament(mfId).startsAt)

  let fights = MF.filterUpTo(data.mondayFights(), date)
  return {
    league: getLeagueDataOfPlayers(fights, mfId),
    count: fights.length
  }
}

export var leagueTable
export function createLeagueTable(data, tableId, leagueNoId, spiderId) {
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
    drawSpider(dataOfPlayers, spiderId)
  }

  if (leagueNoId) {
    document.getElementById(leagueNoId).innerHTML = `${fightsCount}.týden`
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
              LAPI.gamesDownloaderAPI().downloadMissingTournamentGames(data, LAPI.updateHTMLurlRequestsList)
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

export function updateSpecificTournamentHtml(divId, tournamentId) {
  let spec = [
    {id: "x6hNptkr", html: "<b>Následující hry byly z turnaje odstraněny.</b><br><img src='img/buta.png'><br><br><b>Jouzolean:</b><br> A aby ten dnešek nebyl tak smutný, tak mám taky jednu dobrou zprávu 🙂 Kolem Prahy teď letělo hejno ptáků a skřehotaly, že letí od Dobříše a že prej se tam chystá velká věc! Náš mistr Bukowskic prý bude trénovat místní mládež v šachu! Takže doufáme, že do našich skromných řad přibydou nové šachové naděje v podobě Bukowskiho rekrutů. To je velký krok pro celou Dobříš - až jednou uslyšíte, že Dobříš hraje extraligu, pamatujte kdo za tím stojí!! 😎<br><br>" +
        "<b>DJ-Pesec:</b><br> Tak to gratuluju! Az Buk deti nauci jeho neprostupnou Philidorovu obranu, urcite se neztrati 👍<br><br>" +
        "<b>Bukowskic:</b><br> Jo vrabci, no paráda, teď už z toho nevykroutím. Ale pravda, alespoň se doučím ta zahájení."
    },
    {id: "20AI0ybI", html: "<img src='img/vikJavMeme.jpg'>"},
    {id: "UZ9MlL1y", html: "<img src='img/mf-og-x.jpg'>"},
    {id: "7d6oiMze", html: "<img src='img/mf-og-hot.jpg>"},
    {id: "R77TPv23", html: "<img src='img/mf-og-hot2.jpg'>"},
    {id: "cz8LzOSL", html: "<b>Mrazek:</b><br> Já bych chtěl nenápadně upozornit na to, ne že bych se nějak chvástal, ale že dnes bukowskic byl právě jednou poražen, jedním hráčem, kterého nebudu jmenovat, aby to nevypadalo moc nabubřele. Taková výhra pak dokáže přebít i zklamání z vyhraných partií nedotáhnutých kvůli času či již tradičně prohraných remízových koncovek 🙂 nehledě pak na vyloženě jedovatý zármutek z čistě prohraných partií... to všechno ta jedna výhra dokáže přebít, takovou kouzelnou moc má jedna jediná výhra s bukowskicem. Doporučuju fšem co nejdříve vyzkoušet.<br>Stojí to za to 🙂"},
    {id: "z2iN8qVr", html: "<b>Bebul:</b> Jouzolean v dnešní <a href='https://lichess.org/DxokmcB1/white#65' target='_blank'>parádičce</a> s PuklýmChlebem nejenže dal mat jezdcem, ale tah předtím ještě drze obětoval svou dámu!<br><img src='img/nepraktaManzelHrajeSachy.jpg' style='margin-top:10px'>" +
        "<br><br><b>Bébul:</b> Udělal jsem pár změn na těchto stránkách. Hráči janshorny zůstává šachovnice pro nejrychlejší partii. Raketová výhra však nastala kvůli timeoutu. Není v tom sám, stalo se to už 4x, nově lze takové partie dohledat pomocí dotazu <a href='search.html?q=fastest%20timeout'><b>fastest timeout</b></a>. Plaketka rakety pro vítězné partie do deseti tahů se po úpravě pro vytimeoutované partie už neuděluje, takže po rozkliknutí hráče tam raketa záměrně chybí.<br> Krom toho jsem obohatil search engine o možnosti typu <b>min-moves:100</b> pro hledání dlouhých partií a podobně <b>max-moves:15</b>. Oboje se dá kombinovat. K tomu jsem ještě přidal možnost vyhledat <b>fastest</b>." +
        "<br><br><b>Bébul:</b> Vítáme nového hráče Jana Shorného. Pro budoucí návštěvníky jen pozn. k duplicitě baronGorc a janshorny. Snažili jsme se, aby nový hráč nezačínal s <b>provisional</b> ratingem, což baronGorc zvládl dobře, nicméně měl ještě jeden starý účet, na kterém nehrál a který používat nechtěl. V turnaji se tak objevily účty dva. Lichess naštěstí pároval jen jednoho z nich, ale naneštěstí toho s provizorním ratingem. V datech mimochodem ta informace o provizorním ratingu je, takže se s tím případně dá pracovat."},
    { id: "ayJNboMi",
      init: function() {
        let config = {
          pgn: "[Event \"Monday Fight Arena\"]\n" +
            "[Site \"https://lichess.org/hlwuMuIF\"]\n" +
            "[Date \"2022.04.04\"]\n" +
            "[White \"Margarita_Vlasenko\"]\n" +
            "[Black \"janshorny\"]\n" +
            "[Result \"1-0\"]\n" +
            "\n" +
            "1. e4 e5 2. Bc4 { C23 Bishop's Opening } Qe7 3. d3 Nc6 4. Nf3 f6 5. Nc3 b6 6. O-O d6 7. h3 Bd7 8. Nd5 Qd8 9. c3 Be6 10. d4 Bxd5 11. Bxd5 Nce7 12. Bxa8 Qxa8 13. dxe5 Qxe4 14. exd6 Nd5 15. dxc7 Nxc7 16. Re1 Qe7 17. Rxe7+ Bxe7 18. Bf4 Ne6 19. Bg3 Nh6 20. Qd5 Nf8 21. Re1 Nd7 22. Qe6 Kf8 23. Qxe7+ Kg8 24. Qxd7 g6 25. Re8# { White wins by checkmate. } 1-0",
          showCoords: false, coordsInner: false, headers: true,
          theme: 'brown',
          boardSize: 290,
          movesHeight: 250,
          startPlay: '19'
        }
        PGNV.pgnView("board", config)
      },
      html: "<h2>Добро пожаловать Маргарита</h2>Сегодня Маргарита впервые сыграла в Monday Fight. Но Lichess поставила ее в пару с другими игроками только один раз, и игра была завершена после окончания турнира. Какая красивая <a href='https://lichess.org/hlwuMuIF' target='_blank'>атакующая игра!</a><br><br><div id='board'></div>"
    },
    {id: "ZNI7qbN3", html: "<b>Margarita</b> Привет<br><b>DJ-Pesec</b> Привет<br><b>Mrazek</b> Здравствуй<br><b>VikJav</b> Привет<br><b>tomasklimecky</b> dobře margarita<br><b>mozkomor</b> Nezapočítalo mi to remízu s Jouzoleanem. Vznáším námitku.<br><b>Mrazek</b> bodovaná je jen první remíza v řadě, za další jsou nuly<br><b>Mrazek</b> asi aby se skupinka lidí na turnaji nedohodla na systému neztrácejme čas, dáme remízu a tím by získávali body proti ostatním rychle<br><b>mozkomor</b> To dává smysl. Ale do leaderboadu to hude půlbod, ne?\<br><b>bebul</b> ano, do leaderboardu samozřejmě půl bodu"},
    {id: "aHeatnDc", html: "<img src='img/pomlazka.jpg'>" +
        "<br><br><b>Bébul:</b> V leaderboardových tabulkách je nově sloupec s průměrným protihráčem," +
        "<img src='img/achievements/maraton.png' class='img100 right'> takže si můžeme porovnat, s jak těžkými soupeři kdo hrajeme. Na hlavní stránce jsou zobrazeny všechny odznáčky, ke kterým nově přibyl ševcovský mat s loupežníkem Rumcajsem." +
        "Ševcovské maty lze dohledat v search enginu pomocí klíčového slova scholar. V tooltipu hráče má symbol vysoké boty. Mat dámou nebo střelcem na poli f7/f2 musí padnout nejpozději v devátém tahu. Dále přibyl odznak pro vítězný maraton pro vítězství v aspoň 100 tahové partii a mat na poslední chvíli, pokud padl do deseti sekund před koncem turnaje. V detailu hráče je nově možno otevřít" +
        "<img src='img/achievements/castling-mate.png' class='img100 left'> jednotlivé hry kliknutím na výsledek v prostředním sloupci. A nahoře je počet odehraných her, abyste nemuseli pořád počítat, kolik těch her vlastně RychlyLenochod dneska stihl. Pod ligovou tabulkou je přidána gratulace hráči," +
        "<img src='img/achievements/lucky.png' class='img100 right'> který hrál nejvíc nad očekávání a je zmíněn hráč, který čelil nejtěžším soupeřům. Aby byl hráč uveden, musí ale odehrát alespoň 4 partie a pro gratulaci aspoň dvě vyhrát. Někdy má hráč, který všechny partie prohrál nepochopitelně nadupanou performance, takže to jsem musel nějak eliminovat." +
        "<img src='img/achievements/legal.png' class='img100 left'>K tomu se změnil formát tabulek se seznamem her, že datum odkazuje na tuto hlavní stránku k turnaji, kde se hra konala, výsledek 1-0 atd. odkazuje na hru na lichess a ve třetím sloupci jsou odznáčky, které si hráči vydobyli." +
        "Taky jsou udělovány odznáčky za Légalův mat, známý též jako Námořní kadet. Proto je použit Pepek Námořník. Vyhledávat lze pomocí klíčového slova legal." +
        "A stále se nikomu neporadařilo získat diamantový odznak za mat rošádou nebo mat braním mimochodem. Tak hurá do toho!"
    },
    {id: "vWA25bvU", html: "<b>RychlyLenochod</b> připravil v senzační partii jinak stoprocentnímu <b>Bukowskicovi</b> moc pěknou léčku, do které se náš šampión chytil! Gratulujeme!<br>" +
        "<br><b>Královský Gambit</b> se dnes hrál 9x, z čehož 6x triumfovali bílí. <b>Italská hra</b> se hrála 7x, přičemž 5x dominovali černí. Devět z deseti velmistrů doporučuje, aby i zbytek Monday Fighterů přešel na Královský gambit. 😀<br>" +
        "<br><b>Jouzolean:</b> \"Gratulace Bukowskimu k návratu na čelo a taky Mrázkovi, který se dostal na čelo posledních 10 turnajů. 🙂😎\""},
    {id: "k83QeG7o", html: "<b>Mrazek</b> byl dnes jediný z nás, komu se podařilo <b>bukowskice</b> porazit. K radosti <b>mozkomora</b> k tomu ale došlo až po limitu, takže bedna zůstala mozkomorovi. Bukowskic Mrázka trápil <a href='https://lichess.org/G3YNmKEP/black#199'>sto tahů</a>, aby vzdal jeden tah před matem.<br>" +
        "<br><b>Čtyři hráči</b> dnes vyhráli po osmnácti tazích, takže za nejrychlejší parti si odnesli bezvýznamný bodíček dzin69, bebul, mozkomor a jouzolean.<br>" +
        "<br>Vítáme <b>Margaritu</b> mezi prvními dvanácti, kteří se nakonec utkají v Play OFF.<br>" +
        "<br><h2>Magnus number</h2><a href='https://freopen.org/'><img src='img/magnusNumber.png'></a><br>" +
        "<b>Bebul:</b> Bukowskic má Magnus number #3. Porazil hráče, který porazil hráče, který porazil <a href='https://lichess.org/@/DrNykterstein'>Magnuse Carlsena</a>. Já porazil bukowskice, takže mám #4, stejně jako zbytek Monday Fight světa. Klikněte si na obrázek z prozkoumejte své skóre."},
    {id: "Uf128Gvy", html: "<b>Jouzolean:</b> 🙂 Skvěle jsi mi (Bébule) skočil do <a href='https://lichess.org/O79AvnKN#33'>milner barry</a> gambitu, já na to čekal asi půl roku. Pak jsem si klidně dovolil <a href='https://lichess.org/80jSe8Ca#9'>královský gambit</a> a dostal těžce na budku 😁<br>" +
        "<br><b>Bébul:</b> Královských gambitů se dnes hrálo devět, přičemž osmkrát se radovali bílí! A zadařilo se i v <a href='https://lichess.org/Y2EkADD9#9'>mozkomor vs bukowskic</a>."},
    {id: "ZDcYpWqR", html: "<img src='img/naplavka-pozvanka.jpg'>" +
          "<br><br><b>Bukowskic:</b> Zvu vás na Slavnost knih našeho nakladatelství na smíchovské náplavce. Tento pátek 3. června tam budu celý den, ukážu vám, jaké knížky vydáváme, popovídáme si, dáme si něco dobrého, zahrát si můžeme i venkovní šachy♟.   A výzva pro vás! Kdo mě v šachách porazí🏆nebo remizuje (což by v mé současné formě neměl být problém), " +
          "může si jako odměnu vybrat jakoukoliv knížku, která se mu bude líbit! Celý program a <a href='https://fb.me/e/3e1wWRiGt'>přesná adresa zde</a>."},
    {id: "13YkPIje", html: "<img src='img/naplavka-maurice.jpg'>" +
          "<br><br>Bukowskic měl na Náplavce připravenu celou škálu trofejí, z nichž ovšem žádnou nepustil. Nejprve si poradil s Maurice Dodo.<br><br>" +
          "<img src='img/naplavka-baron.jpg'><br><br>Šanci nedal ani Baronu Gorcovi,<br><br>" +
          "<img src='img/naplavka-jouzolean.jpg'><br><br>a knížku nevyhrál ani (pře)natěšený Jouzoleán, který první den nemohl zřejmě proto, aby celou noc trénoval, což se podepsalo na jeho výkonu.<br><br>"},
    {id: "kbGavs7v", html: "<img src='img/riegerovy-sady-jouzolean.jpg'>" +
          "<br><br><b>Jouzolean:</b>Hlásím, že dnešní turnaj v Riegerových sadech jsme s Tekelem ovládli. 😎👌😁 Zde <a href='http://chess-results.com/tnr646946.aspx?lan=5&art=1&flag=30'>výsledky.</a><br><br>" +
          "<a href='https://lichess.org/@/DJ-Pesec'><img src='img/buki-pesec-dobris.jpg'></a><br><br><b>Bukowskic:</b> Neuvěřitelný, koho potkáte na nedělní mši na prvním svatém přijímání dětí! Kdo myslíte, že to je? <i>(5.6.2022, Dobříš)</i><br><br>"},
    {id: "QyFvQ3NF", html: "<b>Jouzolean:</b> Hlásíme, že Jouzolean i Tekele dnešní turnaj strategicky vynechají<br>" +
        "<b>Bukowskic:</b> 🤩<br><br>" +
        "<img src='img/iron-maden.jpg'><br><b>Jouzolean:</b> Iron maiden<br><br>" +
        "<b>Bébul:</b> Jouzoleanovou absencí se stalo, že <b>bukowskic</b> znovu opanoval čelo tabulky a nedosti na tom, <b>RychlyLenochod</b> se vyhoupl v počtu 270 odehraných partií na čelo nejaktivnějšího hráče turnaje! Gratulujeme!<br><br>" +
        "<b>Bébul:</b> přečtěte si nové články v aktualitách. Například kliknutím na následující obrázek..." +
        "<a href='actualities.html#fairplay'><img src='img/havel-evangelista.jpg' style='margin-top:5px'></a>" +
        "<div align='center'><i>Bacha Vašku, máš napadenou dámu!</i></div>"},
    {id: "UdiV7hEG", html: "Gratulujeme <a href='https://lichess.org/@/Margarita_Vlasenko'>Margaritě</a> ke krásnému vítězství v Monday Fights turnaji!" +
        "<img src='img/bukowskic-nacelnik.jpg'><br>Propagace šachu na indiánském táboře. Náčelníkem sám veliký Bukowskic, šamanem Bébul, z dalších hráčů Snílek a Mráček."},
    {id: "ugVB04T5", html: "<b>Bébul:</b> Gratulujeme Mrázkovi k postupu na průběžné druhé místo v tabulce! Významně tomu pomohlo vítězství v poslední partii, kdy hrál Mrázek berserk a zmatoval soupeře tři vteřiny před koncem turnaje! To je jak sen!" +
        "<br><br><b>Bébul:</b> Nyní by se Tekele musel hned v úvodu PlayOFF probít přes DJ-Pesce a Jouzoleana. K takovému losu nezbývá než rovněž pogratulovat! 😀<br><br>" +
        "<img src='img/pavoukJouzoTekePesec.png'>" +
        "<br><br><b>Bébul:</b> mozkomor pěkně sehrál s bukowskicem tři královské gambity se skórem 1½-1½. Celkově se královským gambiterům vedlo dobře, skóre 5-2, přičemž průměrný rating černých byl 1806. Nechť řady královských gambiterů houstnou!" +
        "<br><br><b>Bébul:</b> zato Italské se dneska moc nedařilo... Anti-Fried Liver Defense, to zní hustokrutě! Měli bychom se to naučit všichni a tu Italskou už konečně, jednou provždy, z Monday Fights vymýtit." +
        "<br><br><b>Bébul:</b> dnes, po šesti týdnech, mat v centru! Spásný mat ve zcela prohrané pozici. 😀"},
    {id: "pcjmBbQU", html: "<b>Bébul:</b> Vítáme <a href='https://lichess.org/@/felcar'>felčara</a> na Monday Fight turnaji a gratulujeme k vítězství." +
        "<br><br><b>Bébul:</b> V rozpačitém vstupu, kdy to ve <b>felčarově</b> partii s <a href='https://lichess.org/@/Margarita_Vlasenko'>Margaritou</a> bylo jako na houpačce, nakonec padl na čas. <b>Margaritě</b> velká gratulace. Náš očekávaný stoprocentní debakl zažehnala hned v úvodu. 🙂" +
        "<br><br><b>Bébul:</b> Drahnou chvíli to vypadalo, že všem vypálí rybník maestro <a href='https://lichess.org/@/Tekele'>Tekele<a>! Gratulujeme k zaslouženému druhému místu!" +
        "<img src='img/mozk-last10.png'>" +
        "<br><br><b>Bébul:</b> Gratulujeme <b>mozkomorovi</b> k opanování tabulky za posledních deset turnajů!"},
    {id: "5prkKw5E", html: "<b>Mrázek:</b> My jsme jen chtěli mít nejrychlejší partii turnaje 🙂 To jsou ty odznáčky a plakety.... člověk se na to upne, sbírá to a pak pro to obětuje i <a href='https://lichess.org/BAoLvBM8'>partii</a>.<br><br>" +
        "<b>Bébul</b> se připravil na Jouzoleána a štěstí se usmálo na otrhánka. Nechť řady královských gambiterů houstnou :-)<iframe src=\"https://lichess.org/embed/WDePduKL#21?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>" +
        "<b>Jouzolean</b> se připravil na Felčara a pro samou radost, jak to všechno perfektně klaplo, si nechal dát v naprosto vyhrané pozici mat" +
        "<iframe src=\"https://lichess.org/embed/eqfvXnzx#38?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>"},
    {id: "ESqaQ7eH", html: "Dnešnímu turnaji předcházela značná nervozita, neb si všichni brousili zuby na setkání s Velmistrem, jak dokazuje následující konverzace: " +
          "<br><br><b>VikJav (nedělě 19:39):</b> Kluci dnes to nestíhám, ale pokud dnes nastoupí velký Robert, tak vám přeju všem hodně stesti :)) užijte si partie a dejte mu co proto." +
        "<br><br><b>Mrázek:</b> Máš ještě 24h čas 😉" +
        "<br><br><b>VikJav:</b> Jsem blazen! Super o nic neprijdu. Tak zítra ho rozdrtime společnými silami!" +
        "<br><br>A po oznámení, že dneska se Robert bohužel nemůže turnaje zúčastnit přišlo:" +
        "<br><br><b>Bukowskic:</b> Tak já se včera tak připravoval, ale to je jasný, lepší bude, když přijde Robert v plné formě!" +
        "<br><br><b>Jouzolean:</b> co sis připravoval? 😎🙂" +
        "<br><br><b>Bukowskic:</b> Nešel jsem na kolo a místo toho jsem se celý odpoledne rozehrával!" +
        "<br><br>... a jak vidno, příprava namísto velmistrovské hlavy pokosila nás ostatní. Gratulujeme!" +
        "<br><br><b>Bébul:</b> Už jste se podívali na nejrychlejší dnešní mat? To zas jednou Bébulkovi vyšla příprava! Nechť řady Královských Gambiterů houstnou!"},
    {id: "fXU6tfJM", html: "<div align='center'><h3>Monday Fight</h3><h2>s GM Robertem Cvekem</h2></div>" +
        "Dnešek je pro Monday Fights svátek, neb nás poctil svou návštěvou Velmistr <a href='https://www.sachycvek.cz/'>Robert Cvek</a>. Byl to fofr. Nikdo z nás ho nenachytal na švestkách. Za návštěvu moc děkujeme a k vítězství gratulujeme." +
        "<img style='margin-top:5px' src='img/cvek-nss.jpg'><div style='text-align: center; margin-bottom:5px'><i>Robert Cvek jako vítěz turnaje ke 100 let Salo Flohra. I přes účast Davida Navary turnaj zcela ovládli velmistři Novoborského ŠK, zleva Viktor Láznička, Robert Cvek a Zbyněk Hráček<br> Zřejmě dobrý oddíl.</i></div>" +
        "K dnešním partiím Jouzoleanovi napsal, že to byly dobré partie a ze si konečně po dlouhé době s klidnou hlavou zahrál." +
        "<p>Po turnaji Robert Cvek řekl: \"Vyhrát takový turnaj je pro mě obrovský úspěch, jednoznačně největší co se týče ...\", tedy řekl to po tom turnaji ke 100 let Salo Flohra a ne zrovna po dnešním turnaji 🙂, ale hrál dnes s námi Monday Fight a odehrál 14 partií, takže radost máme převelikou!</p>" +
        "<img style='margin-top:5px' src='img/cvek-owen.png'><div style='text-align: center; margin-bottom:5px'><i>Tuto strukturu vypadající jako koruna vybudoval Robert Cvek hned v několika partiích. Jedná se o Owen defense, která se předtím hrála na <a href='https://bebul.github.io/MondayFight/search.html?q=%22owen%20defense%22'>Monday Fights 13x</a> a pokaždé zvítězili bílí. Robert Cvek tedy tomuto zahájení poněkud zvedl reputaci.</i></div>" +
        "<p>Když na sobě zapracujeme, jistě se k nám velmistři jen pohrnou a trofej z Monday Fight bude zdobit nejeden velmistrovský stůl."},


  ]
  let s = spec.find(s => s.id === tournamentId)
  if (s) {
    document.getElementById(divId).innerHTML = s.html
    if (s.init) s.init()
  }
  else document.getElementById(divId).innerHTML = ""
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

async function drawSpider(dataOfPlayers, spiderId) {
  let GLOB = {
    width: 1190, height: 670,
    padX: 20, padTop: 60, padBottom: 20,
    centerWidth: 150,
    fontSize: 45,
    conex: 90
  }
  GLOB.netH = GLOB.height - GLOB.padTop - GLOB.padBottom
  GLOB.picH = 0.9 * GLOB.netH / 6

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
      let text2 = "TURNAJ ŠAMPIONŮ 2022"
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
          let name = dataOfPlayers[no - 1].name
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
