import {MF} from "./tournamentsData.mjs"
import {
  getPlayers,
  allMyTables,
  gameListData,
  updateMostActivePlayer,
  updateGoogleBar,
  gameListTable,
  drawEpicCard,
  getLeagueDataOfPlayers
} from "./mondayFight.mjs"
import {positionAfter} from "./analyze.mjs"
import {collectTrophies, joinTrophies, setOpeningTable, setOpeningTableDataAndRedraw, openingsHistogram} from "./podium.mjs";

export function createCrossTable(data, theFights, tableId, criterion = "score") {
  let players = getPlayers(theFights).sort(function(a, b){
    var x = a.toLowerCase();
    var y = b.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });
  document.getElementById(tableId.substring(1)).innerHTML = ""
  let crossTable = new Tabulator(tableId, {
    layout: "fitDataTable",
    data: getCrossData(data, theFights, players, criterion),
    columns: generateCrossTableColumns(data, theFights, players)
  });
  allMyTables.set(tableId, crossTable)
}

function trophiesSet(cell, pars) {
  let trophies = cell.getValue()
  let ar = []
  trophies.tr.forEach(v => ar.push(v))
  return ar.join("")
}

export function getShortOpeningName(opening) {
  let words = ['attack', 'defense', 'game', 'system', 'accepted', 'declined', 'opening']
  let split = opening.split(':')[0].split(' ').reverse()
  while(words.find(w => w === split[0].toLowerCase())) {
    split.shift()
  }
  let midi = split.reverse()
  let unique = ['Latvian', 'Englund']
  if (unique.find(w => w === midi[0])) return midi[0]
  return midi.join(' ')
}

export function getHistogram(ar, f) {
  let histogram = {}
  ar.forEach(i => {
    let [name, count] = f(i)
    if (histogram[name]) histogram[name].count += count
    else histogram[name] = { count: count }
  })
  // set one of the openings startOpen
  if (histogram[`King's Gambit`]) histogram[`King's Gambit`].startOpen = true
  else histogram[Object.keys(histogram)[0]].startOpen = true // just random one
  return histogram
}

export function createOpeningsTable(data, theFights, tableId, criterion, season, verbose = true, showAllGroups = false) {
  document.getElementById(tableId.substring(1)).innerHTML = ""

  let dateFilter = ""
  switch (season) {
    case undefined:
    case "all":
    case "year":
      dateFilter = ""
      break
    default:
      dateFilter = ` date:${season}`
      break
  }

  let trophiesCol = {title: "Trophies", field: "tr", resizable:false, align: "center", headerSort: false, formatter: trophiesSet}
  if (verbose) trophiesCol.width = "180"

  let columnsAr = [
    {title: "Opening", field: "name", resizable:false, align: "left", width:500, formatter: function(cell, params) {
        let name = cell.getValue()
        let search = `"opening:${name}"`
        let ret = `<a class='league-link' href='search.html?q=${escape(search)}${dateFilter}' target='_blank'>${name}</a>`
        return ret
      }
    },
    {title: "Count", field: "count", resizable:false, align: "center"},
    {title: "Score", field: "score", resizable:false, align: "center", formatter: scoreFormatter, headerSort: false},
    trophiesCol
  ]

  let openingsData = getOpeningsData(data, theFights)
  openingsHistogram.set(getOpeningsHistogram(openingsData))

  function startOpen(name) {
    let histogram = openingsHistogram.get()
    if (histogram[name] && histogram[name].startOpen) return true
    else return false
  }

  let table = new Tabulator(tableId, {
    layout: "fitDataTable",
    data: openingsData,
    initialSort: [{column:"count", dir:"desc"}],
    groupBy: item => {
      let short = getShortOpeningName(item.name)
      let histogram = openingsHistogram.get()
      if (histogram[short] && histogram[short].startOpen || histogram[short].count > 1) return short
      else return "Other openings"
    },
    groupStartOpen:function(value, count, data, group){
      return showAllGroups || startOpen(value)
    },
    groupHeader: function(value, count, data, group){
      let score = {w: 0, draw:0, b:0}
      let trophies = {tr: new Set(), count: 0}
      data.forEach(s => {
          score.w += s.score.w;
          score.draw += s.score.draw;
          score.b += s.score.b;
          trophies = joinTrophies(trophies, s.tr)
        }
      )
      let sumCount = score.w + score.draw + score.b

      let achievements = ""
      if (trophies.count > 0) {
        let ar = [""]
        trophies.tr.forEach(v => ar.push(v))
        let tr = ar.join("")
        let stats=""
        if (verbose) {
          stats = `<b>achievements: ${Math.round(100*trophies.count/sumCount)}% ${trophies.count}x</b>`
        }
        achievements = `${tr} ${stats}`
      }

      return `<b>${value} ${sumCount}x</b> ${scoreHtml(score)} ${achievements}`
    },
    columns: columnsAr
  });
  setOpeningTable(table)
  allMyTables.set(tableId, table)
}

