// USE: browserify parsePgn.js -o pgn-bundle.js
// and in HTML: <script type="text/javascript" src="pgn/pgn-bundle.js"></script>
// with function parsePgn available, because set as window property

const parser =  require('./pgn-parser.js')

window.parsePgn = parser.parse
