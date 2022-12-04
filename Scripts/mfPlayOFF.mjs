import {LoadMFData} from "../js/tournamentsData.mjs"
import {LAPI} from "../js/lichessAPIdownloader.mjs"
import { Chess } from 'chess.js'
import {addStats} from "../js/analyze.mjs"
import {toNDJson} from "../js/mondayFight.mjs"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

let playOFF = {
  '2021': {
    games: 'MiX9k7Eo,EDVuU1Dw,5l6Lsnzc,c3o88IoF,uPfXwttU,' + //bebul
    'pyLFmOnQ,PIxjbgtQ,eS6Qgrc7,uC2EZ5KT,' +            // travinho
    'g5K7ITQV,J4rb8gHG,uyrilg7k,UncvDmUc,4zLOaFjD,' + // mozkomor
    'nB5GjyYK,aVUUIEMS,yIjGBvQ8,L332WBwh,' +         // hrobotron
    'HeAWyd09,zf4s7MY2,8SonQJ1D,BdFoYIoH,' + // tekele
    'FRlCCQQK,6Vip6tw0,t4W0etip,xhKvIRP5,ZriObG7j,HVahREC6,' + // lenochod
    'pvueyBEu,FMxI8rbQ,byOH8MQf,j1fbghx2,KErnErQd,' + // jouzolean
    'rkNOey9s,P86aHJ1x,WHOYJysR,QFn5QfHV,cFAwhyRN,peaUtCOu,' + // mrazek
    'zt5RXbWC,KlfuO36G,Q9MssTxq,tvjFtefk,DT9aovti',
    seed: ['bukowskic', 'Jouzolean', 'Mrazek', 'bebul', 'mozkomor', 'Tekele', 'RychlyLenochod', 'DJ-Pesec', 'travinho', 'hrobotron']
  }, //dj-pesec
  dwnl2021: [{"id":"DT9aovti","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641151776770,"lastMoveAt":1641152152078,"status":"resign","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2045,"ratingDiff":8},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2173,"ratingDiff":-8}},"winner":"white","opening":{"eco":"B01","name":"Scandinavian Defense: Modern Variation","ply":4},"moves":"e4 d5 exd5 Nf6 Nc3 Nxd5 Nxd5 Qxd5 Nf3 Nc6 c3 e5 d4 exd4 Nxd4 Bc5 Qe2+ Ne7 Be3 O-O Qc4 c6 Qxd5 Nxd5 Bc4 Nxe3 fxe3 Re8 Kd2 Bg4 Raf1 Bh5 g4 Bg6 h4 h5 gxh5 Bxh5 Rhg1 Rad8 Rf5 Bxd4 cxd4 Bg6 Rxg6 Re7 Rfg5 Kh7 Rxg7+ Kh6 Rxf7 Rxf7 Bxf7 Rf8 Rf5 Kg7 Be6 Re8 Bb3 b6 Rf7+ Kg6 Rxa7 Kh5 Rh7+ Kg6 Bf7+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"tvjFtefk","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641151262808,"lastMoveAt":1641151774652,"status":"draw","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2175,"ratingDiff":-2},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2043,"ratingDiff":2}},"opening":{"eco":"D35","name":"Queen's Gambit Declined: Exchange Variation","ply":7},"moves":"d4 e6 c4 d5 Nc3 Nf6 cxd5 Nxd5 Nxd5 exd5 Nf3 f6 Bf4 Bd6 Bxd6 Qxd6 e3 Qb4+ Qd2 Qxd2+ Nxd2 O-O Nb3 b6 Be2 Ba6 Rc1 Bxe2 Kxe2 c6 Rc2 Rc8 Rhc1 a5 Nd2 Ra7 b3 Rac7 Nb1 Kf7 Nc3 Ke6 Na4 Nd7 Kd3 Kd6 f3 c5 dxc5+ Nxc5+ Nxc5 Rxc5 Rxc5 Rxc5 Rxc5 bxc5 a3 f5 g4 g6 h3 Ke5 f4+ Kd6 Kc3 Kc6 a4 Kd6 Kd3 Ke6 Kc3 h6 Kd3 Kf6 Ke2 g5 fxg5+ Kxg5 Kf3 c4 bxc4 dxc4 gxf5 Kxf5 e4+ Ke5 Ke3 h5 h4 c3 Kd3 c2 Kxc2 Kxe4 Kc3 Kf4 Kc4 Kg4 Kb5 Kxh4 Kxa5 Kg3 Kb6 h4 a5 h3 a6 h2 a7 h1=Q Kc7 Qc1+ Kb7 Qb2+ Ka6 Qa3+ Kb7 Qb4+ Ka8 Qf8+ Kb7 Qe7+ Ka8 Qd8+ Kb7 Qd7+ Kb8 Qd6+ Kb7 Qe7+ Kb8 Qd8+ Kb7 Qd7+ Kb8 Qb5+ Kc7 Qa6 Kb8 Qb6+ Ka8 Qc6+ Kb8 Qe8+ Kb7 Qd7+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"Q9MssTxq","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641151109841,"lastMoveAt":1641151257371,"status":"resign","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2035,"ratingDiff":8},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2184,"ratingDiff":-9}},"winner":"white","opening":{"eco":"B01","name":"Scandinavian Defense: Modern Variation","ply":4},"moves":"e4 d5 exd5 Nf6 d3 Nxd5 Bd2 e5 Nc3 Be6 g3 Nxc3 Bxc3 Bd5 f3 Bd6 Bg2 O-O Ne2 Nc6 O-O Bc5+ Kh1 Nd4 Nxd4 Bxd4 Bxd4 exd4 Qd2 Re8 Rae1 Qd7 b3 c5 a4 b6 f4 Rxe1 Rxe1 Bxg2+ Qxg2 Kf8 Qxa8+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"KlfuO36G","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641150663458,"lastMoveAt":1641151107269,"status":"draw","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2186,"ratingDiff":-2},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2033,"ratingDiff":2}},"opening":{"eco":"D37","name":"Queen's Gambit Declined: Three Knights, Vienna Variation","ply":8},"moves":"d4 e6 c4 d5 Nc3 Nf6 Nf3 dxc4 e4 Bb4 e5 Nd5 Bd2 Bxc3 Bxc3 Nxc3 bxc3 b5 Nd2 O-O Qf3 c6 g3 Bb7 Bg2 Nd7 Ne4 c5 Qe3 cxd4 cxd4 Bxe4 Bxe4 Rb8 O-O Nb6 Rab1 a6 Qa3 Qc8 Rfd1 Nd5 Bxd5 exd5 Qd6 Rd8 Qe7 Qe6 Qa3 f6 Re1 f5 f4 g6 Re3 Kf7 Qb4 Qe7 Qa5 Qe6 Ra3 Ra8 Qb4 Qe7 Qa5 Qb7 Kf2 Rdb8 Qb4 Qd7 Re1 Ke6 Qc5 Rc8 Qb6+ Rc6 Qa5 Qc7 Qb4 Rb6 Rb1 Qc6 Qc3 Rab8 Qb4 Ra8 Qc3 Rab8 Qb4 Ra8","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"zt5RXbWC","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641150044004,"lastMoveAt":1641150650257,"status":"draw","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2031,"ratingDiff":2},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189,"ratingDiff":-3}},"opening":{"eco":"B01","name":"Scandinavian Defense: Modern Variation","ply":4},"moves":"e4 d5 exd5 Nf6 Nc3 Nxd5 Nxd5 Qxd5 Qf3 Be6 c3 Nc6 d4 O-O-O Be2 h5 Qxd5 Bxd5 Bf3 e5 dxe5 Nxe5 Bxd5 Rxd5 Be3 Be7 Ne2 Nd3+ Kf1 Nxb2 Nf4 Rd1+ Rxd1 Nxd1 Bd4 f6 Ke2 Nb2 Rb1 Nc4 Kd3 Nd6 Nd5 Re8 Re1 Kd7 Bc5 b6 Ba3 Nf5 Bxe7 Nxe7 Nb4 a5 Nc2 Nc6 Rd1 Re6 Ne3 Rd6+ Kc2 Rxd1 Kxd1 g6 Kc2 Ke6 f4 g5 fxg5 fxg5 Kd3 Ne5+ Ke4 c6 g3 b5 a3 c5 h3 b4 cxb4 cxb4 axb4 axb4 Kd4 b3 Kc3 Nf3 Kxb3 Ke5 Ng2 Ke4 Kc3 Ne5 Kd2 Kf3 Ne1+ Kxg3 Ke3 Kxh3 Ke4 Ng4 Kf5 h4 Kxg5 Nf2 Nf3 Kg3 Nxh4 Ne4+ Kh5 Nf6+ Kg5 Ne4+ Kh5 Nd6 Ng6 Nf7 Ne7 Kf4 Kg6 Ne5+ Kf6 Nd7+ Ke6 Nc5+ Kd5 Nd3 Nc6 Nf2 Nd4 Ng4 Ne6+ Kf5 Nd4+ Kf4 Ne6+ Kf5 Nd4+ Kf6 Ke4 Ne5 Nf3 Nxf3","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"peaUtCOu","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641062410165,"lastMoveAt":1641062931608,"status":"resign","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2080,"ratingDiff":2},"black":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1809,"ratingDiff":-2}},"winner":"white","opening":{"eco":"C65","name":"Ruy Lopez: Berlin Defense","ply":6},"moves":"e4 e5 Nf3 Nc6 Bb5 Nf6 Bxc6 dxc6 d3 Bc5 h3 h6 a3 Be6 Nc3 O-O Qe2 Nd7 O-O f5 exf5 Rxf5 Ne4 Bd6 Bd2 Qe7 Bc3 Bd5 Nfd2 Raf8 f3 Bxe4 Nxe4 Bc5+ Kh1 Qh4 Nxc5 Nxc5 Bxe5 Re8 d4 Nd7 f4 Nxe5 fxe5 Rxf1+ Rxf1 Qxd4 e6 Qxb2 e7 Qb5 Qe6+ Kh7 Qf7 Rxe7 Qxe7 Qxf1+ Kh2 Qf4+ Kg1 Qc1+ Kh2 Qxc2 Qxc7 Qb3 Qe7 a5 Qe4+ Kh8 Qe8+ Qg8 Qe7 Qb8+ Kh1 b5 Qc5 Qc7 Qf8+ Kh7 Qf5+ g6 Qc5 a4 Qf8 Qg7 Qd6 Qa1+ Kh2 Qxa3 Qxa3","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"cFAwhyRN","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641061895407,"lastMoveAt":1641062382231,"status":"resign","players":{"white":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1800,"ratingDiff":9},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2090,"ratingDiff":-10}},"winner":"white","opening":{"eco":"C41","name":"Philidor Defense: Exchange Variation","ply":7},"moves":"e4 e5 Nf3 d6 d4 exd4 Nxd4 Bd7 Nc3 Nc6 Be3 a6 Bc4 Nf6 O-O Be7 f3 O-O Nd5 Nxd5 Bxd5 Nxd4 Bxd4 c6 Bb3 Be6 Qe1 d5 Qg3 f6 Rae1 dxe4 Rxe4 Bxb3 axb3 c5 Bc3 Bd6 Qg4 Qc7 Qe6+ Kh8 Rd1 Bxh2+ Kf1 Rad8 Rxd8 Qxd8 Ke2 h6 Re3 Bf4 Rd3 Qc7 Qf5 Qe7+ Kf2 Bd6 g4 Rd8 g5 hxg5 f4 Bxf4 Rh3+ Kg8 Qh7+ Kf7 Qh5+ Ke6 Qe2+ Kd7 Rd3+ Kc8 Qxe7","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"QFn5QfHV","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641061411882,"lastMoveAt":1641061887465,"status":"mate","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2088,"ratingDiff":2},"black":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1802,"ratingDiff":-2}},"winner":"white","opening":{"eco":"C65","name":"Ruy Lopez: Berlin Defense","ply":6},"moves":"e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 Bxc6 dxc6 O-O Nd7 Qe2 O-O Be3 Qe7 a3 b6 Nc3 Ba6 Rfd1 Rae8 Na4 Bxe3 Qxe3 f5 exf5 Rxf5 Nc3 Nf6 h3 e4 dxe4 Nxe4 Nxe4 Qxe4 Qxe4 Rxe4 Rd8+ Kf7 Rad1 Re7 R8d7 Rxd7 Rxd7+ Ke6 Rxc7 Rd5 Rxa7 Rd1+ Kh2 Be2 Rxg7 Bxf3 gxf3 Rd2 Kg3 Rxc2 Rxh7 Rxb2 Rh6+ Kd5 Rh8 c5 h4 c4 h5 c3 h6 Ke6 h7 Kd7 Rf8 c2 h8=Q c1=Q Rd8+ Ke6 Qe8+ Kf6 Rd6+ Kf5 Qg6+ Ke5 Qe6#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"WHOYJysR","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641060800325,"lastMoveAt":1641061406987,"status":"mate","players":{"white":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1804,"ratingDiff":-2},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2086,"ratingDiff":2}},"winner":"black","opening":{"eco":"C41","name":"Philidor Defense: Exchange Variation","ply":7},"moves":"e4 e5 Nf3 d6 d4 exd4 Nxd4 Bd7 Be3 Nc6 Bd3 g6 O-O Bg7 c3 Nge7 Nd2 O-O N2f3 Bg4 Qd2 Bxf3 Nxf3 Ne5 Nxe5 dxe5 Rad1 Qc8 Bh6 Bxh6 Qxh6 f5 Bc4+ Kh8 f3 Rd8 exf5 Nxf5 Qg5 Rxd1 Rxd1 Qf8 Rd7 Re8 Bb3 Re7 Rxe7 Qxe7 Qxe7 Nxe7 Kf2 Kg7 Ke3 Kf6 Ke4 c6 g4 g5 h3 h6 Bc4 b5 Bb3 a5 a4 bxa4 Bxa4 Ke6 Bb3+ Kd6 Bf7 Nd5 Bxd5 cxd5+ Kf5 a4 Kg6 d4 cxd4 exd4 Kxh6 d3 f4 d2 f5 d1=Q f6 Ke6 Kxg5 Qd2+ Kg6 Qf4 g5 Qf5+ Kh6 Qxh3+ Kg7 Qf5 Kh6 Qe5 g6 Qxf6 Kh7 Qh4+ Kg7 Kd5 Kf7 Qf4+ Kg8 Kc4 g7 Kb3 Kh7 Qh4+ Kg6 Qg4+ Kf7 Qxg7+ Kxg7 Kxb2 Kf6 a3 Ke5 a2 Kd4 a1=Q Kd3 Qc1 Kd4 Qc3+ Ke4 Kb3 Kd5 Qc4+ Ke5 Kb4 Kd6 Qc5+ Ke6 Kb5 Kf6 Kc6 Ke6 Qd5+ Kf6 Kd6 Kg6 Qe5 Kf7 Qe6+ Kg7 Ke7 Kh7 Qg4 Kh6 Kf7 Kh7 Qg7#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"P86aHJ1x","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641060380244,"lastMoveAt":1641060791249,"status":"resign","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2096,"ratingDiff":-10},"black":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1794,"ratingDiff":10}},"winner":"black","opening":{"eco":"C65","name":"Ruy Lopez: Berlin Defense","ply":6},"moves":"e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 Bxc6 dxc6 h3 O-O Bg5 h6 Bh4 g5 Bg3 Nd7 Nxe5 Nxe5 Bxe5 f6 Bc3 Qd6 Qf3 f5 e5 Re8 O-O Qg6 d4 Bb6 a4 a5 Nd2 c5 d5 g4 hxg4 fxg4 Qg3 Qxc2 e6 h5 f3 c4+ Kh1 Qg6 fxg4 hxg4 Qh4 Qh7 Qxh7+ Kxh7 Rf7+ Kg6 Raf1 Bxe6 R7f6+ Kg5 Rxe6 Rh8+ Bxh8 Rxh8+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"rkNOey9s","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641060034322,"lastMoveAt":1641060364045,"status":"outoftime","players":{"white":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1796,"ratingDiff":-2},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2094,"ratingDiff":2}},"winner":"black","opening":{"eco":"C41","name":"Philidor Defense: Exchange Variation","ply":7},"moves":"e4 e5 Nf3 d6 d4 exd4 Nxd4 Bd7 Be3 Nc6 Nxc6 Bxc6 Nc3 Nf6 Bc4 Be7 Bd5 Bxd5 exd5 O-O O-O Nd7 Qg4 Ne5 Qg3 Bh4 Qh3 Bf6 f4 Nc4 Bc1 Re8 b3 Nb6 Bd2 Nxd5 Nxd5 Bxa1 Rxa1 c6 Ne3 Qf6","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"KErnErQd","rated":false,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641054399008,"lastMoveAt":1641054822010,"status":"resign","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189},"black":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1831}},"winner":"white","opening":{"eco":"D08","name":"Queen's Gambit Declined: Albin Countergambit, Normal Line","ply":7},"moves":"d4 d5 c4 e5 dxe5 d4 Nf3 Nc6 Bf4 Bb4+ Bd2 Bf5 a3 Be7 g3 Nh6 Bg2 Ng4 O-O Ngxe5 Nxe5 Nxe5 Bf4 Ng6 Bxb7 Rb8 Bc6+ Bd7 Bxd7+ Qxd7 Bc1 O-O b4 Rfe8 Nd2 Bf6 Rb1 a5 Nf3 axb4 axb4 Qe7 Nxd4 Bxd4 Qxd4 Qxe2 Be3 Rbd8 Qb2 Rxe3 Qxe2 Rxe2 Rfd1 Rde8 Kf1 Nf8 c5 Nd7 c6 Nf6 b5 Ng4 f4 Rf2+ Kg1 Ree2 Rd8+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"j1fbghx2","rated":false,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641053987717,"lastMoveAt":1641054396348,"status":"mate","players":{"white":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1831},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189}},"winner":"white","opening":{"eco":"A22","name":"English Opening: Carls-Bremen System","ply":5},"moves":"c4 Nf6 Nc3 e5 g3 Nc6 Bg2 Bb4 Nf3 O-O O-O a6 Nd5 Be7 d3 d6 h3 Nxd5 cxd5 Nb8 e4 c5 dxc6 Nxc6 Be3 f5 Rc1 Be6 exf5 Bxf5 Qb3+ Kh8 Qxb7 Bxd3 Qxc6 Bxf1 Kxf1 Qa5 Qc7 Qb5+ Kg1 Bf6 b3 Rfd8 Rd1 Rac8 Qf7 h6 Bxh6 Qe2 Rd2 Rc1+ Kh2 Qb5 Bxg7+ Bxg7 Qh5+ Kg8 Ng5 Qd7 Qh7+ Kf8 Bd5 Qe7 Qg8#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"byOH8MQf","rated":false,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641053679082,"lastMoveAt":1641053978188,"status":"resign","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189},"black":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1831}},"winner":"white","opening":{"eco":"A35","name":"English Opening: Symmetrical Variation, Two Knights Variation","ply":4},"moves":"c4 c5 Nc3 Nc6 e4 g6 Nf3 Bg7 a3 d6 Be2 Nf6 O-O O-O d3 a6 h3 b6 Be3 Bb7 d4 cxd4 Bxd4 Nxd4 Nxd4 e6 Bf3 Rc8 Qd3 Nd7 Rac1 Ne5 Qd1 Nxc4 Rb1 Ne5 Be2 b5 Nf3 Nc4 Bxc4 Rxc4 Qd3 Qc7 Rfe1 Rd8 Rbc1 Bxe4 Rxe4 Rxe4 Qxe4 Bxc3 Rxc3 Qb6 Qc2 Qb7 Rc7 Qb8 Rc3 d5 Nd4 e5 Nc6","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"FMxI8rbQ","rated":false,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641053187747,"lastMoveAt":1641053674336,"status":"resign","players":{"white":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1831},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189}},"winner":"black","opening":{"eco":"A22","name":"English Opening: King's English Variation, Two Knights Variation, Smyslov System","ply":6},"moves":"c4 e5 Nc3 Nf6 g3 Bb4 Bg2 Nc6 Nf3 O-O O-O Re8 d3 a6 Nd5 Nxd5 cxd5 Nd4 Nxd4 exd4 a3 Be7 Bd2 Bf6 Rc1 Rb8 d6 cxd6 b4 b5 Bf4 Qe7 Re1 Be5 e3 dxe3 Rxe3 Bb7 Bxb7 Rxb7 d4 Qf6 dxe5 dxe5 Qe2 d6 h4 h6 Re4 Rbe7 Bd2 d5 Rg4 e4 Be3 d4 Bf4 d3 Qe3 Qf5 f3 exf3 Qxf3 Re3 Qf1 Qxg4 Qg2 Re2 Qf1 d2 Rd1 Re1 Rxe1 Rxe1 Qxe1 dxe1=Q+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"pvueyBEu","rated":false,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1641052823808,"lastMoveAt":1641053153045,"status":"resign","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189},"black":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1831}},"winner":"white","opening":{"eco":"A35","name":"English Opening: Symmetrical Variation, Two Knights Variation","ply":4},"moves":"c4 c5 Nc3 Nc6 Nf3 g6 e3 Bg7 Be2 Nf6 O-O O-O d4 cxd4 Nxd4 d6 Bf3 Ne5 b3 Nxf3+ Qxf3 Qc7 Bd2 a6 h3 Rb8 Rac1 Bd7 Rfd1 Bc6 Nxc6 bxc6 Na4 Rfe8 e4 Nd7 Bc3 Ne5 Qe3 e6 f4 Nd7 Bxg7 Kxg7 Qd4+ e5 fxe5 Rxe5 Qxd6 Rd8 Qxc7","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"HVahREC6","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640960760548,"lastMoveAt":1640960970095,"status":"mate","players":{"white":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1540,"ratingDiff":0},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2084,"ratingDiff":0}},"winner":"black","opening":{"eco":"C21","name":"Center Game","ply":5},"moves":"e4 e5 d4 exd4 Qxd4 d6 Nf3 Nc6 Bg5 Nxd4 Bxd8 Nxf3+ gxf3 Kxd8 Nc3 c6 Bc4 Be6 Bb3 Bxb3 axb3 g6 Ke2 Bg7 Ra2 Bxc3 bxc3 Ne7 c4 a6 Rd1 Kc7 b4 Rae8 Ke3 Rd8 b5 cxb5 cxb5 axb5 Rc1 Ra8 Rb2 Ra5 c4 bxc4 Rxc4+ Rc5 Rcb4 Rb8 Kd4 Nc6+ Kd3 Nxb4+ Rxb4 b5 Kd4 Kc6 f4 Rc4+ Rxc4+ bxc4 Kxc4 Rb2 f3 Rxh2 e5 dxe5 fxe5 Rf2 e6 fxe6 f4 Rxf4+ Kd3 e5 Ke2 g5 Ke1 g4 Ke2 g3 Ke1 g2 Ke2 g1=R Ke3 Rg3+ Ke2 Ra3 Kd1 Rf2 Ke1 Rh2 Kf1 Ra1#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"ZriObG7j","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640960260359,"lastMoveAt":1640960756722,"status":"mate","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2083,"ratingDiff":1},"black":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1541,"ratingDiff":-1}},"winner":"white","opening":{"eco":"C00","name":"French Defense: Normal Variation","ply":3},"moves":"e4 e6 d4 c6 Nc3 a5 d5 cxd5 exd5 Bb4 dxe6 fxe6 Bd2 Nf6 Bd3 Qe7 a3 Bc5 Nf3 Ng4 O-O Bd6 h3 Nf6 Ne4 h6 Nxf6+ Qxf6 Bc3 e5 Qe2 O-O Be4 Nc6 Bxc6 dxc6 Rad1 Bxh3 gxh3 Rad8 Nh2 Qf4 Qg4 Qf6 f3 Qf7 Rde1 Bc5+ Kh1 Rd5 Rxe5 Rfd8 Rxd5 Rxd5 Re1 Rg5 Qc8+ Kh7 Qe6 Rg1+ Rxg1 Qxe6 Rxg7+ Kh8 Re7+ Kg8 Rxe6 b5 Rxc6 Be7 Rxh6 Kf7 Ra6 Ke8 Rxa5 Kd7 Rxb5 Kc6 Rh5 Kd6 Ng4 Ke6 Re5+ Kf7 Rxe7+ Kxe7 Kg2 Kd8 Kg3 Kc7 h4 Kb7 h5 Ka8 h6 Kb8 h7 Ka8 h8=Q+ Kb7 Qe5 Kc6 Ne3 Kb6 f4 Ka6 f5 Ka7 f6 Kb7 f7 Kc6 f8=Q Kb6 Qff6+ Kb7 Qee7+ Ka8 Qff8#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"xhKvIRP5","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640959945168,"lastMoveAt":1640960258116,"status":"mate","players":{"white":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1541,"ratingDiff":0},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2083,"ratingDiff":0}},"winner":"black","opening":{"eco":"C23","name":"Bishop's Opening","ply":3},"moves":"e4 e5 Bc4 d6 Nc3 Nf6 d3 c6 Nf3 h6 h3 Be7 Be3 O-O Qe2 a5 O-O b5 Bxf7+ Rxf7 Nh4 Nxe4 Nxe4 Bxh4 Kh2 Be7 g3 Bf5 g4 Bxe4 dxe4 Nd7 Kg3 Bh4+ Kh2 Bg5 Rg1 Bxe3 Qxe3 Qe7 Rg3 Raf8 Rf1 Nc5 f3 Qg5 Qc3 Nxe4 h4 Qf4 Qe1 Qxg3+ Qxg3 Nxg3 Kxg3 g5 hxg5 hxg5 Rh1 Rxf3+ Kg2 Rf2+ Kg1 Rf1+ Kh2 R8f2+ Kg3 Rf3+ Kg2 Rxh1 Kxh1 Rf2 Kg1 Rxc2 Kf1 Rxb2 Ke1 Rxa2 Kd1 Rg2 Kc1 Rxg4 Kb1 Rf4 Ka2 g4 Ka3 g3 Ka2 g2 Kb1 g1=Q+ Kc2 Qg3 Kd1 Rf2 Ke1 Qg1#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"t4W0etip","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640959691969,"lastMoveAt":1640959937735,"status":"resign","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2082,"ratingDiff":1},"black":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1542,"ratingDiff":-1}},"winner":"white","opening":{"eco":"C00","name":"French Defense: Normal Variation","ply":3},"moves":"e4 e6 d4 c6 Nc3 b5 a3 a5 Nce2 Ba6 Ng3 g6 c3 b4 axb4 axb4 Bxa6 Nxa6 Qe2 Qb6 Be3 bxc3 bxc3 Qb7 Nf3 Bh6 O-O Bxe3 fxe3 Nh6 Ne5 O-O Rfb1 Qc7 Rxa6 f6 Rxa8 Rxa8 Ng4 Nxg4 Qxg4 f5 exf5 exf5 Nxf5 Rb8 Rf1 Rf8 Nh6+ Kg7 Rxf8 Kxf8 Qf4+ Kg7 Qxc7 Kxh6 Qxd7 c5 dxc5 g5","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"6Vip6tw0","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640959577048,"lastMoveAt":1640959687425,"status":"mate","players":{"white":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1530,"ratingDiff":12},"black":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2094,"ratingDiff":-12}},"winner":"white","opening":{"eco":"C41","name":"Philidor Defense","ply":4},"moves":"e4 e5 Nf3 d6 Bd3 h6 Nc3 Nf6 h3 Be7 b3 Be6 Bb2 Nc6 Qe2 O-O O-O-O Nh7 g4 Ng5 Nxg5 Bxg5 h4 Bf4 g5 hxg5 hxg5 Bxg5 Qh5 Qf6 Qh7#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"FRlCCQQK","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640959203489,"lastMoveAt":1640959555707,"status":"resign","players":{"white":{"user":{"name":"bukowskic","id":"bukowskic"},"rating":2107,"ratingDiff":-13},"black":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1519,"ratingDiff":11}},"winner":"black","opening":{"eco":"C00","name":"French Defense: Normal Variation","ply":3},"moves":"e4 e6 d4 c6 Nc3 Be7 Bd2 Nf6 Nf3 a6 h3 d6 Bg5 Bd7 e5 dxe5 dxe5 Nh5 Bxe7 Qxe7 Bd3 b5 a3 c5 Ne4 h6 Nd6+ Kf8 Nh2 Nf4 Bf1 Nc6 g3 Nd5 c4 Nb6 cxb5 Nxe5 bxa6 Nc8 Nxc8 Bxc8 Be2 Bxa6 Bxa6 Rxa6 O-O Rd6 Qa4 Kg8 Rfd1 Kh7 Qc2+ g6 Qc3 Nc6 Qxc5 Rxd1+ Rxd1 Qxc5 Nf3 Rd8 Re1 Nd4 Ne5 Nf5 Nxf7 Rd2 Rxe6 Qxf2+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"BdFoYIoH","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640895795945,"lastMoveAt":1640896231436,"status":"mate","players":{"white":{"user":{"name":"Tekele","id":"tekele"},"rating":1533,"ratingDiff":0},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2189,"ratingDiff":0}},"winner":"black","opening":{"eco":"B01","name":"Scandinavian Defense: Modern Variation","ply":4},"moves":"e4 d5 exd5 Nf6 Bc4 Nxd5 Nc3 Nxc3 bxc3 e5 Qf3 Qf6 Qe3 Bd6 Nf3 O-O O-O Nc6 Bb2 Bg4 Ng5 h6 Ne4 Qf4 Qxf4 exf4 h3 Bf5 Nxd6 cxd6 d3 Rab8 Bd5 Be6 Bxe6 fxe6 Rfe1 Kf7 Re4 e5 Ba3 Rbd8 Rb1 Rd7 Rf1 g5 g3 Kf6 Bb2 Ke6 d4 d5 Re2 e4 f3 e3 gxf4 gxf4 Rff2 Rg8+ Kh2 Rdg7 Rf1 Na5 Ba3 Nc4 Bc1 Rg3 a4 R8g5 Ree1 Rh5 Rh1 Rhxh3#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"8SonQJ1D","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640895350598,"lastMoveAt":1640895787729,"status":"mate","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2188,"ratingDiff":1},"black":{"user":{"name":"Tekele","id":"tekele"},"rating":1533,"ratingDiff":0}},"winner":"white","opening":{"eco":"A21","name":"English Opening: King's English Variation, Kramnik-Shirov Counterattack","ply":4},"moves":"c4 e5 Nc3 Bb4 Nd5 a5 Nf3 Nc6 a3 Bc5 d3 Nd4 Nxe5 Ne7 Nxe7 Qxe7 Nf3 O-O e3 Re8 Be2 b6 Nxd4 Bxd4 exd4 Bb7 d5 c6 Be3 cxd5 cxd5 Bxd5 O-O f5 Bf3 Be6 Re1 Rac8 Bxb6 Qg5 Bxa5 f4 Rc1 Bh3 Rxc8 Rxc8 Bc3 Bf5 Qe2 Qg6 Bd5+ Kh8 Be4 Bxe4 Qxe4 Qg4 Qe8+ Rxe8 Rxe8#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"zf4s7MY2","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640894932572,"lastMoveAt":1640895330237,"status":"resign","players":{"white":{"user":{"name":"Tekele","id":"tekele"},"rating":1534,"ratingDiff":-1},"black":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2188,"ratingDiff":0}},"winner":"black","opening":{"eco":"D00","name":"Queen's Pawn Game: Accelerated London System","ply":3},"moves":"d4 d5 Bf4 e6 e3 c5 c3 Nc6 Nf3 Bd6 Bg3 Nf6 Nbd2 h6 Bd3 a6 b3 Qe7 e4 dxe4 Nxe4 Nxe4 Bxe4 Bxg3 hxg3 Bd7 Qd3 cxd4 cxd4 Rc8 Rc1 Nb4 Rxc8+ Bxc8 Qd2 Qd6 Qe2 Nd5 O-O Bd7 Ne5 O-O f4 Bc6 Nxc6 Qxc6 Qg4 Qb6 Rd1 Ne3","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"HeAWyd09","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640894364770,"lastMoveAt":1640894928900,"status":"resign","players":{"white":{"user":{"name":"DJ-Pesec","id":"dj-pesec"},"rating":2188,"ratingDiff":0},"black":{"user":{"name":"Tekele","id":"tekele"},"rating":1534,"ratingDiff":0}},"winner":"white","opening":{"eco":"A10","name":"English Opening: Anglo-Dutch Defense","ply":2},"moves":"c4 f5 Nc3 e5 Nf3 d6 e3 Nc6 a3 Nf6 d4 e4 d5 exf3 dxc6 fxg2 Bxg2 b6 Nd5 Ne4 Bxe4 fxe4 Qh5+ g6 Qe2 Bg7 Qc2 Bf5 Bd2 Qg5 Nxc7+ Kf7 Nxa8 Rxa8 O-O-O Rc8 Bc3 Rxc6 Bxg7 Kxg7 Qc3+ Kf7 Qd4 Be6 Qh8 Rxc4+ Kb1 Qh6 Rxd6 Rc8 Qd4 Qh4 Qe5 Re8 Qf4+ Qxf4 exf4 Bf5 Ka1 Ke7 Rd5 Ke6 Re5+ Kf7 Rxe8 Kxe8 Ka2 Kf7 Kb3 Ke6 Kc3 Kd5 Rd1+ Ke6 Kd4 Kf6 Rc1 g5 fxg5+ Kxg5 Ke3 Kg4 Rg1+ Kh3 Rg3+ Kxh2 Kf4 Bg6 Ke5 Kh1 Kf6 Kh2 Ke7 a5 Kd6 Bf5 Ke5 Bg6 Kd4 Bf5 Kc4 h5 Kb5 h4 Rg5 Bg4 Rxg4 Kh3 Rxe4 Kg2 Rxh4 Kxf2 Kxb6","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"4zLOaFjD","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640892719433,"lastMoveAt":1640893075453,"status":"outoftime","players":{"white":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1784,"ratingDiff":5},"black":{"user":{"name":"mozkomor","id":"mozkomor"},"rating":1743,"ratingDiff":-5}},"winner":"white","opening":{"eco":"B06","name":"Modern Defense: Standard Defense","ply":6},"moves":"e4 g6 d4 Bg7 Nc3 d6 Bc4 Nf6 h3 O-O Nf3 Nbd7 O-O Nb6 Bb3 a5 a4 Re8 e5 dxe5 dxe5 Qxd1 Rxd1 e6 exf6 Bxf6 Bh6 c5 Ne4 Bxb2 Rab1 Bd4 Nxd4 cxd4 Nf6+ Kh8 Nxe8 Bd7 Nf6 Bc6 Rxd4 Rc8 Rbd1 Nd5 Bxd5 exd5 Nxd5 Bxa4 Nf6","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"UncvDmUc","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640892280555,"lastMoveAt":1640892705535,"status":"outoftime","players":{"white":{"user":{"name":"mozkomor","id":"mozkomor"},"rating":1736,"ratingDiff":7},"black":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1790,"ratingDiff":-6}},"winner":"white","opening":{"eco":"A00","name":"Hungarian Opening: Catalan Formation","ply":4},"moves":"g3 d5 Bg2 e6 e4 dxe4 Bxe4 Nf6 Bg2 c6 d4 Be7 Nf3 O-O O-O Nd5 c4 Nf6 Nc3 h6 Be3 Nbd7 b3 Qa5 Bd2 Bb4 Qc2 Qh5 a3 Bxc3 Bxc3 b6 Nh4 Bb7 Bf3 Qg5 Bd2 Qxh4 gxh4 e5 dxe5 Nxe5 Bg2 Rad8 Bc3 Nd3 Bxf6 gxf6 Rad1 Nf4 Rxd8 Rxd8 Qf5 Ne2+ Kh1 Bc8 Qxf6 Re8 Qxh6 Nd4 Qg5+ Kf8 Qf4 Ne6 Qh6+ Ke7 Bh3","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"uyrilg7k","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640891742673,"lastMoveAt":1640892270378,"status":"resign","players":{"white":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1785,"ratingDiff":5},"black":{"user":{"name":"mozkomor","id":"mozkomor"},"rating":1742,"ratingDiff":-6}},"winner":"white","opening":{"eco":"B06","name":"Modern Defense","ply":4},"moves":"e4 g6 d4 Bg7 Nf3 d6 Bc4 Nf6 Nc3 O-O h3 Re8 O-O e5 dxe5 dxe5 Bg5 Qxd1 Raxd1 Be6 Bxe6 Rxe6 Bxf6 Bxf6 Nd5 Bd8 c4 Na6 b4 c6 b5 Nc5 bxc6 bxc6 Nb4 Nxe4 Rfe1 f5 h4 Ba5 a3 c5 Nc2 Bxe1 Rxe1 Rb8 Ng5 Re7 Nxe4 fxe4 Rxe4 Rb2 Ne3 Rb3 Nd5 Reb7 Nf6+ Kf7 Ng4 Rxa3 Nxe5+ Kf6 Ng4+ Kf5 f3 h5 Ne3+ Kf6 Nd5+ Kg7 Kh2 Rf7 Kg3 Ra6 Nc3 Rc6 Re5 Rcc7 Ne4 Rfe7 Rxe7+ Rxe7 Nxc5 Rc7 Ne6+ Kf6 Nxc7 Ke5 Nb5 a6 Na3 Kd4 Kf4 Kc3 Kg5 Kb4 Kxg6 Kxa3 c5 Kb4 c6 a5 c7 a4 c8=Q a3 Qc1","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"J4rb8gHG","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640891097835,"lastMoveAt":1640891726307,"status":"outoftime","players":{"white":{"user":{"name":"mozkomor","id":"mozkomor"},"rating":1747,"ratingDiff":-5},"black":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1780,"ratingDiff":5}},"winner":"black","opening":{"eco":"A00","name":"Hungarian Opening: Catalan Formation","ply":4},"moves":"g3 d5 Bg2 e6 d3 Nf6 Nf3 Be7 O-O c5 c4 d4 Nbd2 Nc6 a3 a5 Nb3 O-O Bf4 a4 Nbd2 Nh5 Ne5 Nxe5 Bxe5 f6 g4 fxe5 gxh5 Bd7 Rb1 Bc6 Bxc6 bxc6 Nf3 Bh4 Nxe5 Qd6 Nf3 Rxf3 exf3 Rf8 Qe2 Qe7 Qe4 Qg5+ Qg4 Rxf3 Qxg5 Bxg5 Rbd1 Kf7 Kg2 Rf6 Rfe1 Bf4 Re4 Bd6 Rf1 h6 Rg1 Rf5 Re2 Rxh5 Rh1 Rg5+ Kf1 Rf5 h4 g6 Re4 h5 Rg1 Bh2 Rg2 Bd6 Rg5 Rxg5 hxg5 Ke7 Re2 e5 Kg2 Ke6 Kh3 Kf5 Kh4 Kf4 Re1 Kf3 Rf1 Ke2 Rh1 Kxf2 Rh2+ Kf3 Rd2 e4 dxe4 Kxe4 Re2+ Kd3 Re6 Bc7 Rxc6 Ba5 Rxg6 Kxc4 Rd6 d3 g6 d2 g7 Kb3 g8=Q+ Kc2 Qg6+ Kxb2 Rxd2+ Bxd2 Qxh5 c4 Qe2 c3 Qb5+ Kxa3 Qc5+ Kb3","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"g5K7ITQV","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640890780341,"lastMoveAt":1640891078377,"status":"resign","players":{"white":{"user":{"name":"Mrazek","id":"mrazek"},"rating":1775,"ratingDiff":5},"black":{"user":{"name":"mozkomor","id":"mozkomor"},"rating":1753,"ratingDiff":-6}},"winner":"white","opening":{"eco":"B06","name":"Modern Defense","ply":4},"moves":"e4 g6 d4 Bg7 Nf3 d6 Bc4 Nf6 Nc3 c6 O-O O-O h3 Re8 Bg5 h6 Bh4 g5 Bg3 Nbd7 e5 dxe5 dxe5 Nh5 e6 fxe6 Bxe6+ Kh8 Nxg5 hxg5 Qxh5+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"L332WBwh","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640884575317,"lastMoveAt":1640885151057,"status":"mate","players":{"white":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1512,"ratingDiff":4},"black":{"user":{"name":"hrobotron","id":"hrobotron"},"rating":1395,"ratingDiff":-5}},"winner":"white","opening":{"eco":"C23","name":"Bishop's Opening","ply":3},"moves":"e4 e5 Bc4 Nc6 a3 Bc5 b3 Nf6 Bb2 d6 Nc3 Bg4 f3 Bd7 Qe2 Nd4 Qd3 Nh5 g3 Qf6 O-O-O a6 Nd5 Qd8 Ne2 Nf6 Nxd4 Nxd5 Bxd5 Bxd4 Bxd4 exd4 Qxd4 c6 Qxg7 Rf8 Bc4 Qa5 Kb2 d5 exd5 cxd5 Bd3 b5 Qf6 b4 Rde1+ Be6 a4 Qc5 Re3 Rg8 Rhe1 Rg6 Bxg6 hxg6 Qh8+ Ke7 Qxa8 d4 Qb7+ Kf6 Re4 d3 c4 bxc3+ dxc3 d2 Rf4+ Bf5 Qxa6+ Kg5 h4+ Kh6 Rd1 Qf2 Qf1 Qe3 Qc4 Bd3 Qd4 Qe2 Rxd2 Qxd2+ Ka3 Qc1+ Kb4 Qd1 Qh8#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"yIjGBvQ8","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640884419784,"lastMoveAt":1640884547583,"status":"mate","players":{"white":{"user":{"name":"hrobotron","id":"hrobotron"},"rating":1401,"ratingDiff":-6},"black":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1508,"ratingDiff":4}},"winner":"black","opening":{"eco":"C00","name":"French Defense","ply":2},"moves":"e4 e6 Bc4 a6 d3 Bd6 Nf3 h6 O-O Nc6 Nc3 Nf6 Qe2 Ng4 e5 Ncxe5 d4 Nxf3+ Qxf3 Bxh2+ Kh1 Qh4 g3 Bxg3+ Kg1 Qh2#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"aVUUIEMS","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640884065535,"lastMoveAt":1640884412822,"status":"resign","players":{"white":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1503,"ratingDiff":5},"black":{"user":{"name":"hrobotron","id":"hrobotron"},"rating":1407,"ratingDiff":-6}},"winner":"white","opening":{"eco":"C25","name":"Vienna Game: Max Lange Defense","ply":4},"moves":"e4 e5 Nc3 Nc6 Bc4 Qf6 Nf3 Bd6 Nd5 Qg6 Nxc7+ Bxc7 g3 Qxe4+ Qe2 Qxe2+ Bxe2 Nge7 d3 O-O h4 h6 g4 Nd4 Nxd4 exd4 g5 h5 Bxh5 Nd5 Bd2 Bd6 O-O-O Nb4 Kb1 a5 Rdg1 b6 g6 Bb7 gxf7+ Kh8 Bg6 Bxh1 Rxh1 a4 h5 a3 h6 axb2 hxg7+ Kxg7 Rh7+ Kxg6 Rh6+ Kxf7 Rxd6 Ke7 Rxb6 Rxa2 Bxb4+ d6 Kxa2 Ra8+ Kxb2 Rf8 Bxd6+ Kd7 Bxf8","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"nB5GjyYK","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640883609336,"lastMoveAt":1640884039665,"status":"outoftime","players":{"white":{"user":{"name":"hrobotron","id":"hrobotron"},"rating":1414,"ratingDiff":-7},"black":{"user":{"name":"RychlyLenochod","id":"rychlylenochod"},"rating":1499,"ratingDiff":4}},"winner":"black","opening":{"eco":"C00","name":"French Defense","ply":2},"moves":"e4 e6 Bc4 a6 d3 Nc6 Ne2 Nf6 O-O Bd6 Bf4 e5 Bg5 b5 Bd5 Bb7 Nbc3 Qe7 Qd2 O-O-O Qe3 Bc5 Qd2 h6 Be3 Ng4 Bxc5 Qxc5 Bxf7 Rhf8 d4 exd4 Nxd4 Nxd4 Bd5 c6 Bb3 Nxb3 axb3 Ne5 Ne2 Ng4 h3 Nxf2 Rxf2 Qxf2+ Kh2 c5","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"uC2EZ5KT","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640877630945,"lastMoveAt":1640878143677,"status":"mate","players":{"white":{"user":{"name":"travinho","id":"travinho"},"rating":1300,"ratingDiff":-3},"black":{"user":{"name":"Tekele","id":"tekele"},"rating":1532,"ratingDiff":2}},"winner":"black","opening":{"eco":"B54","name":"Sicilian Defense: Modern Variations, Main Line","ply":8},"moves":"e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Qe2 Nc6 Nxc6 bxc6 Bg5 Qa5+ c3 Qxg5 Nd2 e6 Qd3 Be7 Nf3 Qa5 b4 Qb6 Rd1 Ng4 Qd4 Qxd4 cxd4 O-O Be2 Nf6 O-O Nxe4 a3 Nc3 Rd2 Nxe2+ Rxe2 a5 Rc2 axb4 axb4 Bd7 Rfc1 Ra6 Nd2 g6 Rb2 Rfa8 Nb3 Bf6 Rd1 c5 bxc5 dxc5 Rbd2 cxd4 Nxd4 Bxd4 Rxd4 Bc6 h3 Ra1 Kh2 Rxd1 Rxd1 Ra2 f3 Bxf3 Rg1 Bd5 Kg3 f5 h4 Kf7 Kf4 Kf6 g4 e5+ Kg3 fxg4 Kxg4 e4 Rf1+ Ke5 Re1 Ra3 Kg5 e3 Kh6 Kf4 Kxh7 Kf3 Kxg6 Kf2 Rh1 Bxh1 h5 e2 h6 e1=Q h7 Be4+ Kg7 Bxh7 Kxh7 Rg3 Kh6 Qh1#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"eS6Qgrc7","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640876961393,"lastMoveAt":1640877489766,"status":"resign","players":{"white":{"user":{"name":"Tekele","id":"tekele"},"rating":1529,"ratingDiff":3},"black":{"user":{"name":"travinho","id":"travinho"},"rating":1302,"ratingDiff":-2}},"winner":"white","opening":{"eco":"C02","name":"French Defense: Advance Variation","ply":5},"moves":"d4 e6 e4 d5 e5 Nc6 f4 f6 Bb5 Bd7 Nc3 fxe5 Bxc6 Bxc6 fxe5 Bb4 Bd2 Qe7 Nf3 O-O-O Qe2 Bxc3 Bxc3 a6 O-O-O Bb5 Qd2 Nh6 h4 Qf7 Ng5 Qf5 b3 Ng4 Rhg1 Nf2 Rde1 Ne4 Qe3 h6 a4 hxg5 axb5 Nxc3 Qxc3 Qf4+ Kb2 axb5 Ra1 Kd7 Ra7 Rb8 hxg5 Qxg5 Qb4 Qe7 Qxb5+ c6 Qb6 Qd8 Qb4 Rf8 Rxb7+ Rxb7 Qxb7+ Ke8 Qxc6+ Qd7 Qxd7+ Kxd7 c4 dxc4 bxc4 Rc8 Kc3 Kc6 Kd3 Rf8 Ra1 g5 Ra6+ Kd7 d5 exd5 cxd5 Rf5 Ke4 Rf2 g4 Re2+ Kf5 Rd2 e6+ Ke7 Ra7+ Kd6 Kxg5 Rxd5+ Kf6 Rd4 Rd7+ Kc6 Rxd4 Kc5 Rd1 Kc6 e7","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"PIxjbgtQ","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640876848150,"lastMoveAt":1640876949038,"status":"resign","players":{"white":{"user":{"name":"travinho","id":"travinho"},"rating":1305,"ratingDiff":-3},"black":{"user":{"name":"Tekele","id":"tekele"},"rating":1527,"ratingDiff":2}},"winner":"black","opening":{"eco":"B21","name":"Sicilian Defense: Smith-Morra Gambit","ply":3},"moves":"e4 c5 d4 cxd4 Qxd4 Nc6 Qd3 e5 Nf3 Bc5 Qc3 Bb4 Qxb4 Nxb4 Nxe5 Nxc2+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"pyLFmOnQ","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640876504677,"lastMoveAt":1640876842581,"status":"mate","players":{"white":{"user":{"name":"Tekele","id":"tekele"},"rating":1524,"ratingDiff":3},"black":{"user":{"name":"travinho","id":"travinho"},"rating":1307,"ratingDiff":-2}},"winner":"white","opening":{"eco":"C05","name":"French Defense: Tarrasch Variation, Closed Variation","ply":6},"moves":"e4 e6 d4 d5 Nd2 Nf6 e5 Ne4 Bd3 Bb4 c3 Nxd2 Bxd2 Be7 f4 O-O Nf3 Nc6 O-O a6 Ng5 Bxg5 fxg5 g6 Qg4 f5 gxf6 Kf7 Bxg6+ hxg6 Rf3 Na5 Rh3 Ke8 Qxg6+ Rf7 Rh8+ Kd7 Qxf7+ Kc6 Rxd8 Bd7 Qxd7+ Kb6 Rxa8 Nc6 Qxe6 a5 Qxd5 a4 f7 Ne7 Qa5+ Kc6 Qxa4+ b5 Ra6+ Kd7 Qxb5+ Kc8 f8=Q#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"uPfXwttU","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640874365850,"lastMoveAt":1640874806311,"status":"outoftime","players":{"white":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1828,"ratingDiff":3},"black":{"user":{"name":"bebul","id":"bebul"},"rating":1638,"ratingDiff":-3}},"winner":"white","opening":{"eco":"C10","name":"French Defense: Paulsen Variation","ply":5},"moves":"e4 e6 d4 d5 Nc3 Ne7 Nf3 Nbc6 Bd3 g6 O-O Bg7 e5 f6 Re1 O-O Bf4 Nb4 Bf1 f5 a3 Nbc6 Qd2 Bd7 h3 a6 Ne2 Na5 b3 Bb5 Qxa5 Nc6 Qd2 Ne7 Bh6 b6 Bxg7 Kxg7 Ng3 Bxf1 Kxf1 c5 c3 Qd7 Qg5 Ng8 Nh5+ Kh8 Nf4 Qb5+ Kg1 Qd7 Nxg6+ hxg6 Qxg6 Rf7 Ng5 Rg7 Qxe6 Qxe6 Nxe6 Rg6 Nf4","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"c3o88IoF","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640873988812,"lastMoveAt":1640874361059,"status":"mate","players":{"white":{"user":{"name":"bebul","id":"bebul"},"rating":1641,"ratingDiff":-3},"black":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1825,"ratingDiff":3}},"winner":"black","opening":{"eco":"C37","name":"King's Gambit Accepted: Salvio Gambit, Anderssen Counterattack","ply":14},"moves":"e4 e5 f4 exf4 Nf3 g5 Bc4 g4 Ne5 Qh4+ Kf1 Nh6 d4 d6 Nd3 f3 g3 Qh3+ Ke1 Nc6 Nc3 Qh5 Nd5 Be7 Nxc7+ Kd8 Nxa8 Nxd4 Bxh6 Qxh6 Bxf7 Qe3+ Kf1 Rf8 c3 Ne2 Bc4 Qxe4 Nf4 Qxc4 Nxe2 fxe2+ Ke1 exd1=Q+ Rxd1 Qe4+ Kd2 Rf2+ Kc1 Qc2#","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"5l6Lsnzc","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640873615808,"lastMoveAt":1640873982636,"status":"resign","players":{"white":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1834,"ratingDiff":-9},"black":{"user":{"name":"bebul","id":"bebul"},"rating":1632,"ratingDiff":9}},"winner":"black","opening":{"eco":"C15","name":"French Defense: Winawer Variation, Winckelmann-Riemer Gambit","ply":7},"moves":"e4 e6 d4 d5 Nc3 Bb4 a3 Bxc3+ bxc3 dxe4 Qg4 Nf6 Qxg7 Rg8 Qh6 Nbd7 Be2 Rg6 Qh3 e5 Rb1 Nc5 Qh4 e3 dxc5 exf2+ Qxf2 Ne4 Qh4 Qxh4+ g3 Nxg3 Nf3 Qh5 Rg1 Nxe2 Rxg6 hxg6 Kxe2 Bg4 Be3 Bxf3+","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"EDVuU1Dw","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640873233179,"lastMoveAt":1640873604730,"status":"resign","players":{"white":{"user":{"name":"bebul","id":"bebul"},"rating":1635,"ratingDiff":-3},"black":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1831,"ratingDiff":3}},"winner":"black","opening":{"eco":"C37","name":"King's Gambit Accepted: Double Muzio Gambit","ply":15},"moves":"e4 e5 f4 exf4 Nf3 g5 Bc4 g4 O-O gxf3 Qxf3 Qf6 e5 Qxe5 Bxf7+ Kxf7 d4 Qxd4+ Be3 Qxb2 Qxf4+ Qf6 Qc4+ Ke8 Rxf6 Nxf6 Nc3 Nc6 Re1 Be7 Bg5 Rf8 Qf4 d6 Nb5 Kd8 Bh6 Rg8 Bg5 Rf8 Bh6 Rg8 Qc4 Bd7 Qf7 Ne5 Qc4 Nxc4","clock":{"initial":180,"increment":2,"totalTime":260}},{"id":"MiX9k7Eo","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1640872818896,"lastMoveAt":1640873229856,"status":"mate","players":{"white":{"user":{"name":"Jouzolean","id":"jouzolean"},"rating":1828,"ratingDiff":3},"black":{"user":{"name":"bebul","id":"bebul"},"rating":1638,"ratingDiff":-3}},"winner":"white","opening":{"eco":"C10","name":"French Defense: Rubinstein Variation","ply":6},"moves":"e4 e6 d4 d5 Nc3 dxe4 Nxe4 Nf6 Qd3 Bd6 Bg5 Be7 Nf3 h6 Bxf6 Bxf6 Nxf6+ Qxf6 O-O-O b6 Kb1 Bb7 Be2 Nc6 Rhe1 O-O-O h4 g5 hxg5 hxg5 Qc3 Rh6 Bb5 Rd6 a3 Na5 Ne5 Qxf2 Rf1 Qxg2 Nxf7 Rc6 Qb4 Rh7 Qf8+ Kd7 Ne5#","clock":{"initial":180,"increment":2,"totalTime":260}}],
  tournamentSkeleton: {
    "nbPlayers": 1,
    "podium": [
      {
        "name": "Player1",
        "rank": 1,
        "rating": 1740,
        "score": 28,
        "sheet": {},
        "nb": {
          "game": 11,
          "berserk": 0,
          "win": 9
        },
        "performance": 1936
      }
    ],
    "standing": {
      "page": 1,
      "players": [
        {
          "name": "Margarita_Vlasenko",
          "rank": 1,
          "rating": 1740,
          "score": 28,
          "sheet": {
            "scores": "04444422022"
          },
          "performance": 1936,
          "diff": 35,
          "points": [9, 2],
          "avgOponent": 1617
        }
      ]
    },
    "fullName": "MF PlayOFF 2021",
    "id": "playOFF2021",
    "createdBy": "DJ-Pesec",
    "startsAt": "2022-11-28T19:00:00.000Z",
    "system": "arena",
    "stats": {
      "moves": 5059,
      "averageRating": 1535,
      "berserks": 3,
      "blackWins": 42,
      "games": 72,
      "draws": 2,
      "whiteWins": 28
    },
    "pairingsClosed": true,
    "duels": [],
    "isFinished": true,
    "minutes": 90,
    "perf": {
      "key": "blitz",
      "name": "Blitz",
      "icon": ")"
    },
    "clock": {
      "limit": 180,
      "increment": 2
    },
    "variant": "standard",
    "rated": true,
    "berserkable": true,
    "verdicts": {
      "list": [],
      "accepted": true
    },
    "private": true
  }
}

