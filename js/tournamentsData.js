async function LoadMFData(callback) {
  function ndjson2array(text) {
    let json = "[" + text.replace(/\n{/g, ",{") + "]"
    return json
  }
  function parse(response) {
    return JSON.parse(response)
  }
  async function downloadNDJson(url) {
    return await fetch(url)
      //.then(response => Promise.resolve(response))
      .then(response => response.text())
      .then(ndjson2array)
      .then(parse)
/*
      .then(
        function(response) {
          jouzoleanAndBebulsTournaments = response
          console.log(response.length)
          return response
        })
*/
  }

  let jouzoleanAndBebulsTournaments = await downloadNDJson("data/tournaments.ndjson")
  let tournamentGames = await downloadNDJson("data/tournamentGames.ndjson")

  let mondayFights = filterFights()

  function dateComparator(a,b){
    let x = a.startsAt
    let y = b.startsAt
    if (x < y) {return -1}
    if (x > y) {return 1}
    return 0
  }

  function filterFights() {
    let filtered = []
    jouzoleanAndBebulsTournaments.forEach(fight => {
      if (playersCountWhoPlayed(fight)>2 &&
        (fight.fullName.toLowerCase().includes("fight") || fight.fullName.toLowerCase().includes("monday arena")) &&
        fight.perf.name.toLowerCase()==="blitz") filtered.push(fight)
    })
    return filtered
  }

  function filterGames(f, games) {
    let filtered = []
    games.forEach( game => {
      if (f(game)) filtered.push(game)
    })
    return filtered
  }

  // add each game length ... ply
  tournamentGames.forEach(games => {
      games.games.forEach(game => {
        game.ply = game.moves.split(" ").length
      })
    }
  )

  function getPlayer(tournament, name) {
    return tournament.standing.players.find(function(player) {
      return player.name === name
    })
  }

  // add extra statistics into tournament
  //   * ratingDiff
  //   * fastestMate
  //   * sensation
  //   * fastestFinisher
  function addExtraTournamentStats(tournament, games) {
    // sensation
    let sensationPlayer = winner(games.games.reduce(biggestDifferenceWinSelector, null))
    if (sensationPlayer) {
      let player = getPlayer(tournament, sensationPlayer.user.name)
      player.sensation = 1
    }
    // fastestMate
    let mateGame = games.games.reduce(fastestMateSelector, null)
    if (mateGame) {
      let fastestMates = filterGames(g => g.status === 'mate' && g.ply === mateGame.ply, games.games)
      fastestMates.forEach( game => {
          let matingPlayer = getPlayer(tournament, winner(game).user.name)
          matingPlayer.mate = 1
        }
      )
    }
    // fastestFinisher
    let fastestGame = games.games.reduce(fastestGameSelector, null)
    if (fastestGame) {
      let fastestGames = filterGames(g => g.status !== 'noStart' && g.ply === fastestGame.ply, games.games)
      fastestGames.forEach( game => {
          let thePlayer = getPlayer(tournament, winner(game).user.name)
          thePlayer.fast = 1
        }
      )
    }
    // ratingDiff
    tournament.standing.players.forEach( function(player) {
      let diff = ratingDiff(player, games)
      if (diff) player.diff = diff
    })
  }
  // add extra statistics into jouzoleanAndBebulsTournaments
  jouzoleanAndBebulsTournaments.forEach(fight => {
      let games = tournamentGames.find(tg => tg.id==fight.id);
      if (games !== undefined) {
        addExtraTournamentStats(fight, games)
      }
    }
  )

  let api = {
    jouzoleanAndBebulsTournaments: function() {
      return jouzoleanAndBebulsTournaments
    },
    tournamentGames: function() {
      return tournamentGames
    },
    mondayFights: function() {
      return mondayFights
    },
    addTournaments: function (downloadedTournaments) {
      jouzoleanAndBebulsTournaments = jouzoleanAndBebulsTournaments.concat(downloadedTournaments)
      jouzoleanAndBebulsTournaments.sort(dateComparator)
      mondayFights = filterFights()
    },
    addGames: function (downloadedGames) {
      tournamentGames = tournamentGames.concat(downloadedGames)
    },
    findTournament: function (id) {
      return jouzoleanAndBebulsTournaments.find(tr => tr.id==id)
    },
    findTournamentIx: function (id) {
      return tournamentGames.findIndex(tr => tr.id==id)
    },
    tournamentIsRated: function (id) {
      return tournamentGames.find(g => g.id==id).games[0].rated
    },
    currentGameListTableIx: tournamentGames.length - 1
  }
  callback(api)
  return api
}


