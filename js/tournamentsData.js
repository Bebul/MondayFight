async function LoadMFData(callback) {
  function ndjson2array(text) {
    let json = "[" + text.replace(/\n{/g, ",{") + "]";
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

  let jouzoleanAndBebulsTournaments = await downloadNDJson("data/tournaments")
  let tournamentGames = await downloadNDJson("data/tournamentGames")

  let mondayFights = filterFights();

  function filterFights() {
    jouzoleanAndBebulsTournaments.sort(function(a,b){
      let x = a.startsAt;
      let y = b.startsAt;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });

    let filtered = [];
    jouzoleanAndBebulsTournaments.forEach(fight => {
      if (playersCountWhoPlayed(fight)>2 &&
        (fight.fullName.toLowerCase().includes("fight") || fight.fullName.toLowerCase().includes("monday arena")) &&
        fight.perf.name.toLowerCase()==="blitz") filtered.push(fight);
    })
    return filtered;
  }

  let api = {
    jouzoleanAndBebulsTournaments: jouzoleanAndBebulsTournaments,
    tournamentGames: tournamentGames,
    mondayFights: mondayFights,
    addTournaments: function (downloadedTournaments) {
      jouzoleanAndBebulsTournaments = jouzoleanAndBebulsTournaments.concat(downloadedTournaments)
      mondayFights = filterFights()
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


