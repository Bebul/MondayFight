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
          return (jsonGame.search(token) < 0)
        })
        if (found === undefined) selectedGames.push(game)
      })
    }
  })
  return {"games": selectedGames}
}

function processSearch(searchStr) {
  let theFights = mondayFights
  let tokens = searchStr.toLowerCase().split(" ").filter(token => token.length>0)
  //document.getElementById("gamesList").style.display = "block";
  gameListTable.setData(gameListData(searchGames(theFights, tokens))).then(function(){
    gameListTable.redraw(true)
  })
}

function onSearchClicked() {
  var searchText = document.getElementById("searchInput").value;
  processSearch(searchText)
}
