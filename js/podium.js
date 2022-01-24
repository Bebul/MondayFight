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

class AchievementFastGame {
  constructor(player, ply, id) {
    this.player = player
    this.ply = ply
    this.sortVal = 80 - ply
    this.frame = "zelena.png"
    this.char = "&#128640;"
    this.desc = "Raketově rychle"
    this.game = id
  }
}

class AchievementMonkey {
  constructor(player, monkey, id) {
    this.player = player
    this.monkey = monkey
    this.sortVal = 100 + monkey
    this.frame = "zelena.png"
    this.char = "&#128053;"
    this.desc = "Opičí se po bílém"
    this.game = id
  }
}
class AchievementQueens {
  constructor(player, queens, id) {
    this.player = player
    this.queens = queens
    this.sortVal = 100 + queens
    this.frame = "zlata.png"
    this.pic = "kralovna.png"
    this.left = 21
    this.desc = "Postavil tři dámy"
    this.game = id
  }
}

class AchievementSmothered {
  constructor(player, id) {
    this.player = player
    this.sortVal = 120
    this.img = "smothered.png"
    this.desc = "Dušený mat"
    this.game = id
  }
}

class AchievementPawnKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 89
    this.frame = "fialova.png"
    this.pic = "pesec.png"
    this.left = 38
    this.desc = "Vražedný pěšec"
    this.game = id
  }
}

class AchievementCenterMate {
  constructor(player, id) {
    this.player = player
    this.sortVal = 90
    this.frame = "zlata.png"
    this.char = "&#129409;"
    this.desc = "Mat v centru"
    this.game = id
  }
}

class AchievementKnightKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 91
    this.frame = "fialova.png"
    this.pic = "kun.png"
    this.left = 38
    this.desc = "Vražedný jezdec"
    this.game = id
  }
}

class AchievementBishopKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 92
    this.frame = "fialova.png"
    this.pic = "strelec.png"
    this.left = 24
    this.desc = "Vražedný střelec"
    this.game = id
  }
}

class AchievementKingKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 130
    this.frame = "fialova.png"
    this.pic = "kral.png"
    this.left = 23
    this.desc = "Odtažný mat králem"
    this.game = id
  }
}

class AchievementQueenSacrifice {
  constructor(player, id) {
    this.player = player
    this.sortVal = 150
    this.frame = "zlata.png"
    this.char = "&#x1F478;"
    this.desc = "Útok s obětí dámy"
    this.game = id
  }
}

class AchievementCastlingKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 200
    this.frame = "modra.png"
    this.char = "&#x1F48E;"
    this.desc = "Mat rošádou"
    this.game = id
  }
}

class AchievementEnPassantKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 190
    this.frame = "tyrkysova.png"
    this.char = "&#x1F48E;"
    this.desc = "En-passant mat"
    this.game = id
  }
}

class AchievementSensation {
  constructor(player, id) {
    this.player = player
    this.sortVal = 50
    this.frame = "zlata.png"
    this.char = "&#10024;"
    this.desc = "Senzace turnaje"
    this.game = id
  }
}

// use it to render something and use it by screenshot at last
class AchievementFontPrototype {
  constructor(player, id) {
    this.player = player
    this.sortVal = 1
    this.frame = "zlata.png"
    this.char = "&#129409;"
    this.desc = "Prototyp trofeje"
    this.game = id
  }
}

function collectAchievements(data, tournamentID, games) {
  let tournament = data.findTournament(tournamentID)
  let achievements = []
  games.games.forEach(function(g) {
    for (color in g.players) {
      let wins = g.winner === color
      let player = g.players[color]
      if (g.ply && g.ply<19 && wins && g.ply>2) achievements.push(new AchievementFastGame(player, g.ply, g.id))
      if (player.stats) {
        let stats = player.stats
        if (stats.monkey) achievements.push(new AchievementMonkey(player, stats.monkey, g.id))
        if (stats.queens) achievements.push(new AchievementQueens(player, stats.queens, g.id))
        if (stats.mate && wins) {
          if (stats.mate.smothered) achievements.push(new AchievementSmothered(player, g.id))
          else if (stats.mate.piece==="n") achievements.push(new AchievementKnightKiller(player, g.id))
          if (stats.mate.sacrifice) achievements.push(new AchievementQueenSacrifice(player, g.id))
          if (stats.mate.centerMate) achievements.push(new AchievementCenterMate(player, g.id))
          if (stats.mate.piece==="k") achievements.push(new AchievementKingKiller(player, g.id))
          if (stats.mate.piece==="p") achievements.push(new AchievementPawnKiller(player, g.id))
          if (stats.mate.piece==="b") achievements.push(new AchievementBishopKiller(player, g.id))
          if (stats.mate.castling) achievements.push(new AchievementCastlingKiller(player, g.id))
          if (stats.mate.enPassant) achievements.push(new AchievementEnPassantKiller(player, g.id))
        }
      }
    }
  })

  let sensation = games.games.reduce(biggestDifferenceWinSelector, null)
  if (sensation) {
    sensation.sensation = true // in order to show decoration on player tooltip
    achievements.push(new AchievementSensation(sensation.players[sensation.winner], sensation.id))
  }

  return achievements
}

