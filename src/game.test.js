import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, flipTile, gameReducer, isWon } from './game.js';

const active = tiles => tiles.flatMap((tile, index) => tile ? [index] : []);

test('center flips itself and four orthogonal neighbors', () => {
  const game = createGame();
  assert.deepEqual(active(flipTile(game.tiles, 3, 4)), [1, 3, 4, 5, 7]);
  assert.ok(game.tiles.every(tile => !tile), 'original board remains unchanged');
});

test('corners and edges do not wrap into another row', () => {
  assert.deepEqual(active(flipTile(createGame().tiles, 3, 0)), [0, 1, 3]);
  assert.deepEqual(active(flipTile(createGame().tiles, 3, 5)), [2, 4, 5, 8]);
  assert.deepEqual(active(flipTile(createGame(5).tiles, 5, 24)), [19, 23, 24]);
});

test('flipping a tile twice restores the board and counts both moves', () => {
  const initial = createGame(4);
  const moved = gameReducer(gameReducer(initial, { type: 'flip', index: 6 }), { type: 'flip', index: 6 });
  assert.deepEqual(moved.tiles, initial.tiles);
  assert.equal(moved.steps, 2);
});

test('known 3 by 3 solution wins after five moves and freezes further input', () => {
  const won = [0, 2, 4, 6, 8].reduce((game, index) => gameReducer(game, { type: 'flip', index }), createGame());
  assert.ok(isWon(won.tiles));
  assert.equal(won.steps, 5);
  assert.equal(gameReducer(won, { type: 'flip', index: 0 }), won);
  assert.equal(isWon([]), false);
});

test('reset and progression initialize fresh boards', () => {
  for (const size of [3, 4, 5]) {
    const moved = gameReducer(createGame(size), { type: 'flip', index: 0 });
    assert.deepEqual(gameReducer(moved, { type: 'reset' }), createGame(size));
    assert.deepEqual(gameReducer(moved, { type: 'next' }), createGame(size === 5 ? 3 : size + 1));
  }
  assert.deepEqual(gameReducer(createGame(), { type: 'reset', size: 5 }), createGame(5));
});