async function extractTournamentData(data, tournament, games, playOFFId, seed) {
  // sort games by date
  games.sort((a,b) => a.createdAt - b.createdAt)

  // get players
  let players = new Set()
  games.forEach(g => {
    players.add(g.players.white.user.name)
    players.add(g.players.black.user.name)
  })
  tournament.nbPlayers = players.size
  tournament.fullName = `MF PlayOFF ${playOFFId}`
  tournament.id = `playOFF${playOFFId}`
  tournament.startsAt = new Date(0) // 1.1.1970

  // calculate players
  let pl = Array.from(players.values())
  let plData = pl.map(name => {
    let player = JSON.parse(JSON.stringify(tournament.standing.players[0]))
    player.name = name
    return player
  })
  tournament.standing.players = plData

  // addExtras can be called after tournament.players are set to match the games
  // it sets sensation, fast, mate, diff, points, avgOponent
  data.addExtraTournamentStats(tournament, {games: games})

  // find rating
  let ratings = {}
  games.forEach(g => {
    ratings[g.players.white.user.name] = g.players.white.rating
    ratings[g.players.black.user.name] = g.players.black.rating
  })
  tournament.standing.players.forEach(p => p.rating = ratings[p.name])

  // Performance formula is avgOpo + 10*(percentageScore - 50)
  tournament.standing.players.forEach(p => {
    let denom = p.points[0] + p.points[1] || 1
    p.performance = Math.round(p.avgOponent + 10 * (100 * p.points[0] / denom - 50))
  })

  // Fake scores using only 2 for win, 1 for draw and loosing 0
  let scores = {}
  pl.forEach(p => scores[p] = "")
  games.forEach(g => {
    let white = g.players.white.user.name
    let black = g.players.black.user.name
    if (g.winner) {
      if (g.winner === 'white') {
        scores[white] += '2'
        scores[black] += '0'
      } else {
        scores[white] += '0'
        scores[black] += '2'
      }
    } else {
      scores[white] += '1'
      scores[black] += '1'
    }
  })
  tournament.standing.players.forEach(p => {
    p.sheet.scores = scores[p.name].split('').reverse().join('') // For some reason it must be reversed
    p.score = p.sheet.scores.split('').reduce((a,c) => a + Number(c), 0)
  })

  // find duels and determine rank
  let duels = {}
  games.forEach(g => {
    let p1 = g.players.white.user.name
    let p2 = g.players.black.user.name
    let duelId = null
    if (p1 < p2) duelId = `${p1} ${p2}`
    else duelId = `${p2} ${p1}`
    if (!duels[duelId]) {
      let init = {}
      init[p1] = 0
      init[p2] = 0
      duels[duelId] = init
    }
    let duel = duels[duelId]
    if (g.winner) {
      if (g.winner === 'white') duel[p1] += 1
      else duel[p2] += 1
    } else {
      duel[p1] += 0.5
      duel[p2] += 0.5
    }
    duels[duelId] = duel
  })
  let duelsAr = []
  for (let d in duels) {
    duelsAr.push(duels[d])
  }
  duelsAr.reverse()

  let ranks = {}
  let levels = {}
  while(duelsAr.length > 0) {
    let duel = duelsAr.shift()
    let [p1, p2] = Object.keys(duel)
    if (duel[p1] > duel[p2]) {
      // p1 wins
      if (!levels[p1]) {
        levels[p1] = 1
        ranks[p1] = 1 // overall winner
        levels[p2] = 1
        ranks[p2] = 2 // silver
      } else {
        // p1 already determined in final, semifinal or something, we determine p2
        levels[p1] = levels[p1] + 1
        levels[p2] = levels[p1]
        ranks[p2] = Math.pow(2, levels[p2])
      }
    } else {
      // p2 wins
      if (!levels[p2]) {
        levels[p2] = 1
        ranks[p2] = 1 // overall winner
        levels[p1] = 1
        ranks[p1] = 2 // silver
      } else {
        // p2 already determined in final, semifinal or something, we determine p1
        levels[p2] = levels[p2] + 1
        levels[p1] = levels[p2]
        ranks[p1] = Math.pow(2, levels[p1])
      }
    }
  }
  tournament.standing.players.forEach(p => {
    if (seed) {
      p.rank = 100000 * ranks[p.name] + seed.indexOf(p.name)
    } else {
      p.rank = 100000 * ranks[p.name] - p.performance
    }
  })
  tournament.standing.players.sort((a,b) => a.rank - b.rank)
  for (let i=0; i<tournament.standing.players.length; i++) {
    tournament.standing.players[i].rank = i+1
  }

  // Podium
  tournament.podium = []
  for (let i = 0; i<3; i++) {
    let player = tournament.standing.players[i]
    let pl = JSON.parse(JSON.stringify(player))
    pl.nb = {
      game: player.sheet.scores.length,
      berserk: 0,
      win: player.sheet.scores.split('').filter(p => p > 1).length
    }
    tournament.podium.push(pl)
  }

  let chess = new Chess()
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Provide Game statistics
  async function nextStat(games) {
    let timeout = 0
    const promiseTimeout = time => result => new Promise(resolve => setTimeout(resolve, time, result));
    let g = games.shift()
    if (g) {
      await addStats(g, tournament, undefined, chess)
        .then(promiseTimeout(timeout))
        .then(result => nextStat(games))
    }
  }

  let gamesCopy = []
  games.forEach(g => gamesCopy.push(g)) // shallow copy is sufficient
  await nextStat(gamesCopy)

  // the date of the first match. It must be set after addStats!
  tournament.startsAt = function() {
    let createdAt = games.map(g => g.createdAt).reduce(function (a, g) {
      if (g < a) return g
      else return a
    })
    let d = new Date(createdAt)
    let dateString = d.getFullYear() + "-" +
      ("0" +(d.getMonth()+1)).slice(-2) + "-" +
      ("0" + d.getDate()).slice(-2) + "T" +
      ("0" + d.getHours()).slice(-2) + ":" +
      ("0" + d.getMinutes()).slice(-2) + ":" +
      ("0" + d.getSeconds()).slice(-2) + ".000Z";
    return dateString
  }()

  let gamesJSON = JSON.stringify({id: tournament.id, games: games.reverse()}) // For some reason it must be reversed
  let tournamentJSON = JSON.stringify(tournament)
  console.log(tournamentJSON)
  console.log(gamesJSON)
  return tournament
}