function renderAchievements(achievements, maxCount = 4) {
  let divs = []
  for (let i=0; i < Math.min(achievements.length, maxCount); i++) {
    let achievement = achievements[i]
    let player = achievement.player.user.name
    let html = `<div style="display: inline-block; position: relative; width:256px"><div class="achievement left">`
    let avatar = Avatars.getAvatar(player, "img/achievements/strelec.png")
    html += `<img src="${avatar}" style="max-height: 110px; height: 110px">`
    html += `<div class="achievementPlayer"><a class="user-link" style="width:110px" href="https://lichess.org/@/${player}" target="_blank"><b style="font-size: 1.8em">${player}</b></a></div>`
    html += "</div>"
    divs.push(html)

    html = `<div class="achievement right">`
    if (achievement.img) html += `<img src="img/achievements/${achievement.img}" style="max-height: 110px; height: 110px">`
    else if (achievement.frame) {
      html += `<div style="position: relative"><img src="img/achievements/${achievement.frame}" style="max-height: 110px; height: 110px">`
      if (achievement.pic) html += `<img src="img/achievements/${achievement.pic}" style="max-height: 75px; height: 75px; position:absolute; top:19px; left:${achievement.left}px">`
      else {
        html += `<div style="font-size:65px; position:absolute; top:10px; left:15px">${achievement.char}</div>`
      }
      html += `</div>`
    } else {
      html += `<img src="img/achievements/zlata.png" style="max-height: 110px; height: 110px">`
    }
    html += `<div class="achievementDesc"><a class="user-link" href="https://lichess.org/${achievement.game}" target="_blank">${achievement.desc}</a></div>`
    html += "</div></div>"
    divs.push(html)
  }

  return divs
}

function createAchievementsInfo(data, tournamentID, games, id="achievements") {
  let tournament = data.findTournament(tournamentID)

  let el = document.getElementById(id)
  if (tournament && el) {
    let achievements = collectAchievements(data, tournamentID, games)
    achievements.sort((a, b) => (a.sortVal < b.sortVal) ? 1 : -1)

    let divs = renderAchievements(achievements)
    let html = `${divs.join("")}`
    el.innerHTML = html
  }
}

