import {blackPlayerDecorated, whitePlayerDecorated} from "./podium.mjs";
import {Chessground} from '../node_modules/chessground/chessground.js';
import { Chess } from '../lib/chess.mjs';

export function processAnalyze(data) {
  let allFights = data.jouzoleanAndBebulsTournaments()

  document.getElementById("explore").onclick = function() {
    let line = document.getElementById("line").value
    document.getElementById("result").innerHTML = explore2html(exploreLine(data,line))
  }
}

function explore2html(exp) {
  let options = {
    orientation: 'white',
    movable: {
      free: false, // all moves are valid - board editor
      color: "both", // color that can move. "white" | "black" | "both" | null
      dests: {}, // valid moves. {a2: ["a3", "a4"], b1: ["a3", "c3"]} | null
      dropOff: "revert", // when a piece is dropped outside the board. "revert" | "trash"
      showDests: false, // add the move-dest class to squares
      events: {
        // called after the move has been played
        after: function(orig, dest, metadata) {
          console.log('' + orig + ' ' + dest + ' ' + metadata);
          ground.move("e7", "e5")
        }
      }
    }
  };

  let defaults = {
    theme: "blue",
    pieceStyle: 'merida',
    //width: '320px',
    //boardSize: '320px',
    manyGames: false,
    coordinates: false,
    orientation: 'white',
    position: 'start',
    showFen: false,
    layout: 'top',
    headers: true,
    timerTime: 700,
    locale: 'en',
    movable: {free: false},
    highlight: {lastMove: true},
    viewOnly: true,
    hideMovesBefore: false,
    colorMarker: null,
    showResult: false,
    timeAnnotation: 'none',
    notation: 'short',
    notationLayout: 'inline',   // Possible: inline, list, allList
/*    IDs: {
      bottomHeaderId: boardId + 'BottomHeader',
      topHeaderId: boardId + 'TopHeader',
      innerBoardId: boardId + 'Inner',
      movesId: boardId + 'Moves',
      buttonsId: boardId + 'Button',
      fenId: boardId + "Fen",
      colorMarkerId: boardId + 'ColorMarker'
    }*/
  };
  let promMappings = {q: 'queen', r: 'rook', b: 'bishop', n: 'knight'};
  //let configuration = (Object.assign(options, defaults));
  let configuration = options

  let chess = new Chess()
  exp.opening.split(" ").forEach(m => chess.move(m))
  configuration.fen = chess.fen()
  console.log(configuration.fen)


  let ground = Chessground(document.getElementById("board"), configuration);

  let html = `<h2>${exp.opening}</h2>`

  let color = "white"
  if (exp.opening.split(" ").length % 2 === 1) color = "black"
  exp.lines.forEach(line => {
    let players = new Map()
    line.games.forEach(g => {
      let name = g.players[color].user.name
      if (players.has(name)) players.set(name, players.get(name)+1)
      else players.set(name, 1)
    })
    let maxPl = ["", 0]
    for(let pl of players.entries()) {
      if (pl[1] > maxPl[1]) maxPl = pl
    }
    let percents = Math.round((line.w / (line.w + line.d + line.b)) * 100)
    html += `<div style="margin-left:10px">-> <b>${line.move} ${percents}%</b> ${line.w} (${line.d}) ${line.b} [${maxPl[0]} ${maxPl[1]}x] ${line.name || ""}</div>`
    if (line.games.length <=10) {
      line.games.forEach(g => {
        let result = ""
        if (g.winner === "black") result = "0-1"
        else if (g.winner === "white") result = "1-0"
        else result = "½-½"
        html += `<div style="margin-left:70px">${whitePlayerDecorated(g)} : ${blackPlayerDecorated(g)} ${result}</div>`
      })
    }
  })
  return html
}

export function exploreLine(data, openingLine) {
  function getPts(g) {
    if (g.winner && g.winner==="black") return -1
    else if (g.winner && g.winner==="white") return 1
    else return 0
  }

  function countGames(line) {
    return line.w + line.d + line.b
  }

  let games = []
  data.forEachGame(g => games.push(g))

  let nextMoveIx = openingLine.split(" ").length
  let cont = new Map()
  games = games.sort()
  games.forEach(function(g) {
    if (g.moves.startsWith(openingLine)) {
      let moves = g.moves.split(" ")
      let nextMove = moves[nextMoveIx]
      if (nextMove) {
        let games = cont.get(nextMove) || []
        games.push(g)
        cont.set(nextMove, games)
      }
    }
  })

  let lines = []
  for (let entry of cont.entries()) {
    let white = 0
    let black = 0
    let draws = 0
    let openSub = new Set()
    let openPart = new Set()
    let openAll = new Set()
    entry[1].forEach(function(g) {
      if (g.opening && g.opening.name) {
        openSub.add(g.opening.name.split(":")[0])
        openPart.add(g.opening.name.split(",")[0])
        openAll.add(g.opening.name)
      }
      let pts = getPts(g)
      if (pts < 0) black++
      else if (pts > 0) white++
      else draws++
    })
    let openingName = undefined
    if (openAll.size==1) openingName = openAll.values().next().value
    else if (openPart.size==1) openingName = openPart.values().next().value
    else if (openSub.size==1) openingName = openSub.values().next().value
    lines.push({
      name: openingName,
      move: entry[0],
      w: white,
      b: black,
      d: draws,
      games: entry[1]
    })
  }
  lines.sort((a,b) => countGames(b) - countGames(a) )
  return {
    opening: openingLine,
    lines: lines
  }
}

