export var tournamentSpec = [
  {id: "pwCJHYPg", html: "", achievements: [{achievement: "reporter", player: "bukowskic", id: "kKsQ2Krl"}] },
  {id: "GijbwcSY", html: "<img src='img/mf-og-x.jpg'>", achievements: [{achievement: "reporter", player: "Neznama-00", id: "DxhcZO5O"}] },
  {id: "z2iN8qVr", html: "<b>Bebul:</b> Gratulujeme Rychlýmu Lenochodovi k prvnímu letošnímu King Kongovi! Dal mat, aniž by ztratil jakýkoli materiál a navíc stihl postavit dámu navíc! 🙂<br><br>"},
  {id: "x6hNptkr", html: "<b>Následující hry byly z turnaje odstraněny.</b><br><img src='img/buta.png'><br><br><b>Jouzolean:</b><br> A aby ten dnešek nebyl tak smutný, tak mám taky jednu dobrou zprávu 🙂 Kolem Prahy teď letělo hejno ptáků a skřehotaly, že letí od Dobříše a že prej se tam chystá velká věc! Náš mistr Bukowskic prý bude trénovat místní mládež v šachu! Takže doufáme, že do našich skromných řad přibydou nové šachové naděje v podobě Bukowskiho rekrutů. To je velký krok pro celou Dobříš - až jednou uslyšíte, že Dobříš hraje extraligu, pamatujte kdo za tím stojí!! 😎<br><br>" +
      "<b>DJ-Pesec:</b><br> Tak to gratuluju! Az Buk deti nauci jeho neprostupnou Philidorovu obranu, urcite se neztrati 👍<br><br>" +
      "<b>Bukowskic:</b><br> Jo vrabci, no paráda, teď už z toho nevykroutím. Ale pravda, alespoň se doučím ta zahájení."
  },
  {id: "20AI0ybI", html: "<img src='img/vikJavMeme.jpg'>"},
  {id: "UZ9MlL1y", html: "<img src='img/mf-og-x.jpg'>"},
  {id: "7d6oiMze", html: "<img src='img/mf-og-hot.jpg>"},
  {id: "R77TPv23", html: "<img src='img/mf-og-hot2.jpg'>"},
  {id: "cz8LzOSL", html: "<b>Mrazek:</b><br> Já bych chtěl nenápadně upozornit na to, ne že bych se nějak chvástal, ale že dnes bukowskic byl právě jednou poražen, jedním hráčem, kterého nebudu jmenovat, aby to nevypadalo moc nabubřele. Taková výhra pak dokáže přebít i zklamání z vyhraných partií nedotáhnutých kvůli času či již tradičně prohraných remízových koncovek 🙂 nehledě pak na vyloženě jedovatý zármutek z čistě prohraných partií... to všechno ta jedna výhra dokáže přebít, takovou kouzelnou moc má jedna jediná výhra s bukowskicem. Doporučuju fšem co nejdříve vyzkoušet.<br>Stojí to za to 🙂"},
  {id: "z2iN8qVr", html: "<b>Bebul:</b> Jouzolean v dnešní <a href='https://lichess.org/DxokmcB1/white#65' target='_blank'>parádičce</a> s PuklýmChlebem nejenže dal mat jezdcem, ale tah předtím ještě drze obětoval svou dámu!<br><img src='img/nepraktaManzelHrajeSachy.jpg' style='margin-top:10px'>" +
      "<br><br><b>Bébul:</b> Udělal jsem pár změn na těchto stránkách. Hráči janshorny zůstává šachovnice pro nejrychlejší partii. Raketová výhra však nastala kvůli timeoutu. Není v tom sám, stalo se to už 4x, nově lze takové partie dohledat pomocí dotazu <a href='search.html?q=fastest%20timeout'><b>fastest timeout</b></a>. Plaketka rakety pro vítězné partie do deseti tahů se po úpravě pro vytimeoutované partie už neuděluje, takže po rozkliknutí hráče tam raketa záměrně chybí.<br> Krom toho jsem obohatil search engine o možnosti typu <b>min-moves:100</b> pro hledání dlouhých partií a podobně <b>max-moves:15</b>. Oboje se dá kombinovat. K tomu jsem ještě přidal možnost vyhledat <b>fastest</b>." +
      "<br><br><b>Bébul:</b> Vítáme nového hráče Jana Shorného. Pro budoucí návštěvníky jen pozn. k duplicitě baronGorc a janshorny. Snažili jsme se, aby nový hráč nezačínal s <b>provisional</b> ratingem, což baronGorc zvládl dobře, nicméně měl ještě jeden starý účet, na kterém nehrál a který používat nechtěl. V turnaji se tak objevily účty dva. Lichess naštěstí pároval jen jednoho z nich, ale naneštěstí toho s provizorním ratingem. V datech mimochodem ta informace o provizorním ratingu je, takže se s tím případně dá pracovat."},
  { id: "ayJNboMi",
    init: function() {
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
  {id: "ZNI7qbN3", html: "<b>Margarita</b> Привет<br><b>DJ-Pesec</b> Привет<br><b>Mrazek</b> Здравствуй<br><b>VikJav</b> Привет<br><b>tomasklimecky</b> dobře margarita<br><b>mozkomor</b> Nezapočítalo mi to remízu s Jouzoleanem. Vznáším námitku.<br><b>Mrazek</b> bodovaná je jen první remíza v řadě, za další jsou nuly<br><b>Mrazek</b> asi aby se skupinka lidí na turnaji nedohodla na systému neztrácejme čas, dáme remízu a tím by získávali body proti ostatním rychle<br><b>mozkomor</b> To dává smysl. Ale do leaderboadu to hude půlbod, ne?\<br><b>bebul</b> ano, do leaderboardu samozřejmě půl bodu"},
  {id: "aHeatnDc", html: "<img src='img/pomlazka.jpg'>" +
      "<br><br><b>Bébul:</b> V leaderboardových tabulkách je nově sloupec s průměrným protihráčem," +
      "<img src='img/achievements/maraton.png' class='img100 right'> takže si můžeme porovnat, s jak těžkými soupeři kdo hrajeme. Na hlavní stránce jsou zobrazeny všechny odznáčky, ke kterým nově přibyl ševcovský mat s loupežníkem Rumcajsem." +
      "Ševcovské maty lze dohledat v search enginu pomocí klíčového slova scholar. V tooltipu hráče má symbol vysoké boty. Mat dámou nebo střelcem na poli f7/f2 musí padnout nejpozději v devátém tahu. Dále přibyl odznak pro vítězný maraton pro vítězství v aspoň 100 tahové partii a mat na poslední chvíli, pokud padl do deseti sekund před koncem turnaje. V detailu hráče je nově možno otevřít" +
      "<img src='img/achievements/castling-mate.png' class='img100 left'> jednotlivé hry kliknutím na výsledek v prostředním sloupci. A nahoře je počet odehraných her, abyste nemuseli pořád počítat, kolik těch her vlastně RychlyLenochod dneska stihl. Pod ligovou tabulkou je přidána gratulace hráči," +
      "<img src='img/achievements/lucky.png' class='img100 right'> který hrál nejvíc nad očekávání a je zmíněn hráč, který čelil nejtěžším soupeřům. Aby byl hráč uveden, musí ale odehrát alespoň 4 partie a pro gratulaci aspoň dvě vyhrát. Někdy má hráč, který všechny partie prohrál nepochopitelně nadupanou performance, takže to jsem musel nějak eliminovat." +
      "<img src='img/achievements/legal.png' class='img100 left'>K tomu se změnil formát tabulek se seznamem her, že datum odkazuje na tuto hlavní stránku k turnaji, kde se hra konala, výsledek 1-0 atd. odkazuje na hru na lichess a ve třetím sloupci jsou odznáčky, které si hráči vydobyli." +
      "Taky jsou udělovány odznáčky za Légalův mat, známý též jako Námořní kadet. Proto je použit Pepek Námořník. Vyhledávat lze pomocí klíčového slova legal." +
      "A stále se nikomu neporadařilo získat diamantový odznak za mat rošádou nebo mat braním mimochodem. Tak hurá do toho!"
  },
  {id: "vWA25bvU", html: "<b>RychlyLenochod</b> připravil v senzační partii jinak stoprocentnímu <b>Bukowskicovi</b> moc pěknou léčku, do které se náš šampión chytil! Gratulujeme!<br>" +
      "<br><b>Královský Gambit</b> se dnes hrál 9x, z čehož 6x triumfovali bílí. <b>Italská hra</b> se hrála 7x, přičemž 5x dominovali černí. Devět z deseti velmistrů doporučuje, aby i zbytek Monday Fighterů přešel na Královský gambit. 😀<br>" +
      "<br><b>Jouzolean:</b> \"Gratulace Bukowskimu k návratu na čelo a taky Mrázkovi, který se dostal na čelo posledních 10 turnajů. 🙂😎\""},
  {id: "k83QeG7o", html: "<b>Mrazek</b> byl dnes jediný z nás, komu se podařilo <b>bukowskice</b> porazit. K radosti <b>mozkomora</b> k tomu ale došlo až po limitu, takže bedna zůstala mozkomorovi. Bukowskic Mrázka trápil <a href='https://lichess.org/G3YNmKEP/black#199'>sto tahů</a>, aby vzdal jeden tah před matem.<br>" +
      "<br><b>Čtyři hráči</b> dnes vyhráli po osmnácti tazích, takže za nejrychlejší parti si odnesli bezvýznamný bodíček dzin69, bebul, mozkomor a jouzolean.<br>" +
      "<br>Vítáme <b>Margaritu</b> mezi prvními dvanácti, kteří se nakonec utkají v Play OFF.<br>" +
      "<br><h2>Magnus number</h2><a href='https://freopen.org/'><img src='img/magnusNumber.png'></a><br>" +
      "<b>Bebul:</b> Bukowskic má Magnus number #3. Porazil hráče, který porazil hráče, který porazil <a href='https://lichess.org/@/DrNykterstein'>Magnuse Carlsena</a>. Já porazil bukowskice, takže mám #4, stejně jako zbytek Monday Fight světa. Klikněte si na obrázek z prozkoumejte své skóre."},
  {id: "Uf128Gvy", html: "<b>Jouzolean:</b> 🙂 Skvěle jsi mi (Bébule) skočil do <a href='https://lichess.org/O79AvnKN#33'>milner barry</a> gambitu, já na to čekal asi půl roku. Pak jsem si klidně dovolil <a href='https://lichess.org/80jSe8Ca#9'>královský gambit</a> a dostal těžce na budku 😁<br>" +
      "<br><b>Bébul:</b> Královských gambitů se dnes hrálo devět, přičemž osmkrát se radovali bílí! A zadařilo se i v <a href='https://lichess.org/Y2EkADD9#9'>mozkomor vs bukowskic</a>."},
  {id: "ZDcYpWqR", html: "<img src='img/naplavka-pozvanka.jpg'>" +
      "<br><br><b>Bukowskic:</b> Zvu vás na Slavnost knih našeho nakladatelství na smíchovské náplavce. Tento pátek 3. června tam budu celý den, ukážu vám, jaké knížky vydáváme, popovídáme si, dáme si něco dobrého, zahrát si můžeme i venkovní šachy♟.   A výzva pro vás! Kdo mě v šachách porazí🏆nebo remizuje (což by v mé současné formě neměl být problém), " +
      "může si jako odměnu vybrat jakoukoliv knížku, která se mu bude líbit! Celý program a <a href='https://fb.me/e/3e1wWRiGt'>přesná adresa zde</a>."},
  {id: "13YkPIje", html: "<img src='img/naplavka-maurice.jpg'>" +
      "<br><br>Bukowskic měl na Náplavce připravenu celou škálu trofejí, z nichž ovšem žádnou nepustil. Nejprve si poradil s Maurice Dodo.<br><br>" +
      "<img src='img/naplavka-baron.jpg'><br><br>Šanci nedal ani Baronu Gorcovi,<br><br>" +
      "<img src='img/naplavka-jouzolean.jpg'><br><br>a knížku nevyhrál ani (pře)natěšený Jouzoleán, který první den nemohl zřejmě proto, aby celou noc trénoval, což se podepsalo na jeho výkonu.<br><br>"},
  {id: "kbGavs7v", html: "<img src='img/riegerovy-sady-jouzolean.jpg'>" +
      "<br><br><b>Jouzolean:</b>Hlásím, že dnešní turnaj v Riegerových sadech jsme s Tekelem ovládli. 😎👌😁 Zde <a href='http://chess-results.com/tnr646946.aspx?lan=5&art=1&flag=30'>výsledky.</a><br><br>" +
      "<a href='https://lichess.org/@/DJ-Pesec'><img src='img/buki-pesec-dobris.jpg'></a><br><br><b>Bukowskic:</b> Neuvěřitelný, koho potkáte na nedělní mši na prvním svatém přijímání dětí! Kdo myslíte, že to je? <i>(5.6.2022, Dobříš)</i><br><br>"},
  {id: "QyFvQ3NF", html: "<b>Jouzolean:</b> Hlásíme, že Jouzolean i Tekele dnešní turnaj strategicky vynechají<br>" +
      "<b>Bukowskic:</b> 🤩<br><br>" +
      "<img src='img/iron-maden.jpg'><br><b>Jouzolean:</b> Iron maiden<br><br>" +
      "<b>Bébul:</b> Jouzoleanovou absencí se stalo, že <b>bukowskic</b> znovu opanoval čelo tabulky a nedosti na tom, <b>RychlyLenochod</b> se vyhoupl v počtu 270 odehraných partií na čelo nejaktivnějšího hráče turnaje! Gratulujeme!<br><br>" +
      "<b>Bébul:</b> přečtěte si nové články v aktualitách. Například kliknutím na následující obrázek..." +
      "<a href='actualities.html#fairplay'><img src='img/havel-evangelista.jpg' style='margin-top:5px'></a>" +
      "<div align='center'><i>Bacha Vašku, máš napadenou dámu!</i></div>"},
  {id: "UdiV7hEG", html: "Gratulujeme <a href='https://lichess.org/@/Margarita_Vlasenko'>Margaritě</a> ke krásnému vítězství v Monday Fights turnaji!" +
      "<img src='img/bukowskic-nacelnik.jpg'><br>Propagace šachu na indiánském táboře. Náčelníkem sám veliký Bukowskic, šamanem Bébul, z dalších hráčů Snílek a Mráček."},
  {id: "ugVB04T5", html: "<b>Bébul:</b> Gratulujeme Mrázkovi k postupu na průběžné druhé místo v tabulce! Významně tomu pomohlo vítězství v poslední partii, kdy hrál Mrázek berserk a zmatoval soupeře tři vteřiny před koncem turnaje! To je jak sen!" +
      "<br><br><b>Bébul:</b> Nyní by se Tekele musel hned v úvodu PlayOFF probít přes DJ-Pesce a Jouzoleana. K takovému losu nezbývá než rovněž pogratulovat! 😀<br><br>" +
      "<img src='img/pavoukJouzoTekePesec.png'>" +
      "<br><br><b>Bébul:</b> mozkomor pěkně sehrál s bukowskicem tři královské gambity se skórem 1½-1½. Celkově se královským gambiterům vedlo dobře, skóre 5-2, přičemž průměrný rating černých byl 1806. Nechť řady královských gambiterů houstnou!" +
      "<br><br><b>Bébul:</b> zato Italské se dneska moc nedařilo... Anti-Fried Liver Defense, to zní hustokrutě! Měli bychom se to naučit všichni a tu Italskou už konečně, jednou provždy, z Monday Fights vymýtit." +
      "<br><br><b>Bébul:</b> dnes, po šesti týdnech, mat v centru! Spásný mat ve zcela prohrané pozici. 😀"},
  {id: "pcjmBbQU", html: "<b>Bébul:</b> Vítáme <a href='https://lichess.org/@/felcar'>felčara</a> na Monday Fight turnaji a gratulujeme k vítězství." +
      "<br><br><b>Bébul:</b> V rozpačitém vstupu, kdy to ve <b>felčarově</b> partii s <a href='https://lichess.org/@/Margarita_Vlasenko'>Margaritou</a> bylo jako na houpačce, nakonec padl na čas. <b>Margaritě</b> velká gratulace. Náš očekávaný stoprocentní debakl zažehnala hned v úvodu. 🙂" +
      "<br><br><b>Bébul:</b> Drahnou chvíli to vypadalo, že všem vypálí rybník maestro <a href='https://lichess.org/@/Tekele'>Tekele<a>! Gratulujeme k zaslouženému druhému místu!" +
      "<img src='img/mozk-last10.png'>" +
      "<br><br><b>Bébul:</b> Gratulujeme <b>mozkomorovi</b> k opanování tabulky za posledních deset turnajů!"},
  {id: "5prkKw5E", html: "<b>Mrázek:</b> My jsme jen chtěli mít nejrychlejší partii turnaje 🙂 To jsou ty odznáčky a plakety.... člověk se na to upne, sbírá to a pak pro to obětuje i <a href='https://lichess.org/BAoLvBM8'>partii</a>.<br><br>" +
      "<b>Bébul</b> se připravil na Jouzoleána a štěstí se usmálo na otrhánka. Nechť řady královských gambiterů houstnou :-)<iframe src=\"https://lichess.org/embed/WDePduKL#21?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>" +
      "<b>Jouzolean</b> se připravil na Felčara a pro samou radost, jak to všechno perfektně klaplo, si nechal dát v naprosto vyhrané pozici mat" +
      "<iframe src=\"https://lichess.org/embed/eqfvXnzx#38?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>"},
  {id: "ESqaQ7eH", html: "Dnešnímu turnaji předcházela značná nervozita, neb si všichni brousili zuby na setkání s Velmistrem, jak dokazuje následující konverzace: " +
      "<br><br><b>VikJav (nedělě 19:39):</b> Kluci dnes to nestíhám, ale pokud dnes nastoupí velký Robert, tak vám přeju všem hodně stesti :)) užijte si partie a dejte mu co proto." +
      "<br><br><b>Mrázek:</b> Máš ještě 24h čas 😉" +
      "<br><br><b>VikJav:</b> Jsem blazen! Super o nic neprijdu. Tak zítra ho rozdrtime společnými silami!" +
      "<br><br>A po oznámení, že dneska se Robert bohužel nemůže turnaje zúčastnit přišlo:" +
      "<br><br><b>Bukowskic:</b> Tak já se včera tak připravoval, ale to je jasný, lepší bude, když přijde Robert v plné formě!" +
      "<br><br><b>Jouzolean:</b> co sis připravoval? 😎🙂" +
      "<br><br><b>Bukowskic:</b> Nešel jsem na kolo a místo toho jsem se celý odpoledne rozehrával!" +
      "<br><br>... a jak vidno, příprava namísto velmistrovské hlavy pokosila nás ostatní. Gratulujeme!" +
      "<br><br><b>Bébul:</b> Už jste se podívali na nejrychlejší dnešní mat? To zas jednou Bébulkovi vyšla příprava! Nechť řady Královských Gambiterů houstnou!"},
  {id: "fXU6tfJM", html: "<div align='center'><h3>Monday Fight</h3><h2>s GM Robertem Cvekem</h2></div>" +
      "Dnešek je pro Monday Fights svátek, neb nás poctil svou návštěvou Velmistr <a href='https://www.sachycvek.cz/'>Robert Cvek</a>. Byl to fofr. Nikdo z nás ho nenachytal na švestkách. Za návštěvu moc děkujeme a k vítězství gratulujeme." +
      "<img style='margin-top:5px' src='img/cvek-nss.jpg'><div style='text-align: center; margin-bottom:5px'><i>Robert Cvek jako vítěz turnaje ke 100 let Salo Flohra. I přes účast Davida Navary turnaj zcela ovládli velmistři Novoborského ŠK, zleva Viktor Láznička, Robert Cvek a Zbyněk Hráček<br> Zřejmě dobrý oddíl.</i></div>" +
      "K dnešním partiím Jouzoleanovi napsal, že to byly dobré partie a ze si konečně po dlouhé době s klidnou hlavou zahrál." +
      "<p>Po turnaji Robert Cvek řekl: \"Vyhrát takový turnaj je pro mě obrovský úspěch, jednoznačně největší co se týče ...\", tedy řekl to po tom turnaji ke 100 let Salo Flohra a ne zrovna po dnešním turnaji 🙂, ale hrál dnes s námi Monday Fight a odehrál 14 partií, takže radost máme převelikou!</p>" +
      "<img style='margin-top:5px' src='img/cvek-owen.png'><div style='text-align: center; margin-bottom:5px'><i>Tuto strukturu vypadající jako koruna vybudoval Robert Cvek hned v několika partiích. Jedná se o Owen defense, která se předtím hrála na <a href='https://bebul.github.io/MondayFight/search.html?q=%22owen%20defense%22'>Monday Fights 13x</a> a pokaždé zvítězili bílí. Robert Cvek tedy tomuto zahájení poněkud zvedl reputaci.</i></div>" +
      "<p>Když na sobě zapracujeme, jistě se k nám velmistři jen pohrnou a trofej z Monday Fight bude zdobit nejeden velmistrovský stůl."},
  {id: "fgEf7SDZ", html: "<img src='img/trenink-tekele.jpg'>" +
      "<br><br><b>Jouzolean:</b>Zase trénink. Po noční 😎😁. Tento týden už třetí. A to je teprve úterý.<br><br>" +
      "<b>Bébul:</b> No jó, chlapcí potrénovali a sebrali si první dvě místa v turnaji. Že jim není haňba! 😁<br><br>" +
      "<b>Bébul:</b> K úspěšnému tréninku gratulujeme!<br><br>"},
  {id: "PbjeR9c2", html: "<b>Bébul:</b> Bukowskic dneska v prvních pěti hrách čtyřikrát prohrál. Přesto však dokázal vybojovat zlato! Nezdolný šampión! Pomohla tomu hromada berserků a hlavně Tekele, který zastavil Jouzoleana vzlínajícího do nebes. Navíc se jednalo o nejrychlejší mat turnaje. Krásný útok! Tekelovi i Bukowskicovi gratulujeme!<br><br>" +
      "<b>Bébul:</b> V tabulce došlo po delší době k výrazné změně, když Jouzolean vystřídal Mrázka na druhé pozici. Souboj mezi Mrázkem a Jouzoleanem je lítý a nám ostatním je jen líto, že se k nim nějak nepřibližujeme. Držíme palce v dalším boji!<br><br>" +
      "<b>Bébul:</b> Bílí v královském gambitu dnes stoprocentní! Nechť řady královských gambiterů houstnou!<br><br>" +
      "<a href='http://localhost:63342/MondayFight/search.html?q=kingkong'><img src='img/achievements/kingkong.png' class='img100 left'></a> Mezi plaketky přibyl King Kong, kterého dostane ten hráč, který zmatuje protivníka, aniž by ztratil jakýkoli materiál a přitom ještě postaví dámu. Prvním King Kongem vůbec byl <a href='https://lichess.org/@/dzin69'>Dzin69</a>, druhým a současně prvním letošním je <a href='https://lichess.org/@/RychlyLenochod'>RychlyLenochod</a>. Partie lze vyhledat, klikněte na obrázek. Gratulujeme!"},
  {id: "3WyIj25r",
    achievements: [{achievement: "reporter", player: "tekele", id: "jiIALs4e"}],
    html: "<img src='img/mf-og-x.jpg'><b>Bébul:</b> Jouzolean se téměř dotáhl na pauzírujícího Bukowskice. Škoda, že šampión nehrál, s <b>Neznámou-00</b> tradičně prohrává, to už je taková naše milá tradice. Tak příště!<br><br>" +
      "<a href='actualities.html#zlataPraha/'><img src='img/zlataPraha5.jpg'></a><br><b>Bébul:</b> Přečtěte si tekeleho reportáž z turnaje Zlatá Praha v rapid šachu.<br><br>"},
  {id: "r18jTyCu",
    init: function() {
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
      "<b>Bébul:</b> Tabulka se otřásla v základech. Margarita přeskočila Lenochoda a Jouzoleán s Mrázkem se přehoupli přes našeho Šampióna, který narazil na toho úplně jiného Bébula, jak pravil Jouzoleán. 😁 A Džin69 se dotáhl na VikJava a, to už je skoro jisté, brzy se vmísí mezi dvanáct apoštolů, co si to na konci roku rozdaj v Play OFF. <br><br>" },
  {id: "sU060isO", html: "<img src='img/mf-og-x.jpg'><br><br><b>Bebul:</b> Bukowskic se znovu dotáhnul na čelo tabulky. Se stejným skóre je první, protože má lepší performance. Kdyby měli hoši i stejnou performance, tak to by se asi museli poprat. Bukowskicovo ELO v ringu je asi 3300 a pokud je nám známo, Jouzolean 1800?😁 <br><br>" +
      "<b>Bébul:</b> Margarita krásně přehrála bukowskice, který si dneska rozhodně 100% úspěšnost nezasloužil. Autor těchto řádků s ním měl tak krásně rozehranou partii, že už vyvaloval oslavné sudy, ale proti bukowskicovi, jak známo, je to zakletý 😁 <br><br>" },
  {id: "ogn3HeW1", html: "<b>Bebul:</b> V dramatickém závěru bojoval bukowskic o zlato proti mozkomorovi, ale náporu bílých figur na královském křídle podlehl. Mozkomor se ale dlouho na turnajovém trůnu neohřál. Do konce turnaje zbývala zhruba minuta, během které se přes Piráta vyhoupla na čelo Margarita a získala zaslouženě zlato! Gratulujeme!<br><br>" +
      "<img src='img/sherlock.jpg'><br><br>" +
      "<b>Bebul:</b> Bukowskic na WhatsApp uvedl výše uvedenou detektivní zápletku s tím, že kdo ji první vyluští, vyslouží si od něj berserk. A tento jediný berserk dneska možná stál bukowskice zlato! 😀 To jsou ty zásady!"},
  {id: "TNZCc8DD",
    init: function() {
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
      "<div id='board'></div>"},
  {id: "omFEO2Vz",
    html: "<img src='img/mf-og-x.jpg'><b>Bébul:</b> Gratulujeme Neznámé-00 ke dvěma pěkným výhrám!" +
      "<br><br><b>Bébul:</b> V dnešním turnaji se Bébulovi po dlouhém čekání podařilo vymodlit pozice, o kterých se dočetl ve vynikající knize <b><i>Miniaturní šachové partie</i></b> od Ladislava Alstera. Zde k nahlédnutí Bébulův omalovaný výtisk." +
      "<img src='img/alster-drakula.jpg'> ...ani řada partií sehraných mezi Tekelem a Jouzoleánem na toto téma, problém nevyjasnila. " +
      "Alster o Vídeňské hře píše, že je to takové mírumilovné a nepříliš ctižádostivé zahájení. Pohled na názvy variant tomu ale jaksi protiřečí: Frankenstein-Drakula a nebo Monster declined. Dnes se tato <a href='https://lichess.org/iYpJn8pM#20'>monstrpozice</a> hrála na Monday Fights poprvé." +
      "<br><br>" +
      "<b>Bébul:</b> Varianta, kterou rádi hrají Jouzolean a Mrázek, má šílený název: <b>Útok smažených jater</b>. " +
      "No a právěže, kdo se nechce nechat usmažit, zkusí Traxlerův protiútok." +
      "<img src='img/alster-traxler.jpg'>" +
      "Jouzoleán platí za nejlepšího znalce italské hry a odvozených zahájení. Náš Bébulek proti němu zvolil Traxlerovu variantu, což se rovnalo výzvě k souboji v teoretických znalostech. <i>(Ladislav Alster o J.Estrinovi, nejspíš <b>J.</b> jako Jouzoleán!)</i>" +
      "Partie by udělala panu Traxlerovi radost, ale jistě ne tak velikou, jako Bébulovi, neboť nikomu jinému se letos ještě nepodařilo dát Jouzoleánovi <a href='https://lichess.org/N12QWVRE#20'>mat desátým tahem</a>. No... a v poslední partii se Bébulek trefil Traxlerem do Mrázka a to Vám byl výprask, <a href='https://lichess.org/JuvXrd12CgRj'>auvajs!</a>"},
  {id: "o1wwUBUk",
    html: "<img src='img/mf-og-x.jpg'>" +
      "<br><br><b>Bébul:</b> Z dnešního turnaje si všichni odnesli aspoň bod! Neznámé-00 se podařil dát parádní Anastazia mat Baronu Gorcovi a LastScout porazil Hrobotrona sice na čas v berserku, ale ve vyhrané pozici. Oběma gratulujeme!" +
      "<br><br><b>Bébul:</b> BaronGorc se po porážce od Neznámé <img src='img/players/janshorny.gif' class='img100 right'> oklepal a odnesl si tři báječně tučné body, rovněž veliká gratulace!" +
      "<br><br><b>Bébul:</b> Margarita dlouho vedla a chybělo jen málo a v turnaji <img src='img/players/jouzolean.gif' class='img100 left'> zvítězila. Nakonec se však radoval halloweenský kašpárek! Grats! " +
      "Jouzolean se tak po dvou kolech, kdy se s Mrázkem mačkali <img src='img/players/mrazek.gif' class='img100 right'> na turnajové druhé příčce od halloweenské kostřičky lehce odrazil a směje se z druhého místa. Asi nechce hrát v osmifinále s Margaritou, což chápeme. To by se bál každej! Těšíme se na další boj! <img src='img/players/margarita_vlasenko.gif' class='img100 left'>" +
      "<br><br><b>Bébul:</b> A Jouzolean sehrál s Rychlým Lenochodem 130 tahovou vítěznou bitvu, což <img src='img/players/rychlylenochod.gif' class='img100 right'> je druhá nejdelší hra historie Monday Fight, pričemž nejdelší vítězná." +
      "<br><br><b>Bébul:</b> A že náš Bébulek dal Blackburnovskej mat, kterej už úplně zapomněl, že existuje, toho jste si určitě všichni všimli. Zatím jen Mozkomorovi a nyní Bébulkovi se to v historii Monday Fights podařilo. No, tak si třeba záviďte, nooóóóó <img src='img/players/bebul.gif' class='img100'> <img src='img/players/mozkomor.gif' class='img100'> "+
      "<br><br><b>Bébul:</b> A už jste se podívali, jaké halloweenské avatary má Arytmik, Travinho, Mrázek a Robert Cvek?"},
  {id: "T5fN7RNz", html: "<img src='img/mf-og-grats.jpg'>"},
  {id: "euUYBnmh", html: '<b>Bébul:</b>"Napsat báseň o Monday Fight, třebas by si všímala jen jediného hráče, ' +
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
      'mozku a skutky svého života!" <i><b>Viktor Hugo: Bídníci</b>, kapitola Svědomí</i>'},
  {id: "6xgyatei",
    html: "<img src='img/mf-og-margarita.jpg'>" +
      "<br><br><b>Bébul:</b> Margarita dneska sice nejprve podlehla Jouzoleánovi, ale pak mu to hezky vrátila a nakonec získala kov nejcennější! Veliká gratulace!" +
      "<br><br><b>Jouzolean:</b> Jenomže teď ale vede jouzolean - a je to jeho jediná šance jak poprvé a naposledy vyhrát sezónu MF. <img src='img/players/jouzolean.png' class='img100 right'> Udělá vše pro to aby vyhrál 😁 " +
      "<br><br><b>Jouzolean:</b> Bukowskic ještě jednou nepřijde a je ve vážných problémech! 😁 Tento rok je to hodně dramatické! Šance má i Mrazek!" +
      "<br><br><b>Bébul:</b> V tabulce dochází k vachrlatým posunům. Posun Jouzoleána na první místo místo Bukowskice také znamená, <img src='img/players/bukowskic.png' class='img100 left'> že se Bukowskic ocitá ve stejné osmifinálové skupině pro PlayOFF jako DJ-Pesec. Ten však může snadno párkrát na Monday Fight přijít a podle potřeby se posunout před PIRAT77 a zajistit si tak pozici ze druhé strany vyřazovacího pavouka, takže by se s Bukowskicem mohl případně potkat až ve finále!" +
      "<br><br><b>Bébul:</b> Vítáme nového hráče <a href='https://lichess.org/@/HonzaHonzaHonza'>HonzaHonzaHonza</a>. Jeho vstup do Monday Fights arény byl správně nervózní a po šňůře šesti proher to už vypadalo, že ho maminka doma nepochválí.  <img src='img/players/honzahonzahonza.png' class='img100 right'> Dokázal se však oklepat jak málokdo a přinést domů pár skalpů. Našeho Jouzoleána by taková pohroma stála minimálně display mobilu." +
      "<br><br><b>Lichess:</b> API encountered an error: <a href='https://github.com/lichess-org/lila/issues/11971#event-7931043421'>Cannot download tournaments</a>. It takes about 10 days to find a temporary workaround." +
      "<img src='img/api-error.jpg'>"},
  {id: "playOFF2020",
    playOFF: "<img src='img/turnajPavouk.jpg' style='width:100%;margin-top: 5px'>",
    html: "<h1>PlayOFF 2020</h1>" +
      "<b>Bebul:</b> Turnaj začal epickou bitvou mezi RychlyLenochod a Travinho, který skončil až bulletovým rozstřelem, když o celkovém vítězi rozhodl kavalírský PAT dvou dam ve druhém tie-breaku." +
      "<iframe src=\"https://lichess.org/embed/sYE9rYFE#123?theme=brown&bg=light\" style=\"width: 300px; height: 420px;\" allowTransparency=\"true\" frameBorder=\"0\"></iframe>" +
      "<br><br><b>DJ-Pesec:</b> že uhraju jen půl bodu, to jsem teda nečekal. <img src='img/players/bukowskic.png' class='img100 right'>" +
      "<br><br><b>Bebul:</b> Velká gratulace Bukowskicovi, že se nezalekl vysokého nasazení svých soupeřů a zlehka se přes ně přenesl. V osmifinále dovolil soupeři bod, v semifinále půl bodu a ve finále už ani ň."
  },
  {id: "playOFF2021",
    playOFF: "<img src='img/turnajPavouk2021.jpg' style='width:100%;margin-top: 5px'>",
    html: "<h1>PlayOFF 2021</h1>" +
      "<b>Jouzolean:</b> Tak a je dobojováno! <a href='archiv2021.html'>Sezóna 2021</a> je s dnešním turnajem definitivně odpískána. Tato již legendární skupina hráčů se dokázala scházet v menším či větším počtu celý rok a ani jednou se nestalo, že by se nehrálo - a to ani tehdy, když jednou selhal lichess. To máme 52 kvalitních turnájů v roce. Náš seznam hráčů již čítá 26 jmen včetně jedné holky a všichni se známe." +
      "<br><br><b>DJ-Pesec:</b> A do tohoto vyžazovacího PlayOFF turnaje Vám představujeme epesní vyzyvatelské kartičky! <img src='img/epesni-karticka4.jpg' style='margin-top:5px'>" +
      "<br><br><img src='img/players/bukowskic.png' class='img100 right'><b>Bebul:</b> Velká gratulace Bukowskicovi, že přes počáteční dvojnásobný výprask od Rychlého Lenochoda dokázal kromě celkového turnaje ovládnout i závěrečné PlayOFF!"},
  {id: "playOFF2022",
    playOFF: "<img src='img/turnajPavouk2022.jpg' style='width:100%;margin-top: 5px'>",
    html: "<h1>PlayOFF 2022</h1>" +
      "<b>Jouzolean:</b> Nastoupili už známí borci z let minulých, pro 5 hráčů to bylo jejich poprvé - Pirat77, Margarita Vlasenko, <img src='img/players/margarita_vlasenko.png' class='img100 right'> Tomáš Klimecký, Dzin69 a Maurice Dodo. Všichni bojovali houževnatě a statečně, do dalších kol však postoupila pouze 12-letá Margarita, která došla až do semifinále, což je největší překvapení turnaje a Dzin69, který si poradil s <a href='index.html?mf=playOFF2021'>loňským</a> \"málem přemožitelem Bukowskice\" - Rychlým Lenochodem 4:0. Zkušení matadoři jinak nedávali nováčkům šanci, přesně podle statistik. " +
      "Opět jsme měli možnost nahlížet na duelové kartičky z grafické dílny Dj-Pěšce, které poté Bebul umístil na náš web, aby si tak každý mohl <a href='cards.html'>vygenerovat tu svou</a>." +
      "<img src='img/cardFinale2022.jpg' style='margin-top:5px'>" +
      "<br><br><img src='img/players/dj-pesec.png' class='img100 right'><b>Jouzolean:</b> Grandfinále bylo velkou odvetou let minulých. Dvakrát se spolu bili, pokaždé trůn uhájil Bukowskic, až letos to Dj-Pěšec zlomil a stal se vítězem při výsledku 3½-2½. Bukowskic tak poprvé v kariéře nezískal ani jeden pohár vítěze a bude se tak muset soustředit na další rok, kde bude ovšem hodně hladový!" +
      "<br><b>Gratulace vítězům a čest poraženým.</b>"},
  {id: "EvpGRc5W",
    html: "<h2>Blíží se PlayOFF 2022</h2>" +
      "Úderem 26.prosince se završí sezóna letošního Monday Fights. Prvních dvanáct borců pak zveme na vyřazovací turnaj PlayOFF. " +
      "Hry z loňského PlayOFF turnaje byly převedeny na tento web a lze je vidět po kliknutí na obrázek <a href='index.html?mf=playOFF2021'><img src='img/epesni-karticka.jpg' style='margin:5px 0'></a>" +
      "Ovšem první PlayOFF se hrál v roce 2020. Po odehraných partiích je poptávka. Bylo by pěkné, kdyby tyto partie byly na tomto webu k dohledání. Posílejte."
  },
  {id: "hF7XxPIB",
    html: "<img src='img/blitz-open-mf-4x.jpg'>" +
      "<br><b>Jouzolean:</b> 4 členové MF se letos účastní MČR v bleskovém šachu. Zleva: Tekele, Vikjav, Jouzolean, Mrazek. Držte palce! 😎😁🙂" +
      "<img src='img/jouzolean-laznicka.jpg'>" +
      "<br><b>Jouzolean:</b> A zde bonus. Jouzolean s V. Lázničkou. 😎" +
      "<img src='img/jouzolean-plat.jpg'>" +
      "<br><b>Bébul:</b> A tady nám Jouzolean dělá ostudu s vítězem turnaje V. Plátem. <b>Kouření způsobuje rakovinu a snižuje ELO.</b>"
  },
  {id: "HoxwHJsB",
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
  {id: "FEpWbsrM",
    achievements: [{achievement: "reporter", player: "bebul", id: "N12QWVRE"}],
    html: "<img src='img/mf-og-x.jpg'><b>Mrázek:</b> Já bych spešl chtěl pogratulovat LastScoutovi, který si mě neskutečně povodil a vyškolil mě jak malýho caparta a kdyby LS nepřehlédnul věž, tak by mě buď zmatil a nebo bych spadnul na čas... dneska to byl můj nejstresovější protivník. Budu se muset přidat do klubu těch, co se na MF připravují 😀" +
      "<br><br><b>Bébul:</b> Jouzolean chtěl Bébulka chytit do pasti končící dušeným matem. Našeho Bébulka!<img src='img/achievements/smothered.png' class='img100 right'> " +
      "Ale to se nešmí, takhle zkoušet, když tam má Bébulek <a href='https://lichess.org/fiuvtdBX#26'>toho koně</a>, sice asi omylem, ale má, svého bílého jezdce, jezdce statečnýho. Je to kabrňák!" +
      "<br><br><b>Jouzolean:</b> Touha po plaketce byla silnější" +
      "<br><br><b>Bebul:</b> Klikněte si na obrázek televizní reportáže a prohlédněte si sabotážní reportážCNN Prima News o Monday Fights. 😀<a href='actualities.html'><img src='img/cnn-prima-news.jpg'></a>"},
  {id: "xoUVJkiS",
    achievements: [{achievement: "black", player: "bukowskic", id: "PA6aqELD"}],
    init: function() {
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
      "<br><br><b>Bébul:</b> Udělený černý puntík ⚫ je pouze legrace na které byla testována možnost přidávat achievementy ručně, což je potřeba pro plaketky reportérů MF. Bukowskic má ale plaketek málo, tak mu ji nechám. ❤️ Tak mu to, prosím Vás, nezáviďte!<br><br>"},
]
