let placeTxt = ['','first','second','third']

function percent(num) {
  return Math.round(100 * num) + "%"
}

function getPlayerPodiumHTML(gambler, showBullet = false) {
  let place = placeTxt[gambler.rank]
  let player = gambler.name
  let elo = gambler.rating
  let performance = gambler.performance
  let games = gambler.nb.game
  let winRate = percent(gambler.nb.win / gambler.nb.game)
  let berserkRate = percent(gambler.nb.berserk / gambler.nb.game)
  let bulletPistol = ""
  if (showBullet) {
    bulletPistol = `<img src="img/westernPistol.png" style="position:absolute; right:0px; top:50px; width:70%">`
  }
  let html = `<div class="${place}">
  <div class="trophy" style="position:relative;overflow:visible">
    ${bulletPistol}
  </div>
  <a class="text user-link" href="https://lichess.org/@/${player}" target="_blank">${player}</a>
  <table class="stats">
    <tr><th>ELO</th><td>${elo}</td></tr>
    <tr><th>Performance</th><td>${performance}</td></tr>
    <tr><th>Games played</th><td>${games}</td></tr>
    <tr><th>Win rate</th><td>${winRate}</td></tr>
    <tr><th>Berserk rate</th><td>${berserkRate}</td></tr>
  </table>
</div>`
  return html
}

function getPodiumHTML(tournament) {
  let podium = tournament.podium
  let showBullet = tournament.perf.name.toLowerCase()=="bullet"
  let first = getPlayerPodiumHTML(podium[0], showBullet)
  let second = getPlayerPodiumHTML(podium[1])
  let third = getPlayerPodiumHTML(podium[2])
  let html = second + first + third
  html = html
  return html
}

function getPlayer(tournament, name) {
  return tournament.standing.players.find(function(player) {
    return player.name === name
  })
}

function createPodium(data, tournamentID, id="podium") {
  let tournament = data.findTournament(tournamentID)
  if (tournament!=undefined) {
    let el = document.getElementById(id)
    let html = getPodiumHTML(tournament)
    el.innerHTML = html
  }
}

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'];

function createTournamentInfo(data, tournamentID, id="info") {
  let tournament = data.findTournament(tournamentID)
  if (tournament!=undefined) {
    let el = document.getElementById(id)

    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    let d = new Date(tournament.startsAt);
    var day = days[ d.getDay() ];
    //var month = months[ d.getMonth() ];
    let date = [d.getDate(), d.getMonth()+1].join('.')+' '+d.getFullYear()+' '+[d.getHours(), d.getMinutes().padLeft()].join(':')+' '+day;

    let ratedStr = ""
    if (data.tournamentIsRated(tournamentID)) { ratedStr = "RATED" } else { ratedStr = "<b>UNRATED</b>" }
    let html = `
<div class="info">
        <div style="float:left;vertical-align: middle; display: table-cell">
            <a href="javascript:void(0);" id="prevTournament"><img src="img/bishopPrev.png" class="bishop"></a>
        </div>
<div style="display: table-cell; vertical-align: middle">
   <div style="font-size:1.5em">${date} - ${ratedStr}</div>
   Players: ${tournament.nbPlayers} - 
   Average ELO: ${tournament.stats.averageRating} -
   Games: ${tournament.stats.games}
   <br>
   Moves: ${tournament.stats.moves} -
   Berserks: ${tournament.stats.berserks}<br>
   Link: <a href="https://lichess.org/tournament/${tournamentID}" target="_blank">https://lichess.org/tournament/${tournamentID}</a>
</div>
        <div style="float:right; vertical-align: middle; display: table-cell">
            <a href="javascript:void(0);" id="nextTournament"><img src="img/bishopNext.png" class="bishop"></a>
        </div>
</div>
`
    el.innerHTML = html
  }

  document.getElementById("prevTournament").onclick = function() {
    nextTournament(data, -1)
  }
  document.getElementById("nextTournament").onclick = function() {
    nextTournament(data)
  }
}