export async function createPlayOFFTournament(data, playOFFId) {
  let theGames = playOFF['dwnl'+playOFFId] || await LAPI.lichessAPI().games(playOFF[playOFFId].games)
  let t = JSON.parse(JSON.stringify(playOFF.tournamentSkeleton))
  let tournament = await extractTournamentData(data, t, theGames, playOFFId, playOFF[playOFFId].seed)

  return [tournament, theGames]
}

function ndjson2array(text) {
  let json = "[" + text.replace(/\n{/g, ",{") + "]"
  return json
}

function parse(json) {
  return JSON.parse(json)
}

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

function process(data) {
  createPlayOFFTournament(data, '2021')
    .then( v => {
      let [tournament, games] = v
      data.addTournaments([tournament])
      data.addGames({id: tournament.id, games: games})
      fs.writeFileSync('../data/tournaments.ndjson', toNDJson(data.jouzoleanAndBebulsTournaments()))
      fs.writeFileSync('../data/tournamentGames.ndjson', toNDJson(data.tournamentGames()))
    })
}

let loadedTounaments = parse(ndjson2array(loadData("../data/tournaments.ndjson")))
let loadedGames = parse(ndjson2array(loadData("../data/tournamentGames.ndjson")))

LoadMFData(process, loadedTounaments, loadedGames)