function getCrossData(data, theFights, players, criterion) {
  if (criterion === "score") {
    function addPlayerCrossData(player, scores, columns) {
      let ix = 0
      players.forEach( pl => {
          let score = scores.get(player).get(pl);
          let plid = "pl"+ix++
          if (score[0]==0 && score[1]==0) columns[plid] = ""
          else columns[plid] = score[0]  + "-" + score[1]
        }
      )
    }
    let tableData = [];
    let scores = getScores(data, players, theFights)
    let crossScores = getCrossScores(data, players, theFights)
    players.forEach( player => {
        let thePlayer = {
          name: player,
          nameUrl: "https://lichess.org/@/" + player,
          score: scores.get(player)[0] + " - " + scores.get(player)[1]
        }
        addPlayerCrossData(player, crossScores, thePlayer)
        tableData.push(thePlayer);
      }
    )
    return tableData;
  } else { // assume it is rating
    function addPlayerCrossData(player, scores, columns) {
      let ix = 0
      players.forEach( pl => {
          let score = scores.get(player).get(pl);
          let plid = "pl"+ix++
          if (score > 0) columns[plid] = `+${score}`
          else columns[plid] = `${score}`
        }
      )
    }
    let tableData = [];
    let scores = getRatingScores(data, players, theFights)
    let crossScores = getCrossRatingScores(data, players, theFights)
    players.forEach( player => {
        let thePlayer = {
          name: player,
          nameUrl: "https://lichess.org/@/" + player,
          score: scores.get(player)
        }
        addPlayerCrossData(player, crossScores, thePlayer)
        tableData.push(thePlayer);
      }
    )
    return tableData;
  }

}

export function fastestMutualMate(data, theFights, players) {
  let ourPlayer = name => players.find(p => p.name === name)
  let duels = {}
  duels[players[0].name] = Number.MAX_VALUE
  duels[players[1].name] = Number.MAX_VALUE

  function updateMates(game) {
    if (game.status == "mate") {
      if (ourPlayer(game.players.white.user.name) && ourPlayer(game.players.black.user.name)) {
        if (game.winner == "white") duels[game.players.white.user.name] = Math.min(duels[game.players.white.user.name], game.ply)
        else duels[game.players.black.user.name] = Math.min(duels[game.players.black.user.name], game.ply)
      }
    }
  }

  theFights.forEach(f => {
      let games = data.tournamentGames().find(tg => tg.id==f.id);
      if (games !== undefined) games.games.forEach(g => updateMates(g))
    }
  )
  players.forEach(pl => {
    if (duels[pl.name] < Number.MAX_VALUE) {
      pl.fastMate = duels[pl.name]
    }
  })
}

export function getOpeningsData(data, theFights, filter, useShort) {
  let op = new Map()
  function updateOpenings(g) {
    if (g.opening && (!filter || filter(g))) {
      let useName = g.opening.name
      if (useShort) useName = getShortOpeningName(useName)
      if (op.has(useName)) {
        let o = op.get(useName)
        o.count++
        o.score = updateScore(g, o.score)
        collectTrophies(g, o.tr)
        op.set(useName, o)
      } else {
        op.set(useName, {
          count: 1,
          score: updateScore(g),
          tr: collectTrophies(g)
        })
      }
    }
  }

  theFights.forEach(f => {
      let games = data.tournamentGames().find(tg => tg.id==f.id);
      if (games !== undefined) games.games.forEach(g => updateOpenings(g))
    }
  )

  let openings = []
  op.forEach((value, key) => openings.push({name: key, stats: value}))

  openings.sort((a,b) => a.name.localeCompare(b.name))

  return openings.flatMap(function(o) {
      return {
        name: o.name,
        count: o.stats.count,
        score: o.stats.score,
        tr: o.stats.tr
      }
    }
  )
}

export function getOpeningsHistogram(openingsAr) {
  return getHistogram(openingsAr, opening => {
    return [getShortOpeningName(opening.name), opening.count]
  })
}

