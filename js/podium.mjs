import {MF} from "./tournamentsData.mjs"
import {
  gameListData,
  updateMostActivePlayer,
  updateGoogleBar,
  gameListTable,
  getLeagueData,
  leagueTable, updateSpecificTournamentHtml, updateTournamentHtmlAuto
} from "./mondayFight.mjs"
import {getOpeningsData, getOpeningsHistogram} from "./cross.mjs"
import {tournamentSpec} from "../data/tournamentSpecs.mjs";

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

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let months = ['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'];

function createTournamentInfo(data, tournamentID, id="info") {
  let tournament = data.findTournament(tournamentID)
  if (tournament!=undefined) {
    let games = data.tournamentGames().find(tg => tg.id==tournamentID)
    let cheaters = ""
    if (games.cheaters) {
      cheaters = `Hry hráče <b>${games.cheaters.join(" a ")}</b> byly odstraněny.`
    }

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
   ${cheaters}
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
    this.img = "fast-game.png"
    //this.frame = "zelena.png"
    //this.char = "&#128640;"
    this.desc = "Raketově rychle"
    this.game = id
  }
}

class AchievementMonkey {
  constructor(player, monkey, id) {
    this.player = player
    this.monkey = monkey
    this.sortVal = 100 + monkey
    this.img = "monkey.png"
    //this.frame = "zelena.png"
    //this.char = "&#128053;"
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
    //this.frame = "zlata.png"
    //this.char = "&#129409;"
    this.img = "center-mate.png"
    this.desc = "Mat v centru"
    this.game = id
  }
}

class AchievementScholar {
  constructor(player, id) {
    this.player = player
    this.sortVal = 60
    this.img = "scholar-mate.png"
    this.desc = "Ševcovský mat"
    this.game = id
  }
}

class AchievementLegal {
  constructor(player, id) {
    this.player = player
    this.sortVal = 180
    this.img = "legal.png"
    this.desc = "Námořní kadet"
    this.game = id
  }
}

class AchievementArabian {
  constructor(player, id) {
    this.player = player
    this.sortVal = 100
    this.img = "arabian.png"
    //this.frame = "zlata.png"
    //this.char = "&#128115;"
    this.desc = "Arabský<br>mat"
    this.game = id
  }
}

class AchievementKingKong {
  constructor(player, id) {
    this.player = player
    this.sortVal = 120
    this.img = "kingkong.png"
    //this.frame = "bramborova.png"
    //this.char = "&#129421;"
    this.desc = "King<br>Kong"
    this.game = id
  }
}

class AchievementFullMaterial {
  constructor(player, id) {
    this.player = player
    this.sortVal = 100
    this.img = "fullmaterial.png"
    //this.frame = "bramborova.png"
    //this.char = "&#129421;"
    this.desc = "Plnej<br>materiál"
    this.game = id
  }
}

class AchievementAnastasia {
  constructor(player, id) {
    this.player = player
    this.sortVal = 100
    this.img = "anastasia.png"
    //this.frame = "tyrkysova.png"
    //this.char = "&#128014;"
    this.desc = "Anastasia<br>mat"
    this.game = id
  }
}

class AchievementBlackburne {
  constructor(player, id) {
    this.player = player
    this.sortVal = 120
    this.img = "blackburne.png"
    //this.frame = "stribrna.png"
    this.desc = "Blackburne<br>mat"
    this.game = id
  }
}

class AchievementHalfburne {
  constructor(player, id) {
    this.player = player
    this.sortVal = 110
    this.img = "blackburne.png"
    //this.frame = "stribrna.png"
    this.desc = "Blackburne<br>v centru"
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
    this.sortVal = 100
    this.frame = "krvava.png"
    this.pic = "kralovna.png"
    this.left = 21
    this.desc = "Dáma<br>za mat"
    this.game = id
  }
}

class AchievementCastlingKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 200
    //this.frame = "modra.png"
    //this.char = "&#x1F48E;"
    this.img = "castling-mate.png"
    this.desc = "Mat rošádou"
    this.game = id
  }
}

