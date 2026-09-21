/* jshint -W033, esversion: 6 */

export var tournamentSpec = [
  {id: "pwCJHYPg", html: "", achievements: [{achievement: "reporter", player: "bukowskic", id: "kKsQ2Krl"}]},
  {
    id: "GijbwcSY",
    html: "<img src='img/mf-og-x.jpg'>",
    achievements: [{achievement: "reporter", player: "Neznama-00", id: "DxhcZO5O"}]
  },
  {
    id: "z2iN8qVr",
    html: "<b>Bebul:</b> Gratulujeme Rychlýmu Lenochodovi k prvnímu letošnímu King Kongovi! Dal mat, aniž by ztratil jakýkoli materiál a navíc stihl postavit dámu navíc! 🙂<br><br>"
  },
  {
    id: "x6hNptkr",
    html: "<b>Následující hry byly z turnaje odstraněny.</b><br><img src='img/buta.png'><br><br><b>Jouzolean:</b><br> A aby ten dnešek nebyl tak smutný, tak mám taky jednu dobrou zprávu 🙂 Kolem Prahy teď letělo hejno ptáků a skřehotaly, že letí od Dobříše a že prej se tam chystá velká věc! Náš mistr Bukowskic prý bude trénovat místní mládež v šachu! Takže doufáme, že do našich skromných řad přibydou nové šachové naděje v podobě Bukowskiho rekrutů. To je velký krok pro celou Dobříš - až jednou uslyšíte, že Dobříš hraje extraligu, pamatujte kdo za tím stojí!! 😎<br><br>" +
      "<b>DJ-Strelec:</b><br> Tak to gratuluju! Az Buk deti nauci jeho neprostupnou Philidorovu obranu, urcite se neztrati 👍<br><br>" +
      "<b>Bukowskic:</b><br> Jo vrabci, no paráda, teď už z toho nevykroutím. Ale pravda, alespoň se doučím ta zahájení."
  },
  {id: "20AI0ybI", html: "<img src='img/vikJavMeme.jpg'>"},
  {id: "UZ9MlL1y", html: "<img src='img/mf-og-x.jpg'>"},
  {id: "7d6oiMze", html: "<img src='img/mf-og-hot.jpg>"},
  {id: "R77TPv23", html: "<img src='img/mf-og-hot2.jpg'>"},
  {
    id: "cz8LzOSL",
    html: "<b>Mrazek:</b><br> Já bych chtěl nenápadně upozornit na to, ne že bych se nějak chvástal, ale že dnes bukowskic byl právě jednou poražen, jedním hráčem, kterého nebudu jmenovat, aby to nevypadalo moc nabubřele. Taková výhra pak dokáže přebít i zklamání z vyhraných partií nedotáhnutých kvůli času či již tradičně prohraných remízových koncovek 🙂 nehledě pak na vyloženě jedovatý zármutek z čistě prohraných partií... to všechno ta jedna výhra dokáže přebít, takovou kouzelnou moc má jedna jediná výhra s bukowskicem. Doporučuju fšem co nejdříve vyzkoušet.<br>Stojí to za to 🙂"
  },
  {
    id: "z2iN8qVr",
    html: "<b>Bebul:</b> Jouzolean v dnešní <a href='https://lichess.org/DxokmcB1/white#65' target='_blank'>parádičce</a> s PuklýmChlebem nejenže dal mat jezdcem, ale tah předtím ještě drze obětoval svou dámu!<br><img src='img/nepraktaManzelHrajeSachy.jpg' style='margin-top:10px'>" +
      "<br><br><b>Bébul:</b> Udělal jsem pár změn na těchto stránkách. Hráči janshorny zůstává šachovnice pro nejrychlejší partii. Raketová výhra však nastala kvůli timeoutu. Není v tom sám, stalo se to už 4x, nově lze takové partie dohledat pomocí dotazu <a href='search.html?q=fastest%20timeout'><b>fastest timeout</b></a>. Plaketka rakety pro vítězné partie do deseti tahů se po úpravě pro vytimeoutované partie už neuděluje, takže po rozkliknutí hráče tam raketa záměrně chybí.<br> Krom toho jsem obohatil search engine o možnosti typu <b>min-moves:100</b> pro hledání dlouhých partií a podobně <b>max-moves:15</b>. Oboje se dá kombinovat. K tomu jsem ještě přidal možnost vyhledat <b>fastest</b>." +
      "<br><br><b>Bébul:</b> Vítáme nového hráče Jana Shorného. Pro budoucí návštěvníky jen pozn. k duplicitě baronGorc a janshorny. Snažili jsme se, aby nový hráč nezačínal s <b>provisional</b> ratingem, což baronGorc zvládl dobře, nicméně měl ještě jeden starý účet, na kterém nehrál a který používat nechtěl. V turnaji se tak objevily účty dva. Lichess naštěstí pároval jen jednoho z nich, ale naneštěstí toho s provizorním ratingem. V datech mimochodem ta informace o provizorním ratingu je, takže se s tím případně dá pracovat."
  },
  {
    id: "ayJNboMi",
    init: function () {
      let config = {
        pgn: "[Event \"Monday Fight Arena\"]\n" +
          "[Site \"https://lichess.org/hlwuMuIF\"]\n" +
          "[Date \"2022.04.04\"]\n" +
          "[White \"Margarita_Vlasenko\"]\n" +
          "[Black \"janshorny\"]\n" +
          "[Result \"1-0\"]\n" +
          "\n" +
          "1. e4 e5 2. Bc4 { C23 Bishop's Opening } Qe7 3. d3 Nc6 4. Nf3 f6 5. Nc3 b6 6. O-O d6 7. h3 Bd7 8. Nd5 Qd8 9. c3 Be6 10. d4 Bxd5 11. Bxd5 Nce7 12. Bxa8 Qxa8 13. dxe5 Qxe4 14. exd6 Nd5 15. dxc7 Nxc7 16. Re1 Qe7 17. Rxe7+ Bxe7 18. Bf4 Ne6 19. Bg3 Nh6 20. Qd5 Nf8 21. Re1 Nd7 22. Qe6 Kf8 23. Qxe7+ Kg8 24. Qxd7 g6 25. Re8# { White wins by checkmate. } 1-0",
        showCoords: false, coordsInner: false, headers: true,
        theme: 'brown',
        boardSize: 290,
        movesHeight: 250,
        startPlay: '19'
      }
      PGNV.pgnView("board", config)
    },
    html: "<h2>Добро пожаловать Маргарита</h2>Сегодня Маргарита впервые сыграла в Monday Fight. Но Lichess поставила ее в пару с другими игроками только один раз, и игра была завершена после окончания турнира. Какая красивая <a href='https://lichess.org/hlwuMuIF' target='_blank'>атакующая игра!</a><br><br><div id='board'></div>"
  },
  {
    id: "ZNI7qbN3",
    html: "<b>Margarita</b> Привет<br><b>DJ-Strelec</b> Привет<br><b>Mrazek</b> Здравствуй<br><b>VikJav</b> Привет<br><b>tomasklimecky</b> dobře margarita<br><b>mozkomor</b> Nezapočítalo mi to remízu s Jouzoleanem. Vznáším námitku.<br><b>Mrazek</b> bodovaná je jen první remíza v řadě, za další jsou nuly<br><b>Mrazek</b> asi aby se skupinka lidí na turnaji nedohodla na systému neztrácejme čas, dáme remízu a tím by získávali body proti ostatním rychle<br><b>mozkomor</b> To dává smysl. Ale do leaderboadu to hude půlbod, ne?\<br><b>bebul</b> ano, do leaderboardu samozřejmě půl bodu"
  },
  {
    id: "aHeatnDc", html: "<img src='img/pomlazka.jpg'>" +
      "<br><br><b>Bébul:</b> V leaderboardových tabulkách je nově sloupec s průměrným protihráčem," +
      "<img src='img/achievements/maraton.png' class='img100 right'> takže si můžeme porovnat, s jak těžkými soupeři kdo hrajeme. Na hlavní stránce jsou zobrazeny všechny odznáčky, ke kterým nově přibyl ševcovský mat s loupežníkem Rumcajsem." +
      "Ševcovské maty lze dohledat v search enginu pomocí klíčového slova scholar. V tooltipu hráče má symbol vysoké boty. Mat dámou nebo střelcem na poli f7/f2 musí padnout nejpozději v devátém tahu. Dále přibyl odznak pro vítězný maraton pro vítězství v aspoň 100 tahové partii a mat na poslední chvíli, pokud padl do deseti sekund před koncem turnaje. V detailu hráče je nově možno otevřít" +
      "<img src='img/achievements/castling-mate.png' class='img100 left'> jednotlivé hry kliknutím na výsledek v prostředním sloupci. A nahoře je počet odehraných her, abyste nemuseli pořád počítat, kolik těch her vlastně RychlyLenochod dneska stihl. Pod ligovou tabulkou je přidána gratulace hráči," +
      "<img src='img/achievements/lucky.png' class='img100 right'> který hrál nejvíc nad očekávání a je zmíněn hráč, který čelil nejtěžším soupeřům. Aby byl hráč uveden, musí ale odehrát alespoň 4 partie a pro gratulaci aspoň dvě vyhrát. Někdy má hráč, který všechny partie prohrál nepochopitelně nadupanou performance, takže to jsem musel nějak eliminovat." +
      "<img src='img/achievements/legal.png' class='img100 left'>K tomu se změnil formát tabulek se seznamem her, že datum odkazuje na tuto hlavní stránku k turnaji, kde se hra konala, výsledek 1-0 atd. odkazuje na hru na lichess a ve třetím sloupci jsou odznáčky, které si hráči vydobyli." +
      "Taky jsou udělovány odznáčky za Légalův mat, známý též jako Námořní kadet. Proto je použit Pepek Námořník. Vyhledávat lze pomocí klíčového slova legal." +
      "A stále se nikomu neporadařilo získat diamantový odznak za mat rošádou nebo mat braním mimochodem. Tak hurá do toho!"
  },
  {
    id: "vWA25bvU",
    html: "<b>RychlyLenochod</b> připravil v senzační partii jinak stoprocentnímu <b>Bukowskicovi</b> moc pěknou léčku, do které se náš šampión chytil! Gratulujeme!<br>" +
      "<br><b>Královský Gambit</b> se dnes hrál 9x, z čehož 6x triumfovali bílí. <b>Italská hra</b> se hrála 7x, přičemž 5x dominovali černí. Devět z deseti velmistrů doporučuje, aby i zbytek Monday Fighterů přešel na Královský gambit. 😀<br>" +
      "<br><b>Jouzolean:</b> \"Gratulace Bukowskimu k návratu na čelo a taky Mrázkovi, který se dostal na čelo posledních 10 turnajů. 🙂😎\""
  },
  {
    id: "k83QeG7o",
    html: "<b>Mrazek</b> byl dnes jediný z nás, komu se podařilo <b>bukowskice</b> porazit. K radosti <b>mozkomora</b> k tomu ale došlo až po limitu, takže bedna zůstala mozkomorovi. Bukowskic Mrázka trápil <a href='https://lichess.org/G3YNmKEP/black#199'>sto tahů</a>, aby vzdal jeden tah před matem.<br>" +
      "<br><b>Čtyři hráči</b> dnes vyhráli po osmnácti tazích, takže za nejrychlejší parti si odnesli bezvýznamný bodíček dzin69, bebul, mozkomor a jouzolean.<br>" +
      "<br>Vítáme <b>Margaritu</b> mezi prvními dvanácti, kteří se nakonec utkají v Play OFF.<br>" +
      "<br><h2>Magnus number</h2><a href='https://freopen.org/'><img src='img/magnusNumber.png'></a><br>" +
      "<b>Bebul:</b> Bukowskic má Magnus number #3. Porazil hráče, který porazil hráče, který porazil <a href='https://lichess.org/@/DrNykterstein'>Magnuse Carlsena</a>. Já porazil bukowskice, takže mám #4, stejně jako zbytek Monday Fight světa. Klikněte si na obrázek z prozkoumejte své skóre."
  },
  {
    id: "Uf128Gvy",
    html: "<b>Jouzolean:</b> 🙂 Skvěle jsi mi (Bébule) skočil do <a href='https://lichess.org/O79AvnKN#33'>milner barry</a> gambitu, já na to čekal asi půl roku. Pak jsem si klidně dovolil <a href='https://lichess.org/80jSe8Ca#9'>královský gambit</a> a dostal těžce na budku 😁<br>" +
      "<br><b>Bébul:</b> Královských gambitů se dnes hrálo devět, přičemž osmkrát se radovali bílí! A zadařilo se i v <a href='https://lichess.org/Y2EkADD9#9'>mozkomor vs bukowskic</a>."
  },
  {
    id: "ZDcYpWqR", html: "<img src='img/naplavka-pozvanka.jpg'>" +
      "<br><br><b>Bukowskic:</b> Zvu vás na Slavnost knih našeho nakladatelství na smíchovské náplavce. Tento pátek 3. června tam budu celý den, ukážu vám, jaké knížky vydáváme, popovídáme si, dáme si něco dobrého, zahrát si můžeme i venkovní šachy♟.   A výzva pro vás! Kdo mě v šachách porazí🏆nebo remizuje (což by v mé současné formě neměl být problém), " +
      "může si jako odměnu vybrat jakoukoliv knížku, která se mu bude líbit! Celý program a <a href='https://fb.me/e/3e1wWRiGt'>přesná adresa zde</a>."
  },
  {
    id: "13YkPIje", html: "<img src='img/naplavka-maurice.jpg'>" +
      "<br><br>Bukowskic měl na Náplavce připravenu celou škálu trofejí, z nichž ovšem žádnou nepustil. Nejprve si poradil s Maurice Dodo.<br><br>" +
      "<img src='img/naplavka-baron.jpg'><br><br>Šanci nedal ani Baronu Gorcovi,<br><br>" +
      "<img src='img/naplavka-jouzolean.jpg'><br><br>a knížku nevyhrál ani (pře)natěšený Jouzoleán, který první den nemohl zřejmě proto, aby celou noc trénoval, což se podepsalo na jeho výkonu.<br><br>"
  },
  {
    id: "kbGavs7v", html: "<img src='img/riegerovy-sady-jouzolean.jpg'>" +
      "<br><br><b>Jouzolean:</b>Hlásím, že dnešní turnaj v Riegerových sadech jsme s Tekelem ovládli. 😎👌😁 Zde <a href='http://chess-results.com/tnr646946.aspx?lan=5&art=1&flag=30'>výsledky.</a><br><br>" +
      "<a href='https://lichess.org/@/DJ-Strelec'><img src='img/buki-pesec-dobris.jpg'></a><br><br><b>Bukowskic:</b> Neuvěřitelný, koho potkáte na nedělní mši na prvním svatém přijímání dětí! Kdo myslíte, že to je? <i>(5.6.2022, Dobříš)</i><br><br>"
  },
  {
    id: "QyFvQ3NF", html: "<b>Jouzolean:</b> Hlásíme, že Jouzolean i Tekele dnešní turnaj strategicky vynechají<br>" +
      "<b>Bukowskic:</b> 🤩<br><br>" +
      "<img src='img/iron-maden.jpg'><br><b>Jouzolean:</b> Iron maiden<br><br>" +
      "<b>Bébul:</b> Jouzoleanovou absencí se stalo, že <b>bukowskic</b> znovu opanoval čelo tabulky a nedosti na tom, <b>RychlyLenochod</b> se vyhoupl v počtu 270 odehraných partií na čelo nejaktivnějšího hráče turnaje! Gratulujeme!<br><br>" +
      "<b>Bébul:</b> přečtěte si nové články v aktualitách. Například kliknutím na následující obrázek..." +
      "<a href='news2022.html#fairplay'><img src='img/havel-evangelista.jpg' style='margin-top:5px'></a>" +
      "<div align='center'><i>Bacha Vašku, máš napadenou dámu!</i></div>"
  },
  {
    id: "UdiV7hEG",
    html: "Gratulujeme <a href='https://lichess.org/@/Margarita_Vlasenko'>Margaritě</a> ke krásnému vítězství v Monday Fights turnaji!" +
      "<img src='img/bukowskic-nacelnik.jpg'><br>Propagace šachu na indiánském táboře. Náčelníkem sám veliký Bukowskic, šamanem Bébul, z dalších hráčů Snílek a Mráček."
  },
  {
    id: "ugVB04T5",
    html: "<b>Bébul:</b> Gratulujeme Mrázkovi k postupu na průběžné druhé místo v tabulce! Významně tomu pomohlo vítězství v poslední partii, kdy hrál Mrázek berserk a zmatoval soupeře tři vteřiny před koncem turnaje! To je jak sen!" +
      "<br><br><b>Bébul:</b> Nyní by se Tekele musel hned v úvodu PlayOFF probít přes DJ-Pesce a Jouzoleana. K takovému losu nezbývá než rovněž pogratulovat! 😀<br><br>" +
      "<img src='img/pavoukJouzoTekePesec.png'>" +
      "<br><br><b>Bébul:</b> mozkomor pěkně sehrál s bukowskicem tři královské gambity se skórem 1½-1½. Celkově se královským gambiterům vedlo dobře, skóre 5-2, přičemž průměrný rating černých byl 1806. Nechť řady královských gambiterů houstnou!" +
      "<br><br><b>Bébul:</b> zato Italské se dneska moc nedařilo... Anti-Fried Liver Defense, to zní hustokrutě! Měli bychom se to naučit všichni a tu Italskou už konečně, jednou provždy, z Monday Fights vymýtit." +
      "<br><br><b>Bébul:</b> dnes, po šesti týdnech, mat v centru! Spásný mat ve zcela prohrané pozici. 😀"
  },
  {
    id: "pcjmBbQU",
    html: "<b>Bébul:</b> Vítáme <a href='https://lichess.org/@/felcar'>felčara</a> na Monday Fight turnaji a gratulujeme k vítězství." +
      "<br><br><b>Bébul:</b> V rozpačitém vstupu, kdy to ve <b>felčarově</b> partii s <a href='https://lichess.org/@/Margarita_Vlasenko'>Margaritou</a> bylo jako na houpačce, nakonec padl na čas. <b>Margaritě</b> velká gratulace. Náš očekávaný stoprocentní debakl zažehnala hned v úvodu. 🙂" +
      "<br><br><b>Bébul:</b> Drahnou chvíli to vypadalo, že všem vypálí rybník maestro <a href='https://lichess.org/@/Tekele'>Tekele<a>! Gratulujeme k zaslouženému druhému místu!" +
      "<img src='img/mozk-last10.png'>" +
      "<br><br><b>Bébul:</b> Gratulujeme <b>mozkomorovi</b> k opanování tabulky za posledních deset turnajů!"
  },
  {
    id: "5prkKw5E",
    html: "<b>Mrázek:</b> My jsme jen chtěli mít nejrychlejší partii turnaje 🙂 To jsou ty odznáčky a plakety.... člověk se na to upne, sbírá to a pak pro to obětuje i <a href='https://lichess.org/BAoLvBM8'>partii</a>.<br><br>" +
      "<b>Bébul</b> se připravil na Jouzoleána a štěstí se usmálo na otrhánka. Nechť řady královských gambiterů houstnou :-)<iframe src=\"https://lichess.org/embed/WDePduKL#21?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>" +
      "<b>Jouzolean</b> se připravil na Felčara a pro samou radost, jak to všechno perfektně klaplo, si nechal dát v naprosto vyhrané pozici mat" +
      "<iframe src=\"https://lichess.org/embed/eqfvXnzx#38?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>"
  },
  {
    id: "ESqaQ7eH",
    html: "Dnešnímu turnaji předcházela značná nervozita, neb si všichni brousili zuby na setkání s Velmistrem, jak dokazuje následující konverzace: " +
      "<br><br><b>VikJav (nedělě 19:39):</b> Kluci dnes to nestíhám, ale pokud dnes nastoupí velký Robert, tak vám přeju všem hodně stesti :)) užijte si partie a dejte mu co proto." +
      "<br><br><b>Mrázek:</b> Máš ještě 24h čas 😉" +
      "<br><br><b>VikJav:</b> Jsem blazen! Super o nic neprijdu. Tak zítra ho rozdrtime společnými silami!" +
      "<br><br>A po oznámení, že dneska se Robert bohužel nemůže turnaje zúčastnit přišlo:" +
      "<br><br><b>Bukowskic:</b> Tak já se včera tak připravoval, ale to je jasný, lepší bude, když přijde Robert v plné formě!" +
      "<br><br><b>Jouzolean:</b> co sis připravoval? 😎🙂" +
      "<br><br><b>Bukowskic:</b> Nešel jsem na kolo a místo toho jsem se celý odpoledne rozehrával!" +
      "<br><br>... a jak vidno, příprava namísto velmistrovské hlavy pokosila nás ostatní. Gratulujeme!" +
      "<br><br><b>Bébul:</b> Už jste se podívali na nejrychlejší dnešní mat? To zas jednou Bébulkovi vyšla příprava! Nechť řady Královských Gambiterů houstnou!"
  },
  {
    id: "fXU6tfJM",
    config: {theme: "maple2", pieceStyle: "merida"},
    html: "<div align='center'><h3>Monday Fight</h3><h2>s GM Robertem Cvekem</h2></div>" +
      "Dnešek je pro Monday Fights svátek, neb nás poctil svou návštěvou Velmistr <a href='https://www.sachycvek.cz/'>Robert Cvek</a>. Byl to fofr. Nikdo z nás ho nenachytal na švestkách. Za návštěvu moc děkujeme a k vítězství gratulujeme." +
      "<img style='margin-top:5px' src='img/cvek-nss.jpg'><div style='text-align: center; margin-bottom:5px'><i>Robert Cvek jako vítěz turnaje ke 100 let Salo Flohra. I přes účast Davida Navary turnaj zcela ovládli velmistři Novoborského ŠK, zleva Viktor Láznička, Robert Cvek a Zbyněk Hráček<br> Zřejmě dobrý oddíl.</i></div>" +
      "K dnešním partiím Jouzoleanovi napsal, že to byly dobré partie a ze si konečně po dlouhé době s klidnou hlavou zahrál." +
      "<p>Po turnaji Robert Cvek řekl: \"Vyhrát takový turnaj je pro mě obrovský úspěch, jednoznačně největší co se týče ...\", tedy řekl to po tom turnaji ke 100 let Salo Flohra a ne zrovna po dnešním turnaji 🙂, ale hrál dnes s námi Monday Fight a odehrál 14 partií, takže radost máme převelikou!</p>" +
      "<img style='margin-top:5px' src='img/cvek-owen.png'><div style='text-align: center; margin-bottom:5px'><i>Tuto strukturu vypadající jako koruna vybudoval Robert Cvek hned v několika partiích. Jedná se o Owen defense, která se předtím hrála na <a href='search.html?q=%22owen%20defense%22'>Monday Fights 13x</a> a pokaždé zvítězili bílí. Robert Cvek tedy tomuto zahájení poněkud zvedl reputaci.</i></div>" +
      "<p>Když na sobě zapracujeme, jistě se k nám velmistři jen pohrnou a trofej z Monday Fight bude zdobit nejeden velmistrovský stůl." +
      "<tooltip json='{\"id\":\"sachycvek\", \"size\":1.0}' align='center' style='margin:42px 0 5px 0'/> " +
      "<board json='{\"id\":\"oQFSXWiv\", \"startPlay\":47, \"orientation\":\"black\"}'/>" +
      "<div>&nbsp;</div>" + // need to scroll after to make the following margin-top work
      "<div align='center' style='margin-top: -5px;'><i>Podle enginu stojí prý Jouzolean na výhru</i></div>",
    hallOfFame: [100, `<section class="user-top">
      <h2 class="text" data-icon="&#xe021;">
        <a href="https://www.sachycvek.cz/">GM Robert Cvek</a>
      </h2>
      <div style="margin:5px">
        <p> Dnešek, <a href="index.html?mf=fXU6tfJM">15.srpen 2022</a> byl pro Monday Fights svátek, neb nás poctil
          <img src='img/players/sachycvek.png' style='margin:5px;width:33%;float:left'>
            svou návštěvou Velmistr <a href='https://www.sachycvek.cz/'>Robert Cvek</a>.
            Byl to fofr. Nikdo z nás ho nenachytal na švestkách. Za návštěvu moc děkujeme a k vítězství gratulujeme.
            <p> K dnešním partiím Jouzoleanovi napsal, že to byly dobré partie a ze si konečně po dlouhé době s klidnou hlavou zahrál.
              <p> Po turnaji Robert Cvek řekl: <i>"Vyhrát takový turnaj je pro mě obrovský úspěch, jednoznačně největší co se týče ..."</i>
                <br>
                  Tedy, řekl to po turnaji ke 100 let Salo Flohra a ne zrovna po Monday Fights, ale hrál dnes s námi a odehrál 14 partií, takže radost máme převelikou!
      </div>
    </section>
    `]
  },
  {
    id: "fgEf7SDZ", html: "<img src='img/trenink-tekele.jpg'>" +
      "<br><br><b>Jouzolean:</b>Zase trénink. Po noční 😎😁. Tento týden už třetí. A to je teprve úterý.<br><br>" +
      "<b>Bébul:</b> No jó, chlapcí potrénovali a sebrali si první dvě místa v turnaji. Že jim není haňba! 😁<br><br>" +
      "<b>Bébul:</b> K úspěšnému tréninku gratulujeme!<br><br>"
  },
  {
    id: "PbjeR9c2",
    html: "<b>Bébul:</b> Bukowskic dneska v prvních pěti hrách čtyřikrát prohrál. Přesto však dokázal vybojovat zlato! Nezdolný šampión! Pomohla tomu hromada berserků a hlavně Tekele, který zastavil Jouzoleana vzlínajícího do nebes. Navíc se jednalo o nejrychlejší mat turnaje. Krásný útok! Tekelovi i Bukowskicovi gratulujeme!<br><br>" +
      "<b>Bébul:</b> V tabulce došlo po delší době k výrazné změně, když Jouzolean vystřídal Mrázka na druhé pozici. Souboj mezi Mrázkem a Jouzoleanem je lítý a nám ostatním je jen líto, že se k nim nějak nepřibližujeme. Držíme palce v dalším boji!<br><br>" +
      "<b>Bébul:</b> Bílí v královském gambitu dnes stoprocentní! Nechť řady královských gambiterů houstnou!<br><br>" +
      "<a href='search.html?q=kingkong'><img src='img/achievements/kingkong.png' class='img100 left'></a> Mezi plaketky přibyl King Kong, kterého dostane ten hráč, který zmatuje protivníka, aniž by ztratil jakýkoli materiál a přitom ještě postaví dámu. Prvním King Kongem vůbec byl <a href='https://lichess.org/@/dzin69'>Dzin69</a>, druhým a současně prvním letošním je <a href='https://lichess.org/@/RychlyLenochod'>RychlyLenochod</a>. Partie lze vyhledat, klikněte na obrázek. Gratulujeme!"
  },
  {
    id: "3WyIj25r",
    achievements: [{achievement: "reporter", player: "tekele", id: "jiIALs4e"}],
    html: "<img src='img/mf-og-x.jpg'><b>Bébul:</b> Jouzolean se téměř dotáhl na pauzírujícího Bukowskice. Škoda, že šampión nehrál, s <b>Neznámou-00</b> tradičně prohrává, to už je taková naše milá tradice. Tak příště!<br><br>" +
      "<a href='news2022.html#zlataPraha'><img src='img/zlataPraha5.jpg'></a><br><b>Bébul:</b> Přečtěte si tekeleho reportáž z turnaje Zlatá Praha v rapid šachu.<br><br>"
  },
  {
    id: "r18jTyCu",
    init: function () {
      let config = {
        pgn: "[Event \"Monday Fight Arena\"]\n" +
          "[Site \"https://lichess.org/JcoGVI1B\"]\n" +
          "[Date \"2022.09.12\"]\n" +
          "[White \"Margarita_Vlasenko\"]\n" +
          "[Black \"felcar\"]\n" +
          "[Result \"0-1\"]\n" +
          "\n" +
          "1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nc3 e6 5. a3 a6 6. h3 c5 7. Nf3 Nc6 8. Be3 Nge7 9. dxc5 Bg6 10. Qd2 Nf5 11. O-O-O Be7 12. Bg5 O-O 13. Bxe7 Qxe7 14. g4 Nh4 15. Nxh4 Qxh4 16. Qe3 Rfd8 17. Qf4 Qe7 18. Ne2 Qxc5 19. Nc3 b5 20. Rd2 b4 21. Ne2 bxa3 22. bxa3 Qxa3+ 23. Kd1 Rab8 24. Rd3 Rb1+ 25. Nc1 Nb4 26. Rxa3 Bxc2+ 27. Kd2 Rb2 28. Kc3 Rb1 29. Ra2 Rc8+ 30. Kd2 Nxa2 31. Nxa2 Rb2 32. Nc3 Be4+ 33. Kc1 Rc2+ 34. Kd1 R8xc3 35. h4 Bxh1 36. Be2 Rc1+ 37. Qxc1 Rxc1+ 38. Kxc1 Kf8 39. Kb2 a5 40. Ka3 Ke7 41. Ka4 Kd7 42. Kxa5 Kc6 43. Kb4 f6 44. f4 Kb6 45. Bb5 Bf3 46. g5 fxg5 47. hxg5 h5 48. Bf1 h4 49. Kc3 Kc5 50. Kd3 Bg4 51. Bg2 h3 52. Bh1 Bf5+ 53. Ke3 Be4 54. Bxe4 dxe4 55. Kf2 Kd4 56. Kg3 Kd3 57. f5 exf5 58. e6 e3 59. e7 h2 60. Kxh2 f4 61. e8=Q e2 62. Qd7+ Ke3 63. Qe6+ Kf2 64. Qb6+ Kf1 65. Qb5 f3 66. Kg3 f2 67. Qd3 Kg1 68. Qxe2 f1=Q 69. Qxf1+ Kxf1 70. Kf4 Kg2 71. Kf5 Kg3 72. g6 Kh4 73. Ke6 Kg5 74. Kf7 Kh6 75. Kg8 Kxg6 76. Kh8 Kf6 77. Kh7 g5 78. Kh6 g4 79. Kh5 g3 80. Kh6 g2 81. Kh5 g1=Q 82. Kh4 Kf5 83. Kh3 Kf4 84. Kh4 Qg4# 0-1",
        showCoords: false, coordsInner: false, headers: true,
        theme: 'brown',
        boardSize: 290,
        movesHeight: 60,
        startPlay: '0'
      }
      PGNV.pgnView("board", config)
    },
    html: "<b>Felcar:</b> Já ale dneska několikrát přežil svou smrt 😁😁 Moje partie s Margaritou,  to bylo něco! Moc nechybělo,  vyhrával jsem s ní s dámou míň, kterou jsem nechal jednotahově viset... <br><br>" +
      "<a href='https://lichess.org/JcoGVI1B#121'><img src='img/felcar-margarita.png' style='max-width:216px'></a><br><div id='board'></div><br><br>" +
      "<b>Bébul:</b> Královský gambit dnes 5x stoprocentní! Že jen 4x? Jenže Janischův gambit proti Bukowskicově Španělské je vlastně takový Královský gambit za černého s tempem na míň! :-) Nechť řady královských gambiterů houstnou!<br><br>" +
      "<b>Jouzolean:</b> Určitě bych povznésl tvůj slovutný úspěch... To byla jízda teda... Úplně jinej bebul.. \"takovej mozkomorovej\" 😁ještě ze jsem s tebou nehrál!<br><br>" +
      "<b>Bébul:</b> Tabulka se otřásla v základech. Margarita přeskočila Lenochoda a Jouzoleán s Mrázkem se přehoupli přes našeho Šampióna, který narazil na toho úplně jiného Bébula, jak pravil Jouzoleán. 😁 A Džin69 se dotáhl na VikJava a, to už je skoro jisté, brzy se vmísí mezi dvanáct apoštolů, co si to na konci roku rozdaj v Play OFF. <br><br>"
  },
  {
    id: "sU060isO",
    html: "<img src='img/mf-og-x.jpg'><br><br><b>Bebul:</b> Bukowskic se znovu dotáhnul na čelo tabulky. Se stejným skóre je první, protože má lepší performance. Kdyby měli hoši i stejnou performance, tak to by se asi museli poprat. Bukowskicovo ELO v ringu je asi 3300 a pokud je nám známo, Jouzolean 1800?😁 <br><br>" +
      "<b>Bébul:</b> Margarita krásně přehrála bukowskice, který si dneska rozhodně 100% úspěšnost nezasloužil. Autor těchto řádků s ním měl tak krásně rozehranou partii, že už vyvaloval oslavné sudy, ale proti bukowskicovi, jak známo, je to zakletý 😁 <br><br>"
  },
  {
    id: "ogn3HeW1",
    html: "<b>Bebul:</b> V dramatickém závěru bojoval bukowskic o zlato proti mozkomorovi, ale náporu bílých figur na královském křídle podlehl. Mozkomor se ale dlouho na turnajovém trůnu neohřál. Do konce turnaje zbývala zhruba minuta, během které se přes Piráta vyhoupla na čelo Margarita a získala zaslouženě zlato! Gratulujeme!<br><br>" +
      "<img src='img/sherlock.jpg'><br><br>" +
      "<b>Bebul:</b> Bukowskic na WhatsApp uvedl výše uvedenou detektivní zápletku s tím, že kdo ji první vyluští, vyslouží si od něj berserk. A tento jediný berserk dneska možná stál bukowskice zlato! 😀 To jsou ty zásady!"
  },
  {
    id: "TNZCc8DD",
    init: function () {
      let config = {
        pgn: "[Event \"Monday fight Arena\"]\n" +
          "[Site \"https://lichess.org/6EPMyxSN\"]\n" +
          "[Date \"2022.10.24\"]\n" +
          "[White \"bukowskic\"]\n" +
          "[Black \"Mrazek\"]\n" +
          "[Result \"1-0\"]\n" +
          "\n" +
          "1. e4 b6 { B00 Owen Defense } 2. Be2 Bb7 3. Bf3 Nf6 4. e5 Nd5 5. c4 { Black resigns. } 1-0",
        showCoords: false, coordsInner: false, headers: true,
        theme: 'brown',
        boardSize: 290,
        movesHeight: 60,
        startPlay: '7'
      }
      PGNV.pgnView("board", config)
    },
    html: "<img src='img/mf-og-x.jpg'>" +
      "<br><br><b>Bébul:</b> Maurice Dodo zřejmě opisoval od Mrázka a vystřihnul dneska úplně stejný čtyřtahový ševcovský mat jako minule on. Možná, že Rychlý Lenochod, znalec a milovník ševcovských matů, prostě na ševce nedá dopustit i kdyby měl padnout! Bébul se taky pokusil dát ševce, ale Neznámá-00 se nenechala nachytat, že si pak Bébulek tuze vyčítal, že s tou dámou šel tam honem, málem splakal nad talonem!<br><br>" +
      "<b>Bébul:</b> Bukowskic dneska překvapil Mrázka brilantním majstrštykem, když zahrál na jeho Owen defense podivné dva tahy bělopolným střelcem, aby si počkal na přirozený vývinový tah jezdcem Nf6??, který zde ovšem okamžitě prohrává partii. Škoda, že jsme takhle nikdo nepotrestali Roberta Cveka, který na nás Owena zkoušel.<br><br>" +
      "<div id='board'></div>"
  },
  {
    id: "omFEO2Vz",
    html: "<img src='img/mf-og-x.jpg'><b>Bébul:</b> Gratulujeme Neznámé-00 ke dvěma pěkným výhrám!" +
      "<br><br><b>Bébul:</b> V dnešním turnaji se Bébulovi po dlouhém čekání podařilo vymodlit pozice, o kterých se dočetl ve vynikající knize <b><i>Miniaturní šachové partie</i></b> od Ladislava Alstera. Zde k nahlédnutí Bébulův omalovaný výtisk." +
      "<img src='img/alster-drakula.jpg'> ...ani řada partií sehraných mezi Tekelem a Jouzoleánem na toto téma, problém nevyjasnila. " +
      "Alster o Vídeňské hře píše, že je to takové mírumilovné a nepříliš ctižádostivé zahájení. Pohled na názvy variant tomu ale jaksi protiřečí: Frankenstein-Drakula a nebo Monster declined. Dnes se tato <a href='https://lichess.org/iYpJn8pM#20'>monstrpozice</a> hrála na Monday Fights poprvé." +
      "<br><br>" +
      "<b>Bébul:</b> Varianta, kterou rádi hrají Jouzolean a Mrázek, má šílený název: <b>Útok smažených jater</b>. " +
      "No a právěže, kdo se nechce nechat usmažit, zkusí Traxlerův protiútok." +
      "<img src='img/alster-traxler.jpg'>" +
      "Jouzoleán platí za nejlepšího znalce italské hry a odvozených zahájení. Náš Bébulek proti němu zvolil Traxlerovu variantu, což se rovnalo výzvě k souboji v teoretických znalostech. <i>(Ladislav Alster o J.Estrinovi, nejspíš <b>J.</b> jako Jouzoleán!)</i>" +
      "Partie by udělala panu Traxlerovi radost, ale jistě ne tak velikou, jako Bébulovi, neboť nikomu jinému se letos ještě nepodařilo dát Jouzoleánovi <a href='https://lichess.org/N12QWVRE#20'>mat desátým tahem</a>. No... a v poslední partii se Bébulek trefil Traxlerem do Mrázka a to Vám byl výprask, <a href='https://lichess.org/JuvXrd12CgRj'>auvajs!</a>"
  },
  {
    id: "o1wwUBUk",
    html: "<img src='img/mf-og-x.jpg'>" +
      "<br><br><b>Bébul:</b> Z dnešního turnaje si všichni odnesli aspoň bod! Neznámé-00 se podařil dát parádní Anastazia mat Baronu Gorcovi a LastScout porazil Hrobotrona sice na čas v berserku, ale ve vyhrané pozici. Oběma gratulujeme!" +
      "<br><br><b>Bébul:</b> BaronGorc se po porážce od Neznámé <img src='img/players/janshorny.gif' class='img100 right'> oklepal a odnesl si tři báječně tučné body, rovněž veliká gratulace!" +
      "<br><br><b>Bébul:</b> Margarita dlouho vedla a chybělo jen málo a v turnaji <img src='img/players/jouzolean.gif' class='img100 left'> zvítězila. Nakonec se však radoval halloweenský kašpárek! Grats! " +
      "Jouzolean se tak po dvou kolech, kdy se s Mrázkem mačkali <img src='img/players/mrazek.gif' class='img100 right'> na turnajové druhé příčce od halloweenské kostřičky lehce odrazil a směje se z druhého místa. Asi nechce hrát v osmifinále s Margaritou, což chápeme. To by se bál každej! Těšíme se na další boj! <img src='img/players/margarita_vlasenko.gif' class='img100 left'>" +
      "<br><br><b>Bébul:</b> A Jouzolean sehrál s Rychlým Lenochodem 130 tahovou vítěznou bitvu, což <img src='img/players/rychlylenochod.gif' class='img100 right'> je druhá nejdelší hra historie Monday Fight, pričemž nejdelší vítězná." +
      "<br><br><b>Bébul:</b> A že náš Bébulek dal Blackburnovskej mat, kterej už úplně zapomněl, že existuje, toho jste si určitě všichni všimli. Zatím jen Mozkomorovi a nyní Bébulkovi se to v historii Monday Fights podařilo. No, tak si třeba záviďte, nooóóóó <img src='img/players/bebul.gif' class='img100'> <img src='img/players/mozkomor.gif' class='img100'> " +
      "<br><br><b>Bébul:</b> A už jste se podívali, jaké halloweenské avatary má Arytmik, Travinho, Mrázek a Robert Cvek?"
  },
  {id: "T5fN7RNz", html: "<img src='img/mf-og-grats.jpg'>"},
  {
    id: "euUYBnmh", html: '<b>Bébul:</b>"Napsat báseň o Monday Fight, třebas by si všímala jen jediného hráče, ' +
      "třeba by si všímala jen nejnepatrnějšího člověka, " +
      "by znamenalo sloučit všechny hrdinské zpěvy v jedinou epopej, " +
      "svrchovanou a konečnou. Monday Fight je chaos přeludů, choutek " +
      "a pokušení, je to tavící pec snů, brloh myšlenek, za něž se stydíme; " +
      "je to zmatená směsice klamných závěrů, je to bitevní pole vášní. " +
      "Pronikněte v pondělních hodinách zsinalou tváří člověka, který přemítá, " +
      "podívejte se za ni, pohleďte do té duše, podívejte se do té " +
      "temnoty. Pod zevním klidem jsou bitvy obrů jako u DJ-Pěšce, jsou " +
      "tam shluky draků a hyder a mračna přeludů jako u Bukowskice, jsou " +
      "tam vizionářské přízraky jako u Jouzoleána. Jak strašlivé je nekonečno, " +
      "které člověk nosí v sobě a podle něhož zoufale měří vůli svého " +
      'mozku a skutky svého života!" <i><b>Viktor Hugo: Bídníci</b>, kapitola Svědomí</i>'
  },
  {
    id: "6xgyatei",
    html: "<img src='img/mf-og-margarita.jpg'>" +
      "<br><br><b>Bébul:</b> Margarita dneska sice nejprve podlehla Jouzoleánovi, ale pak mu to hezky vrátila a nakonec získala kov nejcennější! Veliká gratulace!" +
      "<br><br><b>Jouzolean:</b> Jenomže teď ale vede jouzolean - a je to jeho jediná šance jak poprvé a naposledy vyhrát sezónu MF. <img src='img/players/jouzolean.png' class='img100 right'> Udělá vše pro to aby vyhrál 😁 " +
      "<br><br><b>Jouzolean:</b> Bukowskic ještě jednou nepřijde a je ve vážných problémech! 😁 Tento rok je to hodně dramatické! Šance má i Mrazek!" +
      "<br><br><b>Bébul:</b> V tabulce dochází k vachrlatým posunům. Posun Jouzoleána na první místo místo Bukowskice také znamená, <img src='img/players/bukowskic.png' class='img100 left'> že se Bukowskic ocitá ve stejné osmifinálové skupině pro PlayOFF jako DJ-Strelec. Ten však může snadno párkrát na Monday Fight přijít a podle potřeby se posunout před PIRAT77 a zajistit si tak pozici ze druhé strany vyřazovacího pavouka, takže by se s Bukowskicem mohl případně potkat až ve finále!" +
      "<br><br><b>Bébul:</b> Vítáme nového hráče <a href='https://lichess.org/@/HonzaHonzaHonza'>HonzaHonzaHonza</a>. Jeho vstup do Monday Fights arény byl správně nervózní a po šňůře šesti proher to už vypadalo, že ho maminka doma nepochválí.  <img src='img/players/honzahonzahonza.png' class='img100 right'> Dokázal se však oklepat jak málokdo a přinést domů pár skalpů. Našeho Jouzoleána by taková pohroma stála minimálně display mobilu." +
      "<br><br><b>Lichess:</b> API encountered an error: <a href='https://github.com/lichess-org/lila/issues/11971#event-7931043421'>Cannot download tournaments</a>. It takes about 10 days to find a temporary workaround." +
      "<img src='img/api-error.jpg'>"
  },
  {
    id: "playOFF2020",
    playOFF: "<img src='img/turnajPavouk.jpg' style='width:100%;margin-top: 5px'>",
    achievements: [{achievement: "reporter", player: "DJ-Strelec", id: ""}],
    html: "<h1>PlayOFF 2020</h1>" +
      "<b>Bebul:</b> Turnaj začal epickou bitvou mezi RychlyLenochod a Travinho, který skončil až bulletovým rozstřelem, když o celkovém vítězi rozhodl kavalírský PAT dvou dam ve druhém tie-breaku." +
      "<iframe src=\"https://lichess.org/embed/sYE9rYFE#123?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>" +
      "<br><br><b>DJ-Strelec:</b> že uhraju jen půl bodu, to jsem teda nečekal. <img src='img/players/bukowskic.png' class='img100 right'>" +
      "<br><br><b>Bebul:</b> Velká gratulace Bukowskicovi, že se nezalekl vysokého nasazení svých soupeřů a zlehka se přes ně přenesl. V osmifinále dovolil soupeři bod, v semifinále půl bodu a ve finále už ani ň."
  },
  {
    id: "playOFF2021",
    playOFF: "<img src='img/turnajPavouk2021.jpg' style='width:100%;margin-top: 5px'>",
    achievements: [{achievement: "reporter", player: "DJ-Strelec", id: ""}],
    html: "<h1>PlayOFF 2021</h1>" +
      "<b>Jouzolean:</b> Tak a je dobojováno! <a href='archiv2021.html'>Sezóna 2021</a> je s dnešním turnajem definitivně odpískána. Tato již legendární skupina hráčů se dokázala scházet v menším či větším počtu celý rok a ani jednou se nestalo, že by se nehrálo - a to ani tehdy, když jednou selhal lichess. To máme 52 kvalitních turnájů v roce. Náš seznam hráčů již čítá 26 jmen včetně jedné holky a všichni se známe." +
      "<br><br><b>DJ-Strelec:</b> A do tohoto vyžazovacího PlayOFF turnaje Vám představujeme epesní vyzyvatelské kartičky! <img src='img/epesni-karticka4.jpg' style='margin-top:5px'>" +
      "<br><br><img src='img/players/bukowskic.png' class='img100 right'><b>Bebul:</b> Velká gratulace Bukowskicovi, že přes počáteční dvojnásobný výprask od Rychlého Lenochoda dokázal kromě celkového turnaje ovládnout i závěrečné PlayOFF!"
  },
  {
    id: "playOFF2022",
    playOFF: "<img src='img/turnajPavouk2022.jpg' style='width:100%;margin-top: 5px'>",
    achievements: [{achievement: "reporter", player: "DJ-Strelec", id: ""}],
    html: "<h1>PlayOFF 2022</h1>" +
      "<b>Jouzolean:</b> Nastoupili už známí borci z let minulých, pro 5 hráčů to bylo jejich poprvé - Pirat77, Margarita Vlasenko, <img src='img/players/margarita_vlasenko.png' class='img100 right'> Tomáš Klimecký, Dzin69 a Maurice Dodo. Všichni bojovali houževnatě a statečně, do dalších kol však postoupila pouze 12-letá Margarita, která došla až do semifinále, což je největší překvapení turnaje a Dzin69, který si poradil s <a href='index.html?mf=playOFF2021'>loňským</a> \"málem přemožitelem Bukowskice\" - Rychlým Lenochodem 4:0. Zkušení matadoři jinak nedávali nováčkům šanci, přesně podle statistik. " +
      "Opět jsme měli možnost nahlížet na duelové kartičky z grafické dílny Dj-Pěšce, které poté Bebul umístil na náš web, aby si tak každý mohl <a href='cards.html'>vygenerovat tu svou</a>." +
      "<img src='img/cardFinale2022.jpg' style='margin-top:5px'>" +
      "<br><br><img src='img/players/dj-strelec.png' class='img100 right'><b>Jouzolean:</b> Grandfinále bylo velkou odvetou let minulých. Dvakrát se spolu bili, pokaždé trůn uhájil Bukowskic, až letos to Dj-Pěšec zlomil a stal se vítězem při výsledku 3½-2½. Bukowskic tak poprvé v kariéře nezískal ani jeden pohár vítěze a bude se tak muset soustředit na další rok, kde bude ovšem hodně hladový!" +
      "<br><b>Gratulace vítězům a čest poraženým.</b>"
  },
  {
    id: "EvpGRc5W",
    html: "<h2>Blíží se PlayOFF 2022</h2>" +
      "Úderem 26.prosince se završí sezóna letošního Monday Fights. Prvních dvanáct borců pak zveme na vyřazovací turnaj PlayOFF. " +
      "Hry z loňského PlayOFF turnaje byly převedeny na tento web a lze je vidět po kliknutí na obrázek <a href='index.html?mf=playOFF2021'><img src='img/epesni-karticka.jpg' style='margin:5px 0'></a>" +
      "Ovšem první PlayOFF se hrál v roce 2020. Po odehraných partiích je poptávka. Bylo by pěkné, kdyby tyto partie byly na tomto webu k dohledání. Posílejte."
  },
  {
    id: "hF7XxPIB",
    html: "<img src='img/blitz-open-mf-4x.jpg'>" +
      "<br><b>Jouzolean:</b> 4 členové MF se letos účastní MČR v bleskovém šachu. Zleva: Tekele, Vikjav, Jouzolean, Mrazek. Držte palce! 😎😁🙂" +
      "<img src='img/jouzolean-laznicka.jpg'>" +
      "<br><b>Jouzolean:</b> A zde bonus. Jouzolean s V. Lázničkou. 😎" +
      "<img src='img/jouzolean-plat.jpg'>" +
      "<br><b>Bébul:</b> A tady nám Jouzolean dělá ostudu s vítězem turnaje V. Plátem. <b>Kouření způsobuje rakovinu a snižuje ELO.</b>"
  },
  {
    id: "HoxwHJsB",
    playOFF: "<img src='img/znamosti2022.jpg' style='width:100%;margin-top: 5px'><div align='center' style='margin-bottom:10px'><i>A toto jsou borkyně a borci, kteří se o titul Šampióna Monday Fights 2022 letos utkali</i></div>",
    html: "<img src='img/mf-og-jouzolean.jpg'>" +
      "<br><b>Bebul:</b> Veliká gratulace novému šampiónovi Jouzoleanovi ke konečnému vítězství v turnaji. Druhý Mrázek si rovněž zaslouží potřást pravicí. Zato favorit bukowskic nám přikreslil vrásku na čelo 😭!" +
      "<br><br><a href='cards.html'><img src='img/epescard.png'></a>" +
      "<br><b>Bebul:</b> Začíná PlayOFF 2023. Pohrajte si si s různými kombinacemi <a href='cards.html'>vyzyvatelských kartiček</a>. Kromě známých dat též vzpomínka na to, kolikátým tahem kdo koho ve zvoleném období zmatil. A ano, naše drahá Neznámá opravdu srazila Bukowskice na kolena a tam byl matem políben!" +
      "<br><br><b>Bebul:</b> Na zobrazené kartičce má Bukowskic nasazení 1, protože je zvoleno období za celou dobu existence Monday Fights. Letos, samozřejmě, je <b>s velkou slávou jako první nasazen slovutný Jouzolean!</b> Gratulujeme!" +
      "<br><br><b>Bebul:</b> Typické zahájení se snažím volit takové, které spolu ti dva ve zvoleném období hráli. Takže třeba Bebul vs. Tekele není Královský gambit, ale to trapné zahájení. 😀 " +
      "<br><br><b>Bebul:</b> Přehled her minulých PlayOFF turnajů je zde: <a href='index.html?mf=playOFF2020'>2020</a> a <a href='index.html?mf=playOFF2021'>2021</a>." +
      "<br><br><b>Bebul:</b> Turnajový web Monday Fights se již 2x aktualizoval roboticky. Snažím se, abych do něj musel zasahovat co nejméně, protože se turnaje dlouhodobě nebudu moci účastnit."
  },
  {
    id: "FEpWbsrM",
    achievements: [{achievement: "reporter", player: "bebul", id: "N12QWVRE"}],
    html: "<img src='img/mf-og-x.jpg'><b>Mrázek:</b> Já bych spešl chtěl pogratulovat LastScoutovi, který si mě neskutečně povodil a vyškolil mě jak malýho caparta a kdyby LS nepřehlédnul věž, tak by mě buď zmatil a nebo bych spadnul na čas... dneska to byl můj nejstresovější protivník. Budu se muset přidat do klubu těch, co se na MF připravují 😀" +
      "<br><br><b>Bébul:</b> Jouzolean chtěl Bébulka chytit do pasti končící dušeným matem. Našeho Bébulka!<img src='img/achievements/smothered.png' class='img100 right'> " +
      "Ale to se nešmí, takhle zkoušet, když tam má Bébulek <a href='https://lichess.org/fiuvtdBX#26'>toho koně</a>, sice asi omylem, ale má, svého bílého jezdce, jezdce statečnýho. Je to kabrňák!" +
      "<br><br><b>Jouzolean:</b> Touha po plaketce byla silnější" +
      "<br><br><b>Bebul:</b> Klikněte si na obrázek televizní reportáže a prohlédněte si sabotážní reportážCNN Prima News o Monday Fights. 😀<a href='news2023.html'><img src='img/cnn-prima-news.jpg'></a>"
  },
  {
    id: "xoUVJkiS",
    achievements: [{achievement: "black", player: "bukowskic", id: "PA6aqELD"}],
    init: function () {
      let config = {
        pgn: "[Site \"https://lichess.org/PA6aqELD\"]\n" +
          "[Date \"2023.01.23\"]\n" +
          "[White \"Jouzolean\"]\n" +
          "[Black \"bukowskic\"]\n" +
          "[Result \"1-0\"]\n" +
          "[Opening \"Philidor Defense\"]\n" +
          "\n" +
          "1. e4 e5 2. Nf3 d6 3. Bc4 { C41 Philidor Defense } h6 4. d4 exd4 5. O-O c5 6. c3 dxc3 7. Bxf7+ Kxf7 8. Ne5+ Ke6 9. Qd5+ { Black resigns. } 1-0"
        ,
        showCoords: false, coordsInner: false, headers: true,
        theme: 'brown',
        boardSize: 290,
        movesHeight: 60,
        startPlay: '13'
      }
      PGNV.pgnView("board", config)
      let config2 = {
        pgn: "[Site \"https://lichess.org/0vv6RtIv\"]\n" +
          "[Date \"2023.01.23\"]\n" +
          "[White \"Jouzolean\"]\n" +
          "[Black \"bukowskic\"]\n" +
          "[Result \"1-0\"]\n" +
          "[Opening \"Philidor Defense\"]\n" +
          "\n" +
          "1. e4 e5 2. Nf3 d6 3. Bc4 { C41 Philidor Defense } h6 4. d4 exd4 5. O-O Nf6 6. e5 dxe5 7. Nxe5 Be6 8. Bxe6 fxe6 9. Qd3 Ke7 10. Ng6+ Ke8 11. Nxh8 Qe7 { Black resigns. } 1-0"
        ,
        showCoords: false, coordsInner: false, headers: true,
        theme: 'brown',
        boardSize: 290,
        movesHeight: 60,
        startPlay: '13'
      }
      PGNV.pgnView("board2", config2)
    },
    html: "<br><img src='img/players/jouzolean.png' class='img100 right'><b>Bébul:</b> Jouzoleanovi se dneska podařilo chytit loňského šampiona hned 2x v rychlých miniaturách a došel si nakonec k vítězství v turnaji. Gratulujeme!" +
      "<div id='board'></div>" +
      "<br><b>Bébul:</b> V Miniaturních šachových partiích Ladislava Alstera se v Phillidorově obraně tah 3.Sc4 vůbec nevyskytuje. Škoda, Jouzoleanovy partie by se mezi těmi miniaturami vyjímaly jako perly. 💎💎<br><br>" +
      "<div id='board2'></div>" +
      "<br><br><b>Bébul:</b> Udělený černý puntík ⚫ je pouze legrace na které byla testována možnost přidávat achievementy ručně, což je potřeba pro plaketky reportérů MF. Bukowskic má ale plaketek málo, tak mu ji nechám. ❤️ Tak mu to, prosím Vás, nezáviďte!<br><br>"
  },
  {
    id: "502tbfef",
    html: "<img src='img/mf-og-margarita.jpg'><br><br><b>Bébul:</b> Margarita si po dlouhé době mohla zahrát na skutečné šachovnici, když navštívila Bukowskicův šachový kroužek tady na Dobříši. Držme jí palce, aby mohla na kroužek chodit pravidelně, zdá se, že jí to pěkně nakoplo formu. Veliká gratulace!" +
      "<br><br><img src='img/trnka-bukowskic.jpg'>" +
      "<br><br><b>Bukowskic:</b> Gratuluju Margaritě. A kdyby to někoho zajímalo, tak Margarita dnes vyhrála dva turnaje! Ten první byl školní, kde přehrála 14 borců!" +
      "<br><br><img src='img/turnaj-trnka.jpg'>" +
      "<br><br><img src='img/players/michaelchmiel.png' class='img100 right'><b>Bebul:</b> Na turnaji hrály děti ze tří dobříšských kroužků. Ten třetí, v knihovně, vede Michael Chmiel, kterého tímto vítám na našem Monday Fights! Uhrát hned napoprvé bednu je troufalost a doufáme, že se to nebude opakovat! 😀" +
      "<br><br><img src='img/achievements/smothered.png' class='img100 right'><b>Bebul:</b> Dneska Bébul prohrál tři hry, ve kterých soupeře nejprve grandiózně přehrál, ale pak to zvrtal. S RychlymLenochodem si dokonce nechal dát dušený mat! Gratuluju, dušeňák je vždycky posvícení." +
      "<br><br><b>Bebul:</b> Na dnešním turnaji skončily hned tři partie <b>patem</b>. Kdo má silné nervy, může se poučit z mozkomorovy <a href='https://lichess.org/HfybymQ0'>partie</a>, ve které se rčení \"naděje umírá poslední\" realizovalo mírou skutečně vrchovatou."
  },
  {
    id: "jFVI6PBS",
    init: function () {
      let config = {
        pgn: "[Site \"https://lichess.org/PA6aqELD\"]\n" +
          "[Date \"2023.02.06\"]\n" +
          "[White \"Jouzolean\"]\n" +
          "[Black \"Březina\"]\n" +
          "[Result \"1-0\"]\n" +
          "[Opening \"Boden-Kieseritzski gambit\"]\n" +
          "\n" +
          "1. e4 e5 2. Nf3 Nf6 3. Bc4 Nxe4 4. Nc3 Nxc3 5. dxc3 Nc6? 6. Ng5 Qf6 7. Bxf7+ Ke7 8. Bd5 d6 9. Nf7 Rg8 10. Bg5 1-0"
        ,
        showCoords: false, coordsInner: false, headers: true,
        theme: 'brown',
        boardSize: 290,
        movesHeight: 60,
        startPlay: '19'
      }
      PGNV.pgnView("board", config)
    },
    html: "<br><img src='img/players/michaelchmiel.png' class='img100 right'><b>Bébul:</b> MichaelChmiel byl dneska při chuti a nebyl k poražení. Mrázkovi v první partii nestačila k výhře dáma, Bébul si nevážil darované figury, a tak to vypadalo, že si zaslouženě odnese plaketku stoprocentního vítězství. Nakonec se podařilo šňůru přetrhnout Jouzoleanovi. Oběma borcům tímto gratuluji! Dobrá práce! Ať žije Dobříš! ❤️" +
      "<br><br><b>Jouzolean:</b> Přemluvili mě k druhému klasickému zapasu. <img src='img/players/jouzolean.png' class='img100 right'>V pondělí 18 hod. Už není C - tým. Ten se rozpustil a ja se dostal do béčka na poslední stul. " +
      "Nechtěný posun. Béčko hraje o ligu výš. Takže zase rupnu. A ani nestihnu turnaj. Fakt nechápu jak jsem jim to mohl slíbit!" +
      "<br><br><img src='img/jouzolean-boden-kieseritzski.jpg'>" +
      "<br><br><b>Bébul:</b> Jouzolean je ale chlapík, soupeři dovolil ve vážné 90 minutové partii pouze 9 tahů a dnešní Monday Fight s přehledem stihl. Pomohla mu k tomu příprava na Mozkomora a Bébula a Tekeleho, neboť nás všechny tímhle Bodénem tuze trápí :-). Gratulujeme!" +
      "<div id='board'></div>"
  },
  {
    id: "6RfjVpnn",
    html: "<img src='img/prebor-hostomic-margarita.jpg'>" +
      "<img src='img/players/margarita_vlasenko.png' class='img100 right'><br><b>Bebul:</b> Margarita si v sobotu vybojovala v Otevřeném přeboru města Hostomice krásné 3.místo! Hrálo se 7 kol, 2x 25 minut, švýcarským systémem, bitva mezi 29 hráči. Z naší dobříšské ZŠ Trnka jelo s Bukowskicem 6 dětí. " +
      "Závidíme a Gratulujeme!"
  },
  {
    id: "aGb3mR2q",
    achievements: [{achievement: "black", player: "mrazek", id: "aTOyIX4i"}, {
      achievement: "black",
      player: "mrazek",
      id: "eC0pcy07"
    }, {achievement: "black", player: "bukowskic", id: "5A7NvcDN"}],
    html: "<b>Paní Bukowskicová:</b> <i>kluk</i> hrál omylem několik partií na bukowskicově účtu a zruinoval mu ELO 😅😂🤣<br><br>" +
      "<img src='img/lenochod1600.jpg'>" +
      "<img src='img/players/rychlylenochod.png' class='img100 right'><br><b>Jouzolean:</b> gratulujeme hráči Rychlý Lenochod k dosažení 1600 blitz elo." +
      "<br><br><b>Bebul:</b> Jednalo se o heroický výkon dva dny před dnešním turnajem. Sice to do MF nevydrželo, ale nemusí pršet, stačí, když kape..." +
      "<br><br><b>Bebul:</b> Černé puntíky dnes jeden za přizvání hráče, který hrál první partii až na Monday Fight. Za to si ale můžeme s Jouzoleanem sami. Turnaj má mít podmínku, že každý hráč má na Lichess odehráno aspoň nějaké minimum partií, což od příště bude. Další za dvě partie které skončily vypršením času jen po prvních několika úvodních tazích.<br><br>" +
      "<img src='img/mrazekblack.png'>" +
      "<br><br><b>Bebul:</b> Vítáme nového hráče <i>buban303</i> a těšíme se na další bitvy."
  },
  {
    id: "JMdetVA8",
    html: "<img src='img/players/dj-strelec.png' class='img100 right'><b>Bebul:</b> gratulujeme DJ&#x2011;Pescovi k vítězství v turnaji, když všechny partie hrál jako berserk. V historii Monday Fights se to předtím podařilo pouze <a href='index.html?mf=kjCdiqAI'>jedenkrát</a>, a to rovněž DJ&#x2011;Pescovi, před bezmála třemi roky!"
  },
  {
    id: "T5HQgRLI",
    html: "<b>DJ-Strelec:</b> Gratuluju! Za mě jeden z nejkrásnějších závěrů MFA. O vítězství hrálo v posledních 10 minutách pět hráčů. Jsem rád, že jsem si to mohl bez nervů u večeře užít 😀"
  },
  {
    id: "zT04UBgm",
    html: "<img src='img/koleda.jpg'><div align='center'>Koleda koleda o svátcích,<br>Buki Ritu vyplácí!<br>Dobře Rito, dobře tak,<br>nemělas mi ten mat dát!</div>"
  },
  {
    id: "jkqzKDk1",
    html: "<img src='img/players/jouzolean.png' class='img75' style=\"float:left\">" +
      "V průměru <b>6.7</span></b> bodů potřebuje Jouzoleán uhrát ve zbývajících turnajích tohoto roku, aby překonal Bukowskičův rekord 371 bodů z roku 2021." +
      "<br><br><i>Pisateli těchto řádků je Jouzoleána líto." +
      "Jeho sen zhatí. Bude ho teď porážet. Snadno. Neměl ho učit jak vždycky vyhrát proti Sicilské obraně." +
      "Sám teď nebude mít jak prorazit Bébulkovu pěšcovou hradbu," +
      "aniž by obětoval lehkou figuru. Potřebuje body? Tak obětuje! Jenže chá chá, Bébulek rychle zjednoduší hru, vymění všechny zbylé figury, dojde pěšcem do dámy a uštědří mu mat." +
      "Takhle jednoduché to bude. A zhasne tak sen, veliký sen, až to bude pisateli těchto řádků líto. Maliličkato líto. Nechť řady královských gambiterů houstnou! -beb-</i>" +
      "<br><br><b>Bebul:</b> dneska uhrál jen 5.5 bodu, ale měl dnešního stoprocentního <a href='https://lichess.org/@/tomzr'>tomzr</a>, kterému gratulujeme, hezky na <a href='https://lichess.org/i2pA3pVD#66'>lopatě</a>." +
      " Každý z nás by tu partii už vyhrál, tedy kromě Mrázka, kterému prý tomzr z lopaty rovněž vyklouzl."
  },
  {
    id: "HVCxCBvL",
    html: "<b>LastScout:</b> Pozor hlášení: Následující čtvrtek se bude tradičně konat akce Beer & Chess u nás ve střešovické hospůdce (Restaurace na Dělostřílnách) v 7.hod. Budu tam já a Roman jako tvrdé jádro + pár dobrých kluků od nás ze sousedství. Kdybyste měli chuť se k nám přidat a rozvířit vody, rádi vás uvidíme. Konec 🙂. hlášení." +
      "<br><br><img src='img/margaritaDiplom.jpg'><br><br><b>Bebul:</b> Margaryta se dnešního Monday Fight turnaje nezúčastnila, protože měla jiný šachový program. Gratulujeme! ❤️"
  },
  {
    id: "U2MBWgWW",
    html: "<img src='img/delostrilny2023.jpg'>" +
      "<br><b>LastScout:</b> Posílám momentku ze čtvrteční akce. Přišli jste o výborný smažák….A požitku ze hry samozřejmě 😀" +
      "<br><br><img src='img/three-dames-pat.jpg'>" +
      "<br><b>Bebul:</b> Vítáme Rychlého Lenochoda a Travinho zpět. Plaketka za postavení třech dam je pěkná, ale ten PAT je teprve kouzelnej 👍" +
      "<br><br><b>RychlyLenochod:</b> 😀 ja doufal že to vzdá, vůbec mě nenapadlo že to bude pat 😀 ještě když jsem hrál berserk"
  },
  {
    id: "bWdaEhQU",
    html: "<img src='img/honzahonzadecko.jpg'><br><br><b>HonzaHonza:</b> Dcera, dva roky, začít se musí brzo 😄 za pár let se k nám přidá" +
      "<br><br><b>Bebul:</b> no, teď už to nebude moct být Neznama01, když je známá. Ale krásou se jí jistě vyrovná ❤️" +
      "<br><br><img src='img/hrobotrondecko.jpg'><br><br><b>Hrobotron:</b> Neznama03 se třeba přidá"
  },
  {
    id: "yY2z2OTE",
    html: "<img src='img/margarita-kp.jpg'><br><img src='img/margaryta-krajsky-prebor.jpg'><br><br><b>Bebul:</b> Margaryta vybojovala v Krajském přeboru krásné druhé místo! Gratulujeme! ❤️"
  },
  {
    id: "GH67HxSy",
    html: "<img src='img/muj-system.jpg'><br><br><b>Bukowskic:</b> Z tohoto vydání vezmeme diagramy, kniha vyjde ve zcela novém překladu! Obálka tohoto vydání je povedená.<br><br><img src='img/muj-system-txt.jpg'>" +
      "<br><br><b>Bebul:</b> Vypadá to, že se LEDA chystá vydat Jouzolean-Tekeleho šachovou bibli. Tak se necháme překvapit.  ❤️"
  },
  {
    id: "RkvoWKUM",
    html: "<img src='img/lenochod-otb.jpg'><br><br><img src='img/jouzolean-otb.jpg'><b>Bebul:</b> všichni se mě bojí, proto trénují. No hrůza! Štěstí totiž přeje připraveným. 👍"
  },
  {
    id: "8Qrvf4nK",
    html: "<img src='img/tekele_6_5_2023.jpg'><br><br><img src='img/jouzolean_6_5_2023.jpg'><b>Bebul:</b> A takhle se to teda stalo, že Tekele začal taky hrát Boden-Kieseritsky gambit?  😀"
  },
  {
    id: "CHGKdO2L",
    html: "<img src='img/polgu-9-5-2023.jpg'><br><b>Polgu:</b> Pořád se učíme nová zahájení 😀👍"
  },
  {
    id: "b1xWJ2sM",
    html: "<img src='img/mistrovstvi-amateru.jpg'>"
  },
  {
    id: "YfekfStP",
    html: "<img src='img/pesec-vs-travinho.jpg'><BR><b>DJ-Strelec: </b> kdesi nad Arizonou Travinho vs. DJ Pesec 1:4. <i>(Ve skutečnosti někdy kolem 8.února, pozn. redakce)</i>"
  },
  {
    id: "Ar3cxBL6",
    html: "<img src='img/cvek-otb.jpg'><BR><i>(Ilustrační foto mimo MF)</i><br><b>Jouzolean: </b> Na vědomí se se dává, že 18.12.2023 se našeho turnaje zúčastní již podruhé GM R. Cvek. 😎Jen připomínám, že minule jsme všichni dostali čočku 😁" +
      "<br><br><b>Bebul:</b> Dnes ráno WhatsApp <b>26 zpráv</b> od Jouzoleana. Nebudu Vám prozrazovat detaily, ale <b>SachyCvek</b> se zhroutí v desátém tahu. Je to téměř jisté. Co tah, to návnada, kterou Cvek ve svých partiích hraje, včetně toho blunderu. Geniálně upravený move order, že očekávaný tah hraje vždy nejčastěji. Takže Jouzolean ho porazí. SachyCvek se otřesou v základech a jeho druhý pád by měl zařídit <b>Tekele</b>, kterého tímto pověřuji. Třetí ránu už má vyhrazen <b>Polgyho</b> šustráček. ❤️"
  },
  {
    id: "XxhF52z5",
    html: "<img src='img/indiani-sachy.jpg'><br><b>Bébul:</b> Letos jsme se s Bukowskicem zaklínali, že si na táboře určitě zahrajeme, ale ráno spíme, v poledne jíme, odpoledne je vedro a večer jsou komáři... Ale děti si šachy užily ❤️<BR><br><img src='img/buk-nacelnik.jpg'><br><i>Bukowskic, náčelník Aglajů</i>"
  },
  {
    id: "U8B9QThb",
    html: "<img src='img/masUzNecoNaTohoCveka.jpg'><br><b>Jouzolean:</b> Jak již jsem avizoval, příští týden by měl dorazit na MF GM Robert Cvek - doufám, že letos bude hvězdná účast a že někdo uhraje alespoň půlbodík. 😎Nějaké jeho hry najdete na lichess pod nickem sachycvek\n" +
      "On bude ale beztak hrát nějaké blbosti. 😎😁"
  },
  {
    id: "PJnn9LQi",
    config: {theme: "maple2", pieceStyle: "merida"},
    achievements: [{achievement: "blackGM", player: "mrazek", id: "g4jzy7kX"}],
    html: "<div align='center'><h3>Monday Fight</h3><h2>s GM Robertem Cvekem</h2></div>" +
      "Že budou ty Vánoce, tak nás znovu po roce navštívil velmistr <a href='https://www.sachycvek.cz/'>Robert Cvek</a>. Za návštěvu a za nadílku moc děkujeme a k vítězství gratulujeme!" +
      "<div align='center' style='margin-top:10px'><img src='img/sachyCvekTop50.png' style='max-width: 211px'></div>" +
      "Stihl odehrát krásných 15 partií, což je o jednu více, než při jeho <a href='index.html?mf=fXU6tfJM'>první návštěvě</a>. " +
      "Radost s duelu mělo 8 hráčů, což je o 3 méně, než loni. " +
      "<tooltip json='{\"id\":\"sachycvek\", \"size\":1.0}' align='center' style='margin:42px 0 5px 0'/> " +
      "Neuvěřitelně pětkrát došlo na duel s DJ&#x2011;Pescem. O to více se čekalo, že uhrajeme aspoň ten půlbodík! Jenže naděje nenaplnil ani slovutný Bukowskic, ani šampión Jouzolean, takže k zemětřesení v Monday Fights nedošlo. 😀" +
      "<br><br><b>DJ-Strelec:</b> Já měl partií s ním až až... a upřímně je mi to líto vůči těm, na které se nedostalo. Navíc jsem byl ve fázi, kdy jsem si ho už znovu upřímně nepřál. Navozoval mi pocit totální bezmoci 😭" +
      "<br><br><board json='{\"id\":\"uVV5mGe0\", \"startPlay\":22}'/> " +
      "<br><div align='center'><i>Jak Jouzolean na tahu odmítl získat výhodu</i></div>" +
      "<br>Jaká byla vlastně šance, že uhrajeme aspoň půlbod? Je to kosmicky nepravděpodobné, nebo jsme měli naději? Výpočet pomocí např. tohoto <a href='https://wismuth.com/elo/calculator.html#rating1=2598&rating2=2129&formula=logistic'>kalkulátoru</a> ukazuje, že šanci jsme měli. A to pade na pade!" +
      "<br><br><img src='img/padeNaPade.png'><br><br>" +
      "Pisatel těchto řádků, ne snad proto 😀, že si s velmistrem letos nezahrál 😭, uděluje <b>třídní důtku</b> každému, kdo nedokázal dnešnímu výprasku zabránit 😎😁. " +
      "Mezi pokáranými je i maestro Mrázek, který partii dokončil až po skončení turnaje. I tak měl vyhrát! Partii si můžete prohlédnout <a href='https://lichess.org/g4jzy7kX'>zde.</a>" +
      "<br><br>Na závěr nezbývá, než ještě jednou Robertu Cvekovi poděkovat, že si na náš skrovný turnaj udělal čas. Moc děkujeme! ❤️" +
      "<br><span style='float:right'><i>-beb-</i></span>",
    hallOfFame: [99, `<section class="user-top">
      <h2 class="text" data-icon="&#xe021;">
        <a href="https://www.sachycvek.cz/">GM Robert Cvek</a>
      </h2>
      <div style="margin:5px">
        <p> Že byly ty <a href="index.html?mf=PJnn9LQi">Vánoce</a>, tak nás znovu po roce navštívil velmistr  
            <a href='https://www.sachycvek.cz/'>Robert Cvek</a>.
            <p>Neuvěřitelně pětkrát došlo na duel s DJ&#x2011;Pescem. O to více se čekalo, že uhrajeme aspoň ten půlbodík!   
            <img src='img/players/sachycvek.png' style='margin:5px;width:33%;float:right'>
            Jenže naděje nenaplnil ani slovutný Bukowskic, ani šampión Jouzolean, takže k zemětřesení v Monday Fights nedošlo.
            <p>Pisatel těchto řádků, ne snad proto, že si s velmistrem letos nezahrál 😀, 
            <img src='img/achievements/blackDot.png' style='margin:5px;width:20%;float:left'>
            uděluje <b>třídní důtku</b> každému, kdo nedokázal dnešnímu výprasku zabránit 😁.
            <p>Na závěr nezbývá, než ještě jednou Robertu Cvekovi poděkovat, že si na náš skrovný turnaj udělal čas. Moc děkujeme! ❤️
      </div>
    </section>
    `]
  },
  {
    id: "DskSljmO",
    playOFF: "<img src='img/pavouk2023.png' style='width:100%;margin-top: 5px'>",
    html: "<img src='img/cvekPrani.jpg'>"
  },
  {
    id: "playOFF2023",
    // config: {theme: "horsey", pieceStyle: "gioco"}, // only test
    achievements: [
      {achievement: "lackOfSpirit", player: "Polgu", id: "PHF1LZSq", desc: "Remíza bez boje"},
      {achievement: "reporter", player: "jouzolean", id: "NBmhMPTe"},
      {achievement: "reporter", player: "DJ-Strelec", id: "ndYaWXai"},
      {achievement: "reporter", player: "bebul", id: "dsM0Dpqk"},
      {achievement: "blackXX", player: "LastScout", id: "PM0Keukr", desc: "Co výhoda dámy?"},
      {achievement: "blackXX", player: "tomzr", id: "NBmhMPTe", desc: "Ztratil náskok -9"},
      {achievement: "blackXX", player: "DJ-Strelec", id: "3SuQYpJg", desc: "Zahodil tři mečboly"},
      {achievement: "blackXX", player: "Tomas_1989", id: "szWfXGhl", desc: "Ani figura navíc"},
      {achievement: "blackXX", player: "MichaelChmiel", id: "2nfu1kpk", desc: "Dal si vlastňáka"},
    ],
    /*
    LastScout (vs. MichaelChmiel) Nevyužitá výhoda dámy https://lichess.org/PM0Keukr
    tomzr (vs. jouza) Ztracený náskok -9 https://lichess.org/NBmhMPTe
    DJ-Strelec (vs. tomrz) Zahozené tři mečboly https://lichess.org/3SuQYpJg
    Tomáš89 (vs. Margarita) Promarněný zisk figury ze zahájení https://lichess.org/szWfXGhl
    MichaelChmiel (vs. skaut) Vlastní mat z vyhrané pozice https://lichess.org/2nfu1kpk
     */
    playOFF: "<img src='img/pavouk2023-finale.jpg' style='width:100%;margin-top: 5px'>" +
      "<div class='mfColumns'>" +
      "<div class='lastTournament playOFF' style='margin-top: 0px'>" +
      "<h1>Tekele-tomzr 0:4</h1>" +
      "Hned první hru nastavil Tekele hru špatně a označil se jako výše nasazený hráč za černého. Svou pozici směřoval do sicilských vod. Hrála se dračí varianta, ze které tomzr velmi rychle zaběhl do neznámých vod. Stav byl vyrovnaný až do hluboké střední hry. V 19. tahu, v kritickém okamžiku, kdy měl tekele asi o minutu méně času, dovolil Tomzrovi vybojovat prvního pěšce, který byl navíc ohromně důležitý, protože držel celou Tekelovu pěšákovou kostru. Dále se mu pozice rozsypala jako balíček z karet a Tekele se ctí prohrál první hru. <br>" +
      "Ve druhé hře zabojoval a vytáhl svou ostrou, střelcovou hru. Jakožto zkušený pastiklad přichystal léčku, do které se Tomzr  již ve 4. tahu opravdu chytil a stál na prohru. Jako když tonoucí se stébla chytá, i Tomzr zkusil své 5. ... Dh4? Tento málo častý tah však Tekeleho jako méně zkušeného hráče dokonale překvapil, opět blunderoval, poté se v nepříliš hezky vyhlížející pozici dlouze trápil, až svému sokovi zcela podlehl. Velká škoda. Bod by mu slušel, zaznělo v ochozech. <br>" +
      "Ve třetí partii se šlo opět do sicilské, tentokrát do velmi zvláštní varianty Delayed alapin. V té se zcela uvolněný Tomzr pohyboval s ledovým klidem a velmi brzy si vypracoval rozhodující výhodu. Po 25.tazích Tekele rezignoval. <br>" +
      "V poslední partii již zcela odevzdaný Tekele opět zkoušel střelcovu hru. Jeho výkon byl již značně pochybný. V 15 tahu přišel o první lehkou figuru a od té doby bylo rozhodnuto. Tomzr si partii pohlídal a bez ztráty bodu postupuje do dalších bojů." +
      " <i>-jouz-</i>" +
      "</div>" +
      "<div class='boards'>" +
      "<board json='{\"id\":\"J2neoXft\", \"startPlay\":10, \"theme\":\"metal\", \"pieceStyle\":\"spatial\"}'/>" +
      "</div>" +
      "<div class='leaderboard'>" +
      "<img src='img/tekele-tomzr-2023.jpg' style='width:100%'>" +
      "</div>" +
      /*      "</div>" +
            "<div class='mfColumns'>" +
            "<div class='lastTournament playOFF' style='margin-top: 0px'>" +
            "<h1>Tekele-tomzr 0:4</h1>" +
            "Hned první hru nastavil Tekele hru špatně a označil se jako výše nasazený hráč za černého. Svou pozici směřoval do sicilských vod. Hrála se dračí varianta, ze které tomzr velmi rychle zaběhl do neznámých vod. Stav byl vyrovnaný až do hluboké střední hry. V 19. tahu, v kritickém okamžiku, kdy měl tekele asi o minutu méně času, dovolil Tomzrovi vybojovat prvního pěšce, který byl navíc ohromně důležitý, protože držel celou Tekelovu pěšákovou kostru. Dále se mu pozice rozsypala jako balíček z karet a Tekele se ctí prohrál první hru. <br>" +
            "Ve druhé hře zabojoval a vytáhl svou ostrou, střelcovou hru. Jakožto zkušený pastiklad přichystal léčku, do které se Tomzr  již ve 4. tahu opravdu chytil a stál na prohru. Jako když tonoucí se stébla chytá, i Tomzr zkusil své 5. ... Dh4? Tento málo častý tah však Tekeleho jako méně zkušeného hráče dokonale překvapil, opět blunderoval, poté se v nepříliš hezky vyhlížející pozici dlouze trápil, až svému sokovi zcela podlehl. Velká škoda. Bod by mu slušel, zaznělo v ochozech. <br>" +
            "Ve třetí partii se šlo opět do sicilské, tentokrát do velmi zvláštní varianty Delayed alapin. V té se zcela uvolněný Tomzr pohyboval s ledovým klidem a velmi brzy si vypracoval rozhodující výhodu. Po 25.tazích Tekele rezignoval. <br>" +
            "V poslední partii již zcela odevzdaný Tekele opět zkoušel střelcovu hru. Jeho výkon byl již značně pochybný. V 15 tahu přišel o první lehkou figuru a od té doby bylo rozhodnuto. Tomzr si partii pohlídal a bez ztráty bodu postupuje do dalších bojů." +
            "</div>" +
            "<div class='boards'>" +
            "<img src='img/tekele-tomzr-2023.jpg' style='width:100%'>" +
            "</div>" +
            "<div class='leaderboard'>" +
            "<board json='{\"id\":\"6BLBxL2s\", \"startPlay\":1}'/>" +
            "</div>" + */
      "</div>" +
      "<div style='width:100%; margin-bottom:10px'><img src='img/wedding-crasher-hro.gif' style='width:100%;margin-top: 5px'>" +
      "<div align='center'><i><b>Gratulujeme Tomzrovi k vítězství ve finále PlayOFF, kde porazil bukowskice 4-2</b></i></div></div>",
    html: "<h1>PlayOFF 2023</h1>" +
      "<b>Bebul:</b> Zde odkazy na minulé PlayOFF turnaje <a href='index.html?mf=playOFF2020'>2020</a>, <a href='index.html?mf=playOFF2021'>2021</a>, <a href='index.html?mf=playOFF2022'>2022</a>." +
      "<br><br><b>RychlyLenochod:</b> Vážení přátelé, <br>" +
      "vzhledem k tomu ze poslednich nekolik tydnu lezim s Tuberkulozou v lecebne a neni mi posledni dny moc dobre, odstupuju z kvalifikacni bitvy mezi mnou a DjPesec. <br>" +
      "Nemam totiz na sachy vubec pomysleni. A diky tomu bysme si oba nase partie tak neuzili... Bude to tak lepsi. Holt, neni kazdy rok posviceni! 😀<br>" +
      "Dekuji za pochopeni" +
      "<br><br><img src='img/lenochod-pesec.jpg'><br><b>Jouzolean:</b> Brzy se uzdrav🙂😎 Zde máš aspoň kartičku!" +
      "<br><br><b>Jouzolean:</b> Místo stonajícího Rychlého Lenochoda nastoupí do boje proti Dj&#x2011;Pěšcovi první náhradník pod čarou = Polgu .Ten již souhlasil a připravuje se na těžkou bitvu, kde může předvést svůj šustráček 🙂." +
      "<br><br><b>Jouzolean:</b> Jen aby to nezapadlo! <b>Velké finále již dnes, 3.ledna, v 19 hodin.</b> Letošní play off má velkou sledovanost! Kupříkladu duel Margarita vs Bukowskic sledovalo v jeden moment 8 diváků. <b>Dnes pojď fandit i ty!</b> 😎🙂"
  },
  {
    id: "oGOkXond",
    html: "<tooltip json='{\"id\":\"mozkomor\", \"size\":0.9}' align='center' style='margin:42px 0 5px 0'/> " +
      "<br><b>DJ-Strelec:</b> Skvělý výkon Mozkomore 👏 Gratuluju!" +
      "<br><br><b>Jouzolean:</b> Mozkomor to dneska zahrál jako Bůh! 😎🙂 Jeho hra byl skvělá!! Nedalo se dělat absolutně nic!" +
      "<br><br><b>Jouzolean:</b> Máme tady ještě jednu, poměrně důležitou, nedořešenou věc!! 😎 Všichni bedlivě očekáváme termín velkého finále!" +
      "<br><br><b>Bebul:</b> Těsně před dnešním Monday Fight se hrálo druhé semifinále <a href='index.html?mf=playOFF2023'>PlayOFF 2023</a>, které určilo druhého finalistu. O vítězství si tedy zahrají <b>bukowskic</b> s <b>tomzrem</b>, kterým gratulujeme..." +
      "<br><br><b>Bebul:</b> Dosud jedinou plaketku v PlayOFF má <b>Margarita</b> za senzaci turnaje. Tak jestli to není nějaký BUG v softwaru (kdyžtak mi dejte vědět, kde to mělo nějakou plaketku uznat), tak držím palce oběma finalistům, aby nějakej šustráček, anastazia mate či opičení přidali :-) "
  },
  {
    id: "p15JLLsY",
    html: "<img src='img/bebul-b.jpg'>" +
      "<tooltip json='{\"id\":\"bebul\", \"size\":1.0}' align='center' style='margin:42px 0 5px 0'/> " +
      "<br><b>Bebul</b>: na základě výsledku hlasování jsem nastavil požadovaný počet rated her na <b>100</b>. </b> " +
      "<br><br><b>HonzaHonzaHonza:</b> Nechci se do toho moc montovat, jelikož se tu stále považuju za nováčka mezi vámi co by neměl mít velké slovo 🙂 a ani neplánuju nikoho doporučovat a přidávat. Já s limitem souhlasim, jen si myslím, že můžou bejt situace, kdy třeba někoho chtít přidat budeme, může to být hráč, který třeba hraje přes jinou aplikaci nebo nehraje online vůbec. Podle mě 100 her je opravdu dost a ustálený rating je mnohem dříve (nebo to tak není?)." +
      "<br>Ale v případě tohohle hlasování mi nepřijde demokraticky správně dát rovnou 100, když 4 lidi hlasovali pro 30 a 1 pro 50, klidně by ty 4 lidi raději dali také 50 a byla by to remíza. Nejspravedlivější by byl nějaký poměrný průměr, takhle to podle mě nevypovídá o názoru hlasujících. " +
      "<br>Umím si představit, že se bude v budoucnu chtít přidat někdo nový a 100 her mi přijde až moc. Ale nijak zvlášť mi na tom nezáleží a pokud takhle rozhodnete, nevadí mi to 🙂"
  },
  {
    id: "Kf7Yjbkg",
    html: "<img src='img/rocky.jpg'>" +
      "<br><b>Bebul</b>: Redakci se podařilo dostat hlasový záznam z turnajových klání mezi Jouzoleánem a Tekelem.<br>" +
      "<audio controls>\n" +
      "  <source src=\"img/tekele-vs-jouzolean.mp3\" type=\"audio/mpeg\">\n" +
      "  Your browser does not support the audio tag.\n" +
      "</audio>"
  },
  {
    id: "u4U2Ht3b",
    init: function () {
      let config = {
        pgn: "[Date \"2024.01.29\"]" +
          "[White \"Kamikazeee\"]\n" +
          "[Black \"Engine\"]\n" +
          '\r\n[Variant "From Position"]' +
          "\r\n[FEN \"8/8/3kn3/8/8/3KQ3/8/8 w - - 0 1\"]" +
          '\r\n[SetUp "1"]' +
          "\r\n1. Kc4 Nc7 2. Qf4+ Kc6 3. Qe5 Kd7 4. Qf6 Ne6 5. Kd5 Nc7+ 6. Ke5 Kc8 7. Qc6 Kd8 8. Kf6 Ne8+ 9. Kf7 Nc7 10. Kf8 Na8 11. Qxa8+"
        ,
        showCoords: false, coordsInner: false, headers: true,
        theme: 'purple-diag',
        pieceStyle: 'dubrovny',
        boardSize: 290,
        movesHeight: 60,
        resizable: false
      }
      PGNV.pgnView("board", config)
    },
    html: "<br><b>Bukowskic</b>: Zde pro zasmání, co jsem přehlédl po vyčerpávajícím čtyrhodinovém boji se silným soupeřem. Hrál jsem za bílého, už jsem se viděl doma a přijal jsem remízu 🤬, oba moji synové to hned viděli!<br>" +
      "<img src='img/buki-fail.png'>" +
      "<br><b>Bebul</b>: Jedna z možností výhry spočívala v oběti jezdce a koncovce dáma a král proti králi a jezdci. Každej ví, že dát takový mat je strašná pakárna a skoro to nejde. Kamikazeee se ozval, že s tím problém nemá a poslal video, kde to krásně ukázal. Jeho postup okleštěný o levitace figur nad poli, o kterých přemýšlel, uvádím na následujícím diagramu. Chapeau!<br>" +
      "<div id='board'></div>"
  },
  {
    id: "corliUdA",
    html: "<img src='img/players/jouzolean.png' class='img100 right'><br><b>Bebul</b>: Jestli dobře počítám, Jouzolean dnes nehrál po neuvěřitelné šňůře 81 turnajů, kdy nevynechal ani jednou! KUDOS! 👍<br>" +
      "Doufám, že to je jen jedna vyjímka, která potvrzuje pravidlo, protože Monday Fight bez Jouzoleána není to pravý vzrůšo!" +
      "<br><br><b>Jouzolean</b>: asi mám chřipku. Je mi totálně na <i>cenzored</i>. Jouz. LEŽEL VEDLE mobilu naříkajíc nad neúčasti, schvácený Nemoci zlou. Kocour mě miluje, trpí se mnou. A dej tam fotku s tou kočkou!" +
      "<br><br><img src='img/jouzoleanuv-kocour.png'>" +
      "<div align='center'><i>Jouzoleanovo povlečení v aktuálních barvách MF šachovnic</i></div>" +
      "<br><br><b>Bebul</b>: a Bébulkovi se sice podařilo zastavit tomzra, jenže co je to platný, když k remíze opakováním tahů došlo v naprosto vyhraný pozici, kterou neuměl vyhrát? Tak příště!" +
      "<board json='{\"id\":\"Gol8aU9b\", \"startPlay\":114}'/>"
  },
  {
    id: "5nfJgmK7",
    html: "<b>Bukowskic</b>: Margarita ovládla Hostomice! Minulý rok 3., včera 🥇! Graaats! <a href='https://chess-results.com/tnr889062.aspx?lan=5&art=1'>výsledky</a>. Gratulujeme Margarytě k včerejšímu celkovému vítězství v Hostomicích! 6,5 bodu ze 7 možných je vynikající výkon! " +
      "<br><br><img src='img/margaritaPrvniMisto2024.jpg'>" +
      "<br><br><b>Jouzolean</b>: Haaa kamikazee mi spadl do Byrneho pasti 😎😁. Celé jsem to odbulletoval. Stanovujeme někde rekord? 😁 3:05 na hodinách v okamžiku matu!" +
      "<br><br><img src='img/byrnehoPast.jpg'>" +
      "<br><br><b>Polgu</b>: Natalko, kak se jmenije ta restaurace.? Zahrada ?… 😘" +
      "<img src='img/Natalie-Dior-Miss-Dior.jpg'>" +
      "<div align='center'><i>Vítáme Natalii Portman na Monday Fights</i></div>"
  },
  {
    id: "k7211zgs",
    html: "<b>Magnus Carlsen</b>: Bébulku, jestli se kvalifikuješ na turnaj kandidátů, o čemž nepochybuji, půjdu do toho!" +
      "<br><br><b>Alireza Firouzja</b>: Ještě, že jsem dneska Monday Fights vynechal, dostal bych klepec!" +
      "<br><br><b>Bubka</b>: Bébule, jestli budeš u šachů takhle nadávat, tak se s tebou rozvedu!" +
      "<br><br><b>Neznama-00</b>: A tak to já si ho teda vemu!" +
      "<br><br><img src='img/celebration.gif' style='width:100%;margin-top: 5px'>" +
      "<br><br><b>Bebul</b>: <img src='img/players/bebul.png' class='img100 right'> Dneska bylo na pódiu těsno, těsněji, než v trenkách o dvě čísla menších, všechno o bod! A na čtvrtém místě RychlyLenochod se stejným počtem bodů jako bronzový HonzaHonzaHonza. " +
      "Lenochod s Bebulem začali neslavně, prohráli čtyřikrát v řadě. Ale pak se vobá nadechli a začali s vítězným tažením. " +
      "Jouzoleánové, Tekelové, Kamikazeové, ba i Mrázkové padali jak hrušky, dobře, aby to Polguovi nebylo líto tak ano, i on, ani Natálka mu nepomohla. " +
      "Oba dosáhli pěti výher v řadě a těšili se na další tučná sousta, když tu se to stalo! V tratolišti poražených narazili na sebe navzájem! " +
      "Lenochoda v tomto rozpoložení nebylo možno porazit. Jenže, čas se chýlil. Lenochod smutnil, že nestih zmáčknout berserk, a pro slzy pak neviděl na šachovnici." +
      "Takže, právěže, štěstí se usmálo na otrhánka! " +
      "<br><br><b>Tekele</b>: <img src='img/players/tekele.png' class='img100 right'> " +
      "Radši sem hrál d4 abys, Bébule, nedostal i potřetí 😛. Já porazil buka tak co víc! 💪 " +
      "Bebul a lenochod na pódiu? Svět se zbláznil! " +
      "<br><br><b>Tekele</b>: Pět chvály sám na sebe? 😁 Na tohle jsou v medicíně diagnózy 😁 "
  },
  {
    id: "AWLzCZqE",
    achievements: [{achievement: "black", player: "kamikazeee", id: "ZJ0ma4h9"}],
    html: "<b>Kamikazeee</b>: Tak hlavně, že obě hrály minulej tejden 300 metrů od nás v práci, ani jsme nezašli :D" +
      "<br><img src='img/botez.jpg' style='width:100%;margin-top: 5px'><div align='center'><i>Andrea Botez</i></div>" +
      "<br><b>Bebul</b>: to seš teda pěkná sketa, Kamikazeee, udělím ti za to černý puntík" +
      "<br><br><b>kamikazeee</b>: Já je neznal.  A když mi kámoš říkal, že mají nějakou přednášku, tak jsem řekl, že jdeme raději na pivo 😁" +
      "<br><br><b>DJ-Strelec</b>: Když už jsme u těch Botezových, dnes jsem zahrál <a href='https://www.chess.com/terms/botez-gambit-chess#what-is'>botez gambit</a> na tomzra. Nepřistoupil na něj 😁" +
      "<board json='{\"id\":\"oOZnOy1B\", \"startPlay\":31}'/>" +
      "<br><br><b>Bebul</b>: Překrásným způsobem chytila Margarita dámu Kamikazeeeovi. Nejdřív vezme střelce jako návnadu, pak dá šach garde koněm, kterého obětuje a pak druhým koněm už dílo zkázy dokoná! Parááááááda! ❤️" +
      "<board json='{\"id\":\"ZJ0ma4h9\", \"startPlay\":29}'/>"
  },
  {
    id: "GPVfXW1y",
    achievements: [{achievement: "lackOfSpirit", player: "jouzolean", id: "S9y010En", desc: "Chtěl remízu za bod"}],
    html: "<br><b>Bebul</b>: Polgu byl dneska při chuti. Jouzoleanovi slupnul dámu a Bébulkovi slupnul materiálu tak za tři věže." +
      "<br><br><b>Kamikazeee</b>: Rychlý lenochod mě takhle hezky lákal na pat (kdybych si vzal pěšce), což s těmi pár sekundami nebylo úplně nereálné 😁" +
      "<board json='{\"id\":\"zUhPdO1j\", \"startPlay\":124}'/>" +
      "<br><b>Bebul</b>: A bukowskic spadnul Jouzoleanovi do phillidor trapu. Totálně. Bukowskicův oblíbený tah střelcem je zde blunder!" +
      "<board json='{\"id\":\"8MTndcn6\", \"startPlay\":10}'/>" +
      "<br><b>Bebul</b>: Jouzolean mě ně kolenou prosil, že si zaslouží černý puntík za to, že Mrázkovi nabídl remízu v prohrané pozici těsně před koncem turnaje. Mrázek odmítl a vyhrál, ačkoli těsně před koncem mohl dát Jouzolean <a href='https://lichess.org/S9y010En#82'>mat jedním tahem</a>. Tak tedy dávám <i>lack of spirit</i> plaketku. " +
      "Partie není na webu, neboť se dohrála až po skončení turnaje. Je ale pěkná, klikněte si na ni, ať víte, za co se Jouzoleán kaje 🙄"
  },
  {
    id: "td9uxoJx",
    html: "<br><b>Bebul</b>: Nádherný mat! Vsadím se, žes ho, Jouzoleánku, nečekal?!" +
      "<board json='{\"id\":\"Kmcp2IxA\", \"startPlay\":40}'/>" +
      "<br><br><b>Jouzolean</b>: Ano, dušák ošklivej 😰" +
      "<br><br><b>Polgu</b>: Ahoj všem a gratulace všem a obzvlášť Honzovi! 👍 Těch jeho 944 nechápu…." +
      "<br><br><b>Bébul:</b> <img src='img/achievements/pawns.png' class='img100 right'> Nově jsem na WEB přidal achievementy za postavení více pěšců do sloupce. Přitom ten pěšec nesmí být hned v dalším tahu vyměněn." +
      "<p>A protože ten dušený mat byl současně garde, <img src='img/achievements/mate-garde.png' class='img100 left'>  přidal jsem ještě plaketku za mat při kterém je současně ohrožena i dáma. " +
      "Ta je typicky ohrožena už déle, třeba dáma kouká na dámu a dáma může být třeba krytá. Ale mat-garde mi prostě přišlo sexy, tak to tu máme."
  },
  {
    id: "SOUF57Zr",
    html: "<br><b>Mrázek</b>: Kdo že to tu nemá rád ty remízy? Začal turnaj kandidátů a výsledky prvního kola jsou.... překvapivě... počkej si na to.... samý remízy 🙂 (ženský se nepočítaj, ale nejsou na tom o moc líp)," +
      "viz <a href='https://candidates2024.fide.com/crosstable'>turnaj kandidátů</a><br>" +
      "<img src='img/candidates2round.jpg'><br><br><b>Bébul:</b>  no, ale vono to má pokračování. Ať koukám jak koukám, ať hledím jak hledím, vidím, že draw nevidím! 😁" +
      "<br><img src='img/candidates2round.jpg'> " +
      "<br><br><b>Bébul:</b> V tomto turnaji zahrál jeden ze svých životních výkonů stále zlepšující se LastScout. " +
      "Přetrhl šňůru sedmnácti proher s Mrázkem a ztrestal kupříkladu v rukách 3xHonza obávanou Francouzskou obranu! No podívejte se na to! Veliká gratulace! " +
      "<tooltip json='{\"id\":\"LastScout\", \"size\":0.75}' align='center' style='margin:42px 0 5px 0'/> "
  },
  {
    id: "5AjDILmt",
    playOFF: `
      <h2>Už jste slyšeli Dona Giovanniho v Kasparpalově podání?</h2>
      <p>
      O senzaci turnaje se dnes postaral Kasparpalov, když porazil obávaného Michaela Chmiela, který před dvěma týdny ovládl celý turnaj!
      <p>
      Zde si můžete Kasparpalova vychutnat v roli Dona Giovanniho v traileru Národního Divadla.
      Kasparpalův avatar hráče Monday Fights pochází právě odtud. 
      <iframe src="https://www.youtube.com/embed/3OYMftbkTfI" style="width:100%; height: 100vh; margin: 10px 0px" allowFullScreen></iframe>
    `,
    html: "<br><b>Bebul</b>: Gratulace Tomzrovi, na jeho triumf jsme si už zvykli. Ale jak vypadá opravdová radost? Takhle:" +
      "<br><br><b>Jouzolean</b>: Dnes se mi nejvíc dařilo 💪😎 a to v práci. Nikdo mě neporazil! Mrázek mi spadnul do Kveinis " +
      "Bukowskice jsem přejel v koncovce snad poprvé v životě a Tomzr si ani nečutl 🙂!" +
      "<br><br><b>Tania Sachdev</b>: Wau! Jak to ti mí klucí hrají! Posílám pusu 💋❤️😘! <img src='img/taniasachdev.gif'> " +
      "<board json='{\"id\":\"QQR7BDx6\", \"startPlay\":76}'/>" +
      "<br><br><b>Bebul</b>: no a Bébulek se raduje nejvíc, protože je po sto letech zase nad 1700! Porazil i svého odvěkého rivala Tekeleho, jáááách!" +
      "<br><br><b>Jouzolean</b>: Bébulovi prospívá že hraje jen občas 🙂😁 Vzdycky přijde a všecky vymydlí 🙂 A pak jsou měsíc nasraní, že mu to nemůžou vrátit 🙂😁! "
  },
  {
    id: "IA93NvE6",
    achievements: [{achievement: "blackGM", player: "mates7824", id: "sQjNfMXm", desc: "Prohrál s Navarou"}],
    html: "<br><b>Bébul</b>: Gratulujeme <a href='https://bebul.github.io/MondayFight/search.html?q=mates7824'>Matesovi7824</a> " +
      "k prohře s Davidem Navarou na <a href='https://chess-results.com/tnr914906.aspx?lan=5&art=9&fed=CZE&turdet=YES&snr=76'>Memoriálu Jana Kováře</a>, tedy v Krajském přeboru v rapid šachu. " +
      "<br><img src='img/matesVsNavara.jpg'> " +
      "<br><br>Mates měl kliku, že byl s GM Davidem Navarou spárován hned v prvním kole. Celé Monday Fights na něj spoléhalo, věřili jsme, " +
      "že důvěru v něj vloženou, zúročí, že konečně přinese do našich sbírek velmistrovský skalp, a to ne jen tak ledajaký. Inu, nepřinese... " +
      "<p>Samou závistí tudíž udělujeme černý puntík za prohru z Velmistrem, tentokrát na opravdické šachovnici mimo Monday Fight! A máš to!"
  },
  {
    id: "3gTsQvVI",
    html: "<br><b>RychlyLenochod</b>: teeeda 😀 dnes sem vam vyfoukl plaketky 😀 díky dík.... " +
      "<board json='{\"id\":\"q07Se5pG\", \"startPlay\":24, \"orientation\":\"black\", \"theme\":\"metal\", \"pieceStyle\":\"spatial\"}'/>" +
      "<br><br><b>Bebul</b>: Mat garde, koněm a ještě plnej materiál. Nádhera. Lenochod se často drží pravidla: \"to take is a mistake\" a narozdíl od bukowskice zasadně nemění figury, " +
      "pokud nemusí. Asi proto jsou jeho partie tak hezké, medem a strdím oplývající 👍👏" +
      "<br><br><b>Jouzolean</b>: Ten Lenochod je neskutečný 😁😁. Mě zničil jak psa zas jednou 😁"
  },
  {
    id: "GVv7gG6J",
    playOFF: `
      <h2>Mrázek, ústředna!</h2>
      <p>
      <b>Mrázek:</b> Netypická šachová úloha pro dnešní den: Mám smutnou zprávu. Bohužel již nikdy si s námi Helena Zr. (sestra tomzra) šachy nezahraje 😢 A můžu za to jenom já, je to moje vina a nikdy si to neodpustím, že jsem takhle selhal😫 I nadále se budu pokoušet, aby si místo ní s námi někdy v budoucnu zahrála Helena Mr. (sestra tomzra), ale za úspěch neručím, vypadá neoblomně i po transformaci. Pak už bude zbývat jen naděje, že ???.Mr. najde v této hře oblibu a za pár let se připojí ona a pomstí mě.      
      <p>
      <iframe src="https://www.youtube.com/embed/SY_26ffvxc4" style="width:100%; height: 100vh; margin: 10px 0px" allowFullScreen></iframe>
    `,
    html: "<img src='img/dj-pesec-disabled.jpg'>" +
      "<br><br><b>DJ-Pesec</b>: Hrál jsem minutový bullet a každou hru ztrácel 7-15 vteřin kvůli jejich serverům. Naštval jsem se na Lichess a profil uzavřel." +
      "<br><br><b>Bebul</b>: Ale tím sis zavřel možnost hrát Monday Fights?!" +
      "<br><br><b>DJ-Pesec</b>: to mi pak taky došlo... ale v ten moment jsem byl vytočený... měl jsem x vyhraných partií a třeba v čase, kdy mi zbývalo 15 vteřin, mi to táhlo až na dvou vteřinách. A obnovit si ho už nemůžu, jak jsem posléze zjistil... protože já se registroval se svým pracovním mailem, který už nemám" +
      "<br><br><b>Bebul</b>: nakonec jsme to vymysleli tak, že DJ-Pesec byl na WEBových stránkách Monday Fights zpětně přejmenován na DJ-Strelec, což je Pěšcův nový lichessový profil, staré partie z webu povedou na partie DJ-Pesce, ačkoli na webu bude psáno, že je hrál DJ-Strelec. Snad se mi konverze povedla korektně. Na některých místech v aktualitách apod. zůstal DJ-Pesec, stejně tak na různých screenshotech, ale to ničemu nevadí. Případné pády webu nebo nesmyslná data stran DJ-Strelce mi, prosím, hlašte." +
      "<br><br><img src='img/kasparov.gif'>" +
      "<br><br><b>Jouzolean</b>: Teda 😁 dj pěšec je taky psychopat, dlouho jsem si myslel že nás inteligenčně převyšuje 😁" +
      "<br><br><b>Bebul</b>: ... říká veliký Jouzoleán, který, když jednou s Bébulkem prohrál, vzteky mobilem švihnul a rozbil si displej."
  },
  {
    id: "ITRyIxHh",
    playOFF: `
      <h2>Robert a Petr Šachy</h2>
      <p>Celý svět čerpá z mouder na portálu Robert a Petr Šachy, kupuje si předplatné a tréninky a ti ostatní pak všude prohrávají.
      Teď je v jednom videu i záznam z našeho Monday Fights!   
      <p>
      <iframe src="https://www.youtube.com/embed/tKbP-76ktOs?si=_Fy0LDwYzUjqP_et" style="width:100%; height: 100vh; margin: 10px 0px" allowFullScreen></iframe>
    `,
    html: "<img src='img/rp-sachy-zive.png'>" +
      "<br><br><b>Bebul</b>: <a href='https://www.rpsachy.cz/'><img src='img/rp-sachy.png' class='img100 right'></a>Dnes nás poctil svou návštěvou CM Petr Koutný, známý z portálu Robert a Petr Šachy a turnaj streamoval na <a href='https://www.youtube.com/c/RobertaPetr%C5%A1achy'>Robert a Petr Šachy</a>. Gratulujeme k vítězství a moc děkujeme!" +
      "<br><br><b>Jouzolean</b>: Tomzr byl ve streamu označen za bombarďáka. 😁 \"Jen si klidně utíkej, nakonec ti ho tam stejně šoupnu<br>jako za mlada.\"" +
      "<br><br><b>Jouzolean</b>: A DJ-Pěšec je<br>panáček couváček 😁 " +
      "<tooltip json='{\"id\":\"RoyalChessyoutube\", \"size\":0.8}' align='center' style='margin:42px 0 5px 0'/>",
    hallOfFame: [98, `<section class="user-top">
      <h2 class="text" data-icon="&#xe016;">
        <a href="https://www.youtube.com/@petrkoutnysachy">CM Petr Koutný</a>
      </h2>
      <div style="margin:5px">
        <div style="text-align:center">  
        <img src='img/rp-sachy-zive.png' style="width:95%">
        </div>
        <p> 
            Dnes, <a href="index.html?mf=ITRyIxHh">13.května 2024</a> jsme se měli! Přišel si totiž s námi zahrát <b>CM Petr Koutný</b>, 
            <a href='https://www.rpsachy.cz/'><img src='img/rp-sachy.png' class='img100 right'></a>
            známý z portálu Robert a Petr Šachy a turnaj streamoval na 
            <a href='https://www.youtube.com/c/RobertaPetr%C5%A1achy'>Robert a Petr Šachy</a>.
            <p> Stihl odehrát parádních patnáct partií, v nichž ztratil pouze jeden a půl bodu. 
            <p> Gratulujeme k vítězství a moc děkujeme!
      </div>
    </section>
    `]
  },
  {
    id: "v5q4R2Fw",
    html: "<br><b>Bebul</b>: <img src='img/players/rychlylenochod.png' class='img100 right'/> to snad už ani není možný? Mat nejpozději 4. tahem padl na Monday Fights celkem 13x. A RychlyLenochod z toho po dnešní šustráčku bere devět kousků! Vypadá to, že má i vous, k němu se ten Rumcajs ševcovskej teda hodí! Loni stačily čtyři tahy k matu pouze RychlyLenochod. Letos, zatím, rovněž pouze jemu. Tak gratulujeme! " +
      "<br><br><b>Bebul</b>: <img src='img/players/tomzr.png' class='img100 left'/> Tomzr si dneska téměř zruinoval rating, když padl o 75 dólů, ale je to opravdu bojovník! Vyhrát 100% berserkem je kumšt a odvaha! A skoro to navíc nevyšlo. Tak to teda veliká gratulace! " +
      "<br><br><b>Bebul</b>: <img src='img/players/mozkomor.png' class='img100 right'/> A mozkomor Monday Fights čtyřikrát vynechal, aby pak přišel, všechny vymydlil a skončil na bedně! Taky gratulujeme!"
  },
  {
    id: "EgykYX4J",
    html: "<br><b>Bebul</b>: Velká gratulace Mrázkovi k vítězství v turnaji! V závěrečném tažení dvakrát vymetl s letos téměř nepřemožitelným tomzrem, podruhé s pastí vedoucí k oběti dámy! A ke všemu se ještě vyhoupl mezi první čtyři v aktuálním leaderboardu! Gráááts! " +
      "<tooltip json='{\"id\":\"Mrazek\", \"size\":0.8}' align='center' style='margin:32px 0 5px 0'/>" +
      "<br><b>Bebul</b>: <img src='img/players/sumaspandy.png' class='img100 left'/> Po milion letech se k turnaji připojil SumaSpandy, aby chytil dámu nováčkovi soutěže, PeinSamaCZe a postaral se tak o senzaci turnaje! Podobnost Suma a Sama je zcela náhodná. K senzační plaketce gratulujeme! " +
      "<br><br><img src='img/smichovskySoudek.jpg'><div align='center'><i>Na turnaji Smíchovský Soudek, zleva LastScout, Tekele, Jouzolean a Mrázek</i></div>" +
      "<br><b>Bebul</b>: Na turnaji <a href='https://chess-results.com/tnr919077.aspx?lan=5'>Smíchovský Soudek</a> potkali naši borcí další borce, z nichž na Monday Fights vítáme PeinSamaCZe. Přišel, viděl a hned na bedně stanul. Grats! " +
      "<br><br><b>Bebul</b>: <img src='img/achievements/blackDot.png' class='img100 right'/> Černý puntík Tekelovi, Jouzoleanovi, Mrázkovi a LastScoutovi za nereprezentativní chování. Na Smíchovském Soudku se jako tým nepojmenovali Monday Fights! Tak Snad příště!"
  },
  {
    id: "f6h7t9GF",
    html: "<br><b>Bébul</b>: Gratulace PeinSamaCZe k vítěztství v turnaji, navíc s krásně provedeným dušeným matem!" +
      "<board json='{\"id\":\"SszqhFyR\", \"startPlay\":61}'/>"
  },
  {
    id: "PmTSp0ZQ",
    html: "<br><b>Tekele</b>: Gratuluju Mrazkovi k 3. místu, v posledních vteřinách turnaje při vyhrané partii nabídl remízu a zachránil bednu. Vyhráli tak všichni, až na Tekeleho na 4. místě 😁" +
      "<br><br><b>Mrazek</b>: Na mou obranu - remízu v remízové pozici jsem odmítnul... a až na poslední chvíli mi došlo, že každý bod se hodí 🙂 Prostě jsem hrál do poslední sekundy... a to doslova (čas turnaje byl už 0:00 a já myslel, že se to nestihlo). A ano, stydím se za to 😀" +
      "<tooltip json='{\"id\":\"Kamikazeee\", \"size\":0.8}' align='center' style='margin:32px 0 5px 0'/>" +
      "<br><b>Bebul</b>: To jste se vyznamenali. Kdysi jsem udělal plaketku vyvalených vočí, ale byl proti ní odpor. Tak jsem ji zakazal ukazovat mezi plaketkami, ale nechavam ji jako pidiikonku v řadku partie. Za mě to je nesportovní chování. Resp. v tom nedokažu spatřovat bojového ducha." +
      "<br><br><b>Kamikazeee</b>: Tak vzít remízu pár sekund před koncem turnaje remízu je nesportovní? Nabídnout remízu silnějšímu hráči, abych měl dostatek času sehrát ještě partií s někým rovným je nesportovní? A já myslel, že turnaj se hraje proto, abychom si hezky zahrali a vyhráli. Pravidla platí pro všechny stejne. Tady se běžně pozastavuje i nad tím, že někdo soupeři nevzdá s dvěma dámami. :)"
  },
  {
    id: "ihuiXpkI",
    html: "<br><b>Bebul</b>: Dvě zajímavé remízy. O první se postaral RychlyLenochod, když těsně před matem mu Tekele dovolil Pat! Druhá, nejdelší dnešní partie, skončila po padesáti tazích bezradnosti. Inu, chce si to nechat do koncovky nějaké pěšce. Dvě věže proti věži je v blitzání pěknej vopruz!" +
      "<board json='{\"id\":\"JtL66z15\", \"startPlay\":178}'/>"
  },
  {
    id: "aOxS2ctp",
    html: "<b>Bebul</b>: Mezitím někde v odlehlé části vesmíru Bébul s Bukowskicem..." +
      "<img src='img/indiani2024.jpg'/>" +
    "<br><br><b>HonzaHonzaHonza</b>: šest vteřin do konce a vražedný jezdec PainSamaCZe - aneb jak prohrát partii během pár tahů 😄" +
      "<board json='{\"id\":\"4hqfy0Nc\", \"startPlay\":67}'/>"
  },
  {
    id: "8tpLeoHX",
    html: "<br><b>Bebul</b>: RychlyLenochod byl dneska při chuti a pustil se do svého oblíbeného berserkování. A podívejte se, jak s materiálem -9 dal Tekelovi krásný mat!" +
      "<board json='{\"id\":\"OFiiqQIW\", \"startPlay\":65}'/>"
  },
  {
    id: "xU8rUcFi",
    html: "<br><b>Bebul</b>: Mrázku, ty bejku! Rating 1855 v blitzu? No to si snad děláš p**el! Gratuluju!"
  },
  {
    id: "sRMjI0GQ",
    html: "<br><b>Bebul</b>: Bukowskic! Krásně ty! Rating 2115 v blitzu! Tak držíme palce na cestě k 2200!"
  },
  {
    id: "Tx6Hx1Ph",
    html: "<br><b>Bebul</b>: mozkomor je blízko k ratingu 1800! Gratulace!"
  },
  {
    id: "cifpyU8N",
    html: "<br><b>Bebul</b>: V dnešním turnaji se podařilo hned dvěma hráčům uhrát svoje osobní maximum v blitzovém ratingu na Lichessu. Hlavně proto, že se tak podařilo i mně, přidal jsem plaketku s grafem, která sděluje, jaké to maximum bylo. " +
      "Automatická detekce pak dala plaketku celkem osmnácti hráčům. " +
      "Seznam všech lze vždy dostat v searchi pomocí klíčového slova <a href='search.html?q=highest'>highest</a>. " +
      "<br><br><b>Bebul</b>: Lichess dále drží pro každého hráče seznam pěti nejhodnotnějších výher a pěti nejstrašnějších proher. <img src='img/achievements/best.png' class='img100 left'>Nově tyto stahuji a kontroluji, zda se nejedná o partie odehrané na Monday Fights. Pokud ano, obdrží hráči buďto best plaketku, nebo worst plaketku. " +
      "<img src='img/achievements/worst.png' class='img100 right'>Největším donorem skvělých výher je nejsilnější z nás, DJ-Strelec. Seznam partií, ve kterých jeho porazitel drží tuto partii ve svém TOP FIVE seznamu lze najít " +
      "v search enginu pomocí dotazu <a href='search.html?q=loser%3Adj-strelec%20best'>loser:dj-strelec best</a> a je jich úctyhodných čtyřicet!" +
      "<br><br><b>Bebul</b>: Za zmínku dneska stojí nejrychlejší partie turnaje, kde se PeinSamaCZe chytil Jouzoleanovi do Englunďácké pasti, kterou nás naučil sám veliký DJ-Pesec! Škoda, že to je jenom chycená dáma a ne ten mat 😀" +
      "<br><br><b>Jouzolean</b>: Akorát sedím s Rychlým Lenochodem na pivu, po dlouhé době 😁😎<br><br> <img src='img/pivo-rl.jpg'>"
  },
  {
    id: "qMhvu7bi",
    html: "<br><b>Bebul</b>: Jouzolean, mozkomor a DJ-Pesec, mě zaúkolovali, jestli bych nezkusil implementovat stažení partií z Monday Fights, které se dohrály až po skončení turnaje. " +
      "Máme totiž za to, že kolikrát hodnotné bitvy se dobojovaly až po tomto limitu a je škoda je v Monday Fights leaderboardu a databázi partií nemít. " +
      "Partie po limitu se započtou do MF leaderboardu, ukáží se v seznamu odehraných her hráče, budou mít označení budíkostopkama " +
      "a budou se ve všech dalších směrech chovat jako plnohodnotné partie Monday Fights turnaje s vyjímkou Lichess turnajového pořadí a score bodů. " +
      "To nepřepočítávám, vezme se jak to v Lichess dopadlo. Již odehrané turnaje nebudou aktualizovány." +
      "<br><br><img src='img/anketa1.png'/>" +
      "<br><br><b>Jouzolean</b>: Jsem historicky první, kdo bral body po skončení turnaje 🙂" +
      "<br><br><b>Bebul</b>: Lichess tedy píše, že Jouzolean hrál 10 partií a posledních šest vyhrál. Pro Monday Fights web je to ale 11 partií a posledních 7 vyhraných.<br>" +
      "Jadrná tečka s Bukowskicem<br>nakonec! Gratulujeme!" +
      "<tooltip json='{\"id\":\"Jouzolean\", \"size\":0.8}' align='center' style='margin:22px 0 5px 0'/>"
  },
  {
    id: "nvwWKcZI",
    html: "<br><b>Jouzolean</b>: Turnaj století, <img src='img/players/peinsamacze.png' class='img100 right'/>který pro nás, Monday Fighťáky, zorganizoval PeinSamaCZe, se odehrál tuto neděli v pražských Holešovicích. " +
      "Šlo vlastně o dva turnaje, v našem blitzu <a href='https://chess-results.com/tnr969671.aspx?lan=5&art=4&fed=CZE&turdet=YES&flag=30'>3+2</a> " +
      "a pak taky rapidu <a href='https://chess-results.com/tnr969668.aspx?lan=5&art=4&fed=CZE&turdet=YES&flag=30'>11+0</a>. O turnaji brzy více v aktualitách, zde hlavně obrovské díky PeinSamaCZe za vynikající turnaj, který jsme si všichni užili. <img src='img/players/tomas_1989.png' class='img100 left'/> V takovém počtu se hráči Monday Fights naživo ještě nesešli! Dorazil i Tomas_1989 s miminem...  Tím dorovnal počet Monday Fighťáků na rovnejch dvanáct, jako apoštolů!" +
      "<br><br><img src='img/turnajStoleti.jpg'/><div align='center'><i>Zleva: HonzaHonza, Lenochod, Baron Gorc, tomzr, Jouzolean, Mrazek, DJ-Pesec, Tekele, Scout a Bukowskic. Nevešli se PeinSamaCZe a Tomas_1989 s mimčem.</i></div>" +
      "<br><br><b>Jouzolean</b>: Dnes si s náma poprvé zahraje kámoš z Klobouků Pajk013. Hraje teprve krátce, ale celkem mu to už jde. <img src='img/players/pajk013.png' class='img100 right'/>Skupina Klobouků tak dorovnává počet členů Dobříše. 😎 " +
      "<br><br><b>Bebul</b>: Valašské Klobouky, taková díra a takových borců! No tohle? Slovutný Jouzoleán, berserkář RychlyLenochod, Mates co hrál s Navarou, Dzin, Travinho a kdysi ButaCzech, který svůj dušený mat v Blackburne - Kostič zopakoval hned několikrát..."
  },
  {
    id: "3KNb4e98",
    html: "<b>DJ-Strelec</b>: Hlásím své all time hight elo během turnaje (než mi ho zase srazil 3xHonza), tak prosím plaketku 🎖😃" +
      "<br><br><b>Bebul</b>: Gratulace! Ale je to fakt přísný... jediná remíza a všechno ostatní vyhraný a celková bilance +1. Jinak plaketku za maximální dosažený rating by to mělo umět detekovat automaticky. Ptám se na to po každém turnaji Lichessu." +
      "<board json='{\"id\":\"LaupFUz9\", \"startPlay\":160, \"orientation\":\"black\"}'/>" +
      "<br><br><b>Bebul</b>: Někteří se flákají na dovolených, jiní statečně hrajou a honí plaketky 🎖😃 " +
      "<br><br><img src='img/egypt.jpg'>" +
      "<img src='img/heart.png'>" +
      "<br><br><b>Bebul</b>: Turnaj Století konečně reportován v <a href='news2024.html#turnajStoleti'>aktualitách</a>... " +
      "<br><br><img src='img/ts-rapid.jpg'>"
  },
  {
    id: "q4yTm8ok",
    html: "<b>Bébul</b>: PeinSamaCZe v týdnu uhrál svoje maximum v lichess bulletu, 2001. Napsal k tomu: <img src='img/players/peinsamacze.png' class='img100 right'/>" +
      "<i>'Pro mě je to ukázka toho, že když se člověk pro něco rozhodne a věnuje se tomu, jde to. A i když to není jednoduché (a také by nemělo být), právě ta motivace kupředu je něco, co by měl mít každý. Co by mu mělo dávat důvod se ráno budit a večer jít spát. A ano, píšu tu něco extrémně 'deep' a přitom je to příspěvek o šachách - ano je. A také trochu splněný sen.'</i>" +
      "<br>Gratulujeme!" +
      "<br><br><b>Bebul</b>: Dneska jsem si vzpomněl na RychlyhoLenochoda, jak občas protivníka v naprosto prohrané pozici zdrtí matem a trápil jsem Kamikazeeeho, dokud byla nějaká naděje. A teda hejsa! Hejsasá! " +
      "<board json='{\"id\":\"eK98FRsu\", \"startPlay\":42}'/>"
  },
  {
    id: "C0JSuQmL",
    html: "<b>Bébul</b>: Dneska to byl boj. Ležím s blokádou zad, nadopovanej práškama a těším se na Monday Fights, jak si podám Tekeleho. Jenže Teklee se nepřihlásil a nejen to, já taky ne! " +
      "Pro samé nadšení jsem 3x nedokázal zadat svoje heslo (bohužel, není stejné, jako ot naše vstupní do MF) a Lichess mi další pokusy nedovolil, ať si počkám. A tak jsem musel otevřít na mobilu " +
      "Chrome, kde jsem přihlášenej pořád a hrát odtamo. Což bylo strašný... S Kamikazeee jsem dlouho vůbec nedokázal najít tlačitko pro resign, Bébulek nerad vzdává a ještě když to nemůže " +
      "najít?" +
      "<tooltip json='{\"id\":\"bebul\", \"size\":0.81}' align='center' style='margin:40px 0 0px 0'/>" +
      "<br><br><b>Bebul</b>: Nadopovanej práškama jsem pak hrál jak opilej, což na vás, hochy v kravatách a fracích, platilo. To jste nečekali, co, takový majstrštiky!? <img src='img/achievements/berserker.png' class='img100 right'>" +
      "Díky DJ-Pesec za naučení jeho majstr trap-matu v Englundovi, to vždycky potěší, zvlášť proti přesilnému PeinSamovi. " +
      "S berserkujícím tomzrem jsme se několikrát přetahovali o první místo, " +
      "ale on, jak je ženatej, zamilovanej, chce se před ní blejsknout, je nezdolnej. Veliká gratulace! Maestro Berserker je zaslouženě jeho! " +
      "<br><br><b>Bebul</b>: Já vím, že Vám to přijde jako bohapusté chvástání, ale pochopte, že rating 1800, kterým se honosili jen monstra Bukowskico-DJ-Pesco-Tomzrovských rozměrů " +
      "a také samozřejmě maestro Mrázek, tak tenhle rating si dneska urval i Bébulek, a to na Monday Fights, když porazil tuze nebezpečného LastScouta!<br>" +
      "<div style='margin:5px;font-family: \"Roboto\", Sans-Serif; text-align: center;font-size:150%'>Highest rating: <span style='color: green'>1804</span></div>" +
      "A nesmíme zapomenout ani na slovutného Jouzoleána, který má 1800+ furt a pořád, kromě konce tohoto turnaje, kde došlo na vzájemný střet! " +
      "Byla to bitva obrů jako u Homéra, byly tam shluky draků a hyder a mračna přeludů jako u Miltona, byly tam vizionářské přízraky jako u Danta! " +
      "A Bébulek se přehoupl zpátky nad 1800+, zatímco nejslovutnější Jouzolean pod 1800- padl! Může-li být vůbec jaká radost označena za opravdou, kromě tedy vítězství Bohemky nad Duklou, " +
      "je to právě takový závěr turnaje! A co nám k tomu řekl Jouzolean?" +
      "<br><br><b>Jouzolean</b>: grats k výkonu 💪 A samozřejmě k výhře nade mnou 😁 to byla příprava! Ja 2 tydny nehrál, vůbec mi to nešlo. 💪😁 Seš děsnej haluzák! Ale s pajkem jsi prohrál! " +
      "<img src='img/players/pajk013.png' class='img100 right'>" +
      "<br><br><b>Bebul</b>: jo, s tím Pajkem. To je hrozný, jak von to tady na Monday Fights kosí! Sláma mu ještě čouhá z bot, ale podal si i tomzra! Co na tom, že berserkujícího, pořád tomzra! A to se počítá! Gratulace!"
  },
  {
    id: "ohHIXGQB",
    html: "<img src='img/mf-og-pesec-buki.jpg' style='margin:5px 0'>" +
      "<b>Bébul</b>: Dneska po dlouhé době vynechal tomzr, zato hrál bukowskic a DJ-Strelec, které to spolu čtyřikrát spárovalo! <img src='img/players/bukowskic.png' class='img100 right'/>" +
      "To se ovšem bývalý šampion vybičoval k nadlidskému výkonu <b>3-1</b> a nakonec zvítězil i v celém turnaji. Nebylo to ale lehké! LastScouta porazil při stejném bodovém zisku (Sic!) až na lepší performance! Gratulujeme!" +
      "<br><br><b>Bebul</b>: Gratulace také LastScoutovi, jehož rating stoupá k nebi <img src='img/players/lastscout.png' class='img100 right'> jako dým a přetnutí kulaté hranice 1600 lze očekávat na příštím Monday Fight!. Když dneska v poslední partii vyklouzl z Jouzoleanových pařátů, přiklepl si totiž krásný osobáček 1585! " +
      "<board json='{\"id\":\"IBXjbgel\", \"startPlay\":95, \"orientation\":\"black\"}'/>"
  },
  {
    id: "KqWg6eHp",
    html: "<b>Bébul</b>: <img src='img/players/margarita_vlasenko.png' class='img100 right'/> Dneska, už podruhé bez tomzra !!, zato hrála po dlouhé době  Margarita. A že se bylo na co dívat! " +
      "Takhle pěkně rozebrala 3x Honzovu jindy pevnou francouzskou obranu! " +
      "<board json='{\"id\":\"iXn0S7sn\", \"startPlay\":36}'/>" +
      "<br><br><b>Bebul</b>: <img src='img/players/janshorny.png' class='img100 right'/>  Gratulace také Baronu Gorcovi k pěknému vymanění se z Jouzoleanova řetězu. Škoda, že jenom remizoval, protože koncovka to už byla školácky vyhraná." +
      "<board json='{\"id\":\"dVFTjAnl\", \"startPlay\":95, \"orientation\":\"black\"}'/>" + 
      "<br><br><b>Bebul</b>: <img src='img/players/peinsamacze.png' class='img100 right'/> A kdo neví, co hrát na siláka PeinSamuCZe, tak rozhodně vyzkoušejte Englund Gambit! Není třeba se učit " +
      "žádné složité teorie, stačí čtyři tahy. 😅"
  },
  {
    id: "YLVDXHJP",
    html: "<b>Jouzolean</b>: Tohle je hustý. Tekele mi mohl dát mat, ale raději vzdal 😁" +
      "<board json='{\"id\":\"5Ov6KXdw\", \"startPlay\":68, \"orientation\":\"black\"}'/>" +
      "<br><br><b>Bébul</b>: hurá, tomzr se nám vrátil. Gratulace! A taky koukám na Mrázka, třikrát po sobě mu rating letí vzhůru, ještě chvíli a bude zase nad 1800, jak se sluší a patří. Gratulujeme!"
  },
  {
    id: "LuH6Bszf",
    html: "<b>Bébul</b>: dneska se to na prvním místě střídalo jak v hokeji. PeinSamaCZe začal hrát až později a navzlínal až málem na trůn, ze kterého ho na poslední chvíli sesadil Mrázek. " +
      "A ještě navrch k tomu, jako bonus, se dostal na rating 1800! Tak to velká gratulace! " +
      "Ještě teď, víc jak dvě hodiny po turnaji, to určitě doma vypráví manželce a strašně přehání, a ta se chudák nevyspí. Za tým Monday Fights se tímto omlouvám/e. ❤️" +
      "<tooltip json='{\"id\":\"Mrazek\", \"size\":0.81}' align='center' style='margin:40px 0 0px 0'/> " +
      "<br><br><b>Bébul</b>: Sicilské obraně se dneska moc nedařilo, to teda ne, bílí si černé namazali na chleba 6-1, a to se to v řadách černých siláky jen hemžilo! " +
      "Za to Královský gambit dnes za bílé stoprocentní. Nechť řady královských gambiterů houstnou!"
  },
  {
    id: "ORu2IpQv",
    html: "<b>Bébul</b>: Mrázek vyhrál podruhé v řadě. S Jouzoleanem prohrál až po limitu, což vlastně tag ňák říká, že dneska tak trochu vyhráli voba dvá. Gratulace oběma! " +
      "<br><br><b>Bébul</b>: Jouzolean v nejrychlejším matu skolil Bukowskice osmým tahem. Hustokrutopřísný. V turnaji odehrál Jouzolean svou 17000. partii na Lichess. Gratulace!"
  },
  {
    id: "qVDVLcdH",
    html: "<b>Bébul</b>: Bukowskic si dal po <img src='img/players/bukowskic.png' class='img100 right'> předminulém výprasku minule pauzu, aby se dneska vřítil do turnaje se silou vpravdě Herkulovskou. Jenže Herkules dokáže skolit lva nebo hydru, ale nestačil na Bébulkova Slona (Elephant gambit). " +
      "Kdyby pak stihl Mrázka porazit v limitu, vyhrál by i celý turnaj. Gratulace Tomzrovi k vítězství a Jouzoleanovi, že se mu vyvlíknul z řetězu a rovněž pajkovi013 k bedně! A samozřejmě Bukimu ke skvělému výkonu." +
      "<br><br><b>Bébul</b>: Pokud Kamikazeee nekecá, příští Monday Fight turnaj, na státní svátek 28.října, si s námi zahraje" +
      " mezinárodní mistr <a href='https://klatovsky.denik.cz/ostatni_region/lukas-vlasak-vybojoval-titul-juniorskeho-mistra-cr.html'>Lukáš Vlasák</a>! " +
      "O něm jsem se mimo jiné dočetl, že v roce 2009 překvapivě vybojoval titul Juniorského mistra ČR v bleskovém šachu! " +
      "Bude se konat překvapení i na Monday Fights? Uhrajeme aspoň půl bodu? " +
      "<img src='img/players/LukasVlasak.jpg' style='margin-top:10px'><div align='center'><i>IM Lukáš Vlasák, ELO FIDE 2461</i></div>"
  },
  {
    id: "eZy8bwEn",
    html: "<img src='img/mf-og-im-lukas-vlasak.jpg'>" +
      "<br><br><b>Kamikazeee</b>: Lukáš trénuje jako jeden z trenérů Vaška Fiňka, našeho největšího talentu a bývalé světové jedničky do 12 let. " +
      "<br><br><b>Kamikazeee</b>: Lukáš hraje extraligu, je to IM a byl uveden do síně slávy vedle Navary za práci s mládeží. Je to též jeden z televiznich expertů pro Českou televizi na šachy a je držitelem titulu IM." +
      "<br><br><b>Kamikazeee</b>: Na navnadění posílám jeden z náhodně vybraných podcastů ... <a href='https://ceskepodcasty.cz/epizoda/135539'>Jsem rozhodně víc trenér než hráč, svou poslední normu bych uhrát chtěl.</a>" +
      "<br><br><b>Kamikazeee:</b>: Lukáš ale umí ocenit hru a dává rád remízu, když si ji zasloužite ... Tj moje zkušenost a tajný tip. " +
      "<tooltip json='{\"id\":\"Lukas_Vlasak\", \"size\":0.8}' align='center' style='margin:32px 0 5px 0'/>" +
      "<br><br><b>Bebul:</b>: Jé... ja se bránil jako lev lvoucí. A jak Kamikazeee slíbil, dostal jsem dárek. Děkuji!" +
      "<br><br><b>Mrázek:</b>: koukám, že Bebul dostal protekčního půlboda 😃" +
      "<br><br><b>Lukáš Vlasák:</b>: Já jsem o žádném slibu nevěděl, to zase něco opomněl říct 😊. Díky za pozvání." +
      "<br><br><b>DJ Střelec:</b>: Děkujeme za poučné partie 😊" +
      "<br><br><b>Bebul:</b>: Díky Lukáši Vlasákovi, že nám věnoval svůj čas a Kamikazeeemu, že ho k nám dovedl, byť dal tajný tip a teď to prasklo a bude bit. 😅❤️❤️",
    hallOfFame: [97, `<section class="user-top">
      <h2 class="text" data-icon="&#xe016;">
        <a href="https://www.sachycvek.cz/">IM Lukáš Vlasák</a>
      </h2>
      <div style="margin:5px">
        <div style="text-align:center;margin-bottom:5px">  
        <img src='img/mf-og-im-lukas-vlasak.jpg' style="width:80%">
        </div>
        <p> IM Lukáš Vlasák trénuje jako jeden z trenérů talentovaného Vaška Fiňka, bývalé světové jedničky do 12 let.
        Hraje extraligu, je to IM a byl uveden do síně slávy vedle Navary za práci s mládeží. Je to též jeden z televiznich expertů pro Českou televizi na šachy.
        <p> Zahrál si s námi na turnaji <a href="index.html?mf=eZy8bwEn">28.října 2024</a>. Gratulujeme k vítězství a moc děkujeme! ❤️
      </div>
    </section>
    `]
  },
  {
    id: "6j5HZTUw",
    init: function () {
      let config = {
        pgn: "[Date \"2024.11.04\"]" +
          "[White \"Kamikazeee\"]\n" +
          "[Black \"Bebul\"]\n" +
          '[Variant "From Position"]' +
          "[FEN \"8/1pK5/p1p5/8/5k2/PP6/8/8 b - - 1 47\"]" +
          '[SetUp "1"]' +
          "\r\n47... Ke3 48. Kxb7 Kd3 49. Kxc6 Kc3 50. a4 Kxb3 51. a5 Kc4 52. Kb6 Kd5 53. Kxa6 Kc6 54. Ka7 Kc7 55. Ka8 Kc8 56. Ka7 Kc7"
        ,
        showCoords: false, coordsInner: false, headers: true,
        theme: 'purple-diag',
        pieceStyle: 'dubrovny',
        boardSize: 290,
        movesHeight: 60,
        resizable: false,
        orientation: 'black'
      }
      let config2 = {
        pgn: "[Date \"2024.11.04\"]" +
          "[White \"Kamikazeee\"]\n" +
          "[Black \"Bebul\"]\n" +
          '[Variant "From Position"]' +
          "[FEN \"8/8/pK6/1p6/P7/1Pk5/8/8 b - - 0 51\"]" +
          '[SetUp "1"]' +
          "\r\n51... b4 52. Kxa6 Kxb3 53. a5 Kc4 54. Kb7 b3 55. a6 b2 56. a7 b1=Q+ 57. Kc7 Qh7+ 58. Kb8 Kc5 59. a8=Q Kb6"
        ,
        showCoords: false, coordsInner: false, headers: true,
        theme: 'purple-diag',
        pieceStyle: 'dubrovny',
        boardSize: 290,
        movesHeight: 60,
        resizable: false,
        orientation: 'black'
      }
      PGNV.pgnView("board", config)
      PGNV.pgnView("board2", config2)
    },
    html: "<br><b>Bébul:</b> Bukowskic se dneska vřítil do turnaje s nasbíraným ratingem přes 2000 a skvělým výkonem se nad touto hranicí i po náročném Monday Fight udržel. Gratulujeme! " +
      "<tooltip json='{\"id\":\"bukowskic\", \"size\":0.8}' align='center' style='margin:32px 0 5px 0'/>" +
      "<br><b>Bebul</b>: Zajímavá pěšcová koncovka vznikla v klání Bébulka s Kamikazeee. Černý se mohl ubránit prostě tak, " +
      "že si půjde králem pro ty dva bílé pěšce a na ty svoje úplně zapomene. " +
      "<div id='board'></div>" +
      "<br><br><b>Bebul</b>: Po sérii blunderů na obou stranách mohl později Bébulek vyhrát v této pozici. Vítězný postup je tento: " +
      "<div id='board2'></div>"
  },
  { id: "uSHcG6JF", achievements: [{achievement: "black", player: "honzaHonzaHonza", id: "2hUofiie"}],
    html: "<b>HonzaHonzaHonza</b>: Psal jsem si i s Jouzoleanem, bohužel mě potkal stejný osud jako bratrance, na stará kolena jsem se rozhodl pro dálkové studium " +
    "ještě jedné vysoké školy, takže moje i bohužel pondělní večery vypadají takto. Snad to nebude mít dlouhého trvání (studium snad ano, ale to že v tom musím ležet " +
    "každý večer snad ne) a zase budu stíhat šachy, už aby to bylo. Ale dění pečlivě sleduji a doufám, že se k vám zase brzy přidám 💪 " +
    "<img src='img/honza-math.jpg' style='margin:10px 0'>" +
    "<br><b>Bebul</b>: musíme udělit 3xHonzovi černej puntík, že MF fláká, což? Nejde o to, že ho fláká, to třeba DJ-Pesec taky. " +
        "Ale že se vymlouvá na matematiku, která je v tom nevinně! Tady nejsme na Lenochodově turnaji, kde se smí dámy beztrestně napadat. " +
        "A matematika je První Dáma! ❤️"
  },
  {
    id: "jWc23ZDQ",
    html: "<b>Bebul</b>: <img src='img/players/rychlylenochod.gif' class='img100 right'> RychlyLenochod má tu přezdívku jistě proto, že rád hraje berserk. Mnozí z nás, co mu berserk neopětují, na začátku partie zajásají, že tohle by měl být pohodlnej bod. " +
      "No a pak pláčeme, když stojíme na prohru a horko těžko se snažíme Lenochoda utahat na čas. Né vždycky se to ale povede. Dneska nám o tom bude vyprávět sám veliký PeinSamaCZe... " +
      "<board json='{\"id\":\"FxwgyawM\", \"startPlay\":41, \"orientation\":\"white\"}'/>" +
      "<br><br><b>Bébul</b>: <img src='img/players/bebul.gif' class='img100 right'> Ze všech těch zahájení, co nás rmoutí, jedno zlé, obludné, vyniká nade všemi. To s námi zacloumá, zaburácí, má chuť, smělého Bébulka rozdrtit na padrť a jedním mávnutím " +
      "královské křídlo rozbít. Toť <b>Boden-Kieseritzski Gambit</b>. Dneska se ale Bébulek nedal, dneska ne. A to je nejvíc! " +
      "<br><br><b>Jouzolean</b>: Za to, že někdo rozbije Jouzoleanovi Bodena, by se měla udělovat plaketka. 😎"
  },
  {
    id: "3uZkHPK9", achievements: [{achievement: "reporter", player: "kunc99", id: "5jZZthcP"}],
    html: "<b>Bebul</b>: Pánové PeinSamaCZE s Jouzoleánem <img src='img/achievements/reporter.png' class='img100 right'> pro nás znovu uspořádali turnaj v Holešovicích. Po turnaji se k nám do " +
        "Monday Fights turnajů připojil silák Honza Kunc a rovnou sepsal o holešovickém maratonu <a href='news2024.html#turnajStoleti2'>reportáž!</a>" +
        "<br> Děkujeme a gratulujeme k pódiu v Holešovicích i na prvním MF. Buď vítán!" +
        "<a href='news2024.html#turnajStoleti2'><img src='img/mf-og-turnaj2.jpg' style='margin-top:10px'></a>" +
        "<br><br><b>Bebul</b>: <img src='img/players/polgu.png' class='img100 right'> V Holešovicích mě Polgu vymlask matem asi devátým tahem. Jak vidno, zůstal při chuti a dneska stejným zahájením " +
        "překvapil velikého Bukowskice! Gratulujeme k senzaci turnaje!"
  },
  {
    id: "VNBiu9WQ", achievements: [{achievement: "reporter", player: "rychlyLenochod", id: "jn8SYMzb"}],
    init: function () {
      let config = {
        pgn: "[Event \"Monday figts\"]\n" +
            "[White \"kunc99 2155\"]\n" +
            "[Black \"tomzr 2064\"]\n" +
            "[Result \"1-0\"]\n" +
            "[Annotator \"Honza, Kunc\"]\n" +
            "\n" +
            "1.e4 c6 { Komentuje Honza Volf, ten co neumí hrát golf, totiž vlastně Honza Kunc } 2.d4 d5 3.e5 Bf5 4.h4 h6 5.g4 Bh7 6.e6 fxe6 7.Bd3 Bxd3 8.Qxd3 Nf6 9.f4 {[%cal Rb8d7,Gd3g6] [%csl Rd7,Gg6]} " +
            "{Chtěl jsem navždy zabránit protihře e5, ale prioritnější byl rozhodně vývin jezdce na f3.} (9.Qg6+ Kd7 10.Nf3+-) {Útok bílého je nejspíš rozhodující, jezdec skočí na e5 a pozice černého by se brzy měla rozpadnout.} " +
            "9...Qd6?  (9...c5!? 10.dxc5 Qa5+ (10...Nbd7?? {Toto by bylo poměrně tragikomické.} 11.Qg6#) 11.Nc3 Ne4 {s velmi zajímavými komplikacemi - jak tomzr správně po partii napsal do chatu na lichessu: \"ten kůň měl skočit na e4 už dávno\"}) " +
            "10.Nf3 {[%cal Gd3g6,Gg6g4,Gg6e8,Rf6g4] [%csl Rg4,Gg6] Pěšce na g4 samozřejmně nelze brát kvůli dvojímu úderu Qg6+.} 10...Na6?? {Logický vývinový tah, ale překvapivě v podstatě okamžitě prohrává - důvodem jsou extrémně slabá pole e5, g6 a f7.} " +
            "(10...Ne4! {Zde by byla pozice nejasná a objektivně blízko rovnováze.}) 11.Qg6+ Kd8 12.Ne5 Kc7 13.Nf7 Qb4+ 14.c3 Qc4 15.Nxh8 {Počítač preferuje Nd2 s profylaxí proti Ne4, ale moje materialistické braní věže také vede k výhře - mat tam nedostanu, takže věž navíc rozhodne.} " +
            "15...Qd3?? (15...Ne4 16.Rh3 {Silnější je podle počítače Nd2, ale to jsem v partii neviděl a plánoval jsem tedy místo toho zahrát Rh3 a zabránit tím nepříjemnému Qd3. Obojí vyhrává za bílé.} " +
            "16...Nb4 17.Na3 Nd3+ 18.Kf1! Ne5+ 19.Nxc4 Nxg6 20.Nxg6 dxc4 21.Re3+-) 16.Qxd3+- " +
            "{tomzr se vzdal} 1-0",
        showCoords: false, coordsInner: false, headers: true,
        theme: 'wood4',
        pieceStyle: 'gioco',
        boardSize: 290,
        movesHeight: 250,
        resizable: false,
        orientation: 'white',
        autoplay: true,
        startPlay: '18'
      };
      PGNV.pgnView('kunc-tomzr', config);
    },
    html: "<b>Bebul</b>: Rychlý Lenochod <img src='img/achievements/reporter.png' class='img100 right'> napsal reportáž o tom slavném brněnském turnaji, " +
        "kde si navzájem <a href='news2024.html#underground'>pomlouvali</a> svoje mámy a milenky, " +
        "a kde za Monday Fights vybojoval krásné 11. místo! Gratulujeme!" +
        "<a href='news2024.html#underground'><img src='img/undeground-dog.jpg' style='margin-top:10px'></a>" +
        "<br><b>Kamikazeee</b>:Dneska ty šachy pěkně bolely, ale budu mít zase pěknou vzpomínku v podobě tetování na to dnešní čtvrté místo ..." +
        "<img src='img/kami-tet.jpg' style='margin-top:10px'> " +
        "<div id='kunc-tomzr'></div>"
  },
  {
    id: "SB1mCF7y",
    html: "<b>Kamikazeee</b>: Dneska by se přidala ta kamarádka - stačila tedy 80 partií - případně ještě nějaké přidá do začátku. Mohu ji dát pak přístup? Na Lichchess je tam pak jako HGlockk " +
        "<br><br><b>Bébul:</b> Osmdesát partií kvůli Monday Fights! Jo jo, tak tak... je nedočkavá. A hned napoprvé málem na Bedně! Vítáme a gratulujeme! " +
        "<br><br><b>Bébul:</b> Šachujte ji, matujte ji, mučte ji královským gambitem - přece bude nejšťastnějším děvčetem: vždyť hraje Monday Fights! " +
        "<tooltip json='{\"id\":\"HGlockk\", \"size\":0.9}' align='center' style='margin:40px 0 0px 0'/> " +
        "<br><br><img src='img/trapteSiMe.jpg'>"
  },
  {
    id: "lOMngDjT", achievements: [{achievement: "blackGM", player: "kunc99", id: "tPx93jAs"}, {achievement: "blackGM", player: "kunc99", id: "3680270e"}],
    init: function () {
      let config = {
        pgn: "[Event \"MČR blesk 2024\"]\n" +
            "[White \"Kunc, Jan 2044\"]\n" +
            "[Black \"Navara, David 2665\"]\n" +
            "[Site \"Brno, Czech Republic\"]\n" +
            "[Round \"1.1\"]\n" +
            "[Result \"0-1\"]\n" +
            "[Date \"2024.12.21\"]\n" +
            "[ECO \"B12\"]\n" +
            "[WhiteElo \"2044\"]\n" +
            "[BlackElo \"2665\"]\n" +
            "[PlyCount \"56\"]\n" +
            "\n" +
            "1. e4 c6 { Navara si proti silákovi Kuncovi klidně střihne i Jouzoleánem opuštěného Karkokána! } 2. d4 d5 3. e5 c5 4. Nf3 { Honza nechce pěšce zadarmo. Namísto toho zkouší Navaru vlákat do stejných sítí jako Wesley So, který ho takhle porazil! } cxd4 " +
            "5. Nxd4 Nc6 6. Nxc6 { Tak nezkouší. Tady totiž Wesley So Navaru nachytal na švestkách, když zahrál nejdřív c4. Většina grandmasterů ale mění jezdce už teď. Snažit se hrát jako GM, ale přitom nebýt GM, je chyba. Honza musí na školení k Jouzoleánovi! } (6. c4 e6 7. Nc3 Bc5 8. Nxc6) bxc6 7. Bd3 e6 " +
            "8. O-O Ne7 9. Nd2 a5 { Až sem všechny tahy jako z učebnice. } 10. Qe2 Ng6 11. f4 { f4! Skoro jako v Královském gambitu! Nechť řady královských gambiterů houstnou! Karjakin do téhle pozice taky přišel, a Popov viděl, jak zvítězil. } Ba6 " +
            "12. Nf3 Be7 13. Kh1 { Kdo se bojí, sere v koutě. Monday Fighťák by radši zahrál Be3! A nemusel se bát vlka nic! } Bxd3 14. cxd3 O-O 15. Be3 c5 16. Rac1 { Nemůžeš mu, Kunci, na všechno skočit! Měls prostě zahrát g3 a mít big four, nebo jak se tomu říká. To se prej nedá prohrát! } d4 " +
            "17. Bd2 Qd5 { V tomto okamžiku měl přijít zničující úder, na který Honza prostě neměl odvahu. Každej Monday Fighťák by nyní sebral dámu mimochodem! V nastalém zmatku, po zavolání rozhodčního a úpravě hodin by Navara ztratil potřebnou koncentraci a snadno prohrál. } " +
            "18. b3? { Namísto toho béčkový tah, místo áčkovýho a3. Teď se dá Navarův chlapeček do pohybu! } a4 19. bxa4?? { 'To take is a mistake!', to ti maminka nežikala? } Rxa4 20. Rc2 Rfa8 " +
            "21. f5 { Na akci na křídle, protiúder v centru? } exf5 22. Re1!! { A Navara vzdal, neboť na mohutný útok po sloupci e nenašel spolehlivou obranu. } Rxa2 { Aha, tak nevzdal! } " +
            "23. Rxa2 Rxa2 24. e6 fxe6 25. Qxe6+ { První šach v partii! } Qxe6 26. Rxe6 { A Honza si s Navarou vyměnil dámu! Toho zas umíme v Monday Fights ocenit! } Ra1+ " +
            "27. Be1 Kf7 28. Rc6 Nh4 { Na tomto místě Honza vzdal. Správné bylo Nxh4 Rxe1# aby udělal Navarovi radost a první partie skončila, jak se sluší a patří. Každopádně, za prohru s Grand Masterem udělujeme povinný černý puntík. A ke šťastnému losu gratulujeme! } 0-1",
        showCoords: false, coordsInner: false, headers: true,
        theme: 'wood4',
        pieceStyle: 'gioco',
        boardSize: 290,
        movesHeight: 250,
        resizable: false,
        orientation: 'white',
        autoplay: true,
        startPlay: '2'
      };
      PGNV.pgnView('kunc-navara', config);
    },
    html: "<b>Kunc99</b>: Bohužel jsem dnes prohrál hned se dvěma GM 😅 a jen remizoval s jedním dost starým IM " +
        "<img src='img/kuncNavara.jpg'><div style='text-align: center'><i>Honza Kunc v partii s Navarou v Brně otevíral MČR v Blitzu!</i></div>" +
        "<br><b>Jouzolean:</b> Tak hned 2 černé puntíky za den! 😁Hezky to sbíráš! " +
        "<br><br><div id='kunc-navara'></div>"
  },{
    id: "bq5NczDG",
    achievements: [{achievement: "reporter", player: "bebul", id: "knl4Ooog"}, {achievement: "reporter", player: "jouzolean", id: "bVOh8fzU"}],
    html: "<b>Bébul</b>: Tomzrovi chybělo tento turnaj uhrát jeden ušmudlaný bod, aby dorovnal Bukowskičův rekord 371 bodů z roku 2021. A jeden a půl bodu k jeho překonání. Tomzr ale dneska nehrál, takže prémiový 53.turnaj nevyužil. " +
        "<br><br><b>Bébul:</b> <img src='img/players/tekele.png' class='img100 right'> Zato Tekele řádil jak pominutej. Z posledního místa tabulky se nejdřív přehoupl přes pisatele těchto řádků. A aby mu to nestačilo, zmlátil i Kamikazeeeho. Bébulka taková brutalita tuze polekala. Se Scoutem prohrává furt a pořád, " +
        "a tak se pokusil na poslední chvíli uhrát potřebnýho boda. Spárovalo ho to s Mrázkem, což vypadalo věru nesnadně. Bébulek ale postupně utahoval pozici, až Mrázka o ten bod picnul. Engine si myslí, že " +
        "teda Mrázek stál totálně na výhru, jen si nechal dát mat. Bébulek ale takovéhle složitosti neviděl a měl celou dobu za to, jag to krásně hraje! " +
        "<br><br><b>Bébul:</b> O pořadí na poslední a předposlední příčce pavouka tak rozhodla až vyšší performance. "
  },{
    id: "playOFF2024",
    achievements: [{achievement: "pink", player: "HGlockk", id: "ABgcbU37", desc: "Hrozně to tu hrotíte!"},{achievement: "reporter", player: "Kamikazeee", id: "cBMQBydt"},
      {achievement: "reporter", player: "DJ-Strelec", id: ""}],
    playOFF: "<img src='img/turnajPavouk2024.jpg' style='width:100%;margin-top: 5px'>",
    html: "<h1>PlayOFF 2024</h1>" +
        "<b>Bebul:</b> Zde odkazy na minulé PlayOFF turnaje <a href='index.html?mf=playOFF2020'>2020</a>, <a href='index.html?mf=playOFF2021'>2021</a>, <a href='index.html?mf=playOFF2022'>2022</a>, <a href='index.html?mf=playOFF2023'>2023</a>." +
        "<br><br><b>DJ-Strelec:</b> Pro letošek jsme s Jouzoleanem připravili novinku – Tipovačku play off, z níž se na základě získaných bodů za přesné tipy ze všech sérií po skončení turnaje vybere nejlepší tipér, který bude oceněn plaketkou. Zúčastnit se jí mohou úplně všichni, tedy i ti, kteří play off nehrají. Pravidla jsou jednoduchá: v anketě se tipuje vítěz (za jeden bod) a počet bodů získaných poraženým (za druhý bod). Tipovat lze až do zahájení první partie, na pozdější tipy již nebude brán zřetel. " +
        "<img src='img/tipovacka2024.jpg' style='margin-top:5px'>" +
        "<br><b>Kamikazeee</b>: Ty vole a jdu slavit!<br> Kurva. Jo!<br>" +
        "<video controls='controls' style='max-width: 100%'><source src='img/tyVoleAJduKurvaSlavitJo.mp4' type='video/mp4'/></video> " +
        "<br><br><b>Kamikazeee:</b> Reportáž z plaOFF jsem sepsal do <a href='news2025.html#kamikazeee2024'>aktualit</a>."
  },{
    id: "c1tC3P7b",
    specClass: ["turbulence40", "turbulence30"],
    html: "<b>HGlockk:</b> Vy to berete všichni nějak hrozně vážně ne 🙈  <img src='img/players/jouzolean.png' class='img100 turbulence right'>" +
        "<br><br><b>Jouzolean:</b> Ono to je vážné. 😁 " +
        "<br><br><b>DJ-Strelec:</b> ... za tu poznámku bych dal černý puntík! 😀 " +
        "<br><br><b>LastScout:</b> Jestli ho bude mit Hana, ja ho chci taky!!! " +
        "<br><br><b>HGlockk:</b> <img src='img/achievements/pinkDot.png' class='img100 turbulence30 right'> Já bych ráda růžový puntík když už teda 😌 " +
        "<br><br><b>Bebul:</b> Dostala ho jenom HGlockk, v turnaji <a href='index.html?mf=playOFF2024'>PlayOFF 2024</a>. " +
        "<br><br><b>LastScout:</b> Na to jde rict jen jedine….. to neni fer. " +
        "<br><br><b>Bebul:</b> dneska jsou asi ňáký turbulence, nebo co? 😅"
  },{
    id: "NGzduBq9",
    html: "<b>Bebul:</b> Na závěr loňského roku se Jouzoleanovi podařilo překecat Mrázka, <img src='img/players/mrazek.png' class='img100 outline right'> aby znovu hrál <b>e4 e5</b>. Přece nechce hrát celej Monday Fights Owena nebo Modern defense, " +
        "to jest utíkat do ňákých zatuchlých koutů světa jenom proto, že se bojí léček a pastí, který na něj číhají v jeho milované Italce. Do konce roku hrál hezky <b>e4 e5</b>, dovolil Italku i Královský gambit, " +
        "ale v novém roce se zatím spíše uchyluje k útěkům typu <b>b3,b6,g6</b>. No hrůza! Kéž by se zase umoudřil a hrál něco víc sexy. To si přejeme a za to se přimlouváme! ❤️ " +
        "<br><br><b>Bebul:</b> K redakci se ale dostala čerstvá informace, že v podobném gardu vzplál oheň mezi Jouzoleánem a Kamikazeeem. Tentokrát však nikoli o prvním tahu ve druhém sloupci z kraje," +
        "<img src='img/players/jouzolean.png' class='img100 outline left'> " +
        "ale hned v tom prvním. Kamikazeeemu pan Ambrož vštěpoval, že tah <b>1. a3</b> se hodí všude, a že pak může přejít do různých zahájení a to tempo chybět nebude. " +
        "<img src='img/players/kamikazeee.png' class='img100 outline right'>" +
        "Oproti tomu, Jouzoleán si myslí, že tah <b>1.a3</b> nebo <b>1...,a6</b> je sračka. No jo, už je to tak, klucí se nám před turnajem trochu chytli, " +
        "a tak dneska došlo na lámání chleba. Kamikazeeemu budiž ke cti, že si za svou pravdou stál. A&nbsp;Jouzoleanovi? Jouzoleanovi buď dík, že s tím vymet.! 😂 Merci beaocoup! " +
        "<br><br><b>Bebul:</b> No a senzace turnaje, Rychly Lenochod s <img src='img/players/rychlylenochod.png' class='img100 outline left'> Michaelem Chmielem, to je " +
        "přesně ten Rychlý Lenochod, pro nějž více než pro kohokoli jiného platí, že naděje umírá poslední! " +
        "Opravdu krásnej berserk! Gratulujeme! " +
        "<br><br><b>Bebul:</b> Nechť řady královských gambiterů houstnou!"
  },{
    id: "6M8W1ueJ",
    achievements: [{achievement: "beatGM", player: "tomzr", id: "LiDBsou6"}, {achievement: "blackXX", player: "Kamikazeee", id: "sex-misto-cveka", desc: "Zapomněl na Cveka"}, {achievement: "pink", player: "HGlockk", id: "uceni-muceni", desc: "Radši se učila"}],
    playOFF: `
      <h2>Robert a Petr Šachy</h2>
      <p>Celý svět čerpá z mouder na portálu Robert a Petr Šachy, kupuje si předplatné a tréninky a ti ostatní pak všude prohrávají.
         Loni nás poctil svou návštěvou Petr Koutný na turnaji <a href="index.html?mf=ITRyIxHh">v květnu</a>.
         A tady je krásný záznam z našeho dnešního Monday Fights s Velmistrem Robertem Cvekem. Děkujeme!   
      <p>
      <iframe src="https://www.youtube.com/embed/B2PVuI9k4m0?si=yl35mqDAezkQNbxf" style="width:100%; height: 100vh; margin: 10px 0px" allowFullScreen></iframe>
      `,
    html: "<div align='center'><h3>Monday Fight</h3><h2>s GM Robertem Cvekem</h2></div>" +
        "Dnes byl pro Monday Fighťáky svátek, neboť nás poctil svou návštěvou Velmistr Robert Cvek, a to již potřetí. " +
        "Poprvé to bylo v roce <a href='index.html?mf=fXU6tfJM'>2022</a>, podruhé v roce <a href='index.html?mf=PJnn9LQi'>2023</a> a dneska, do třetice všeho dobrého, dokonce s natočením videa na youtube <a href='https://www.youtube.com/c/RobertaPetr%C5%A1achy'>Robert a Petr Šachy</a>! " +
        "<a href='https://www.rpsachy.cz/'><img src='img/rp-sachy.png' class='img100 right'></a>  " +
        "<p><i>Pozn.: Jestli ještě neznáte youtube Robert a Petr Šachy, klikněte si na černou ikonku a šachově se dovzdělejte :-)</i> " +
        "<a href='https://www.youtube.com/playlist?list=PLNh_R4J8WvZc8iEelfyuVYuOIovbcR8Qh'><img src='img/speku-kus.png' style='margin-top: 10px'></a>" +
        "<div align='center' style='margin: -15px 0 0 0'><i>Nebo ještě spíš na Špeku kus!</i></div>" +
        "<p>Slovutný Jouzoleán, jak hrdobec hrdý na náš Monday Fights turnaj, bombardoval Roberta Cveka s upomínkami, že konec roku se blíží a s ním i zlatý hřeb turnaje, to jest právě účast Roberta Cveka na našem turnaji. " +
        "<p>Ale na konci roku to nevyšlo a v lednu to taky nakonec padlo, tak už se nejeden Monday Fighťák začal bát, jestli na tu slávu vůbec dojde. Ten nás ale nenechal dlouho na pochybách a dnes do naší hustokruté arény odvážně vstoupil. Moc děkujeme! " +
        "<br><br><b>Jouzoleán:</b> Ja vůbec nevěděl co mam dělat se Cvekem 😁. Takhle pasivně jsem se ještě necítil. Byl jsem donucen psychicky zahrát Kg8--Kh8. Protože jsem nevěděl jak pokračovat 😁. Za 2 další tahy smrt... " +
        "<tooltip json='{\"id\":\"sachycvek\", \"size\":0.9}' align='center' style='margin:42px 0 0px 0'/> " +
        "<br><br><b>Bébul:</b> Jiní taky nevěděli, co proti Robertu Cvekovi hrát, ale jak říká Kamikazeee, dej šach a třeba to bude mat. A tak se to stalo... " +
        "<br><br><b>tomzr:</b> mission done :) " +
        "<br><br><b>Bébul:</b> Blunder v podobě dvoutahového matu! Určitě nejslavnější blunder v historii Monday Fights. Ve WhatsApp diskusi pak bylo vidět, že někteří hráči to tomzrovi trochu záviděli. Postěžovali si, že jim takový blunder nabídnut nebyl 😁. " +
        "<br><br><b>Kunc99:</b> ...hrál to zkušeně, držel si lepší čas a byla vidět ta kvalita. Asi si se mnou dával větší pozor :-D " +
        "<br><br><b>tomzr:</b> a kde je plaketka \"porazil velmistra\"? " +
        "<br><br><b>Bébul:</b> Nevím, jak namalovat štěstí, které se usmálo na otrhánka. " +
        "<br><br><b>tomzr:</b> jéé, já umím malovat :-D <img src='img/achievements/beatGM.png'> " +
        "<br><br><b>Bébul:</b> No, ale tomzrovi ta sláva stoupla do hlavy. Mozek mu dělal výkruty a tak se stalo, že senzací turnaje není jeho výhra nad Velmistrem, ale jeho porážka s Rychlým Lenochodem, kde byl ke všemu přetržen řetěz dvanácti předchozích proher! A takhle to v našem milém Monday Fights chodí! " +
        "Štěstí se sice usmálo na Otrhánka, ale pak si řeklo, že to asi právěže kouda přehnalo, tak se to muselo nějak zaretušovat, právěže. " +
        "<br><br><b>Bébul:</b> Tomzře, víš? Nevíš, viď? Ty zas nic nevíš! 😁",
       hallOfFame: [96, `<section class="user-top">
         <h2 class="text" data-icon="&#xe021;">
           <a href="https://www.sachycvek.cz/">GM Robert Cvek</a>
         </h2>
         <div style="margin:5px">
           <div style="text-align:center;margin-bottom:5px">  
             <img src='img/speku-kus.png' style="width:80%">
           </div>
           <p> Na začátku roku, <a href="index.html?mf=6M8W1ueJ">10.února 2025</a> jsme se na turnaji pěkně zapotili, neb nás přišel vyškolit Velmistr Robert Cvek, a to již potřetí! 
             Turnaj dokonce streamoval na youtube, takže jsme si pak mohli
             zkontrolovat 😁, komu byla uštědřena chvála, komu hana. 
           <p> Moc, moc děkujeme! ❤️
         </div>
      </section>
    `]
  },{
    id: "siz0zGXl",
    html: "<b>Bébul</b>: Asi nejnižší účast nejmíň od pádu Tunguzského meteoritu! KUDOS všem, kdo se turnaje zúčastnili. Nezhyne Monday Fights, když hrát nepřestanem."
  },{
    id: "VPIRgE80",
    achievements: [{achievement: "blackXX", player: "Kamikazeee", id: "DPUAJuPy", desc: "Kritický NoStart"}],
    html: "<img src='img/achievements/blackDot.png' class='img100 pixelate5 right'><b>Bébul</b>: Kamikazeee asi musí dostat černý puntík, ne? Chápu, že se to může stát každýmu, ale <b>NoStart</b> úplně na konci turnaje, který rozhodne o vítězi, to se nedá nic dělat. Souhlasíte? " +
        "<img src='img/halloween/houpacka.webp' class='img100 outline1 right'><br><br><b>Alexandra Botez:</b> A můj Bébulek se dneska přehoupl přes Mozkomora! Gratuluju! Et bisou ! 💋"
  },{
    id: "NV92LWgc",
    html: "<b>bebul</b>: Tomzr dneska k nezastavení! Ani HGlockk ho nedokázala zastavit. Gratulujeme! " +
        "<tooltip json='{\"id\":\"tomzr\", \"size\":0.9}' align='center' style='margin:42px 0 0px 0'/> " +
        "<br><br><b>Bébul:</b> <img src='img/players/peinsamacze.png' class='img100 right'>A PeinSamovi gratulace ke krásnému osobáčku! Mrázek ho pak sice z rekordu okamžitě svlíknul 😁, ale i tak, paráda!"
  },{
    id: "M41qygl5",
    html: "<b>bebul</b>: <img src='img/players/rychlylenochod.png' class='img100 right'>RychlyLenochod v senzaci turnaje vzácně ztrestal <b>Jouzolean's signature move</b>, a to v berserku! Gratululeme! " +
        "<board json='{\"id\":\"wMiWA0yC\", \"startPlay\":11, \"orientation\":\"black\"}'/>"
  },{
    id: "dgcqvMa0",
    html: "<b>bebul</b>: <img src='img/players/tekele.png' class='img100 right'> Nějak nám hromada hráčů stávkuje. Na HGlockk se jeden porád těší... <b>Tekeleho vítáme zpět!</b> Po dnešku 80 partií. Já se k Monday Fights taky dostanu jen zřídka, LastScout " +
        "se taky nakrknul, že mu to prej nejde, nebo co, a že dokud se nezlepší, nepřijde. Jako bych slyšel sám sebe! 😁 Já ale vždycky jenom hromuju, a pak přece přijdu. Tak se to má dělat, víte? " +
        "<br><br><b>Bébul:</b> <img src='img/players/bukowskic.png' class='img100 right'> Účet Bukowskice úplně přestal existovat! Podobně jako kdysi DJ-Pesec si svůj účet sám smazal. " +
        "Okolnosti, detaily, pikantnosti natož záznam tohoto okamžiku nejsou známy. Na šachy sice nezanevřel, neb hraje pod účtem <a href='https://lichess.org/@/Daniel_Cervenka'>Daniel_Cervenka</a>. " +
        "Nicméně na Monday Fights se už hoóóóóóódně dlouho neukázal! Až se ukáže, dostane navíc černý puntík, za to smazání původního účtu  😌"
  },{
    id: "jSMDWGTP",
    html: "<b>bebul</b>: Kunc byl dneska k nezastavení! Ani tomzr, ani Jouzolean, ho nedokázali zastavit. Ještě štěstí, že jsem s ním nehrál! Teda, co to plácám, chci říct, že měl štěstí, že se mnou nehrál! 😁 " +
        "<tooltip json='{\"id\":\"kunc99\", \"size\":0.9}' align='center' style='margin:42px 0 0px 0'/> "
  },{
    id: "5Na3Gooi",
    html: "<b>bebul</b>: Polgu dneska neskutečně čaroval! Gratulujeme! " +
        "<tooltip json='{\"id\":\"polgu\", \"size\":0.8}' align='center' style='margin:42px 0 0px 0'/> "
  },{
    id: "3TaZ9wkS",
    html: "<b>bebul</b>:  <img src='img/players/mozkomor.png' class='img100 right'>Jen hrstka statečných dovolí bráškům Mozkomorovi a Bébulovi hrát Královský gambit. DJ-Strelec je jedním z nich. Stejně jako Mrázek volí jako protiúder tah d5... " +
        "Protože Mozkomor hraje v pátém tahu c4, Bébul hraje zásadně Bc4 - a tak musí být černí připraveni na obě dvě varianty, zatímco bráškům stačí každýmu jen jedna. " +
        "Díky tomu je jejich mysl stále svěží a máme tady senzaci turnaje!" +
        "<br><br><b>Bebul:</b> Statistika mozkomor vs dj-strelec v této <a href='search.html?q=%22e4%20e5%20f4%20d5%20exd5%20exf4%20Nf3%20Nf6%20c4%20c6%20d4%20cxd5%20c5%22%20dj%20mozk'>variantě</a> je 3-6."
  },{
    id: "gwjZm8YL",
    achievements: [{achievement: "blackGM", player: "kunc99", id: "yGH3ErDu"}],
    html: "<b>kunc99</b>: Ahoj, dneska si osobně zahraju s Robertem Cvekem - bude hrát rapid turnaj v kavárně Gambit v Praze a jsem tam přihlášený. 😊 Sorry, že dávám vědět takhle na poslední chvíli, ale pokud třeba jste někdo teď v Praze, rád vás tam uvidím. " +
        "<img src='img/cvek-kunc.jpg'>" +
        "<br><b>kunc99:</b> Chytl jsem ho až v posledním kole. Bohužel 0:1, ale měl jsem ho na lopatě, kdybych to nepokazil 😅 Cvek udělal 7/7 👌 " +
        "<br><br><b>Bebul:</b> Jouzo, co mám dneska proti tobě hrát? " +
        "<br><br><b>Jouzolean:</b> Tohle jsme řešili nedávno, přece: <b>e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5</b> 😀 " +
        "Problémem je, že já tady hraju Jouzoleanův tah Dh5 a neberu koněm pěšce. Ale to bys mě hravě po přípravě přehrál. Všichni padaj jak Hrušky. Taky je to  až 8. nejčastější tah. S DJ-Pescem jsme ho nazvali <b>jouzoelanovým tahem</b>." +
        "<br><br><b>Alexandra Botez:</b>  Ty můj milý Bébulku, máš odvahu! Škoda, že Jouzolean ten svůj signature move nezahrál, viď? Gratuluju! Et bisou ! 💋 " +
        "<board json='{\"id\":\"WmFcVCZU\", \"startPlay\":10, \"orientation\":\"black\"}'/>"
  }, {
    id: "MhVSrIfb",
    achievements: [{achievement: "pink", player: "jouzolean", id: "0oALuR6u", desc: "Svatebně opojen"},{achievement: "pink", player: "pajk013", id: "F0zjqkfz", desc: "Hlídal kocoura"}],
    playOFF: `
      <h2>Jouzoleán se ženil!</h2>
      <p>
      O senzaci týdne se postaral Jouzoleán, když to dokázal zařídit tak, že se ženil ve čtvrtek a nikoli v pondělí. 
      Tím pádem se nemusel z turnaje trapně omlouvat, za což mu náleží růžová plaketka! 
      <p>
      <img src='img/players/tekele.png' class='img100 left'><img src='img/players/rychlylenochod.png' class='img100 right'>
      Na svatbě byl i Tekele a Rychlý Lenochod. Pajk hlídal kocoura. Nó, a když tam měli Tekeleho takhle na lopatě, 
      jistě mu do duše promluvili a stopro se na něj můžeme na Monday Fights zase brzy těšit! Jáááááááách!
      <p>
      Tekele se vymlouval, že už ani Buk nehraje. <i>Tákže, milý Buku, šampióne dávnověku, kvůli tvému laxnímu přístupu i takoví držáci, 
      jako je Tekele, propadli démonu lenivosti! Jak tohle jednou u nebeských bran pánu Bohu vysvětlíš, to nevím...</i>  
      <p>
      Jak byl Jouzoleán naměkko, hrál proti Bébulkům a Mozkomorům jen a pouze Královský gambit. Jáááááách!
      <p>
      Nechť řady královských gambiterů houstnou!
      <img src='img/jouzoleanSvatba.jpg' style='width:100%;margin-top: 5px'><div align='center' style='margin-bottom:10px'><i>Jouzoleán + Bára = VLPPPPMPK</i></div>      
    `,
    html:
        "<b>Garry Kasparov</b>: Se svatbami mých velkých <img src='img/achievements/pinkDot.png' class='img100 right'> pokračovatelů se teď trhá pytel. Nejdřív Magnus a teď i Jouzoleán! Tak veliká gratulace " +
        "a ať se v šachu i nadále daří! " +
        "<br><br><b>Bébul</b>: A řady královských gambiterů houstnou! <img src='img/players/pajk013.png' class='img100 right'>" +
        "Především velká radost z pajka, který, zdá se, přichází královskému gambitu na chuť! " +
        "<img src='img/players/jouzolean.png' class='img100 left'><p> Krom toho se dneska, ještě ve svatebním opojení, do gambitu pustil i Jouzoleán. A hrál ho i za bílé! " +
        "<br><br><b>Jouzolean:</b> S Pajkem teď hodně hrajeme. A hrajeme teď královský gambit. Wau! Wau! " +
        "<br><br><iframe src=\"https://lichess.org/embed/game/tbaa8ev8#38?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>"
  }, {
    id: "VoCVxr3s",
    html: "<b>Bébul:</b> Dneska si s námi, po dlouhé pauze 😭, zahrál maestro Tekele. <img src='img/players/tekele.png' class='img100 right'> " +
        "A byla to jízda! První partii krásně přehrál Mrázka, ale ve vyhrané koncovce, se střelcem navíc, neudržel nervy na uzdě a nechal to jenom za remízu. " +
        "Pak mu ale přišel pod ruce slovutný Jouzoleán. Ten nakonec nenechal diváky dlouho na pochybách, jak se z obtížné situace vylže " +
        "a v prohrané pozici raději padl na čas. Osud tomu chtěl, abych přišel pod kudlu jako třetí... " +
        "Hrála se Frankenstein Dracula varianta Vídeňské hry, kde byla na MF teprve podruhé příšera vypuštěna. <img src='img/alster-drakula.jpg'>" +
        "Dodnes neutichly spory teoretiků o to, zda materiální výhoda bílého je víc, než masivní útok černého a ani četné partie sehrané mezi " +
        "Jouzoleanem a Tekelem na toto téma situaci nevyjasnily. " +
        "<p> Předtím se varianta hrála na hodně zajímavém turnaji, kde se bil Bukowskic s DJ-Strelcem a Neznama-00 porazila LastScouta! " +
        "K vidění <a href='index.html?mf=omFEO2Vz'>tady</a>. " +
        "<br><br><b>Bébul:</b> Tekele mi po turnaji prozradil, že nejsem jediný, kdo dostal přesně stejnou léčkou za vyučenou. Jouzolean, v rapidu <a href='https://lichess.org/Ri9dh6Fr#29'>taky</a>." +
        "<br><br><b>Mrázek:</b> tyjo, jsem přehlíd dvojtažku, chjo, nedáš-dostaneš... a ještě jsem tím dal Bébulovi výhru v poslední sekundě a nechal ho, aby mě přelezl..." +
        "<br><br><b>Tomzr:</b> <img src='img/players/tomzr.png' class='img100 right'> Tomzrovy plaketky, to nejsou partie, to jsou skutečná koncertní díla! Ta dáma za mat, to je překrásně provedenej <a href='https://lichess.org/6JRhCDlJ#62'>dušenej mat</a>," +
        " akorát namísto udušení za vlastním pěšcešm, je pole kryto střelcem. Je vidět, že tomzr kouká nejmíň o tah dál než my, obyčejní smrtelníci!"
  }, {
    id: "NQXmhfdq",
    html: "<b>Bébul:</b> Polgu nás teď všechny krutě stíhá, pronásleduje a týrá. Čelí nejtěžším soupeřům - a když dostane na oddych Bébulka, střihne si ševce sedmým tahem. A nasbírá pět plaketek! Minule brečel Mrázek a Mozkomor, dneska Jouzolean a já. " +
        "Já teda brečím ještě teď :-D Gratuluju! " +
        "<tooltip json='{\"id\":\"polgu\", \"size\":0.8}' align='center' style='margin:40px 0 0px 0'/>" +
        "<br><br><b>Bébul:</b> A Mrázek třetí vítězství v posledních deseti turnajích! Veliká gratulace! "
  }, {
    id: "9tGeBOOg",
    html: "<b>Bébul:</b> Letos padl šustřáček jenom čtyřikrát. <img src='img/players/polgu.png' class='img100 right'> A pokaždé se u toho radoval Polgu. Dva z nich jsou navíc nejrychlejší maty letošního roku! " +
        "A dneska se to Polguovi podařilo proti nikomu menšímu, než MichaeluChmielovi! Čtvrtým tahem ztrestaná Anglická hra. " +
        "A tomzra zblajznul 12. tahem! Nejrychlejší dva maty dneška! Veliká gratulace! <br><br>" +
        "<img src='img/mf-og-polgu-nd.jpg'><br><div align='center'><i>Polgu řádí i jako vodník</i></div>"
  }, {
    id: "anhyga7D",
    achievements: [{achievement: "blackXX", player: "bebul", id: "JB5gDpQr", desc: "Nevyhrál co vyhrát měl"},
      {achievement: "pink", player: "pajk013", id: "ZdRlgkrL", desc: "Hraje čím dál líp"},
      {achievement: "pink", player: "Tekele", id: "yHUsHMWD", desc: "Vyhrál Levenfishe"},
      {achievement: "blackXX", player: "kasparov", id: "QKcc2NWB", desc: "Královské Gambity!"},
      {achievement: "pink", player: "kunc99", id: "QKcc2NWB", desc: "Ať žije Ibalgin"},
    ],
    html: "<b>Kunc99:</b> <img src='img/halloween/skeleton10.webp' class='img100 right'> Gratulace @Jouzolean 👍 včera jsem přemýšlel, že si taky zahraju, ale večer mě bolela hlava a nebylo mi dobře, tak jsem se na to vykašlal. Plánoval jsem se připojit teda primárně hlavně proto, protože mě zajímalo, co bude můj Halloween avatar 😁😅" +
        "<br><br><b>bebul:</b> Jouzoleanovi se podařilo chytit Tomzra do pasti, kterou nám s Mozkomorem dopředu prozradil: <b><i>Skandinávská obrana, Icelandic Palme Gambit</i></b>. " +
        "Máme privátní studii na Lichess, která má 27 kapitol a souhrnně se jmenuje <b><i>Jouzoleánovy pijavice na ELO</i></b>. " +
        "Většinu těch pastí na Monday Fights už uplatnil, často proti bukowskicovi. Na něj spousta nevyšla, ale pasti, například mat rošádou, sklaply v jiných Jouzových partiích. Velká paráda." +
        "<board json='{\"id\":\"fObDdyXZ\", \"startPlay\":10, \"orientation\":\"black\"}'/>" +
        "<tooltip json='{\"id\":\"Jouzolean\", \"size\":0.9}' align='center' style='margin:42px 0 0px 0'/> " +
        "<br><br><b>bebul:</b> Grats Tekelemu. Hráli jsme spolu našeho jedenáctého Levenfishe. A Tekele poprvé vyhrál. Uděluju plaketku. "
  }, {
    id: "JENXgrLE",
    html: "<b>Bébul:</b> Vítáme zpátky <b>Bukowskice!</b> <img src='img/players/daniel_cervenka.png' class='img100 right'> Nyní hraje pod přezdívkou <a href='https://lichess.org/@/Daniel_Cervenka'>Daniel_Cervenka</a>. " +
        "Jak se ukázalo, návrat to byl tuze těžký a nedostal nic lacino. Zvlášť Tekele zazářil se svým Barmen defense! Gratulace všem!"
  }, {
    id: "sJfEfav7",
    achievements: [{achievement: "reporter", player: "bebul", id: "WYCkxWIg"}, {achievement: "reporter", player: "jouzolean", id: "LiAvxxf5"}],
    html: "<b>Bébul:</b> Sláva slovutnému Jouzoleánovi ke třetímu zisku šampiona Monday Fights! " +
        "<video width='100%' controls>\n" +
        "  <source src=\"img/jouza.mp4\" type=\"video/mp4\">\n" +
        "</video>"
  }, {
    id: "playOFF2025",
    achievements: [{achievement: "pink", player: "HGlockk", id: "ABgcbU37", desc: "Hrozně to tu hrotíte!"},{achievement: "pink", player: "Daniel_Cervenka", id: "iQ6JNYFw", desc: "Hraje aspoň tipovačku!"},
      {achievement: "reporter", player: "DJ-Strelec", id: "UwcPoxqy"}],
    playOFF: "<img src='img/playOFF-2025.jpg' style='width:100%;margin-top: 5px'>",
    html: "<h1>PlayOFF 2025</h1>" +
        "<b>Bebul:</b> Zde odkazy na minulé PlayOFF turnaje <a href='index.html?mf=playOFF2020'>2020</a>, <a href='index.html?mf=playOFF2021'>2021</a>, <a href='index.html?mf=playOFF2022'>2022</a>, <a href='index.html?mf=playOFF2023'>2023</a>, " +
        "<a href='index.html?mf=playOFF2024'>2024</a>." +
        "<br><br><b>DJ-Strelec:</b> Nezapomeňte na Tipovačku play off, z níž se na základě získaných bodů za přesné tipy ze všech sérií po skončení turnaje vybere nejlepší tipér, který bude oceněn plaketkou. Zúčastnit se jí mohou úplně všichni, tedy i ti, kteří play off nehrají. Pravidla jsou jednoduchá: v anketě se tipuje vítěz (za jeden bod) a počet bodů získaných poraženým (za druhý bod). Tipovat lze až do zahájení první partie, na pozdější tipy již nebude brán zřetel. " +
        "<img src='img/pf2026.jpg' style='margin-top:5px'>" +
        "<br><b>Kamikazeee</b>: Na přípravu s HonzouHonzou kašlu, radši jsem se šel pomodlit... <br>" +
        "<video controls='controls' style='max-width: 100%'><source src='img/kamikazeee-playOFF2025.mp4' type='video/mp4'/></video> "
  }, {
    id: "AMOO6nWL",
    achievements: [{achievement: "blackXX", player: "bebul", id: "ypCB8SM7", desc: "Zbabělá remíza"}],
    html: "<b>bebul</b>: První letošní turnaj měl konečně obstojnou účast. <img src='img/players/rychlylenochod.png' class='img100 right'> Vítáme zpátky RychlehoLenochoda a gratulujeme k nejrychlejšímu matu!" +
        "<img src='img/players/janshorny.png' class='img100 left'><p>Vítáme zpátky taky JanaShorny, známého jako BaronaGorce a gratulujeme k senzaci turnaje! " +
        "<br><br><b>bebul</b>: <img src='img/players/kamikazeee.png' class='img100 right'> Po dlouhé době si zahrál taky Kamikazeee, který stihl odehrát jenom šest partií, přesto mu to stačilo na bednu! Gratulujeme! " +
        "<br><br><b>bebul</b>: černý puntík dostává Bebul, že zbaběle vynutil remízu opakováním tahů v pozici, kterou by měl vyhrát i poslepu... " +
        "<board json='{\"id\":\"ypCB8SM7\", \"startPlay\":54, \"orientation\":\"white\"}'/>" +
        "<br><br><b>bebul</b>: v turnaji neuvěřitelných osmnáct plaketek! Jen tak dál! " +
        "<br><br><b>bebul</b>: Tomzr krom první partie všechno berserkoval. Odehrál neuvěřitelných sedmnáct partií a i přes brutální krvácení " +
        "<b style='color: red'>-110 ratingu</b> skončil druhý." +
        "<tooltip json='{\"id\":\"tomzr\", \"size\":0.8}' align='center' style='margin:42px 0 5px 0'/> " +
        "<br><br><b>DJ-Strelec</b>: Osmifinále <a href='index.html?mf=playOFF2025'>PlayOFF</a> je dohrané. Kompletní složení čtvrtfinále (klikněte si pro větší obrázek): <a href='img/playOFF-2025.jpg'><img src='img/playOFF-2025.jpg'></a>"
  }, {
    id: "RWdLw5ws",
    html: "<b>DJ-Strelec</b>: Měl jsi to vyhrané, Lenochode. Toho střelce jsi mohl brát. Byla tam vazba na dámu <img src='img/players/dj-strelec.png' class='img100 right'> " +
        "<br><br><b>RychlyLenochod</b>: <img src='img/players/rychlylenochod.png' class='img100 left'>  já si to uvědomil až bylo pozdě samozřejmě v tom čase 😂 " +
        "<br><br><b>DJ-Strelec</b>: mně v tom momentu úplně zatrnulo 😂 " +
        "<board json='{\"id\":\"MJ3UvCIT\", \"startPlay\":25, \"orientation\":\"white\"}'/>" +
        "<br><br><b>bebul</b>: Mně by teda nezatrnulo, protože bych to neviděl. 😂 RychlyLenochod taky zázračně věčným šachem vynutil remízu s Bukowskicem! A aby toho nebylo málo, přidal první letošní PAT s mozkomorem! Je to jeho jubilejní <b>třicátý</b> pat v Monday Fights turnaji! Náááádhera, jen tak dál! " +
        "<board json='{\"id\":\"B4Rc6Sc0\", \"startPlay\":109, \"orientation\":\"black\"}'/>"
  }, {
    id: "aBaidYvx",
    achievements: [{achievement: "reporter", player: "bebul", id: "rQi0vT5K"}, {achievement: "reporter", player: "jouzolean", id: "QYqyYdJl"}]
  }, {
    id: "ss32E4ad",
    achievements: [{achievement: "reporter", player: "bebul", id: "QvSbeC7O"}, {achievement: "reporter", player: "jouzolean", id: "bVjIzqR7"}]
  }, {
    id: "t2SNAshd",
    achievements: [{achievement: "reporter", player: "bebul", id: "MDbHax1y"}, {achievement: "reporter", player: "jouzolean", id: "gLPC4iB3"}]
  }, {
    id: "RhH4IhZY",
    achievements: [{achievement: "reporter", player: "bebul", id: "kNp4NjEx"}],
    html: "<b>Bebul</b>: Povídal jeden bývalý držák, že MF už sice nehraje, ale na web se pořád rád podívá. A do toho se nám Jouzoleán stal tatínkem ❤️, <img src='img/players/jouzolean.png' class='img100 right'> ten Jouzoleán, co už léta brečí, " +
        "kdy se něco hne na té Síni slávy , po které touží, že ani spát nemůže. Tak tady je první nástřel... <a href='hallOfFame.html?year=all'><img src='img/hallOfFame2.jpg'/></a>" +
        "<br><br><b>bebul</b>: Velká gratulace RychlyLenochod , že v souhrnném bodování Plaketek zatím vede. Možná to po dalším dolaďování přestane být pravda, ale i kdyby, někde navrchu bude. " +
        "<br><br><b>RychlyLenochod</b>: Ste me včerejšíma tabulkama nahecovali" +
        "<br><br><b>bebul</b>: Tááákže: velká gratulace Jouzoleánovi! Ať jim to doma klape, moc nezpychne a chvíli hraje trochu opile, abychom na něm získali nějaké ty bodíky, jo? " +
        "<br><br><b>kunc99</b>: <b>Finále Play-Off</b> proběhne v pátek od 10:00.  S MichaelChmiel jsme už domluvení. Jsem výš nasazený, takže první partii budu mít bílé." +
        "<br><br><a href='index.html?mf=playOFF2025'><img src='img/finale2025.jpg'/></a>",
    hallOfFame: [95, `<section class="user-top">
      <h2 class="text" data-icon="&#xe016;">
        <a href="http://index.html?mf=RWdLw5ws">Miss Klárka</a>
      </h2>
      <div style="margin:5px">
        <p> Vítej ❤️ Klárko ❤️ v síni slávy! 
        <div style="text-align:center">  
        <img src='img/klarka.jpg' style="width:80%">
        </div>
        <p> Jouzoleánovi Gratulujeme a sobě přejeme, aby dcerka rostla do maminčiny krásy! ❤️ 
      </div>
    </section>
    `]
  }, {
    id: "Z8t1r4eX",
    html: "<b>bebul</b>: Představujeme novou plaketku za <b>Mat slepých sviní</b>. <img src='img/achievements/blindSwineMate.png' class='img100 right'> Teminologie je převzata z <a href='https://lichess.org/training/themes'>Lichess puzzle témat</a>. " +
        " Jedná se o mat dvěma věžemi spolu s králem na čtverci 2x2."
  }, {
    id: "xLfzeFEn",
    html: "<b>bebul</b>: Představujeme další plaketky za roztodivné maty. Teminologie je převzata z <a href='https://lichess.org/training/themes'>Lichess puzzle témat</a>. " +
        "<img src='img/achievements/hookMate.png' class='img100 right'> <b>Hákový mat</b> Mat věží, jezdcem a pěšcem spolu s jedním nepřátelským pěšcem, který omezuje únikovou cestu nepřátelského krále." +
        "<p> Všechny plaketky jsou přidány i zpětně, takže je najdete i v předchozích turnajích... " +
        "<p> <img src='img/achievements/triangleMate.png' class='img100 left'> <b>Trojuhelníkový mat</b> Dáma a věž, vzdálené jedno pole od nepřátelského krále, se nacházejí na stejné řadě nebo sloupci, oddělené jedním polem, čímž (společně s králem) tvoří trojúhelník."
  }, {
    id: "JnrhB76U",
    html: "<b>Jouzolean</b>: Dneska to byl Jouzoelanuv sen! " +
        "<br><br><b>bebul</b>: Velká gratulace Jouzoleánovi za fantastický výkon v nabušenom turnaji! Je vidět, že nové rodičovské povinnosti hravě zvládá, nebo ho naopak dcerka nenechá vyspat " +
        "a on do noci studuje šachy... Ať tak či onak, funguje to, takže početí dalších dětí lze všem určitě doporučit. 😀 " +
        "<tooltip json='{\"id\":\"Jouzolean\", \"size\":0.8}' align='center' style='margin:40px 0 0px 0'/>"
  }, {
    id: "JCkewdKS",
    html: "<b>RychlyLenochod</b>: No moje nervy! Sem v práci a tahle hra mě dost vysílila " +
        "<br><br><b>DJ-Strelec</b>: já se při ní málem rozbrečel... strašný. Tep 200" +
        "<br><br><b>RychlyLenochod</b>: To stejne... se mi u čepování piva třepou ruce z toho 😀" +
        "<br><br><b>bebul</b>: Velká gratulace Tekelemu za fantastický výkon. Nejen, že v závěrečnom tahu na bránu urval bednu, ale třikrát porazit siláka Chmiela a k tomu si připnout skalpy DJ-Strelce a Bukowskice, to se mohlo stát naposledy tak za vlády Jagellovců... Paráda, gratulace! " +
        "<tooltip json='{\"id\":\"Tekele\", \"size\":0.8}' align='center' style='margin:40px 0 0px 0'/>"
  }

];
