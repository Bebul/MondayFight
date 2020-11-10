function playersCountWhoPlayed(fight) {
  let total = 0;
  fight.standing.players.forEach(pl => {
    if (playedAGame(pl)) total += 1;
  })
  return total;
}

function playedAGame(player) {
  return player.performance !== undefined;
}

function playerRank(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined) return undefined;
  return player.rank
}

function playerScore(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !playedAGame(player)) return 0;
  return player.score
}

function playerPresence(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !playedAGame(player)) return 0;
  return 1
}

function playerPoints(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !playedAGame(player)) return [0, 0];
  let myPts = 0;
  let opPts = 0;
  player.sheet.scores.forEach( score => {
    let pts = 0;
    if (Array.isArray(score)) {
      if (score[0] <= 1) pts = score[0]/2;
      else if (score[0] == 2) {
        if (score[1] == 3) pts = 0.5;
        else pts = 1;
      } else pts = 1;
    } else pts = score / 2;
    myPts += pts;
    opPts += 1-pts;
  })
  return [myPts, opPts]
}

function jouzocoins(fight, playerName) {
  let player = fight.standing.players.find( pl => pl.name==playerName )
  if (player === undefined || !playedAGame(player)) return 0;
  let plCount = playersCountWhoPlayed(fight);
  let rank = player.rank;
  if (plCount >= 10 && rank <= 6) return [11, 8, 6, 4, 2, 2][rank-1];
  else if (rank <= 4) return [10, 7, 5, 3][rank-1];
  return 1;
}

function getTotalScore(player, theFights) {
  let total = 0;
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player) total += pl.score;
    })
  })
  return total;
}

function getTotalPresence(player, theFights) {
  let total = 0;
  theFights.forEach(fight => {
    fight.standing.players.forEach(pl => {
      if (pl.name==player && playedAGame(pl)) total += 1;
    })
  })
  return total;
}

function getTotalPoints(playerName, theFights) {
  let total = 0;
  theFights.forEach( fight => total += playerPoints(fight, playerName)[0] )
  return total;
}

function getTotalJouzocoinsList(playerName, theFights) {
  let total = [];
  theFights.forEach(fight => {
    fight.standing.players.forEach( pl => {
      if (pl.name==playerName) total.push(jouzocoins(fight, playerName));
    })
  })
  return total;
}

function getTotalJouzocoins(playerName, theFights) {
  let total = 0;
  theFights.forEach( fight => total += jouzocoins(fight, playerName) )
  return total;
}

function getPlayers(theFights) {
  let playersAr = [];
  theFights.forEach(fight => {
    fight.standing.players.forEach((player) => {
      if (!playersAr.includes(player.name)) playersAr.push(player.name);
    })
  })
  return playersAr;
}

function containsId(fights, id) {
  let ret = false
  fights.forEach(fight => {
    if (fight.id===id) {
      ret = true;
      return
    }
  })
  return ret
}

function addFightsPoints(playerOut, playerName, theFights) {
  var ix = 1
  theFights.forEach(fight => {
    let rank = playerRank(fight, playerName);
    if (rank === undefined) playerOut['t' + ix++] = undefined;
    else playerOut['t' + ix++] = {
      players: playersCountWhoPlayed(fight),
      rank: playerRank(fight, playerName),
      jouzoCoins: jouzocoins(fight, playerName),
      score: playerScore(fight, playerName),
      points: playerPoints(fight, playerName)[0],
    }
  })
}

function getDataOfPlayers(theFights) {
  let players = getPlayers(theFights);
  let tableData = [];
  players.forEach( player => {
      let thePlayer = {
        name: player,
        nameUrl: "https://lichess.org/@/" + player,
        jouzoCoins: getTotalJouzocoins(player, theFights),
        totalScore: getTotalScore(player, theFights),
        totalPts: getTotalPoints(player, theFights),
        present: getTotalPresence(player, theFights),
      }
      addFightsPoints(thePlayer, player, theFights)
      tableData.push(thePlayer);
    }
  )
  return tableData;
}

