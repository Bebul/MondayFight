/* jshint -W033, esversion: 6 */
import {MF} from "./tournamentsData.mjs"
import {
  defaultBoardConfig,
  gameListData,
  gameListTable,
  getLeagueData,
  leagueTable,
  updateGoogleBar,
  updateMostActivePlayer,
  updateSpecificTournamentHtml,
  updateTournamentHtmlAuto
} from "./mondayFight.mjs"
import {getOpeningsData, getOpeningsHistogram} from "./cross.mjs"
import {tournamentSpec} from "../data/tournamentSpecs.mjs";

let placeTxt = ['','first','second','third']

function percent(num) {
  return Math.round(100 * num) + "%"
}

let dummyKasparov = {
  rank: 3,
  name: "Kasparov",
  rating: 2851,
  performance: 3300,
  nb: {game: 1, win:1, berserk: 0}
}

function getPlayerPodiumHTML(gambler, showBullet = false, specClass="") {
  if (!gambler) gambler = dummyKasparov
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
  <div class="trophy ${specClass}" style="position:relative;overflow:visible">
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
  let spec = ""
  let s = tournamentSpec.find(s => s.id === tournament.id)
  if (s && s.specClass) spec = s.specClass[0]
  let first = getPlayerPodiumHTML(podium[0], showBullet, spec)
  let second = getPlayerPodiumHTML(podium[1], false, spec)
  let third = getPlayerPodiumHTML(podium[2], false, spec)
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

class AchievementMateGarde {
  constructor(player, id) {
    this.player = player
    this.sortVal = 105
    this.img = "mate-garde.png"
    this.desc = "Mat Garde"
    //this.frame = "modra.png"
    //this.left = 17
    //this.char = "&#x1F4AB;"
    this.game = id
  }
}

class AchievementPawns {
  constructor(player, n, id) {
    this.player = player
    this.sortVal = n * 25
    this.img = "pawns.png"
    this.desc = `${n} pěšci ve sloupci`
    // this.frame = "stribrna.png"
    // this.left = 34
    // this.char = "&#x1F6A6;"
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

class AchievementBrokenChain {
  constructor(player, id, n=8) {
    this.player = player
    this.sortVal = 95 + n
    // this.frame = "fialova.png"
    // this.pic = "kun.png"
    // this.left = 38
    this.img = "broken-chain.png"
    this.desc = `Přetrhl šňůru ${n} proher`
    this.game = id
  }
}

class AchievementLackOfSpirit {
  constructor(player, id, desc) {
    this.player = player
    this.sortVal = 60
    this.img = "question.png"
    this.desc = desc || "Málo bojovnosti"
    this.game = id
  }
}

class AchievementPersonalBest {
  constructor(player, id, desc) {
    this.player = player
    this.sortVal = 100 + Number.parseInt(desc) / 100
    this.img = "personal-best.png"
    this.desc = "Osobáček " + desc
    this.game = id
  }
}

class AchievementBest {
  constructor(player, id) {
    this.player = player
    this.sortVal = 80
    //this.frame = "tyrkysova.png"
    //this.char = "💪"
    this.img = "best.png"
    this.desc = "Nejlepší výhra"
    this.game = id
  }
}

class AchievementWorst {
  constructor(player, id) {
    this.player = player
    this.sortVal = 70
    //this.frame = "krvava.png"
    //this.char = "😱"
    this.img = "worst.png"
    this.desc = "Nejhorší prohra"
    this.game = id
  }
}

class AchievementBlackDot {
  constructor(player, id, desc) {
    this.player = player
    this.sortVal = 52
    //this.frame = "zlata.png"
    //this.char = "⚫"
    this.img = "blackDot.png"
    this.desc = desc || "Černý puntík"
    this.game = id
  }
}

class AchievementPinkDot {
  constructor(player, id, desc) {
    this.player = player
    this.sortVal = 52
    this.img = "pinkDot.png"
    this.desc = desc || "Růžový puntík"
    this.game = id
  }
}

class AchievementBlackDotGM {
  constructor(player, id) {
    this.player = player
    this.sortVal = 51
    //this.frame = "zlata.png"
    //this.char = "⚫"
    this.img = "blackDot.png"
    this.desc = "Třídní důtka prohrál s GM"
    this.game = id
  }
}

class AchievementRedDotIM {
  constructor(player, id) {
    this.player = player
    this.sortVal = 51
    //this.frame = "zlata.png"
    //this.char = "⚫"
    this.img = "redDot.png"
    this.desc = "Napomenutí prohrál s IM"
    this.game = id
  }
}

class AchievementBlackDotXX {
  constructor(player, id, desc) {
    this.player = player
    this.sortVal = 51
    //this.frame = "zlata.png"
    //this.char = "⚫"
    this.img = "blackDot.png"
    this.desc = desc || "Ňákej blunder"
    this.game = id
  }
}

class AchievementBeatGM {
  constructor(player, id) {
    this.player = player
    this.sortVal = 200
    this.img = "beatGM.png"
    this.desc = "Porazil Velmistra"
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

class AchievementBerserker {
  constructor(player) {
    this.player = player
    this.sortVal = 990
    //this.frame = "stribrna.png"
    //this.char = "⚡"
    //this.left = 20
    this.img = "berserker.png"
    this.desc = "Maestro<br>Berserker"  // tournament LgtuuhiJ for instance
    this.game = "v3S715AO/black"  // DrNykterstein improved bong cloud
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

class AchievementUnratedDuel {
  constructor(id) {
    this.player = {user: {name: "Kasparov"}}
    this.sortVal = 52
    this.img = "blackDot.png"
    this.desc = "Hrajte to příště rated!"
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

function collectSpecAchievementDecorations(player, tournamentID, gameID) {
  let decorations = []
  let s = tournamentSpec.find(s => s.id === tournamentID)
  if (s && s.achievements) s.achievements.forEach(a => {
    let achievement = null
    switch (a.achievement) {
      case "reporter": achievement = new AchievementReporter(a.player, a.id); break;
      case "black": achievement = new AchievementBlackDot(a.player, a.id); break;
      case "pink": achievement = new AchievementPinkDot(a.player, a.id, a.desc); break;
      case "blackGM": achievement = new AchievementBlackDotGM(a.player, a.id); break;
      case "blackXX": achievement = new AchievementBlackDotXX(a.player, a.id, a.desc); break;
      case "lackOfSpirit": achievement = new AchievementLackOfSpirit(a.player, a.id, a.desc); break;
      case "beatGM": achievement = new AchievementBeatGM(a.player, a.id); break;
    }
    if (a.player === player && a.id == gameID && achievement) decorations.push(achievement.decoration)
  })
  return decorations
}

function collectAchievements(data, tournamentID, games) {
  let tournament = data.findTournament(tournamentID)
  let achievements = []
  let s = tournamentSpec.find(s => s.id === tournamentID)
  if (s && s.achievements) s.achievements.forEach(a => {
    switch (a.achievement) {
      case "reporter": achievements.push(new AchievementReporter(a.player, a.id)); break;
      case "black": achievements.push(new AchievementBlackDot(a.player, a.id)); break;
      case "pink": achievements.push(new AchievementPinkDot(a.player, a.id, a.desc)); break;
      case "blackGM": achievements.push(new AchievementBlackDotGM(a.player, a.id)); break;
      case "blackIM": achievements.push(new AchievementRedDotIM(a.player, a.id)); break;
      case "blackXX": achievements.push(new AchievementBlackDotXX(a.player, a.id, a.desc)); break;
      case "lackOfSpirit": achievements.push(new AchievementLackOfSpirit(a.player, a.id, a.desc)); break;
      case "beatGM": achievements.push(new AchievementBeatGM(a.player, a.id)); break;
    }
  })
  if (tournament.unratedDuels) tournament.unratedDuels.forEach(id => achievements.push(new AchievementUnratedDuel(id)))
  if (!tournament.rated) achievements.push(new AchievementUnratedDuel(games.games[0].id))

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
        if (stats.broken) achievements.push(new AchievementBrokenChain(player, g.id, stats.broken))
        if (stats.bishopSac && wins) achievements.push(new AchievementBishopSac(player, g.id))
        if (stats.pawns) achievements.push(new AchievementPawns(player, stats.pawns, g.id))
        if (stats.highest) achievements.push(new AchievementPersonalBest(player, g.id, stats.highest))
        if (stats.best) achievements.push(new AchievementBest(player, g.id))
        if (stats.worst) achievements.push(new AchievementWorst(player, g.id))
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
          if (stats.mate.garde) achievements.push(new AchievementMateGarde(player, g.id))
          if (stats.mate.fullmaterial && !stats.mate.scholar && !stats.mate.kingkong) achievements.push(new AchievementFullMaterial(player, g.id))
          if (stats.mate.kingkong) achievements.push(new AchievementKingKong(player, g.id))
        }
        if (wins && g.ply && g.ply>=200) achievements.push(new AchievementMarathonWinner(player, g.id))
      }
    }
  })

  let winner = tournament.podium[0]
  let winRate = winner.nb.win / winner.nb.game
  if (winRate >= 1) {
    // if the winner is the Grand Master we should give all his Monday Fights losers Black Mark for bad representation :-D
    let gm = ["sachycvek"]
    let masters = gm + ["Lukas_Vlasak"]
    if (masters.includes(winner.name)) {
      let losers = new Map()
      games.games.forEach(function(g) {
        if (masters.includes(g.players.white.user.name)) losers.set(g.players.black.user.id, [g.id, g.players.black.rating])
        else if (masters.includes(g.players.black.user.name)) losers.set(g.players.white.user.id, [g.id, g.players.white.rating])
      })
      let sorted = Array.from(losers).sort(function(a,b) {
        return a[1][1] - b[1][1]
      })
      for(let [loser, [game, rating]] of sorted) {
        if (gm.includes(winner.name)) achievements.push(new AchievementBlackDotGM(loser, game))
        else achievements.push(new AchievementRedDotIM(loser, game))
      }
    }
    achievements.push(new Achievement100PercentWinner({user: {name: winner.name}}))
  }
  if (winner.nb.game===winner.nb.berserk) achievements.push(new AchievementBerserker({user: {name: winner.name}}))

  return achievements
}

function renderAchievements(achievements, maxCount = 25, specClass="") {
  let divs = []
  for (let i=0; i < Math.min(achievements.length, maxCount); i++) {
    let achievement = achievements[i]
    let player = achievement.player
    if (typeof player !== 'string' && !(player instanceof String)) player = achievement.player.user.name
    let html = `<div class="achievementTab"><div class="achievement left">`
    let avatar = Avatars.getAvatar(player, "img/achievements/strelec.png")
    html += `<img src="${avatar}" class="achievementH110 ${specClass}">`
    html += `<div class="achievementPlayer"><a class="user-link achievementW110" href="https://lichess.org/@/${player}" target="_blank"><b class="achievementPlayerFont">${player}</b></a></div>`
    html += "</div>"
    divs.push(html)

    html = `<div class="achievement right">`
    if (achievement.img) html += `<img src="img/achievements/${achievement.img}" class="achievementH110 ${specClass}">`
    else if (achievement.frame) {
      html += `<div style="position: relative"><img src="img/achievements/${achievement.frame}" class="achievementH110 ${specClass}">`
      if (achievement.pic) html += `<img src="img/achievements/${achievement.pic}" class="achievementH75 achievementImg ${specClass}">`
      else {
        // used only to render new achievements
        let leftPx = achievement.left || 15
        html += `<div style="font-size:65px; position:absolute; top:10px; left:${leftPx}px">${achievement.char}</div>`
      }
      html += `</div>`
    } else {
      html += `<img src="img/achievements/zlata.png" class="achievementH110 ${specClass}">`
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

    let spec = ""
    let s = tournamentSpec.find(s => s.id === tournament.id)
    if (s && s.specClass) spec = s.specClass[1]
    let divs = renderAchievements(achievements, 25, spec)
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
    new AchievementPawns(next(), 3),
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
    new AchievementBerserker(next()),
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
    new AchievementBlackDotGM(next()),
    new AchievementRedDotIM(next()),
    new AchievementBlackDotXX(next()),
    new AchievementLackOfSpirit(next()),
    new AchievementMateGarde(next()),
    new AchievementBrokenChain(next()),
    new AchievementPersonalBest(next()),
    new AchievementBest(next()),
    new AchievementWorst(next()),
    new AchievementBeatGM(next())
  ]

  let el = document.getElementById(id)
  if (el) {
    //achievements.sort((a, b) => (a.sortVal < b.sortVal) ? 1 : -1)

    let divs = renderAchievements(achievements, 1000, "lastTournamentAchievement")
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
    <span class="user-link name tooltip clickable-tooltip">
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

   let tooltips = document.getElementsByClassName("clickable-tooltip")
   for (let i = 0; i < tooltips.length; i++) {
     let el = tooltips[i]
     el.onclick = createTip(data, gamesData, tournament, tournament.standing.players[i].name)
     //el.addEventListener('mouseout',cancelTip)
   }
  }
}

export function involvedInGambit(opening) {
  let name= opening.toLowerCase()
  let mainName = name.split(":")[0]
  let secondary = name.split(":")[1]
  return name.includes("gambit")
}

export function playsGambit(side, opening) {
  let name= opening.toLowerCase()
  let mainName = name.split(":")[0]
  let secondary = name.split(":")[1]
  return (name.includes("gambit") && side==="white"
      && !(secondary && secondary.includes("rousseau"))
      && !(name.includes("ruy lopez") && secondary && secondary.includes("alapin gambit"))
      && !name.includes("latvian")
      && !name.includes("lucchini")
      && !name.includes("englund")
    ) ||
    (name.includes("italian") && side==="black" && secondary && (secondary.includes("rousseau") || secondary.includes("lucchini"))) ||
    (name.includes("latvian gambit") && side==="black") ||
    (name.includes("alapin gambit") && side==="black") ||
    (name.includes("englund gambit") && side==="black")
}

function packBoard(game, side) {
  let lastMoveNo = 0
  if (game.moves !== "") lastMoveNo = game.moves.split(' ').length
  let opening = {
    theme: "sportverlag",
    pieceStyle: "alpha"
  }
  let color = "gainsboro"
  if (game.opening && game.opening.name) {
    let name = game.opening.name.toLowerCase()
    let mainName = name.split(":")[0]
    let secondary = name.split(":")[1]
    if (playsGambit(side, name)) {
      opening.theme = 'brown'
      opening.pieceStyle = "merida"
      color = "seashell"
    } else if (mainName.includes("sicilian") && side==="black") {
      opening.theme = "green"
      opening.pieceStyle = "gioco"
      color = "green"
    } else if (mainName.includes("defense") && side==="black") {
      opening.theme = "sportverlag"
      opening.pieceStyle = "alpha"
      color = "gainsboro"
    } else if (name.startsWith("bishop's") && side==="white") {
      opening.theme = "blue"
      opening.pieceStyle = "merida"
      color = "darkturquoise"
    } else if (name.startsWith("scotch") && side==="white") {
      opening.theme = "green"
      opening.pieceStyle = "merida"
      color = "white"
    } else if (name.startsWith("ruy lopez") && side==="white") {
      opening.theme = "green"
      opening.pieceStyle = "gioco"
      color = "#ffffcc"
    } else if (mainName.includes("russian game") && side==="black") {
      opening.theme = "informator"
      opening.pieceStyle = "uscf"
      color = "#b16e6e"
    } else if (mainName.includes("italian game")) {
      opening.theme = "blue"
      opening.pieceStyle = "wikipedia"
      color = "lightblue"
    } else if (name.startsWith("french defense")) {
      opening.theme = "falken"
      opening.pieceStyle = "merida"
      color = "lightgrey"
    } else if (mainName.includes("english opening") && side==="white") {
      opening.theme = "informator"
      opening.pieceStyle = "alpha"
      color = "white"
    } else {
      opening.theme = "blue"
      opening.pieceStyle = "wikipedia"
      color = "aliceblue"
    }
  }
  return {
    config: {...{
      pgn: MFPodium.toPGN(game, false),
      showCoords: false, coordsInner: false, headers: true,
      theme: 'brown', movesHeight: 60,
      orientation: side, startPlay: lastMoveNo,
      resizable: false
    }, ...opening},
    boardId: `tb-${game.id}`,
    color: color
  }
}

function showGameBoard(player, game, config, color, boardId, element) {
  let status = `<div>Game ended by <b>${game.status}</b></div>`
  let opening = ""
  if (game.opening && game.opening.name) opening = `<div><b>${game.opening.name}</b></div>`
  let html = `<div class="boards board">${status}${opening}<div id="${boardId}"></div></div>`

  let el = document.getElementById(`board-${player}`)
  let init = () => {
    if (el.board) {
      // el.board.board.destroy()
      el.board.base.stop()
    }
    el.board = PGNV.pgnView(boardId, {...config, ...{boardSize: Math.max(document.getElementById(boardId).clientWidth, 200)}})
  }

  el.style.position = "absolute"  // TODO: glue it to the original tooltip window (ie. somewhat relative)
  el.style.borderCollapse = "initial"
  el.style.border = "1px solid black"
  el.style.backgroundColor = color
  el.innerHTML = html
  el.style.visibility = "visible"

  init()
}

let globCounter = 0

function decorateGameResult(player, g, winner, side, init) {
  let result = "½&#8209;½"
  if (g.winner === "black") result = "0&#8209;1"
  else if (g.winner === "white") result = "1&#8209;0"

  globCounter += 1
  let gid = `tb-${globCounter}-${g.id}`
  if (winner) result = `<b><win>${result}</win></b>`
  else if (g.winner) result = `<b><loss>${result}</loss></b>`
  else result = `<b><draw>${result}</draw></b>`

  init.push(() => {
    let el = document.getElementById(gid)
    el.addEventListener('mouseover',(event) => {
      let {config, boardId, color} = packBoard(g, side)
      showGameBoard(player, g, config, color, boardId, el)
    }, false)
/*
    el.addEventListener('mouseout', (event) => {
      let board = document.getElementById(`b-${gid}`)
      board.innerHTML = ""
      board.style.visibility = "hidden"
    }, false)
*/
  })
/*
  let tb = `<div className="tooltiptext" style="left: 100%" id="b-${gid}"></div>`
  return `<a id="${gid}" class="user-link" href="https://lichess.org/${g.id}" target="_blank">${result}${tb}</a>`
*/
  return `<a id="${gid}" class="user-link z-index-2" href="https://lichess.org/${g.id}" target="_blank">${result}</a>`
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
  if (game.overtime) decorations.push("⏱")
  if (player.stats) {
    let stats = player.stats
    if (stats.monkey) decorations.push("&#128053;")
    if (stats.queens) decorations.push("&#9813;")
    if (stats.lucky) decorations.push("&#8987;")
    if (stats.sensation) decorations.push("&#10024;")
    if (stats.broken) decorations.push("&#128165;") // 💥
    if (stats.bishopSac && wins) decorations.push("<span style='color:red'>&#9815;</span>")
    if (stats.pawns) decorations.push("&#x1F6A6;")
    if (stats.highest) decorations.push("🥇")
    if (stats.worst) decorations.push("😱")
    if (stats.best) decorations.push("💪")
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
      if (stats.mate.garde) decorations.push("&#x1F4AB;")
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

function whitePlayerDecorated(game, specDecorations = []) {
  let ratingDiff = ""
  ratingDiff = ratingDiffDeco(game.players.white)
  let wins = game.winner === "white"

  let decorations = getDecorationTrophies(game, game.players.white, wins).join("") + specDecorations.join("")
  if (decorations) decorations += "&nbsp;"

  if (wins) {
    return `<span style="white-space:nowrap;"><b>${decorations}${fixPlayerName(game.players.white.user.name)}${ratingDiff}</b></span>`
  } else {
    return `<span style="white-space:nowrap;">${decorations}${fixPlayerName(game.players.white.user.name)}${ratingDiff}</span>`
  }
}

function blackPlayerDecorated(game, specDecorations = []) {
  let ratingDiff = ""
  ratingDiff = ratingDiffDeco(game.players.black)

  let wins = game.winner === "black"

  let decorations = getDecorationTrophies(game, game.players.black, wins).join("") + specDecorations.join("")
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
  let players = ["bebul", "bukowskic", "dj-strelec", "hrobotron", "jouzolean",
    "mauricedodo", "mozkomor", "mrazek", "neznama-00", "rychlylenochod", "tekele",
    "travinho", "mates7824", "kasparov", "mates78", "vikjav", "tomasklimecky",
    "dzin69", "janshorny", "arytmik", "tykev123", "pirat77", "puklejchleba", "margarita_vlasenko", "felcar", "droider66",
    "sachycvek", "lastscout", "sumaspandy", "honzahonzahonza", "tomas_1989", "polgu",
    "barongorc", "michaelchmiel", "tomzr", "tomasklimecky2024", "kamikazeee", "kasparpalov", "dj-strelec",
    "royalchessyoutube", "peinsamacze", "pajk013", "lukas_vlasak", "kunc99", "hglockk", "peinsamacz", "koblizekwiz"]
  let useGif = ["bebul.gif", "mrazek.gif", "mozkomor.gif", "jouzolean.webp", "bukowskic.gif", "margarita_vlasenko.gif",
    "dj-strelec.gif", "neznama-00.gif", "janshorny.gif", "dzin69.gif", "pirat77.gif", "lastscout.gif", "tekele.gif", "vikjav.gif",
    "mauricedodo.gif", "rychlylenochod.gif", "hrobotron.gif", "felcar.gif", "tomasklimecky.gif", "arytmik.gif", "sachycvek.gif",
    "travinho.gif", "mates78.gif", "mates7824.gif", "dj-strelec.gif",
    "lukas_vlasak.webp", "honzahonzahonza.webp", "kamikazeee.webp", "michaelchmiel.webp", "pajk013.webp", "tomzr.webp", "peinsamacze.webp"]
  let halloweens = ["witch.webp", "trainer.webp", "ghost2.webp", "ghost3.webp", "grave.webp",
    "pumpkin.webp", "skeleton10.webp", "skeleton12.webp", "skeleton13.webp", "skeleton5.webp", "skeleton6.webp", "skeleton7.webp", "skeleton8.webp"]
  let defaults = ["default2", "default3"]

  function getAvatar(playerName, defaultAvatar) {
    let playerLow = playerName.toLowerCase()
    let fileName = ""
    if (players.includes(playerLow)) fileName = playerLow
    else if (defaultAvatar) return defaultAvatar
    else fileName = defaults[playerName.length % defaults.length]

    let halloween = false
    if (halloween) {
      let prepared = (useGif.map(v => v.split(".")).find(v => v[0] === playerLow))
      if (prepared) {
        return `img/players/${prepared[0]}.${prepared[1]}`
      }
      else {
        fileName = halloweens[playerName.length % halloweens.length]
        return `img/halloween/${fileName}`
      }
    } else {
      return `img/players/${fileName}.png`
    }
  }

  return {
    players: players,
    getAvatar: getAvatar
  }
}()


export function getTipHtml(theGames, tournament, player, size) {
  if (!size) size = 0.8
  let gambler = getPlayer(tournament, player)
  let html = ""
  let htmlPre = `<a class="user-link" href="https://lichess.org/@/${player}" target="_blank"><b style="font-size: 1.8em">${player}</b></a>`

  let games = 0
  let wins = 0
  let berserks = 0
  let oponents = 0
  let init = []
  theGames.forEach(function(game) {
    if (game.players.white.user.name == player) {
      let specDecorations = collectSpecAchievementDecorations(player, tournament.id, game.id)
      games++
      if (game.winner == "white") wins++
      if (game.players.white.berserk == true) berserks++
      oponents += game.players.black.rating
      html = `<tr><td>${whitePlayerDecorated(game, specDecorations)}</td><td>${decorateGameResult(player, game, game.winner == "white", "white", init)}</td><td>${blackPlayerDecorated(game)}</td></tr>` + html
    } else if (game.players.black.user.name == player) {
      let specDecorations = collectSpecAchievementDecorations(player, tournament.id, game.id)
      games++
      if (game.winner == "black") wins++
      if (game.players.black.berserk == true) berserks++
      oponents += game.players.white.rating
      html = `<tr><td>${whitePlayerDecorated(game)}</td><td>${decorateGameResult(player, game, game.winner == "black", "black", init)}</td><td>${blackPlayerDecorated(game, specDecorations)}</td></tr>` + html
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
  let halloween = false
  if (avatar) {
    html = htmlPre + html + `<img src="${avatar}" style="position:absolute; bottom: 100%; right: 3%; width: ${size*100}px">`
    if (player === "bebul" && size==0.8) {
      html += `<img src="img/players/bebulAvatar2.png" style="position:absolute; bottom: -88px; left: -99px;transform: rotate(44deg)">`
    } else if (player === "mozkomor" && size==0.8) {
      html += `<img src="img/halloween/houpacka.webp" style="width: 237px; position:absolute; top: 0px; left: -93px">`
    } else if (halloween && player === "Jouzolean" && size==0.8) {
      html += `<img src="img/players/jouzolean-mirror.gif" style="width: 190px; position:absolute; bottom: -25px; left: -96px">`
    } else if (halloween && player === "LastScout" && size==0.8) {
      html += `<img src="img/halloween/skeleton2.webp" style="width: 200px; position:absolute; top: 0px; left: -104px">`
    } else if (halloween && player === "RychlyLenochod" && size==0.8) {
      html += `<img src="img/halloween/spiderLeft.webp" style="width: 180px; position:absolute; top: 24px; left: -93px">`
    } else if (halloween && player === "HonzaHonzaHonza" && size==0.8) {
      html += `<img src="img/halloween/skeleton3.webp" style="width: 200px; position:absolute; top: 24px; left: -86px">`
    }
  }

  html = html + `<div className="tooltiptext" style="bottom:0%; left:100%; margin-left:3px" id="board-${player}"></div>`

  html += "</table>"

  return {html, init}
}

function createTip(data, gamesData, tournament, player) {
  return function(event) {
    if (isTooltipShown(player)) {
      event.stopPropagation()
      return
    }
    event.stopPropagation()
    cancelAllTips()

    let {html, init} = getTipHtml(gamesData.games, tournament, player)

    let tooltips = this.getElementsByClassName("tooltiptext")
    let el = tooltips[0]
    el.innerHTML = html
    el.style.visibility = "visible"
    el.player = player
    if (player === "bebul") {
      el.style.backgroundImage = 'url("img/halloween/walking.webp")'
    }

    init.forEach(f => f())

    // maybe we have some specific requirements for test
    let spec = document.getElementById("tooltip-spec")
    if (spec) {
      let size = 1.0
      let {html, init} = getTipHtml(gamesData.games, tournament, player, size)
      let tooltips = spec.getElementsByClassName("tooltiptext")
      let el = tooltips[0]
      el.style.fontSize = `${size}em`
      el.innerHTML = html
      el.style.visibility = "visible"
      init.forEach(f => f())
    }
  }
}

function cancelAllTips() {
  let results = document.getElementById("results")
  let tooltips = results.getElementsByClassName("tooltiptext")
  for (let i=0; i<tooltips.length; i++) {
    tooltips[i].style.visibility = "hidden"
    if (tooltips[i].player) {
      let el = document.getElementById(`board-${tooltips[i].player}`)
      if (el) {
        if (el.board) {
          // el.board.board.destroy()
          el.board.base.stop()
        }
        //el.style.visibility = "hidden"
        el.remove()
      }
    }
  }
}

function isTooltipShown(player) {
  let results = document.getElementById("results")
  let tooltips = results.getElementsByClassName("tooltiptext")
  for (let i=0; i<tooltips.length; i++) {
    if (tooltips[i].player === player && tooltips[i].style.visibility !== "hidden") return tooltips[i]
  }
  return null
}

function toPGN(g, addFen) {
  let pgn = `[White \"${g.players.white.user.name} ${g.players.white.rating}\"]`
  pgn += `\r\n[Black \"${g.players.black.user.name} ${g.players.black.rating}\"]`
  if (addFen && g.initialFen) {
    pgn += `\r\n[Variant "From Position"]`
    pgn += `\r\n[FEN "${g.initialFen}"]`
    pgn += `\r\n[SetUp "1"]`
  }
  let moves = g.moves
  if (moves === "") moves = "*"
  pgn += `\r\n\r\n${moves}\r\n`
  return pgn
}

function selectGame(tournament, gamesData, hideId, boardId, selector) {
  let current = document.getElementById(boardId)
  let boardId2 = `${boardId}2`
  if (current) {
    if (current.board) {
      console.log(`destroying ${boardId}`)
      current.board.base.stop()
      //current.board.board.destroy()
    }
    current.innerHTML = `<div id='${boardId2}'></div>`
  }
  let selectedGame = gamesData.games.reduce(selector, null) // can return null, in such case we want to hide the hideId element
  if (selectedGame) {
    document.getElementById(hideId).style.display = "block";
    let fen = selectedGame.initialFen
    let mfChess = new Chess(fen) // maybe undefined, which is ok
    let moves = selectedGame.moves.split(" ")
    moves.forEach((move) => mfChess.move(move))

    let mateBoardWidth = document.getElementById("fastMateId").clientWidth;
    let config = {...{
        pgn: toPGN(selectedGame),
        showCoords: false, coordsInner: false, headers: true,
        boardSize: mateBoardWidth - 10,
        movesHeight: 50,
        startPlay: `${moves.length}`,
        resizable: false
      }, ...defaultBoardConfig(tournament)}
    if (fen) config.position = fen
    config.orientation = selectedGame.winner

    if (current) current.board = PGNV.pgnView(boardId2, config)
    return selectedGame
  } else {
    // hide the board when no game was selected
    document.getElementById(hideId).style.display = "none"
    return null
  }
}

function sensationGame(tournament, games, hideid, boardId) {
  let game = selectGame(tournament, games, hideid, boardId, MF.biggestDifferenceWinSelector)
  if (game) {
    if (game.winner == "white") document.getElementById("senzacionist").innerHTML = game.players.white.user.name
    else document.getElementById("senzacionist").innerHTML = game.players.black.user.name
    document.getElementById("senzaceDiff").innerHTML = Math.abs(game.players.white.rating - game.players.black.rating)
    if (MF.loser(game).berserk) document.getElementById("senzaBerserk").innerHTML = `${MF.loser(game).user.name} hrál berserk.`
    else document.getElementById("senzaBerserk").innerHTML = ""
  }
  return game
}

function updateSpecialBoards(data, games) {
  let tournament = data.findTournament(games.id)
  let mateGame = selectGame(tournament, games, "fastMateId", "fastMateBoard", MF.fastestMateSelector)
  let sensaGame = sensationGame(tournament, games, "surpriseGameId", "surpriseGameBoard")
  let fastestGame = selectGame(tournament, games, "fastestId", "fastestBoard", MF.fastestGameSelector)
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
export function setOpeningTableDataAndRedraw(openingData) {
  openingsTable.setData(openingData).then(function () {
    openingsTable.redraw(true)
  })
}

function updateBackground(id) {
  if (id.match(/^playOFF/)) document.body.style.backgroundColor = "#def";
  else document.body.style.backgroundColor = "#e9ecef";
  //else document.body.style.backgroundColor = "#ffebcc";
/*
  else {
    document.body.style.backgroundImage = "url(img/halloween/halloweenTap.jpg)";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundSize = "520px";
    document.body.style.backgroundBlendMode = "screen";
  }
*/
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
  updateSpecialBoards(data, games)
  createTournamentInfo(data, games.id)
  createAchievementsInfo(data, games.id, games)

  updateMostActivePlayer("gameListTable", gameData, lastMfWinner)
  updateGoogleBar("gameListTableBar", gameData)
  updateSpecificTournamentHtml("tournament-spec", data, games)
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
