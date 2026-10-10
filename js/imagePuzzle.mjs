// A solvable sliding puzzle, independent of the image and the page displaying it.
export class ImagePuzzleState {
  constructor(size = 4) {
    if (!Number.isInteger(size) || size < 2 || size > 8) {
      throw new RangeError("Puzzle size must be an integer between 2 and 8")
    }
    this.size = size
    this.solve()
  }

  solve() {
    this.tiles = Array.from({length: this.size * this.size}, (_, i) => i)
    this.empty = this.tiles.length - 1
  }

  neighbors() {
    return [this.empty - this.size, this.empty + this.size,
      this.empty % this.size > 0 ? this.empty - 1 : -1,
      this.empty % this.size < this.size - 1 ? this.empty + 1 : -1]
      .filter(i => i >= 0 && i < this.tiles.length)
  }

  move(tile) {
    const position = this.tiles.indexOf(tile)
    if (!this.neighbors().includes(position)) return false
    this.tiles[this.empty] = tile
    this.tiles[position] = this.tiles.length - 1
    this.empty = position
    return true
  }

  isSolved() {
    return this.tiles.every((tile, position) => tile === position)
  }

  shuffle(random = Math.random) {
    this.solve()
    let previous = -1
    // Shuffle by legal moves, so every generated puzzle can be solved.
    for (let step = 0; step < this.tiles.length * 20; step++) {
      const choices = this.neighbors().filter(position => position !== previous)
      const position = choices[Math.floor(random() * choices.length)]
      previous = this.empty
      this.move(this.tiles[position])
    }
    if (this.isSolved()) this.move(this.tiles[this.neighbors()[0]])
  }
}

export function createImagePuzzle(container, {image, solution, size = 4, label = "Obrázkový rébus"}) {
  const state = new ImagePuzzleState(size)
  container.classList.add("image-puzzle")
  const board = document.createElement("div")
  board.className = "image-puzzle__board"
  board.setAttribute("role", "group")
  board.setAttribute("aria-label", label)
  const picture = document.createElement("img")
  picture.className = "image-puzzle__picture"
  picture.alt = label
  const pictureLink = document.createElement("a")
  pictureLink.className = "image-puzzle__picture-link"
  pictureLink.target = "_blank"
  pictureLink.rel = "noopener"
  pictureLink.setAttribute("aria-label", "Zvětšit obrázek")
  pictureLink.append(picture)
  const status = document.createElement("p")
  status.className = "image-puzzle__status"
  status.setAttribute("aria-live", "polite")
  const actions = document.createElement("div")
  actions.className = "image-puzzle__actions"

  function button(text, action) {
    const element = document.createElement("button")
    element.type = "button"
    element.textContent = text
    element.addEventListener("click", action)
    actions.append(element)
    return element
  }

  let moves = 0
  const tiles = Array.from({length: size * size - 1}, (_, tile) => {
    const element = document.createElement("button")
    element.type = "button"
    element.className = "image-puzzle__tile"
    element.style.width = element.style.height = `${100 / size}%`
    element.style.backgroundImage = `url(${JSON.stringify(image)})`
    element.style.backgroundSize = `${size * 100}% ${size * 100}%`
    element.style.backgroundPosition = `${(tile % size) * 100 / (size - 1)}% ${Math.floor(tile / size) * 100 / (size - 1)}%`
    element.addEventListener("click", () => {
      if (!state.move(tile)) return
      moves++
      render()
      if (state.isSolved()) finish(true)
      else {
        status.textContent = `Počet tahů: ${moves}. Posuň dílek vedle prázdného pole.`
        // Keep keyboard focus on a playable tile after the board changes.
        tiles[state.tiles[state.neighbors()[0]]].focus({preventScroll: true})
      }
    })
    board.append(element)
    return element
  })
  board.append(pictureLink)

  function render() {
    const neighbors = state.neighbors()
    state.tiles.forEach((tile, position) => {
      const element = tiles[tile]
      if (!element) return
      element.style.left = `${(position % size) * 100 / size}%`
      element.style.top = `${Math.floor(position / size) * 100 / size}%`
      element.disabled = !neighbors.includes(position)
      element.setAttribute("aria-label", `Dílek ${tile + 1}, řada ${Math.floor(position / size) + 1}, sloupec ${position % size + 1}`)
    })
  }

  function showPicture(src, alt) {
    picture.src = src
    picture.alt = alt
    pictureLink.href = src
    pictureLink.hidden = false
    tiles.forEach(tile => { tile.hidden = true })
  }

  function finish(byPlayer = false) {
    state.solve()
    showPicture(image, label)
    status.textContent = byPlayer
      ? `Složeno za ${moves} tahů! Přijdeš i na rébus?`
      : "Obrázek je složený. Přijdeš na rébus?"
    giveUp.hidden = true
    reveal.hidden = !solution
    if (solution) reveal.focus({preventScroll: true})
    else restart.focus({preventScroll: true})
  }

  const giveUp = button("Poddat se – složit obrázek", () => finish())
  const reveal = button("Poddat se – ukázat řešení", () => {
    showPicture(solution, `Řešení: ${label}`)
    status.textContent = "A je to venku! ❤️"
    reveal.hidden = true
    back.hidden = false
    back.focus({preventScroll: true})
  })
  const back = button("Zpět k rébusu", () => {
    back.hidden = true
    finish()
  })
  const restart = button("Zamíchat znovu", () => {
    shuffle()
    tiles[state.tiles[state.neighbors()[0]]].focus({preventScroll: true})
  })

  function shuffle() {
    state.shuffle()
    moves = 0
    pictureLink.hidden = true
    tiles.forEach(tile => { tile.hidden = false })
    giveUp.hidden = false
    reveal.hidden = back.hidden = true
    status.textContent = "Klikni na dílek vedle prázdného pole. Funguje i Tab a Enter."
    render()
  }

  shuffle()
  container.replaceChildren(board, status, actions)
}

export function initImagePuzzles(root = document) {
  root.querySelectorAll("[data-image-puzzle]").forEach(container => {
    if (container.classList.contains("image-puzzle")) return
    createImagePuzzle(container, {
      image: container.dataset.image,
      solution: container.dataset.solution,
      size: Number(container.dataset.size || 4),
      label: container.dataset.label
    })
  })
}
