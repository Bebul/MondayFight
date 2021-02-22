function initSearch() {
  let allFights = jouzoleanAndBebulsTournaments;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const admin = urlParams.get('bebul')!=null
}

function searchGames(fights, tokens) {
  let selectedGames = []
  fights.forEach( fight => {
    let games = tournamentGames.find(tg => tg.id==fight.id);
    if (games !== undefined) {
      games.games.forEach(game => {
        let jsonGame = JSON.stringify(game, null, 0).toLowerCase();
        let found = tokens.find(token => {
          return (jsonGame.indexOf(token) < 0)
        })
        if (found === undefined) selectedGames.push(game)
      })
    }
  })
  return {"games": selectedGames}
}

function processSearch(searchStr) {
  let theFights = mondayFights
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
  const tokens = searchStr.toLowerCase().match(regex).map(token => {
    let insideQ = token.match(/\"([^\"]*)\"/)
    if (insideQ != null) return insideQ[1]
    else return token
  })

  let gameData = gameListData(searchGames(theFights, tokens))

  updateMostActivePlayer("gameListTable", gameData)
  updateGoogleBar("gameListTableBar", gameData)
  gameListTable.setData(gameData).then(function(){
    gameListTable.redraw(true)
  })
}

function onSearchClicked() {
  var searchText = document.getElementById("searchInput").value;
  processSearch(searchText)
}