**...work in progress**

# MondayFight

The `pgn-parser` was installed by `npm i @mliebelt/pgn-parser --save`
and then converted to from Module Node.js style to Browser using http://browserify.org/

For tables the http://tabulator.info/ library was downloaded...

![example](https://user-images.githubusercontent.com/9265147/148989805-9aa6a084-de85-47cc-a5a4-f5179a41623e.png)

## Obrázkové rébusy

Posuvné puzzle lze použít pro libovolný čtvercový obrázek. Připojte
`css/imagePuzzle.css` a vložte do stránky (nebo do `html`, `playOFF` či `hallOfFame` v
`data/tournamentSpecs.mjs`) například:

```html
<div data-image-puzzle data-image="img/oznameni/obrazek.jpg"
     data-solution="img/oznameni/reseni.jpg" data-size="4"
     data-label="Radostné oznámení"></div>
```

Síň slávy i komentáře turnajů rébusy inicializují při vykreslení. Na jiné stránce po vložení obsahu
zavolejte `initImagePuzzles(container)` z `js/imagePuzzle.mjs`; bez argumentu
projde celou stránku. `data-solution` je volitelné, `data-size` má výchozí
hodnotu 4 a podporuje 2 až 8 polí na stranu. Každý rébus se míchá pouze
platnými tahy, takže je řešitelný. Tlačítka umožňují obrázek složit, odhalit
řešení, vrátit se k rébusu a znovu zamíchat. Dílek lze posunout i klávesami
Tab a Enter.
Složený obrázek i řešení lze kliknutím otevřít v plné velikosti.

Testy logiky puzzle: `node --test tests/imagePuzzle.test.mjs`.
Pro lokální náhled statického webu: `python -m http.server 8765 --bind 127.0.0.1`.

