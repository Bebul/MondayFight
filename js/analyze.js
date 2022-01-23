function processAnalyze(data) {
  let allFights = data.jouzoleanAndBebulsTournaments()

  const adminStuff = document.createElement("div");
  adminStuff.style.display = "block"

  adminStuff.innerHTML = "      <div style=\"margin: 10px 0\">\n" +
    "            <div>Zadej id konkrétní hry, kterou chceš analyzovat:\n" +
    "                <input type=\"text\" id=\"gameID\" style=\"width:100%\">\n" +
    "                <button id=\"analyze\">Analyze</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "  <hr><div id='analyzeResult'></div>"

  document.body.appendChild(adminStuff)

  let resultEl = document.getElementById("analyzeResult")
  document.getElementById("analyze").onclick = function() {
    var gameId = document.getElementById("gameID").value
    analyzeGame(data, gameId, report)
  }

}

function report(html) {
  let resultEl = document.getElementById("analyzeResult")
  let lineDiv = document.createElement("div")
  lineDiv.innerHTML = html
  resultEl.appendChild(lineDiv)
}

async function reportHeadline(g, report) {
  await report(`
    <h1>${g.players.white.user.name} : ${g.players.black.user.name}, ${g.winner} wins</h1>
    <h2>${g.opening.name}</h2>
    ${g.moves}`
  )
}

function algebraic(i, j) {
  return 'abcdefgh'.substring(j, j + 1) + '87654321'.substring(i, i + 1)
}

function squareIsSmothered(board, i,j) {
  let c = board[i][j].color
  for (let r=i-1; r<i+2; r++) {
    for (let f=j-1; f<j+2; f++) {
      if (r>=0 && r<8 && f>=0 && f<8 && (!board[r][f] || board[r][f].color!=c)) return false
    }
  }
  return true
}

function countQueens(board, color) {
  let queens = 0
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let sq = board[i][j]
      if (sq && sq.type=="q" && sq.color==color)
        queens++
    }
  }
  return queens
}

function findKing(color, board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let sq = board[i][j]
      if (sq && sq.type=="k" && sq.color==color) {
        // detect smothered position
        let ret = {square: algebraic(i,j)}
        if (squareIsSmothered(board, i, j)) ret.smothered = true
        if (i>=3 && i<5 && j>=3 && j<5) ret.centerMate = true
        return ret
      }
    }
  }
  return null
}

async function analyzeMoves(g, report) {
  let moves = g.moves.split(" ")
  let chess = new Chess()
  let pgn = toPGN(g, true)
  chess.load_pgn(pgn)

  let history = chess.history({verbose: true})

  let stats = {}
  for(let prop in chess.FLAGS) {
    stats[chess.FLAGS[prop]] = {w:0, b:0}
  }
  stats.epCheck = {w:0, b:0}

  let board = chess.board()

  let queens = {w:0, b:0}
  for (color of ["w", "b"]) {
    queens[color] = countQueens(board, color)
  }
  stats.queens = queens

  history.forEach(function(m) {
    for (let i = 0; i < m.flags.length; i++) {
      stats[m.flags.charAt(i)][m.color]++
      if (m.flags.includes("e") && m.san.includes("+")) stats.epCheck[m.color]++
    }
  })

  // now mate
  let mate = (g.status=="mate") ? function(){
    let loseColor = (g.winner == "white") ? "b" : "w"
    let lastMove = history[history.length-1]

    let mate = findKing(loseColor, board)
    if (mate) {
      if (lastMove) mate.piece = lastMove.piece
      else console.log(`lastMove is ${lastMove}`)
    }
    else console.log(`mate is ${mate}`)
    if (lastMove.flags.includes("k") || lastMove.flags.includes("q")) mate.castling = true
    if (lastMove.flags.includes("p")) mate.promotion = true
    if (lastMove.flags.includes("e")) mate.enPassant = true

    return mate
  }() : null

  if (mate) stats.mate = mate

  if (report) await report(`moves ply ${moves.length} stats ${JSON.stringify(stats)}`)

  return stats
}

async function analyzeGame(data, gameId, reportFunc) {
  if (gameId == "all") {
    await addAllStats(data, reportFunc)
      .then(result => {
        console.log("ALL DONE")
        download("tournamentGames.ndjson", toNDJson(data.tournamentGames()))
      })
  } else {
    let g = data.findGame(gameId)
    if (g) {
      await Promise.resolve()
        .then(result => reportHeadline(g, report))
        .then(result => addStats(g, report))
    } else  {
      reportFunc(`<h1>Game ${gameId} not found</h1>`)
    }
  }
}

async function addStats(g, report) {
  //console.log(`called ${g.id}`)
  await analyzeMoves(g, report)
    .then(function(result) {
        for(let side in g.players) {
          let player = g.players[side]
          let color = (side == "white") ? "w" : "b"
          let stats = {}

          if (result.e[color] > 0) stats.ep = result.e[color]      // number of en passant moves
          if (result.p[color] > 0) stats.promo = result.p[color]   // number of promotions
          if (result.epCheck[color] > 0) stats.epCheck = true
          if (result.queens[color] > 2) stats.queens = result.queens[color]
          if (g.winner==side && result.mate) stats.mate = result.mate
          if (Object.keys(stats).length > 0) {
            if (stats.queens) console.log(`${g.id} has ${stats.queens} queens`)
            if (stats.mate && stats.mate.enPassant) console.log(`${g.id} player delivered enPassant mate`)
            if (stats.epCheck) console.log(`${g.id} player delivered en passant check`)
            if (stats.mate && stats.mate.smothered) console.log(`${g.id} smothered mate`)
            if (stats.mate && stats.mate.centerMate) console.log(`${g.id} center mate`)
            if (stats.mate && stats.mate.promotion) console.log(`${g.id} promotion mate`)
            if (stats.mate && stats.mate.castling) console.log(`${g.id} castling mate`)

            player.stats = stats
          } // and add it finally
        }
      }
    )
}

async function nextStat(data, games, report) {
  let g = games.shift()
  if (g) {
    await addStats(g, report)
      .then(result => nextStat(data, games, report))
  }
}

async function addAllStats(data, report) {
  let games = []
  data.forEachGame(g => games.push(g))

  await nextStat(data, games, report)
}