function ratingDiff(player, games) {
  let initialRating = player.rating
  for (i=games.games.length-1; i>=0; i--) {
    let players = games.games[i].players
    if (players.white.user.name === player.name) {
      initialRating = players.white.rating
      break
    } else if (players.black.user.name === player.name) {
      initialRating = players.black.rating
      break
    }
  }
  return player.rating - initialRating
}

function ratingDiffTag(player) {
  if (player.diff < 0) return `<loss>${(player.diff)}</loss>`
  else return `<win>+${(player.diff)}</win>`
}

function createResults(data, tournamentID, gamesData, id = "results") {
  let tournament = data.findTournament(tournamentID)
  if (tournament!=undefined) {
    let el = document.getElementById(id)

    let htmlBegin = '<table class="slist tour__standing"><tbody>'

    let htmlEnd = '</tbody></table>'
    let html = ''

    tournament.standing.players.forEach( function(player) {
        html = html + `<tr><td = class="rank">${player.rank}</td>
<td class="player">
    <span class="user-link name tooltip">
      ${player.name}
      <div class="tooltiptext" style="left: 100%" id="${player.name}">
      </div>
    </span><span class="rating">${player.rating}</span>
</td>
<td class="sheet">
`
      player.sheet.scores.forEach(function(score) {
          if (Array.isArray(score)) {
            if (score[1] > 2) html = html + `<double>${score[0]}</double>`
            else html = html + `<streak>${score[0]}</streak>`
          } else html = html + `<score>${score}</score>`
        }
      )
        html = html + `</td>
<td class="total"><strong>${player.score}</strong></td>
<td class="rating-diff">${ratingDiffTag(player)}</td>
`

      html = html + "</tr>"
      }
    )

   el.innerHTML = htmlBegin + html + htmlEnd

   let tooltips = document.getElementsByClassName("tooltip")
   for (let i = 0; i < tooltips.length; i++) {
     let el = tooltips[i]
     el.onclick = createTip(data, gamesData, tournament, tournament.standing.players[i].name)
     //el.addEventListener('mouseout',cancelTip)
   }
  }
}

function getGameResult(g) {
  if (g.winner === "black") return "0&#8209;1"
  else if (g.winner === "white") return "1&#8209;0"
  else return "½&#8209;½"
}

function ratingDiffDeco(pl) {
  if (pl.ratingDiff < 0) return `<loss>&nbsp;(${(pl.ratingDiff)})</loss>`
  else return `<win>&nbsp;(+${(pl.ratingDiff)})</win>`
}

function whitePlayerDecorated(game, player) {
  let ratingDiff = ""
  if (game.players.white.user.name == player) ratingDiff = ratingDiffDeco(game.players.white)
  let berserk = ""
  if (game.players.white.berserk == true) berserk = "&#9889;&nbsp;"
  if (game.winner == "white") {
    return `<b>${berserk}${fixPlayerName(game.players.white.user.name)}${ratingDiff}</b>`
  } else {
    return `${berserk}${fixPlayerName(game.players.white.user.name)}${ratingDiff}`
  }
}

function blackPlayerDecorated(game, player) {
  let ratingDiff = ""
  if (game.players.black.user.name == player) ratingDiff = ratingDiffDeco(game.players.black)
  let berserk = ""
  if (game.players.black.berserk == true) berserk = "&nbsp;&#9889;"
  if (game.winner == "black") {
    return `<b>${fixPlayerName(game.players.black.user.name)}${ratingDiff}${berserk}</b>`
  } else {
    return `${fixPlayerName(game.players.black.user.name)}${ratingDiff}${berserk}`
  }
}

function fixPlayerName(name) {
  return name.replace("-", "&#8209;")
}

