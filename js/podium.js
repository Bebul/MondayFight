let placeTxt = ['','first','second','third']

function percent(num) {
  return Math.round(100 * num) + "%"
}

function getPlayerPodiumHTML(gambler) {
  let place = placeTxt[gambler.rank]
  let player = gambler.name
  let elo = gambler.rating
  let performance = gambler.performance
  let games = gambler.nb.game
  let winRate = percent(gambler.nb.win / gambler.nb.game)
  let berserkRate = percent(gambler.nb.berserk / gambler.nb.game)
  let html = `<div class="${place}">
  <div class="trophy"></div>
  <a class="text user-link" href = "https://lichess.org/@/${player}">${player}</a>
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
  let first = getPlayerPodiumHTML(podium[0])
  let second = getPlayerPodiumHTML(podium[1])
  let third = getPlayerPodiumHTML(podium[2])
  let html = second + first + third
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