function getScores(data, players, fights) {
  let playerScore = new Map();
  players.forEach( pl => playerScore.set(pl, [0,0,0]) )

  function updateNoStart(name) {
    let data = playerScore.get(name)
    if (data) data[2]++
  }
  function updateDraw(name) {
    let data = playerScore.get(name)
    if (data) {
      data[0]+=0.5
      data[1]+=0.5
    }
  }
  function updateWin(name) {
    let data = playerScore.get(name)
    if (data) data[0]++
  }
  function updateLoss(name) {
    let data = playerScore.get(name)
    if (data) data[1]++
  }

  fights.forEach( fight => {
    let games = data.tournamentGames().find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        if (game.status === "noStart") {
          updateNoStart(game.players.white.user.name)
          updateNoStart(game.players.black.user.name)
        } else if (game.winner === undefined) {
          updateDraw(game.players.white.user.name)
          updateDraw(game.players.black.user.name)
        } else if (game.winner === "white") {
          updateWin(game.players.white.user.name)
          updateLoss(game.players.black.user.name)
        } else if (game.winner === "black") {
          updateLoss(game.players.white.user.name)
          updateWin(game.players.black.user.name)
        }
      })
    }
  })
  return playerScore
}

function getCrossScores(data, players, fights) {
  let playerScore = new Map();
  function emptyMap() {
    let theMap = new Map();
    players.forEach( pl => theMap.set(pl, [0,0]) )
    return theMap;
  }
  players.forEach( pl => playerScore.set(pl, emptyMap()) )

  function updateDraw(a,b) {
    let data = playerScore.get(a)
    data = data && data.get(b)
    if (data) {
      data[0]+=0.5
      data[1]+=0.5
    }
  }
  function updateWin(a,b) {
    let data = playerScore.get(a)
    data = data && data.get(b)
    if (data) data[0]++
  }
  function updateLoss(a,b) {
    let data = playerScore.get(a)
    data = data && data.get(b)
    if (data) data[1]++
  }

  fights.forEach( fight => {
    let games = data.tournamentGames().find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        let white = game.players.white.user.name
        let black = game.players.black.user.name
        if (game.status === "noStart") {}
        else if (game.winner === undefined) {
          updateDraw(white, black)
          updateDraw(black, white)
        } else if (game.winner === "white") {
          updateWin(white, black)
          updateLoss(black, white)
        } else if (game.winner === "black") {
          updateWin(black, white)
          updateLoss(white, black)
        }
      })
    }
  })
  return playerScore
}

function getRatingScores(data, players, fights) {
  let playerScore = new Map();
  players.forEach( pl => playerScore.set(pl, "") )

  function updatePlayerScore(player) {
    if (player.ratingDiff) {
      let data = playerScore.get(player.user.name)
      if (data==="") data=player.ratingDiff
      else data += player.ratingDiff
      playerScore.set(player.user.name, data)
    }
  }

  fights.forEach( fight => {
    let games = data.tournamentGames().find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        if (game.status !== "noStart") {
          updatePlayerScore(game.players.white)
          updatePlayerScore(game.players.black)
        }
      })
    }
  })
  return playerScore
}

function getCrossRatingScores(data, players, fights) {
  let playerScore = new Map();
  function emptyMap() {
    let theMap = new Map();
    players.forEach( pl => theMap.set(pl, "") )
    return theMap;
  }
  players.forEach( pl => playerScore.set(pl, emptyMap()) )

  function updatePlayerScore(player, oponent) {
    if (player.ratingDiff) {
      let plData = playerScore.get(player.user.name)
      let data = plData.get(oponent.user.name)
      if (data==="") data=player.ratingDiff
      else data += player.ratingDiff
      plData.set(oponent.user.name, data)
    }
  }

  fights.forEach( fight => {
    let games = data.tournamentGames().find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        if (game.status !== "noStart") {
          updatePlayerScore(game.players.white, game.players.black)
          updatePlayerScore(game.players.black, game.players.white)
        }
      })
    }
  })
  return playerScore
}

function updateScore(g, scr) {
  // suppose score = {w:8, b:3, draw: 4}
  let score = scr || {w:0, b:0, draw:0}
  if (g.winner === "white") score.w++
  else if (g.winner === "black") score.b++
  else score.draw++
  return score
}

function scoreStr(score) {
  return `${score.w}-${score.draw}-${score.b}`
}

function scorePercents(score) {
  let sum = score.w + score.draw + score.b
  return {w: 100 * score.w / sum, draw: 100 * score.draw / sum, b: 100 * score.b / sum}
}

function scoreHtml(value, text = "") {
  let percents = scorePercents(value)
  return `<span class="explorer-box"><span class="bar" style="display: inline-block;width:150px">${text}<span class="white" style="width: ${percents.w}%">${nonZero(value.w)}</span><span class="draws" style="width: ${percents.draw}%">${nonZero(value.draw)}</span><span class="black" style="width: ${percents.b}%">${nonZero(value.b)}</span></span></span>`
}