function generatePlayersTableColumns(theFights) {
  let columnsBuilder = [
    {//create column group
      title: "Monday Fights Leaderboard",
      frozen:true,//frozen column group on left of table
      columns: [
        {formatter: "rownum", headerSort: false, resizable:false}, //add auto incrementing row number
        {title: "Name", field: "nameUrl", resizable:false, formatter:"link", formatterParams:{ labelField:"name"}},
        {title: "Jz", field: "jouzoCoins", resizable:false, headerSortStartingDir:"desc"},
        {title: "Sc", field: "totalScore", resizable:false, headerSortStartingDir:"desc"},
        {title: "Pt", field: "totalPts", resizable:false, headerSortStartingDir:"desc"},
        {title: "#", field: "present", resizable:false, headerSortStartingDir:"desc"}
      ]
    }
  ];
  let curMonth = undefined;
  let curColumns = [];
  let colNo = 1;

  function pushFight(fight, tooltip) {
    curColumns.push(
      {
        title: "<a href='https://lichess.org/tournament/" + fight.id + "'>" + colNo + "</a>",
        field: "t" + colNo++,
        headerTooltip: tooltip,
        headerSort: false,
        align: "center",
        resizable: false,
        formatter: jouzoCoinsFormatter,
        bottomCalc: "count"
      }
    )
  }

  function pushMonth() {
    columnsBuilder.push(
      {
        title: curMonth,
        columns: curColumns
      }
    )
    curColumns = [];
  }

  theFights.forEach( fight => {
    let date = new Date(fight.startsAt);
    let month = ['Leden','Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'][date.getMonth()];
    if (curMonth !== month) {
      if (curMonth !== undefined) pushMonth()
      curMonth = month;
    }
    pushFight(fight, date.toDateString())
  });
  pushMonth()

  return columnsBuilder;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parse.pgn demo
function loadDoc() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // see https://github.com/mliebelt/pgn-parser and https://github.com/Bebul/MondayFight/issues/7#issuecomment-721996465
      let gameList = parsePgn(this.responseText, {startRule: "games"});   // or sample: '[White "Me"] [Black "Magnus"] 1. f4 e5 2. g4 Qh4#'
      let theList = "<ol>";
      gameList.forEach(function(x) {
        theList += '<li>'+ x.tags.UTCTime + ' ' + x.tags.White + ' : ' + x.tags.Black + ' ' + x.tags.Result + '</li>';
      });
      theList += "</ol>";
      document.getElementById("demoRequest").innerHTML = theList;
    }
  };
  // CORS policy problem: FIX - Enabling "Allow Unsigned Requests" in Build Execution and Deployment -> Debugger setting of Webstorm fixed it for now.
  //xhttp.open("GET", "https://lichess.org/api/tournament/5upWReOp/results", true);   // Pgn can be downloaded like this: "https://lichess.org/api/tournament/5upWReOp/games?pgnInJson=true"
  xhttp.open("GET", "https://lichess.org/api/tournament/5upWReOp/games", true);
  xhttp.send();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fetch demo