function getAvatar(playerH) {
  let player = playerH.toLowerCase()
  let path = "img/players/"
  let ext = ".png"
  switch (player) {
    case "bebul": return path + player + ext // bebulAvatar2
    case "mozkomor": return path + player + ext
    case "bukowskic": return path + player + ext
    case "dj-pesec": return path + player + ext
    case "rychlylenochod": return path + player + ext
    case "tekele": return path + player + ext
    case "travinho": return path + player + ext
    case "hrobotron": return path + player + ext
    case "jouzolean": return path + player + ext
    case "mrazek": return path + player + ext
    case "neznama-00": return path + player + ext

    case "mauricedodo": return path + "default2" + ext
    case "butaczech": return path + "default3" + ext
    case "dzin69": return path + "default3" + ext
    default: return path + "default2" + ext // or default
  }
}

function createTip(data, gamesData, tournament, player) {
  return function(event) {
    event.stopPropagation()
    cancelAllTips()
    let gambler = getPlayer(tournament, player)
    let html = ""
    let htmlPre = `<a class="user-link" href="https://lichess.org/@/${player}" target="_blank"><b style="font-size: 1.8em">${player}</b></a>`

    let games = 0
    let wins = 0
    let berserks = 0
    let oponents = 0
    gamesData.games.forEach(function(game) {
      if (game.players.white.user.name == player) {
        games++
        if (game.winner == "white") wins++
        if (game.players.white.berserk == true) berserks++
        oponents += game.players.black.rating
        html = `<tr><td>${whitePlayerDecorated(game, player)}</td><td>${getGameResult(game)}</td><td>${blackPlayerDecorated(game, player)}</td></tr>` + html
      } else if (game.players.black.user.name == player) {
        games++
        if (game.winner == "black") wins++
        if (game.players.black.berserk == true) berserks++
        oponents += game.players.white.rating
        let berserkBlack = ""
        if (game.players.black.berserk == true) berserkBlack = "<b>&#9736;</b>"
        let berserkWhite = ""
        if (game.players.white.berserk == true) berserkWhite = "<b>&#9736;</b>"
        html = `<tr><td>${whitePlayerDecorated(game, player)}</td><td>${getGameResult(game)}</td><td>${blackPlayerDecorated(game, player)}</td></tr>` + html
      }
    })

    htmlPre += `<br>
<span style="color: #555; font-size: 1.2em">Perf:&nbsp;${gambler.performance}&nbsp;&nbsp;AvgOpo:&nbsp;${Math.floor(oponents/games)}<br>
Win:&nbsp;${percent(wins/games)}&nbsp;&nbsp;Bersk:&nbsp;${percent(berserks/games)}</span><table>`

    let avatar = getAvatar(player)
    if (avatar) {
      /*
      if (player == "bebul") {
        html += `<img src="${avatar}" style="position:absolute; bottom: -125px; right: -40px; width: 200px">`
      } else */
      html = htmlPre + html + `<img src="${avatar}" style="position:absolute; bottom: 100%; right: 3%; width: 80px">`
    }
    html += "</table>"

    this.getElementsByClassName("tooltiptext")[0].innerHTML = html
    this.getElementsByClassName("tooltiptext")[0].style.visibility = "visible"
  }
}

function cancelAllTips() {
  let tooltips = document.getElementsByClassName("tooltiptext")
  for (let i=0; i<tooltips.length; i++) {
    tooltips[i].style.visibility = "hidden"
  }
}

function fastestMateSelector(minGame, game) {
  if (game.status !== "mate") return minGame
  if (minGame) {
    if (game.ply < minGame.ply) return game
    else return minGame
  } else return game
}

function biggestDifferenceWinSelector(minGame, game) {
  function getRatingDiff(game) {
    let ratingDiff = game.players.white.rating - game.players.black.rating
    if (game.winner === "black") ratingDiff = -ratingDiff
    return ratingDiff
  }
  let ratingDiff = getRatingDiff(game)
  if (!game.winner || game.status === "noStart" || ratingDiff > -100) return minGame
  let minGameDiff = -100 // more than 100 diff is necessary for display
  if (minGame) minGameDiff = getRatingDiff(minGame)
  if (ratingDiff < minGameDiff) return game
  else return minGame
}