function scoreFormatter(cell, formatterParams) {
  let value = cell.getValue()
  if (value===undefined) return ""
  return scoreHtml(value)
}

/**
 * @returns {Map<fen, position> where position is {count, id, createdAt, score, opening}}
 * with id, createdAt matching last game reaching the fen after ply for player playing as color
 * and score is {w, draw, b}
 */
function positionsAfter(games, player, color, ply) {
  let positions = new Map();
  games.forEach(
    function (g) {
      if (g.players[color].user.name === player) {
        let fen = positionAfter(g, ply)
        if (fen) {
          if (positions.has(fen)) {
            let pos = positions.get(fen)
            pos.score = updateScore(g, pos.score)
            if (pos.createdAt < g.createdAt) {
              positions.set(fen, {
                count: pos.count + 1,
                id: g.id,
                createdAt: g.createdAt,
                score: pos.score,
                opening: g.opening
                }
              )
            } else {
              pos.count++
              positions.set(fen, pos)
            }
          } else {
            positions.set(fen, {
              count: 1,
              id: g.id,
              createdAt: g.createdAt,
              score: updateScore(g),
              opening: g.opening
            })
          }
        }
      }
    }
  )
  return positions
}

function mutualGames(data, fights, playerA, playerB) {
  let selectedGames = []
  fights.forEach( fight => {
    let games = data.tournamentGames().find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        let white = game.players.white.user.name
        let black = game.players.black.user.name
        if ((white == playerA && black == playerB) || (white == playerB && black == playerA)) selectedGames.push(game)
      })
    }
  })
  return {"games": selectedGames}
}

function myCellClick(data, players, fights){
  function mcl(e, cell) {
    let playerA = cell._cell.row.data.name
    let playerB = players[cell._cell.column.field.substring(2)]
    console.log("cell click: " + playerA + " vs " + playerB)
    document.getElementById("gamesList").style.display = "block";
    let games = mutualGames(data, fights, playerA, playerB)
    let gameData = gameListData(games)
    document.getElementById("gamesListTitle").innerHTML = `<h1>${playerA} vs ${playerB}</h1>`
    updateMostOftenPositions(games.games, playerA, playerB)
    updateMostActivePlayer("gameListTable", gameData)
    updateGoogleBar("gameListTableBar", gameData)

    let openingData = getOpeningsData(data, fights, g => g.players.white.user.name===playerA && g.players.black.user.name===playerB)
    openingsHistogram.set(getOpeningsHistogram(openingData))
    setOpeningTableDataAndRedraw(openingData)

    gameListTable.setData(gameData).then(function(){
      gameListTable.redraw(true)
    })
    //e - the click event object
    //cell - cell component
  }
  return mcl
}

function nonZero(value) {
  if (value > 0) return `${value}`
  else return ""
}

function updateMostOftenPositions(games, playerA, playerB) {
  function positionCaption(value, caption) {
    let percents = scorePercents(value.score)
    return `<h3 style="margin-bottom:0">${value.opening.name}</h3><div class="explorer-box" style="width: 100%">
<table class="moves">
<tbody>
        <tr>
            <td>${caption}</td>
            <td>${value.count}</td>
            <td style="width:150px">
                <div class="bar"><span class="white" style="width: ${percents.w}%">${nonZero(value.score.w)}</span><span class="draws" style="width: ${percents.draw}%">${nonZero(value.score.draw)}</span><span class="black" style="width: ${percents.b}%">${nonZero(value.score.b)}</span></div>
            </td>
        </tr>
</tbody>
</table> 
</div>
`
  }

  function updateBoards(positions, id, caption, ply) {
    let max = 0
    positions.forEach(
      function(p, fen) {
        if (p.count > max) max = p.count
      }
    )

    let el = document.getElementById(id)
    let html = ""
    if (max > 1) {
      positions.forEach( function(value, key) {
          if (value.count == max) {
            html += positionCaption(value, caption)
            html += `<iframe src="https://lichess.org/embed/game/${value.id}?theme=auto&bg=light#${ply}" width=600 height=397 frameborder=0></iframe><br>`
          }
        }
      )
    }
    el.innerHTML = html
  }

  updateBoards(positionsAfter(games, playerA, "white", 9), "mostlyAsWhite", `${playerA}-${playerB}`, 9)
  updateBoards(positionsAfter(games, playerA, "black", 10), "mostlyAsBlack", `${playerB}-${playerA}`, 10)
}

