export let MF = function() {
  function playedAGame(player) {
    return player.performance !== undefined
  }

  function playersCountWhoPlayed(fight) {
    let total = 0
    fight.standing.players.forEach(pl => {
      if (playedAGame(pl)) total += 1
    })
    return total
  }

  function ratingDiff(player, games) {
    let initialRating = player.rating
    for (let i=games.games.length-1; i>=0; i--) {
      let players = games.games[i].players
      if (players.white.user.name === player.name) {
        initialRating = players.white.rating
        break
      } else if (players.black.user.name === player.name) {
        initialRating = players.black.rating
        break
      }
    }
    let method1 =  player.rating - initialRating

    let diff = 0
    games.games.forEach( game => {
        if (game.players.white.user.name === player.name) diff += game.players.white.ratingDiff
        else if (game.players.black.user.name === player.name) diff += game.players.black.ratingDiff
      }
    )

    return diff
  }

  function getPoints(player, games) {
    let points = 0
    let oponent = 0
    games.games.forEach( game => {
        let diff = function(g) {
          if (g.winner && g.winner==="black") return 0
          else if (g.winner && g.winner==="white") return 1
          else return 0.5
        }(game)
        if (game.players.white.user.name === player.name) {
          points += diff
          oponent += 1-diff
        }
        else if (game.players.black.user.name === player.name) {
          points += 1-diff
          oponent += diff
        }
      }
    )
    return [points, oponent]
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
    if (game.status === "noStart" || game.ply <= 1) return minGame
    if (minGame) {
      if (game.ply < minGame.ply) return game
      else return minGame
    } else return game
  }

  function filterYear(theFights, year) {
    if (year < 0) {
      let today = new Date()
      let dateFrom = new Date(new Date().setDate(today.getDate() + 365 * year))
      return Array.from(theFights).filter(fight => {
        let date = new Date(fight.startsAt)
        return date >= dateFrom
      })
    } else {
      return Array.from(theFights).filter(fight => {
        let date = new Date(fight.startsAt)
        return date.getFullYear() == year
      })
    }
  }

  function filterUpTo(theFights, lastDate) {
    let theYear = lastDate.getFullYear()
    return Array.from(theFights).filter(fight => {
      let date = new Date(fight.startsAt)
      let year = date.getFullYear()
      return year === theYear && date <= lastDate
    })
  }

  function last10(theFights) {
    let filtered = Array.from(theFights)
    while(filtered.length > 10) {
      filtered.shift()
    }
    // and only last year
    let lastTournamentYear = (new Date(filtered.at(-1).startsAt)).getFullYear()
    do {
      let firstTournamentYear = (new Date(filtered.at(0).startsAt)).getFullYear()
      if (firstTournamentYear < lastTournamentYear) filtered.shift()
      else break
    } while (true)
    return filtered
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

  return {
    playedAGame: playedAGame,
    playersCountWhoPlayed: playersCountWhoPlayed,
    ratingDiff: ratingDiff,
    points: getPoints,
    fastestMateSelector: fastestMateSelector,
    biggestDifferenceWinSelector: biggestDifferenceWinSelector,
    fastestGameSelector: fastestGameSelector,
    filterYear: filterYear,
    filterUpTo: filterUpTo,
    last10: last10,
    winner: winner,
    loser: loser
  }
}()

// when used from node.js the ndjson data are loaded using fs and provided as parameters
export async function LoadMFData(callback, loadedTournaments, loadedGames) {
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
  }

  let jouzoleanAndBebulsTournaments = loadedTournaments ? loadedTournaments : await downloadNDJson("data/tournaments.ndjson")
  let tournamentGames = loadedGames ? loadedGames :  await downloadNDJson("data/tournamentGames.ndjson")

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
      if (MF.playersCountWhoPlayed(fight)>2 &&
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

  function getPlayer(tournament, name) {
    return tournament.standing.players.find(function(player) {
      return player.name === name
    })
  }

  // add extra statistics into tournament
  //   * ply count for each game
  //   * ratingDiff
  //   * fastestMate
  //   * sensation
  //   * fastestFinisher
  //   * points
  function addExtraTournamentStats(tournament, games) {
    // add each game length ... ply
    games.games.forEach(game => {
      game.ply = game.moves.split(" ").length
    })
    // sensation
    let sensationGame = games.games.reduce(MF.biggestDifferenceWinSelector, null)
    if (sensationGame) {
      let sensationPlayer = MF.winner(sensationGame)
      let player = getPlayer(tournament, sensationPlayer.user.name)
      player.sensation = 1
      let winner = sensationGame.players[sensationGame.winner]
      let stats = winner.stats || {}
      stats.sensation = true
      winner.stats = stats
    }
    // fastestMate
    let mateGame = games.games.reduce(MF.fastestMateSelector, null)
    if (mateGame) {
      let fastestMates = filterGames(g => g.status === 'mate' && g.ply === mateGame.ply, games.games)
      fastestMates.forEach( game => {
          let matingPlayer = getPlayer(tournament, MF.winner(game).user.name)
          matingPlayer.mate = 1
        }
      )
    }
    // fastestFinisher
    let fastestGame = games.games.reduce(MF.fastestGameSelector, null)
    if (fastestGame) {
      let fastestGames = filterGames(g => g.status !== 'noStart' && g.ply === fastestGame.ply, games.games)
      fastestGames.forEach( game => {
          let winner = MF.winner(game)
          let thePlayer = getPlayer(tournament, winner.user.name)
          thePlayer.fast = 1
          let stats = winner.stats || {}
          stats.fastest = true
          winner.stats = stats
        }
      )
    }
    // ratingDiff
    tournament.standing.players.forEach( function(player) {
      let diff = MF.ratingDiff(player, games)
      if (diff!==undefined && !isNaN(diff)) player.diff = diff
      else player.diff = 0
    })
    // points
    tournament.standing.players.forEach( function(player) {
      let points = MF.points(player, games)
      if (points!==undefined && !isNaN(points)) player.points = points
    })
  }

  // add extra statistics into jouzoleanAndBebulsTournaments
  function addExtras() {
    jouzoleanAndBebulsTournaments.forEach(fight => {
        let games = tournamentGames.find(tg => tg.id==fight.id);
        if (games !== undefined) {
          addExtraTournamentStats(fight, games)
        }
      }
    )
  }

  // addExtras() // no need to add, as all these stats should be already downloaded and saved in data folder

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
    addExtras: function () {
      addExtras()
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
    findGame: function(id) {
      for (let i=0; i<tournamentGames.length; i++) {
        let game = tournamentGames[i].games.find(g => g.id===id)
        if (game) return game
      }
    },
    forEachGame: function(f) {
      for (let i=0; i<tournamentGames.length; i++) {
        let games = tournamentGames[i].games
        for (let j=0; j<games.length; j++) f(games[j])
      }
    },
    filterCheaterGames: function(games, tournament) {
      let players = []
      let cheaters = new Set()
      tournament.standing.players.forEach(pl => players.push(pl.name))
      let filtered = games.filter(game => {
          let white = game.players.white.user.name
          let black = game.players.black.user.name
          let ret = true
          if (!players.includes(white)) {
            cheaters.add(white)
            ret = false
          }
          if (!players.includes(black)) {
            cheaters.add(black)
            ret = false
          }
          return ret
        }
      )
      let ret = {
        id: tournament.id,
        games: filtered
      }
      if (cheaters.size > 0) {
        ret.cheaters = [...cheaters]
      }
      return ret
    },
    currentGameListTableIx: tournamentGames.length - 1
  }
  callback(api)
  return api
}