function fastestGameSelector(minGame, game) {
  if (game.status === "noStart") return minGame
  if (minGame) {
    if (game.ply < minGame.ply) return game
    else return minGame
  } else return game
}

function selectGame(gamesData, hideId, boardId, selector) {
  let selectedGame = gamesData.games.reduce(selector, null) // can return null, in such case we want to hide the hideId element
  if (selectedGame) {
    document.getElementById(hideId).style.display = "block";
    let fen = selectedGame.initialFen
    let mfChess = new Chess(fen) // maybe undefined, which is ok
    let moves = selectedGame.moves.split(" ")
    moves.forEach((move) => mfChess.move(move))

    let mateBoardWidth = document.getElementById("fastMateId").clientWidth;
    let config = {
      pgn: `[White \"${selectedGame.players.white.user.name} ${selectedGame.players.white.rating}\"]
[Black \"${selectedGame.players.black.user.name} ${selectedGame.players.black.rating}\"]
${selectedGame.moves}
`,
      showCoords: false, coordsInner: false, headers: true,
      theme: 'brown',
      boardSize: mateBoardWidth,
      movesHeight: 50,
      startPlay: `${moves.length}`
    }
    if (fen) config.position = fen
    config.orientation = selectedGame.winner

    PGNV.pgnView(boardId, config)
    return selectedGame
  } else {
    // hide the board when no game was selected
    document.getElementById(hideId).style.display = "none"
    return null
  }
}

function sensationGame(games, hideid, boardId) {
  let game = selectGame(games, hideid, boardId, biggestDifferenceWinSelector)
  if (game) {
    if (game.winner == "white") document.getElementById("senzacionist").innerHTML = game.players.white.user.name
    else document.getElementById("senzacionist").innerHTML = game.players.black.user.name
    document.getElementById("senzaceDiff").innerHTML = Math.abs(game.players.white.rating - game.players.black.rating)
    if (loser(game).berserk) document.getElementById("senzaBerserk").innerHTML = `${loser(game).user.name} hrál berserk.`
    else document.getElementById("senzaBerserk").innerHTML = ""
  }
  return game
}

function loser(game) {
  if (game.winner === 'black') return game.players.white
  else return game.players.black
}
function winner(game) {
  if (game) {
    if (game.winner === 'black') return game.players.black
    else return game.players.white
  }
}

function updateSpecialBoards(games) {
  let mateGame = selectGame(games, "fastMateId", "fastMateBoard", fastestMateSelector)
  let sensaGame = sensationGame(games, "surpriseGameId", "surpriseGameBoard")
  let fastestGame = selectGame(games, "fastestId", "fastestBoard", fastestGameSelector)
  if (fastestGame && (fastestGame === mateGame || fastestGame === sensaGame)) {
    document.getElementById("fastestId").style.display = "none" // hide it, because it is already shown
  }
}

function nextTournament(data, diff=1) {
  data.currentGameListTableIx += diff
  data.currentGameListTableIx = Math.max(Math.min(data.currentGameListTableIx, data.tournamentGames().length - 1),0)

  let games = data.tournamentGames()[data.currentGameListTableIx]
  let gameData = gameListData(games)

  let newUrl = window.location.pathname + "?mf=" + encodeURIComponent(data.tournamentGames()[data.currentGameListTableIx].id)
  History.replaceState({'mf': mfId}, 'Monday Fights', newUrl)

  createPodium(data, games.id)
  createResults(data, games.id, games)
  updateSpecialBoards(games)
  createTournamentInfo(data, games.id)

  updateMostActivePlayer("gameListTable", gameData)
  updateGoogleBar("gameListTableBar", gameData)
  gameListTable.setData(gameData).then(function(){
    gameListTable.redraw(true)
  })
}
