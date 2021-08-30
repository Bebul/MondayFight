function updateHTMLurlRequestsList(url) {
  urlRequestsList.push(url)
  let txt = ""
  urlRequestsList.forEach(url => {
    txt = txt + url + "\n"
  })
  document.getElementById("updated").innerHTML = txt;
}

function lichessTournamentsAPI(fights, users) {
  let timeout = 1500
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

  async function downloadTournament(id) {
    let url = "https://lichess.org/api/tournament/" + id
    updateHTMLurlRequestsList(url)
    let theTournament = await fetch(url)
      .then(promiseTimeout(timeout))
      .then(status)
      .then(text)
      .then(parse)

    let partial = theTournament
    while (partial.nbPlayers / 10 > partial.standing.page) {
      let url2 = "https://lichess.org/api/tournament/" + id + "?page=" + (partial.standing.page + 1)
      updateHTMLurlRequestsList(url2)
      partial = await fetch(url2)
        .then(promiseTimeout(timeout))
        .then(status)
        .then(text)
        .then(parse)
      theTournament.standing.players = theTournament.standing.players.concat(partial.standing.players)
    }

    // download Results, get Performances
    let url3 = "https://lichess.org/api/tournament/" + id + "/results"
    updateHTMLurlRequestsList(url3)
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

  async function downloadMissing() {
    let downloadedTournaments = []
    while (users.length > 0) {
      let user = users.shift()
      let url = "https://lichess.org/api/user/" + user + "/tournament/created";
      updateHTMLurlRequestsList(url)
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
        let newT = await downloadTournament(id)
        downloadedTournaments.push(newT)
      }
    }

    let tag = document.getElementById("finalJson")
    tag.innerHTML = JSON.stringify(downloadedTournaments, null, 0);

    // recalculate data and tables
    if (downloadedTournaments.length > 0) {
      addTournaments(downloadedTournaments) // updates mondayFights and everything

      let table10 = allMyTables.get("#last10")
      if (table10 !== undefined) {
        let theFights = last10(mondayFights)
        table10.setColumns(generatePlayersTableColumns(theFights))
        table10.setData(getDataOfPlayers(theFights))
      }

      let tableAll = allMyTables.get("#mondayFightsLeaderboard")
      if (tableAll !== undefined) {
        let theFights = filterYear(mondayFights, 2021)
        tableAll.setColumns(generatePlayersTableColumns(theFights))
        tableAll.setData(getDataOfPlayers(theFights))
      }
    }

    return downloadedTournaments
  }

  return {
    downloadMissing: function() {
      return downloadMissing()
    },
    downloadTournament: function(id) {
      return downloadTournament(id)
    }
  }
}

function onDwnlTournamentClicked() {
  var dwnlID = document.getElementById("tournamentDwnlID").value
  let api = lichessTournamentsAPI(jouzoleanAndBebulsTournaments, ["bebul","Jouzolean"])

  let preData = document.getElementById("tournamentDwnlResult")
  let preGames = document.getElementById("tournamentGamesResult")

  api.downloadTournament(dwnlID)
    .then(tournament => preData.innerHTML = JSON.stringify(tournament, null, 0))
    .then(response => gamesDownloaderAPI().downloadTournamentGames(dwnlID))
    .then(games => preGames.innerHTML = JSON.stringify(games, null, 0))
}

function gamesDownloaderAPI() {
  let timeout = 5000
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

  async function downloadGames(id) {
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
        let gamesJson = {
          "id": id,
          "games": games
        }
        return gamesJson
     })
    return games
  }

  async function downloadMissingTournamentGames() {
    let downloadedTournamentsGames = []

    let ix = 0
    while (ix < mondayFights.length) {
      let mf = mondayFights[ix++]
      if (tournamentGames.find(tg => tg.id==mf.id) === undefined) {
        let games = await downloadGames(mf.id)
        downloadedTournamentsGames.push(games)
        document.getElementById("gamesJson").innerHTML = "<b>Downloading in progress: " + ix + "</b>"
      }
    }
    document.getElementById("gamesJson").innerHTML = JSON.stringify(downloadedTournamentsGames, null, 0)

    return downloadedTournamentsGames
  }

  return {
    downloadMissingTournamentGames: function() {
      downloadMissingTournamentGames()
    },
    downloadTournamentGames: function(id) {
      return downloadGames(id)
    }
  }
}
