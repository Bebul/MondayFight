function initSearch() {
  let allFights = jouzoleanAndBebulsTournaments;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const admin = urlParams.get('bebul')!=null
}

function movesToArrayOfFen(moves) {
  let chess = new Chess()
  return moves.split(" ").map(function(move) {
    chess.move(move);
    return chess.fen();
  });
}

var mfChess = new Chess() // global, to avoid initialization again and again. mfChess.reset() is used instead
function movesContainFen(moves, fen) {
  // Extract the move number and replay the game only until the correct plyes
  let mnReq = (/ (\d+)$/g.exec(fen))[1]
  let movesAr = moves.split(" ")
  if (movesAr.length >= 2*mnReq-2) {
    mfChess.reset()
    let num = 0
    let found = false
    for (i = 0; i < Math.min(movesAr.length, 2*mnReq-1); i++) {
      mfChess.move(movesAr[i])
      if (i === 2*mnReq-3 || i === 2*mnReq-2) {
        let moveFEN = mfChess.fen()
        found = found || moveFEN===fen;
      }
    }
    return found
  }
/*
  // The following is Extremely slow
  return moves.split(" ").find(function(move) {
    chess.move(move);
    let moveFEN = chess.fen()
    return moveFEN==fen;
  });
 */
}

function searchGames(fights, tokens) {
  let selectedGames = []

  let tokensLow = tokens.map(token => token.toLowerCase())
  let fen = tokens.find(token => token.toLowerCase().startsWith("fen:"))
  let tokensYes = tokensLow.filter(token => token[0]!='-').filter(token => !token.startsWith("fen:"))
  let tokensNo = tokensLow.filter(token => token[0]==='-').map(token => token.substring(1))

  Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
  }
  fights.forEach( fight => {
    let games = tournamentGames.find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date.setUTCSeconds(game.createdAt/1000);
        let stringBuilder = []
        stringBuilder.push(JSON.stringify(game, null, 0))

        let winnerName = ""
        let loserName = ""
        if (game.winner==="white") {
          winnerName = game.players.white.user.name
          loserName =game.players.black.user.name
        } else if (game.winner==="black") {
          winnerName = game.players.black.user.name
          loserName = game.players.white.user.name
        }
        let appended = {
          date: [date.getFullYear().padLeft(), (date.getMonth()+1).padLeft(), date.getDate().padLeft()].join('/'),
          winner: winnerName,
          loser: loserName,
          white: game.players.white.user.name,
          black: game.players.black.user.name
        }
        stringBuilder.push(
          ` `,
          JSON.stringify(appended, null, 0)
        )
        let jsonGame = stringBuilder.join("")
          .toLowerCase()
          .replace(/"/g, '')

        let foundUnsatisfiedTokenYes = tokensYes.find(token => {
          return (jsonGame.indexOf(token) < 0)
        })
        let existsTokenNo = tokensNo.find(token => {
          return (jsonGame.indexOf(token) >= 0)
        })

        if (foundUnsatisfiedTokenYes === undefined && existsTokenNo === undefined){
          if (fen) {
            let theFen = fen.substring(4)
            if(movesContainFen(game.moves, theFen)) selectedGames.push(game)
          } else selectedGames.push(game)
        }
      })
    }
  })
  return {"games": selectedGames}
}

function searchStrintToTokens(searchStr) {
  // RegEx manual:
  //    (?<=y)x ... Lookbehind assertion: Matches "x" only if "x" is preceded by "y". But only x is part of match, the y not.
  //    x(?=y) .... Lookahead assertion: Matches "x" only if "x" is followed by "y". But y is not part of match, only x is.
  // So: (?<=\")[^\"]*(?=\") ... stands for something between quotation marks
  // and: [^\" ]+ ... of course everything what is not quotation mark or space, so some word
  //
  // BEWARE: Lookbehind assertion does not work in mozilla
  //
  // const regex = /(?<=\")[^\"]*(?=\")|[^\" ]+/g;

  const regex = /(\"[^\"]*\")|[^\" ]+/g;
  const tokens = searchStr.match(regex).map(token => {
    let insideQ = token.match(/\"([^\"]*)\"/)
    if (insideQ != null) return insideQ[1]
    else return token
  })
  return tokens
}

function processSearch(searchStr) {
  let theFights = jouzoleanAndBebulsTournaments
  let tokens = searchStrintToTokens(searchStr)
  let gameData = gameListData(searchGames(theFights, tokens))

  updateMostActivePlayer("gameListTable", gameData)
  updateGoogleBar("gameListTableBar", gameData)
  gameListTable.setData(gameData).then(function(){
    gameListTable.redraw(true)
  })
}

function onSearchClicked() {
  var searchText = document.getElementById("searchInput").value
  let newUrl = window.location.pathname + "?q=" + encodeURIComponent(searchText)
  History.pushState({'q': searchText}, 'Search Engine', newUrl)
  processSearch(searchText)
}
