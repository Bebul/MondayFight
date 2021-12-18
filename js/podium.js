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

function createPodium(tournamentID, id="podium") {
  let tournament = findTournament(tournamentID)
  if (tournament!=undefined) {
    let el = document.getElementById(id)
    let html = getPodiumHTML(tournament)
    el.innerHTML = html
  }
}

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'];

function createTournamentInfo(tournamentID, id="info") {
  let tournament = findTournament(tournamentID)
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
    if (tournamentIsRated(tournamentID)) { ratedStr = "RATED" } else { ratedStr = "<b>UNRATED</b>" }
    let html = `
<div style="width:600px; text-align: center; display: table">
        <div style="float:left;vertical-align: middle; display: table-cell">
            <a href="javascript:void(0);" onclick="nextTournament(-1)"><img src="img/bishopPrev.png"></a>
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
            <a href="javascript:void(0);" onclick="nextTournament()"><img src="img/bishopNext.png"></a>
        </div>
</div>
`
    el.innerHTML = html
  }
}

function ratingDiffTag(player, games) {
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
  let diff = player.rating - initialRating
  if (diff < 0) return `<loss>${diff}</loss>`
  else return `<win>+${diff}</win>`
}

function createResults(tournamentID, gamesData, id = "results") {
  let tournament = findTournament(tournamentID)
  if (tournament!=undefined) {
    let el = document.getElementById(id)

    let htmlBegin = '<table class="slist tour__standing"><tbody>'

    let htmlEnd = '</tbody></table>'
    let html = ''

    tournament.standing.players.forEach( function(player) {
        html = html + `<tr><td = class="rank">${player.rank}</td>
<td class="player">
  <a class="user-link" href="https://lichess.org/@/${player.name}" target="_blank">
    <span class="name">${player.name}</span><span class="rating">${player.rating}</span>
  </a>
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
<td class="rating-diff">${ratingDiffTag(player, gamesData)}</td>
`

      html = html + "</tr>"
      }
    )

   el.innerHTML = htmlBegin + html + htmlEnd
  }
}

function fastestMateSelector(minGame, game) {
  if (game.status !== "mate") return minGame
  if (minGame) {
    let minMoves = minGame.moves.split(" ").length
    let moves = game.moves.split(" ").length
    if (moves < minMoves) return game
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
    let minMoves = minGame.moves.split(" ").length
    let moves = game.moves.split(" ").length
    if (moves < minMoves) return game
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

    let config = {
      pgn: `[White \"${selectedGame.players.white.user.name} ${selectedGame.players.white.rating}\"]
[Black \"${selectedGame.players.black.user.name} ${selectedGame.players.black.rating}\"]
${selectedGame.moves}
`,
      showCoords: false, coordsInner: false, headers: true,
      theme: 'brown',
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
  }
  return game
}


function updateSpecialBoards(games) {
  let mateGame = selectGame(games, "fastMateId", "fastMateBoard", fastestMateSelector)
  let sensaGame = sensationGame(games, "surpriseGameId", "surpriseGameBoard")
  let fastestGame = selectGame(games, "fastestId", "fastestBoard", fastestGameSelector)
  if (fastestGame && (fastestGame === mateGame || fastestGame === sensaGame)) {
    document.getElementById("fastestId").style.display = "none" // hide it, because it is already shown
  }
}

function nextTournament(diff=1) {
  currentGameListTableIx += diff
  currentGameListTableIx = Math.max(Math.min(currentGameListTableIx, tournamentGames.length - 1),0)

  let games = tournamentGames[currentGameListTableIx]
  let gameData = gameListData(games)

  let newUrl = window.location.pathname + "?mf=" + encodeURIComponent(tournamentGames[currentGameListTableIx].id)
  History.replaceState({'mf': mfId}, 'Monday Fights', newUrl)

  createPodium(games.id)
  createResults(games.id, games)
  updateSpecialBoards(games)
  createTournamentInfo(games.id)

  updateMostActivePlayer("gameListTable", gameData)
  updateGoogleBar("gameListTableBar", gameData)
  gameListTable.setData(gameData).then(function(){
    gameListTable.redraw(true)
  })
}