function generateCrossTableColumns(data, theFights, players) {
  let leaderboardColumns = [
    {title: "Name", field: "nameUrl", resizable:false, formatter:"link", formatterParams:{ labelField:"name", target:"_blank"}},
    {title: "Score", field: "score", resizable:false, hozAlign:"center", headerSortStartingDir:"desc"},
  ]

  let columnsBuilder = leaderboardColumns;
  function pushPlayer(player, ix) {
    columnsBuilder.push(
      {
        title: player,
        field: "pl"+ix,
        resizable:false,
        cellClick: myCellClick(data, players, theFights),
        hozAlign: "center",
        headerVertical: true
      }
    )
  }

  let ix = 0
  players.forEach( player => {
    pushPlayer(player, ix++)
  });

  return columnsBuilder;
}

export function criterionChanged(data, tableId, createTableF) {
  let season = document.querySelector('input[name="season"]:checked').value
  let criterion = document.querySelector('input[name="criterion"]:checked').value
  console.log(`selected season: ${season} criterion ${criterion}`)
  switch (season) {
    case "all":
      createTableF(data, data.mondayFights(), tableId, criterion)
      break
    case "year":
      createTableF(data, MF.filterYear(data.mondayFights(), -1), tableId, criterion, season)
      break
    case "2020":
      createTableF(data, MF.filterYear(data.mondayFights(), 2020), tableId, criterion, season)
      break
    case "2021":
      createTableF(data, MF.filterYear(data.mondayFights(), 2021), tableId, criterion, season)
      break
    case "2022":
      createTableF(data, MF.filterYear(data.mondayFights(), 2022), tableId, criterion, season)
      break
    case "2023":
      createTableF(data, MF.filterYear(data.mondayFights(), 2023), tableId, criterion, season)
      break
    case "2024":
      createTableF(data, MF.filterYear(data.mondayFights(), 2024), tableId, criterion, season)
      break
  }
}

function filterDuels(data, theFights, player1, player2) {
  let duels = []
  theFights.forEach(f => {
      let games = data.tournamentGames().find(tg => tg.id==f.id);
      if (games !== undefined) games.games.forEach(g => {
          if (g.players.white.user.name === player1 && g.players.black.user.name === player2) {
            duels.push(g)
          }
        }
      )
    }
  )
  return duels
}

function createEpicCard(data, theFights, selectId, criterion, season, verbose = true) {
  function getValue(selectId) {
    let e = document.getElementById(selectId);
    let value = e.value;
    return e.options[e.selectedIndex].text;
  }
  // theFights contain only relevant games selected by season
  let league = getLeagueDataOfPlayers(theFights)
  let player1 = getValue("players1")
  let player2 = getValue("players2")
  let title = getValue("title")
  let crossData = getCrossData(data, theFights, [player1, player2], "score")
  crossData.forEach( pl => {
    // provide opening used between theese two if it was played at least 3 times
    let white = pl
    let black = (pl.name === player1) ? player2 : player1;
    let duels = getOpeningsData(data, theFights, g => g.players.white.user.name === pl.name && g.players.black.user.name === black, true)
    if (duels.length > 0) {
      pl.opening = duels.reduce((p,c) => {
        if (p.count < c.count) return c
        else return p
      })
    }
    if (! pl.opening || pl.opening.count < 3) {
      let openings = getOpeningsData(data, theFights, g => g.players.white.user.name === pl.name, true)
      pl.opening = openings.reduce((p,c) => {
        if (p.count < c.count) return c
        else return p
      })
    }
    fastestMutualMate(data, theFights, crossData)
  })

  drawEpicCard(league, crossData, title, selectId)

  let games = mutualGames(data, theFights, player1, player2)
  updateMostOftenPositions(games.games, player1, player2)
}

export function initCardsUI(data) {
  document.getElementById("createCard").onclick = function() {
    criterionChanged(data, "epicCard", createEpicCard)
  }
}

export function updatePlayerList(data, theFights, selectId, criterion, season, verbose = true) {
  function populateSelect(itemsValues, id) {
    let items = document.createDocumentFragment();

    itemsValues.forEach(function(el) {
      var option = document.createElement("option");
      option.value = el;
      option.innerHTML = el;

      items.appendChild(option);
    });

    let select = document.getElementById(id)
    let currentPlayer = ""
    if (select.selectedIndex >= 0) {
      currentPlayer = select.options[select.selectedIndex].text
    } else {
      currentPlayer = "bukowskic"
    }
    select.innerHTML = ""
    select.appendChild(items);
    select.value = currentPlayer
  }

  let players = getPlayers(theFights).sort(function(a, b){
    let x = a.toLowerCase();
    let y = b.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  populateSelect(players, selectId + '1')
  populateSelect(players, selectId + '2')
}