class AchievementEnPassantKiller {
  constructor(player, id) {
    this.player = player
    this.sortVal = 190
    //this.frame = "tyrkysova.png"
    //this.char = "&#x1F48E;"
    this.img = "en-passant-mate.png"
    this.desc = "En-passant mat"
    this.game = id
  }
}

class AchievementBlackDot {
  constructor(player, id) {
    this.player = player
    this.sortVal = 52
    //this.frame = "zlata.png"
    //this.char = "⚫"
    this.img = "blackDot.png"
    this.desc = "Černý puntík"
    this.game = id
  }
}

class AchievementReporter {
  constructor(player, id) {
    this.player = player
    this.sortVal = 51
    //this.frame = "zlata.png"
    //this.pic = "../mf-reporter.gif"
    this.img = "reporter.png"
    this.desc = "Reportér<br>MF"
    this.game = id
  }
}

class AchievementSensation {
  constructor(player, id) {
    this.player = player
    this.sortVal = 50
    //this.frame = "zlata.png"
    //this.char = "&#10024;"
    this.img = "sensation.png"
    this.desc = "Senzace turnaje"
    this.game = id
  }
}

class AchievementQuestion {
  constructor(player, id) {
    this.player = player
    this.sortVal = 1
    //this.frame = "zlata.png"
    //this.char = "&#10024;"
    this.img = "question.png"
    this.desc = "Rychlé<br>body"
    this.game = id
  }
}

class AchievementBishopSac {
  constructor(player, id) {
    this.player = player
    this.sortVal = 100
    this.frame = "krvava.png"
    this.pic = "strelec.png"
    this.left = 24
    this.desc = "Oběť<br>střelce"
    this.game = id  }
}

class AchievementLastTimeMate {
  constructor(player, id) {
    this.player = player
    this.sortVal = 40 //less than sensation
    //this.frame = "bramborova.png"
    //this.char = "&#8987;"
    //this.left = 29
    this.img = "lucky.png"
    this.desc = "Na poslední chvíli"
    this.game = id
  }
}

class AchievementMarathonWinner {
  constructor(player, id) {
    this.player = player
    this.sortVal = 45 //less than sensation
    //this.frame = "bramborova.png"
    //this.char = "&#9200;"
    //this.left = 18
    this.img = "maraton.png"
    this.desc = "Vítězný maraton"
    this.game = id
  }
}

class Achievement100PercentWinner {
  constructor(player) {
    this.player = player
    this.sortVal = 1000
    this.frame = "stribrna.png"
    this.pic = "tlama-animate2.gif"
    this.left = 31
    this.desc = "100% vítězství"  // tournament LgtuuhiJ for instance
    this.game = "P1WydaUq"  // Kasparov - Karpov
  }
}

class AchievementNothing {
  constructor() {
    this.player = {user: {name: "Kasparov"}}
    this.sortVal = 0
    this.img = "stribrna.png"
    this.desc = "Nikdo ani prd!"
    this.game = "P1WydaUq"  // Kasparov - Karpov
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
  let s = tournamentSpec.find(s => s.id === tournamentID)
  if (s && s.achievements) s.achievements.forEach(a => {
    switch (a.achievement) {
      case "reporter": achievements.push(new AchievementReporter(a.player, a.id)); break;
      case "black": achievements.push(new AchievementBlackDot(a.player, a.id)); break;
    }
  })

  games.games.forEach(function(g) {
/*
    if (g.ply && g.ply<19 && g.status==='draw') {
      for (let color in g.players) {
        achievements.push(new AchievementQuestion(g.players[color], g.id))
      }
    }
*/
    for (let color in g.players) {
      let wins = g.winner === color
      let player = g.players[color]
      if (g.ply && g.ply<19 && wins && g.ply>2 && g.status !== "timeout") achievements.push(new AchievementFastGame(player, g.ply, g.id))
      if (player.stats) {
        let stats = player.stats
        if (stats.monkey) achievements.push(new AchievementMonkey(player, stats.monkey, g.id))
        if (stats.queens) achievements.push(new AchievementQueens(player, stats.queens, g.id))
        if (stats.sensation) achievements.push(new AchievementSensation(player, g.id))
        if (stats.bishopSac && wins) achievements.push(new AchievementBishopSac(player, g.id))
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
          if (stats.lucky) achievements.push(new AchievementLastTimeMate(player, g.id))
          if (stats.mate.scholar) achievements.push(new AchievementScholar(player, g.id))
          if (stats.mate.legal) achievements.push(new AchievementLegal(player, g.id))
          if (stats.mate.arabian) achievements.push(new AchievementArabian(player, g.id))
          if (stats.mate.anastasia) achievements.push(new AchievementAnastasia(player, g.id))
          if (stats.mate.halfburne) achievements.push(new AchievementHalfburne(player, g.id))
          if (stats.mate.blackburneMate) achievements.push(new AchievementBlackburne(player, g.id))
          if (stats.mate.fullmaterial && !stats.mate.scholar && !stats.mate.kingkong) achievements.push(new AchievementFullMaterial(player, g.id))
          if (stats.mate.kingkong) achievements.push(new AchievementKingKong(player, g.id))
        }
        if (wins && g.ply && g.ply>=200) achievements.push(new AchievementMarathonWinner(player, g.id))
      }
    }
  })

