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
  for (let r=i-1; r<i+2; r+=2) {
    for (let f=j-1; f<j+2; f+=2) {
      if (r>=0 && r<8 && f>=0 && f<8 && (!board[r][f] || board[r][f].color!=c)) return false
    }
  }
  return true
}

function countQueens(color, board) {
  let queens = 0
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let sq = board[i][j]
      if (sq && sq.type=="q" && sq.color==color) queens++
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
        if (i>=2 && i<6 && j>=2 && j<6) ret.center = true
        return ret
      }
    }
  }
  return null
}

async function analyzeMoves(g, report) {
  let moves = g.moves.split(" ")
  let chess = new Chess()
  let pgn = toPGN(g)
  chess.load_pgn(pgn)
  let history = chess.history({verbose: true})
  let stats = {}
  for(let prop in chess.FLAGS) {
    stats[chess.FLAGS[prop]] = {w:0, b:0}
  }
  history.forEach(function(m) {
    for (let i = 0; i < m.flags.length; i++) {
      stats[m.flags.charAt(i)][m.color]++
    }
  })

  // now mate
  let mate = (g.status=="mate") ? function(){
    let loseColor = (g.winner == "white") ? "b" : "w"
    let winColor = (g.winner == "white") ? "w" : "b"
    let board = chess.board()
    let lastMove = history[history.length-1]

    let mate = findKing(loseColor, board)
    mate.piece = lastMove.piece
    if (lastMove.flags.includes("k") || lastMove.flags.includes("q")) mate.castling = true
    if (lastMove.flags.includes("p")) mate.promotion = true
    if (lastMove.flags.includes("e")) mate.enPassant = true
    let queens = countQueens(board, winColor)
    if (queens > 2) mate.queens = queens

    return `mateOn: ${JSON.stringify(mate)}"`
  }() : ""

  await report(`moves ply ${moves.length} stats ${JSON.stringify(stats)} ${mate}`)
}

async function analyzeGame(data, gameId, reportFunc) {
  let timeout = 1000
  const promiseTimeout = time => result => new Promise(resolve => setTimeout(resolve, time, result));

  let g = data.findGame(gameId)
  if (g) {
    await Promise.resolve()
      .then(result => reportHeadline(g, report))
      .then(result => analyzeMoves(g, report))
      //.then(promiseTimeout(timeout))
  } else  {
    reportFunc(`<h1>Game ${gameId} not found</h1>`)
  }

}