function testAchievementsInfo(id="achievements") {
  let i = 0
  let next = () => {
    let name = Avatars.players[i++ % Avatars.players.length]
    return {
      user : {
        name : name
      }
    }
  }

  let achievements = [
    new AchievementFastGame(next(), 8), // undefined game id, never mind
    new AchievementMonkey(next(), 7),
    new AchievementQueens(next(), 3),
    new AchievementSmothered(next()),
    new AchievementPawnKiller(next()),
    new AchievementCenterMate(next()),
    new AchievementKingKiller(next()),
    new AchievementBishopKiller(next()),
    new AchievementKingKiller(next()),
    new AchievementQueenSacrifice(next()),
    new AchievementCastlingKiller(next()),
    new AchievementEnPassantKiller(next()),
    new AchievementSensation(next()),
    new AchievementFontPrototype(next()), // {user :{ name : "kasparov"}}
  ]

  let el = document.getElementById(id)
  if (el) {
    achievements.sort((a, b) => (a.sortVal < b.sortVal) ? 1 : -1)

    let divs = renderAchievements(achievements, 1000)
    let html = `${divs.join("")}`
    el.innerHTML = html
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
  if (pl.ratingDiff) {
    if (pl.ratingDiff < 0) return `<loss>&nbsp;(${(pl.ratingDiff)})</loss>`
    else return `<win>&nbsp;(+${(pl.ratingDiff)})</win>`
  } else return ""
}

function getDecorationTrophies(game, player, wins) {
  let decorations = ""
  if (player.berserk == true) decorations += "&#9889;"
  if (game.ply && game.ply<19 && wins && game.ply>2) decorations += "&#128640;"
  if (game.ply && game.ply>=200) decorations += "&#9200;"
  if (wins && game.sensation) decorations += "&#10024;"
  if (player.stats) {
    let stats = player.stats
    if (stats.monkey) decorations += "&#128053;"
    if (stats.queens) decorations += "&#9813"
    if (stats.mate && wins) {
      if (stats.mate.smothered) decorations += "&#9816;&#129505;"
      else if (stats.mate.piece==="n") decorations += "&#9816;"
      if (stats.mate.sacrifice) decorations += "&#x1F478;"
      if (stats.mate.centerMate) decorations += "&#129409;"
      if (stats.mate.piece==="k") decorations += "&#129332;"
      if (stats.mate.piece==="p") decorations += "&#9823;"
      if (stats.mate.piece==="b") decorations += "&#9815;"
      if (stats.mate.castling || stats.mate.enPassant) decorations += "&#x1F48E;"
    }
  }
  return decorations
}

function whitePlayerDecorated(game) {
  let ratingDiff = ""
  ratingDiff = ratingDiffDeco(game.players.white)
  let wins = game.winner === "white"

  let decorations = getDecorationTrophies(game, game.players.white, wins)
  if (decorations) decorations += "&nbsp;"

  if (wins) {
    return `<span style="white-space:nowrap;"><b>${decorations}${fixPlayerName(game.players.white.user.name)}${ratingDiff}</b></span>`
  } else {
    return `<span style="white-space:nowrap;">${decorations}${fixPlayerName(game.players.white.user.name)}${ratingDiff}</span>`
  }
}

function blackPlayerDecorated(game) {
  let ratingDiff = ""
  ratingDiff = ratingDiffDeco(game.players.black)

  let wins = game.winner === "black"

  let decorations = getDecorationTrophies(game, game.players.black, wins)
  if (decorations) decorations = "&nbsp;" + decorations

  if (wins) {
    return `<span style="white-space:nowrap;"><b>${fixPlayerName(game.players.black.user.name)}${ratingDiff}${decorations}</b></span>`
  } else {
    return `<span style="white-space:nowrap;">${fixPlayerName(game.players.black.user.name)}${ratingDiff}${decorations}</span>`
  }
}

function fixPlayerName(name) {
  return name.replace("-", "&#8209;")
}

var Avatars = function() {
  let players = ["bebul", "bukowskic", "butaczech", "dj-pesec", "hrobotron", "jouzolean",
    "mauricedodo", "mozkomor", "mrazek", "neznama-00", "rychlylenochod", "tekele", "travinho", "kasparov"]
  let defaults = ["default2", "default3"]

  function getAvatar(playerName, defaultAvatar) {
    let playerLow = playerName.toLowerCase()
    let fileName = ""
    if (players.includes(playerLow)) fileName = playerLow
    else if (defaultAvatar) return defaultAvatar
    else fileName = defaults[playerName.length % defaults.length]

    return `img/players/${fileName}.png`
  }

  return {
    players: players,
    getAvatar: getAvatar
  }
}()


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
        html = `<tr><td>${whitePlayerDecorated(game)}</td><td>${getGameResult(game)}</td><td>${blackPlayerDecorated(game)}</td></tr>` + html
      } else if (game.players.black.user.name == player) {
        games++
        if (game.winner == "black") wins++
        if (game.players.black.berserk == true) berserks++
        oponents += game.players.white.rating
        html = `<tr><td>${whitePlayerDecorated(game)}</td><td>${getGameResult(game)}</td><td>${blackPlayerDecorated(game)}</td></tr>` + html
      }
    })

    if (games == 0) {
      htmlPre += `<br>
Já byl na tomhle turnaji jenom na čumendu.
<table>`
    } else {
      htmlPre += `<br>
<span style="color: #555; font-size: 1.2em">Perf:&nbsp;${gambler.performance}&nbsp;&nbsp;AvgOpo:&nbsp;${Math.floor(oponents/games)}<br>
Win:&nbsp;${percent(wins/games)}&nbsp;&nbsp;Bersk:&nbsp;${percent(berserks/games)}</span><table>`
    }

    let avatar = Avatars.getAvatar(player)
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

function toPGN(g, addFen) {
  let pgn = `[White \"${g.players.white.user.name} ${g.players.white.rating}\"]`
  pgn += `\r\n[Black \"${g.players.black.user.name} ${g.players.black.rating}\"]`
  if (addFen && g.initialFen) {
    pgn += `\r\n[Variant "From Position"]`
    pgn += `\r\n[FEN "${g.initialFen}"]`
    pgn += `\r\n[SetUp "1"]`
  }
  pgn += `\r\n\r\n${g.moves}\r\n`
  return pgn
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
      pgn: toPGN(selectedGame),
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
  createAchievementsInfo(data, games.id, games)

  updateMostActivePlayer("gameListTable", gameData)
  updateGoogleBar("gameListTableBar", gameData)
  gameListTable.setData(gameData).then(function(){
    gameListTable.redraw(true)
  })
}