function textFile2String(path) {
  fetch(path)
    .then(response => response.text())
    .then((data) => {
      console.log(data)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ensuring only one XmlHttpRequest is active at any moment
//
class LichessAPI {
  constructor() {
    this.busy = false;
    this.current = undefined;
    this.requests = [];  // array of requests waiting to process
  }
  // xhttp should be already opened, we can make only one request per time we also do at most one request per second
  addHttpRequest(xhttp, url) {
    this.requests.push({ "xhttp": xhttp, "url": url });
  }
  check() {
    if (this.busy === undefined) {
      console.log("Bebul: this.busy is undefined");
    } else if (!this.busy) {
      let request = this.requests.shift();
      if (request !== undefined) {
        this.busy = true;
        let userOnReadyStateChange = request.xhttp.onreadystatechange
        request.xhttp.onreadystatechange = function() {
          if (request.xhttp.readyState === 4) lichessAPI.busy = false;  //unblock
          userOnReadyStateChange.apply(request.xhttp);
        }
        this.current = request;
        request.xhttp.send();
      }
    }
  }
}
var lichessAPI = new LichessAPI();
setInterval(function() { lichessAPI.check(); }, 1000); // initialization inside

var downloadedFightsCount = 0;
var downloadedFights = [];
function downloadPerformances(fight) {
  let somePerformanceIsMissing = false;
  fight.standing.players.forEach((player) => somePerformanceIsMissing ||= (player.performance === undefined) && (player.sheet.scores.length!==0))
  if (somePerformanceIsMissing) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // special json with \n separated items
        let json = "[" + this.responseText.replace(/\n{/g, ",{") + "]";
        let results = JSON.parse(json);
        let performance = new Map();
        results.forEach((pl) => performance.set(pl.username, pl.performance))
        fight.standing.players = fight.standing.players.map((pl) => { pl.performance = performance.get(pl.name); return pl})
        downloadedFights.push(fight)
        document.getElementById("updated").innerHTML = "success(" + ++downloadedFightsCount + "):" + url;
      } else if (this.readyState === 4 && this.status === 429) {
        document.getElementById("updated").innerHTML = "HTTP Status 429:" + url;
        clearInterval(lichessAPI.check); // things went wrong, do not overkill Lichess and our reputation
      }
    }

    let url = "https://lichess.org/api/tournament/" + fight.id + "/results";

    xhttp.open("GET", url, true);
    lichessAPI.addHttpRequest(xhttp, url);
  } else {
    document.getElementById("updated").innerHTML = "alreadyDownloaded(" + ++downloadedFightsCount + "):" + fight.id;
  }
}

// insert current merged data into web page to be able to copy & paste it in the tournamentsData.js
function getDataJSON() {
  document.getElementById("jsonData").innerHTML = JSON.stringify(downloadedFights, null, 0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main initialization

let urlRequestsList = []

function init() {

  // nice is: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  //textFile2String('pgn/parsePgn.js');

  let allFights = jouzoleanAndBebulsTournaments;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const admin = urlParams.get('bebul')!=null

  if (admin) {
    document.getElementById("adminStuff").style.display = "block";
  }

  let text = "<table><th>Url</th><th>Players</th><th>Games</th><th>Date</th><th>Gold</th><th>Score</th><th>ELO</th><th>Silver</th><th>Score</th><th>ELO</th><th>Bronze</th><th>Score</th><th>ELO</th>";
  allFights.forEach( function myFunction(value) {
    let info = '<td><a href="https://lichess.org/tournament/' + value.id + '">' + value.id + '<\a></td>';
    info += '<td>' + value.nbPlayers + '</td>';
    info += '<td>' + value.stats.games + '</td>';
    info += '<td>' + value.startsAt + '</td>';
    let winner = value.standing.players[0];
    info += '<td>' + winner.name + '</td>';
    info += '<td>' + winner.score + '</td>';
    info += '<td>' + winner.rating + '</td>';
    winner = value.standing.players[1];
    info += '<td>' + winner.name + '</td>';
    info += '<td>' + winner.score + '</td>';
    info += '<td>' + winner.rating + '</td>';
    if (value.nbPlayers > 2) {
      winner = value.standing.players[2];
      info += '<td>' + winner.name + '</td>';
      info += '<td>' + winner.score + '</td>';
      info += '<td>' + winner.rating + '</td>';
    }
    text += "<tr>" + info + "</tr>";
  });
  text += "</table>";


  if (admin) {
    document.getElementById("demo").innerHTML = text;

    downloadMissingTournaments(allFights, ["bebul","Jouzolean"])
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Table helpers, formatters etc.
function jouzoCoinsFormatter(cell, formatterParams) {
  let cellValue = cell.getValue();
  if (cellValue===undefined) return "";
  if (cellValue.rank <=3) cell.getElement().style.backgroundColor = "red";
  else if (cellValue.rank == 4) cell.getElement().style.backgroundColor = "lightgreen";
  else if (cellValue.rank <= 6 && cellValue.players >= 10) cell.getElement().style.backgroundColor = "orange";

  let value = '';
  let mfMode = this.table.mfMode;
  if (mfMode === 'jouzoCoins') value = cellValue.jouzoCoins;
  else if (mfMode === 'present') value = cellValue.present;
  else if (mfMode === 'totalScore') value = cellValue.score;
  else if (mfMode === 'totalPts') value = cellValue.points;

  if (value > 0) return value;
  else return "";
}

function dataSortedFunc(sorters) {
  let newMode = undefined
  sorters.forEach( function(srt) {
      if (srt.field === 'jouzoCoins' || srt.field === 'totalScore' || srt.field === 'totalPts') newMode = srt.field;
    }
  )
  if (newMode !== undefined && this.mfMode != newMode) {
    this.mfMode = newMode;
    //and we must call something like row.reformat() or column.reformat for each column
   this.redraw(true);
  }
}

function createPlayersTable(theFights, tableId) {
  let playersTable = new Tabulator(tableId, {
    layout: "fitDataTable",
    dataSorted: dataSortedFunc,
    data: getDataOfPlayers(theFights),
    columns: generatePlayersTableColumns(theFights)
  });
  playersTable.setSort("jouzoCoins", "desc");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mondayFight filters
function last10(theFights) {
  let filtered = theFights
  while(filtered.length > 10) {
    filtered.shift();
  }
  return filtered;
}