  let winner = tournament.podium[0]
  let winRate = winner.nb.win / winner.nb.game
  if (winRate >= 1) achievements.push(new Achievement100PercentWinner({user: {name: winner.name}}))

  return achievements
}

function renderAchievements(achievements, maxCount = 20) {
  let divs = []
  for (let i=0; i < Math.min(achievements.length, maxCount); i++) {
    let achievement = achievements[i]
    let player = achievement.player
    if (typeof player !== 'string' && !(player instanceof String)) player = achievement.player.user.name
    let html = `<div class="achievementTab"><div class="achievement left">`
    let avatar = Avatars.getAvatar(player, "img/achievements/strelec.png")
    html += `<img src="${avatar}" class="achievementH110">`
    html += `<div class="achievementPlayer"><a class="user-link" class="achievementW110" href="https://lichess.org/@/${player}" target="_blank"><b class="achievementPlayerFont">${player}</b></a></div>`
    html += "</div>"
    divs.push(html)

    html = `<div class="achievement right">`
    if (achievement.img) html += `<img src="img/achievements/${achievement.img}" class="achievementH110">`
    else if (achievement.frame) {
      html += `<div style="position: relative"><img src="img/achievements/${achievement.frame}" class="achievementH110">`
      if (achievement.pic) html += `<img src="img/achievements/${achievement.pic}" class="achievementH75 achievementImg">`
      else {
        // used only to render new achievements
        let leftPx = achievement.left || 15
        html += `<div style="font-size:65px; position:absolute; top:10px; left:${leftPx}px">${achievement.char}</div>`
      }
      html += `</div>`
    } else {
      html += `<img src="img/achievements/zlata.png" class="achievementH110">`
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
    if (achievements.length===0) achievements.push(new AchievementNothing())

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
    new Achievement100PercentWinner(next()),
    new AchievementFastGame(next(), 8), // undefined game id, never mind
    new AchievementMonkey(next(), 7),
    new AchievementQueens(next(), 3),
    new AchievementSmothered(next()),
    new AchievementPawnKiller(next()),
    new AchievementCenterMate(next()),
    new AchievementKnightKiller(next()),
    new AchievementBishopKiller(next()),
    new AchievementKingKiller(next()),
    new AchievementQueenSacrifice(next()),
    new AchievementBishopSac(next()),
    new AchievementScholar(next()),
    new AchievementAnastasia(next()),
    new AchievementFullMaterial(next()),
    new AchievementKingKong(next()),
    new AchievementArabian(next()),
    new AchievementBlackburne(next()),
    new AchievementHalfburne(next()),
    new AchievementLegal(next()),
    new AchievementCastlingKiller(next()),
    new AchievementEnPassantKiller(next()),
    new AchievementSensation(next()),
    new AchievementMarathonWinner(next()),
    new AchievementLastTimeMate(next()),
    new AchievementNothing(),
    new AchievementFontPrototype(next()), // {user :{ name : "kasparov"}}
    new AchievementFastGame(next(), 8), // undefined game id, never mind
    new AchievementMonkey(next(), 7),
    new AchievementQueens(next(), 3),
    new AchievementSmothered(next()),
    new AchievementPawnKiller(next()),
    new AchievementCenterMate(next()),
    new AchievementQuestion(next()),
    new AchievementBlackDot(next()),
    new AchievementReporter(next()),
  ]

  let el = document.getElementById(id)
  if (el) {
    //achievements.sort((a, b) => (a.sortVal < b.sortVal) ? 1 : -1)

    let divs = renderAchievements(achievements, 1000)
    let html = `${divs.join("")}`
    el.innerHTML = html
  }
}

function ratingDiffTag(player) {
  if (player.diff < 0) return `<loss>${(player.diff)}</loss>`
  else return `<win>+${(player.diff)}</win>`
}

function createResults(data, tournamentID, gamesData, id = "results") {
  let tournament = data.findTournament(tournamentID)
  if (tournament) {
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
      if (Array.isArray(player.sheet.scores)) {
        player.sheet.scores.forEach(function (score) {
          if (Array.isArray(score)) {
            if (score[1] > 2) html = html + `<double>${score[0]}</double>`
            else html = html + `<streak>${score[0]}</streak>`
          } else html = html + `<score>${score}</score>`
        })
      } else if (typeof player.sheet.scores == "string" || player.sheet.scores instanceof String) {
        let streak = 0
        player.sheet.scores.split("").reverse().forEach(function(score) {
          // 0 1 always grey <score>
          // 2 <streak> or <double>
          // 3 always green <streak>
          // 4 5 always orange <double>

          // first determine wheter we won this game to update streak
          let pts = 1 // assume we won
          if (streak < 2) pts = Math.min(score,2) / 2
          else if (score <=2) pts = score / 4

          // update html now
          if (score < 2) html = html + `<score>${score}</score>`
          else if (streak>1 && pts>=0.5) html = html + `<double>${score}</double>`
          else html = html + `<streak>${score[0]}</streak>`

         // update streak
         if (pts === 1) streak++
         else streak = 0
        })
      }
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

function decorateGameResult(g, bold) {
  let result = "½&#8209;½"
  if (g.winner === "black") result = "0&#8209;1"
  else if (g.winner === "white") result = "1&#8209;0"

  if (bold) result = `<b>${result}</b>`
  return `<a class="user-link" href="https://lichess.org/${g.id}" target="_blank">${result}</a>`
}

function ratingDiffDeco(pl) {
  if (pl.ratingDiff) {
    if (pl.ratingDiff < 0) return `<loss>&nbsp;(${(pl.ratingDiff)})</loss>`
    else return `<win>&nbsp;(+${(pl.ratingDiff)})</win>`
  } else return ""
}

function getDecorationTrophies(game, player, wins) {
  let decorations = []
  if (game.ply && game.ply<19 && game.status==='draw') decorations.push("&#128064;") //👀
  if (game.status === 'noStart' && !wins) decorations.push("&#9940;")
  if (player.berserk == true) decorations.push("&#9889;")
  if (game.ply && game.ply<19 && wins && game.ply>2 && game.status !== "timeout") decorations.push("&#128640;")
  if (game.ply && game.ply>=200) decorations.push("&#9200;")
  if (player.stats) {
    let stats = player.stats
    if (stats.monkey) decorations.push("&#128053;")
    if (stats.queens) decorations.push("&#9813;")
    if (stats.lucky) decorations.push("&#8987;")
    if (stats.sensation) decorations.push("&#10024;")
    if (stats.bishopSac && wins) decorations.push("<span style='color:red'>&#9815;</span>")
    if (stats.mate && wins) {
      if (stats.mate.smothered) decorations.push("&#9816;&#129505;")
      else if (stats.mate.piece==="n") decorations.push("&#9816;")
      if (stats.mate.sacrifice) decorations.push("<span style='color:red'>&#9813;</span>")
      if (stats.mate.centerMate) decorations.push("&#129409;")
      if (stats.mate.piece==="k") decorations.push("&#129332;")
      if (stats.mate.piece==="p") decorations.push("&#9823;")
      if (stats.mate.piece==="b") decorations.push("&#9815;")
      if (stats.mate.scholar) decorations.push("&#128098;")
      if (stats.mate.legal) decorations.push("&#9875;")
      if (stats.mate.arabian) decorations.push("&#128115;")
      if (stats.mate.anastasia) decorations.push("&#128096;")
      if (stats.mate.halfburne) decorations.push("&#129492;")
      if (stats.mate.blackburneMate) decorations.push("&#129492;")
      if (stats.mate.kingkong && !stats.mate.scholar) decorations.push("<b>&#129421;</b>") //different achievement == different symbol
      else if (stats.mate.fullmaterial && !stats.mate.scholar) decorations.push("&#129421;")
      if (stats.mate.castling || stats.mate.enPassant) decorations.push("&#x1F48E;")
    }
  }
  return decorations
}

export function getTrophies(game) {
  return getDecorationTrophies(game, game.players.white, game.winner === "white").join("") + "&#9643;" + getDecorationTrophies(game, game.players.black, game.winner === "black").join("")
}

export function collectTrophies(game, tr1) {
  // remove stupid non-real-achievements like berserk, noStart and 👀 from the list
  let removeList = ["&#9940;", "&#9889;", "&#128064;"]

  let tr = tr1 || {tr: new Set(), count: 0}
  getDecorationTrophies(game, game.players.white, game.winner === "white").forEach(t => {
    if (!removeList.includes(t)) {
      tr.tr.add(t)
      tr.count++
    }
  })
  getDecorationTrophies(game, game.players.black, game.winner === "black").forEach(t => {
    if (!removeList.includes(t)) {
      tr.tr.add(t)
      tr.count++
    }
  })
  return tr
}

export function joinTrophies(trophies, tr) {
  return {
    tr: new Set([...trophies.tr, ...tr.tr]),
    count: trophies.count + tr.count
  }
}

function whitePlayerDecorated(game) {
  let ratingDiff = ""
  ratingDiff = ratingDiffDeco(game.players.white)
  let wins = game.winner === "white"

  let decorations = getDecorationTrophies(game, game.players.white, wins).join("")
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

  let decorations = getDecorationTrophies(game, game.players.black, wins).join("")
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

export var Avatars = function() {
  let players = ["bebul", "bukowskic", "dj-pesec", "hrobotron", "jouzolean",
    "mauricedodo", "mozkomor", "mrazek", "neznama-00", "rychlylenochod", "tekele",
    "travinho", "mates7824", "kasparov", "mates78", "vikjav", "tomasklimecky",
    "dzin69", "janshorny", "arytmik", "tykev123", "pirat77", "puklejchleba", "margarita_vlasenko", "felcar", "droider66",
    "sachycvek", "lastscout", "sumaspandy", "honzahonzahonza", "tomas_1989", "polgu", "barongorc", "michaelchmiel"]
  let useGif = []
  //let useGif = ["bebul", "mrazek", "mozkomor", "jouzolean", "bukowskic", "margarita_vlasenko", "dj-pesec", "neznama-00", "janshorny", "dzin69", "pirat77", "lastscout", "tekele", "vikjav", "mauricedodo", "rychlylenochod", "hrobotron", "felcar", "tomasklimecky", "arytmik", "sachycvek", "travinho", "mates78", "mates7824"]
  let defaults = ["default2", "default3"]

  function getAvatar(playerName, defaultAvatar) {
    let playerLow = playerName.toLowerCase()
    let fileName = ""
    if (players.includes(playerLow)) fileName = playerLow
    else if (defaultAvatar) return defaultAvatar
    else fileName = defaults[playerName.length % defaults.length]

    if (useGif.includes(playerLow)) return `img/players/${fileName}.gif`
    else return `img/players/${fileName}.png`
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
        html = `<tr><td>${whitePlayerDecorated(game)}</td><td>${decorateGameResult(game, game.winner == "white")}</td><td>${blackPlayerDecorated(game)}</td></tr>` + html
      } else if (game.players.black.user.name == player) {
        games++
        if (game.winner == "black") wins++
        if (game.players.black.berserk == true) berserks++
        oponents += game.players.white.rating
        html = `<tr><td>${whitePlayerDecorated(game)}</td><td>${decorateGameResult(game, game.winner == "black")}</td><td>${blackPlayerDecorated(game)}</td></tr>` + html
      }
    })

    if (games == 0) {
      htmlPre += `<br>
Já byl na tomhle turnaji jenom na čumendu.
<table>`
    } else {
      htmlPre += `<br>
<span style="color: #555; font-size: 1.2em">Perf:&nbsp;${gambler.performance}&nbsp;&nbsp;AvgOpo:&nbsp;${Math.round(oponents/games)}<br>
Win:&nbsp;${percent(wins/games)}&nbsp;Games:&nbsp;${games}&nbsp;Bersk:&nbsp;${percent(berserks/games)}</span><table>`
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
  let game = selectGame(games, hideid, boardId, MF.biggestDifferenceWinSelector)
  if (game) {
    if (game.winner == "white") document.getElementById("senzacionist").innerHTML = game.players.white.user.name
    else document.getElementById("senzacionist").innerHTML = game.players.black.user.name
    document.getElementById("senzaceDiff").innerHTML = Math.abs(game.players.white.rating - game.players.black.rating)
    if (MF.loser(game).berserk) document.getElementById("senzaBerserk").innerHTML = `${MF.loser(game).user.name} hrál berserk.`
    else document.getElementById("senzaBerserk").innerHTML = ""
  }
  return game
}

function updateSpecialBoards(games) {
  let mateGame = selectGame(games, "fastMateId", "fastMateBoard", MF.fastestMateSelector)
  let sensaGame = sensationGame(games, "surpriseGameId", "surpriseGameBoard")
  let fastestGame = selectGame(games, "fastestId", "fastestBoard", MF.fastestGameSelector)
  if (fastestGame && (fastestGame === mateGame || fastestGame === sensaGame)) {
    document.getElementById("fastestId").style.display = "none" // hide it, because it is already shown
  }
}

export var openingsHistogram = {
  histogram: null,
  get : function() {return this.histogram},
  set : function(h) { this.histogram = h }
}
var openingsTable = null
export function setOpeningTable(table) {
  openingsTable = table
}

function updateBackground(id) {
  if (id.match(/^playOFF/)) document.body.style.backgroundColor = "#def";
  else document.body.style.backgroundColor = "#e9ecef";
}

function nextTournament(data, diff=1) {
  data.currentGameListTableIx += diff
  data.currentGameListTableIx = Math.max(Math.min(data.currentGameListTableIx, data.tournamentGames().length - 1),0)

  let games = data.tournamentGames()[data.currentGameListTableIx]
  let gameData = gameListData(games)

  let newUrl = window.location.pathname + "?mf=" + encodeURIComponent(data.tournamentGames()[data.currentGameListTableIx].id)
  History.replaceState({'mf': data.mfId}, 'Monday Fights', newUrl)

  let lastMfWinner = data.findTournament(games.id).podium[0].name

  updateBackground(games.id)
  createPodium(data, games.id)
  createResults(data, games.id, games)
  updateSpecialBoards(games)
  createTournamentInfo(data, games.id)
  createAchievementsInfo(data, games.id, games)

  updateMostActivePlayer("gameListTable", gameData, lastMfWinner)
  updateGoogleBar("gameListTableBar", gameData)
  updateSpecificTournamentHtml("tournament-spec", games.id)
  updateTournamentHtmlAuto("tournament-auto", games.id, data)
  gameListTable.setData(gameData).then(function(){
    gameListTable.redraw(true)
  })

  let openingData = getOpeningsData(data, [games])
  openingsHistogram.set(getOpeningsHistogram(openingData))
  setOpeningTable(openingsTable)
  openingsTable.setData(openingData).then(function(){
    openingsTable.redraw(true)
  })

  let leagueData = getLeagueData(data)
  let leagueNoEl = document.getElementById("leagueNo")
  if (leagueNoEl) leagueNoEl.innerHTML = `${leagueData.count}.týden`
  leagueTable.setData(leagueData.league).then(function (){
    leagueTable.redraw(true)
  })
}

export let MFPodium = {
  updateBackground: updateBackground,
  createPodium: createPodium,
  createResults: createResults,
  createTournamentInfo: createTournamentInfo,
  createAchievementsInfo: createAchievementsInfo,
  testAchievementsInfo: testAchievementsInfo,
  updateSpecialBoards: updateSpecialBoards,
  cancelAllTips: cancelAllTips,
  toPGN: toPGN
}
