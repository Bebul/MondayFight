import {addNewGamesStats} from "./analyze.mjs"
import {toNDJson, download} from "./mondayFight.mjs"

let urlRequestsList = []

function updateHTMLurlRequestsList(url) {
  urlRequestsList.push(url)
  let txt = ""
  urlRequestsList.forEach(url => {
    txt = txt + url + "\n"
  })
  document.getElementById("updated").innerHTML = txt;
}

function containsId(fights, id) {
  let ret = false
  fights.forEach(fight => {
    if (fight.id===id) {
      ret = true
      return
    }
  })
  return ret
}

function lichessTournamentsAPI(fights, users) {
  let timeout = 500
  const promiseTimeout = time => result => new Promise(resolve => setTimeout(resolve, time, result));

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  function text(response) {
    return response.text()
  }
  function ndjson2array(text) {
    let json = "[" + text.replace(/\n{/g, ",{") + "]";
    return json
  }
  function json(response) {
    return response.json()
  }
  function parse(response) {
    return JSON.parse(response)
  }
  function getMissingTournaments(tournaments) {
    let missing = []
    tournaments.forEach(tr => {
      if (!containsId(fights, tr.id)) missing.push(tr.id)
    })
    return missing
  }

  async function downloadTournament(id, logger) {
    let url = "https://lichess.org/api/tournament/" + id
    if (logger) logger(url)
    let theTournament = await fetch(url)
      .then(promiseTimeout(timeout))
      .then(status)
      .then(text)
      .then(parse)

    let partial = theTournament
    while (partial.nbPlayers / 10 > partial.standing.page) {
      let url2 = "https://lichess.org/api/tournament/" + id + "?page=" + (partial.standing.page + 1)
      if (logger) logger(url2)
      partial = await fetch(url2)
        .then(promiseTimeout(timeout))
        .then(status)
        .then(text)
        .then(parse)
      theTournament.standing.players = theTournament.standing.players.concat(partial.standing.players)
    }

    // download Results, get Performances
    let url3 = "https://lichess.org/api/tournament/" + id + "/results"
    if (logger) logger(url3)
    let tournamentDone = await fetch(url3)
      .then(promiseTimeout(timeout))
      .then(status)
      .then(text)
      .then(ndjson2array)
      .then(parse)
      .then(function(results) {
        let performance = new Map();
        results.forEach(pl => performance.set(pl.username, pl.performance))
        theTournament.standing.players = theTournament.standing.players.map(pl => { pl.performance = performance.get(pl.name); return pl})
        return theTournament
      })
    return tournamentDone
  }

  async function downloadMissing(logger) {
    let downloadedTournaments = []
    while (users.length > 0) {
      let user = users.shift()
      let url = "https://lichess.org/api/user/" + user + "/tournament/created";
      if (logger) logger(url)
      let missing = await fetch(url)
        .then(promiseTimeout(timeout))
        .then(status)
        .then(text)
        .then(ndjson2array)
        .then(parse)
        .then(getMissingTournaments)
        .catch(function(error) {
          console.log('Request failed: ' + url, error);
        });

      while (missing.length > 0) {
        let id = missing.pop()
        let newT = await downloadTournament(id, logger)
        downloadedTournaments.push(newT)
      }
    }
    return downloadedTournaments
  }

  return {
    downloadMissing: function(logger) {
      return downloadMissing(logger)
    },
    downloadTournament: function(id, logger) {
      return downloadTournament(id, logger)
    }
  }
}

function onDwnlTournamentClicked(data, rename) {
  var dwnlID = document.getElementById("tournamentDwnlID").value
  let api = lichessTournamentsAPI(data.jouzoleanAndBebulsTournaments(), ["bebul","Jouzolean"])

  let preData = document.getElementById("tournamentDwnlResult")
  let preGames = document.getElementById("tournamentGamesResult")

  api.downloadTournament(dwnlID, updateHTMLurlRequestsList)
    .then(tournament => {
      preData.innerHTML = JSON.stringify(tournament, null, 0)
      if (rename) {
        tournament.fullName = "Monday Fight Fixed"
      }
      data.addTournaments([tournament])
      return tournament
    })
    .then(tournament => {
      lichessAPI().downloadTournamentGames(tournament, data)
        .then( games => {
          return {games: games, tournament: tournament}
        })
        .then(({games, tournament}) => {
          preGames.innerHTML = JSON.stringify(games, null, 0)
          data.addGames([games])
          data.addExtras(tournament)
          addNewGamesStats(data, [games])
            .then(function(result) {
              download("tournaments.ndjson", toNDJson(data.jouzoleanAndBebulsTournaments()))
              download("tournamentGames.ndjson", toNDJson(data.tournamentGames()))
            })
        })
    })
}

function lichessAPI() {
  let timeout = 500
  const promiseTimeout = time => result => new Promise(resolve => setTimeout(resolve, time, result));

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  function text(response) {
    return response.text()
  }
  function ndjson2array(text) {
    let json = "[" + text.replace(/\n{/g, ",{") + "]";
    return json
  }
  function parse(response) {
    return JSON.parse(response)
  }

  function getMissingTournaments(tournaments) {
    let missing = []
    tournaments.forEach(tr => {
      if (!containsId(fights, tr.id)) missing.push(tr.id)
    })
    return missing
  }

  async function downloadGames(tournament, data) {
    let id = tournament.id
    let games = await fetch("https://lichess.org/api/tournament/" + id + "/games?opening=true", {
      headers: {
        'Accept': 'application/x-ndjson'
      }
    })
      .then(promiseTimeout(timeout))
      .then(status)
      .then(text)
      .then(ndjson2array)
      .then(parse)
      .then(games => {
        return data.filterCheaterGames(games, tournament)
     })
    return games
  }

  async function downloadMissingTournamentGames(data, logger) {
    let downloadedTournamentsGames = []

    let ix = 0
    while (ix < data.mondayFights().length) {
      let mf = data.mondayFights()[ix++]
      if (data.tournamentGames().find(tg => tg.id==mf.id) === undefined) {
        let games = await downloadGames(mf, data)
        await addUnfinishedGames(mf, games)
        downloadedTournamentsGames.push(games)
        if(logger) logger("<b>Downloading in progress: " + ix + "</b>")
      }
    }

    return downloadedTournamentsGames
  }

  async function users(ids) {
    let userList = await fetch("https://lichess.org/api/users", {
      method: 'POST',
      body: ids  // text/plain User IDs separated by commas
    })
      .then(promiseTimeout(0))
      .then(status)
      .then(text)
      .then(parse)
    return userList
  }

  async function games(ids) {
    let gamesList = await fetch("https://lichess.org/api/games/export/_ids?opening=true", {
      method: 'POST',
      body: ids,
      headers: {
        'Accept': 'application/x-ndjson'
      }
    })
      .then(promiseTimeout(0))
      .then(status)
      .then(text)
      .then(ndjson2array)
      .then(parse)
    return gamesList
  }

  async function addUnfinishedGames(t, g) {
    let tsince = new Date(t.startsAt).getTime()
    let tuntil = tsince + t.minutes * 60000

    let players = Array.from(t.standing.players)
    let games = g.games

    while (players.length > 0) {
      let player = players.pop()
      let url = `https://lichess.org/api/games/user/${player.name}?since=${tsince}&until=${tuntil}&perfType=blitz`
      let gamesList = await fetch(url, {
        headers: {
          'Accept': 'application/x-ndjson'
        }
      })
        .then(promiseTimeout(1500))
        .then(status)
        .then(text)
        .then(ndjson2array)
        .then(parse)

      gamesList.forEach(pg => {
          if (pg.tournament === t.id && !games.find(g => g.id === pg.id)) {
            pg.overtime = true
            games.unshift(pg)
            console.log(`${pg.id} ${pg.players.white.user.name} - ${pg.players.black.user.name}`)
            console.log(`  tuntil - pg.createdAt=${tuntil - pg.createdAt}  pg.lastMoveAt - tuntil = ${pg.lastMoveAt - tuntil}`)
          }
      })
    }
  }

  return {
    downloadMissingTournamentGames: function(data, logger) {
      return downloadMissingTournamentGames(data, logger)
    },
    downloadTournamentGames: function(tournament, data) {
      return downloadGames(tournament, data)
    },
    users: function(ids) {
      return users(ids)
    },
    games: function(ids){
      return games(ids)
    },
    addUnfinishedGames: function(tournament, data) {
      addUnfinishedGames(tournament, data)
    }
  }
}

export var LAPI = {
  updateHTMLurlRequestsList: updateHTMLurlRequestsList,
  lichessTournamentsAPI: lichessTournamentsAPI,
  onDwnlTournamentClicked: onDwnlTournamentClicked,
  lichessAPI: lichessAPI
}
