import {test} from "node:test"
import assert from "node:assert/strict"
import {ImagePuzzleState} from "../js/imagePuzzle.mjs"

function seededRandom(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
}

test("only adjacent tiles move, without wrapping across rows", () => {
  const state = new ImagePuzzleState()
  assert.equal(state.move(0), false)
  assert.equal(state.move(15), false)
  assert.equal(state.move(14), true)
  assert.equal(state.empty, 14)
  assert.equal(state.move(15), false)
  assert.equal(state.move(14), true)
  assert.equal(state.isSolved(), true)

  state.move(11)
  state.move(10)
  state.move(9)
  state.move(8)
  assert.equal(state.empty, 8)
  assert.equal(state.move(state.tiles[7]), false)
})

test("shuffled puzzles remain solvable on odd and even grids", () => {
  for (const size of [2, 3, 4, 5, 8]) {
    for (let seed = 0; seed < 30; seed++) {
      const state = new ImagePuzzleState(size)
      state.shuffle(seededRandom(seed))
      assert.equal(state.isSolved(), false)
      assert.equal(state.tiles[state.empty], size * size - 1)
      assert.equal(new Set(state.tiles).size, size * size)
      const tiles = state.tiles.filter(tile => tile !== size * size - 1)
      let inversions = 0
      tiles.forEach((tile, i) => {
        for (const other of tiles.slice(i + 1)) if (other < tile) inversions++
      })
      if (size % 2) assert.equal(inversions % 2, 0)
      else {
        const emptyRowFromBottom = size - Math.floor(state.empty / size)
        assert.equal((inversions + emptyRowFromBottom) % 2, 1)
      }
      state.solve()
      assert.equal(state.isSolved(), true)
      state.shuffle(seededRandom(seed + 100))
      assert.equal(state.isSolved(), false)
    }
  }
})

test("the last legal move completes a puzzle", () => {
  const state = new ImagePuzzleState(3)
  state.move(7)
  state.move(4)
  state.move(1)
  assert.equal(state.isSolved(), false)
  for (const tile of [1, 4, 7]) assert.equal(state.move(tile), true)
  assert.equal(state.isSolved(), true)
})

test("independent puzzles and invalid grid sizes", () => {
  const first = new ImagePuzzleState(3)
  const second = new ImagePuzzleState(4)
  first.shuffle(seededRandom(1))
  assert.equal(second.isSolved(), true)
  for (const size of [0, 1, 9, 3.5, NaN, "4"]) {
    assert.throws(() => new ImagePuzzleState(size), RangeError)
  }
})
