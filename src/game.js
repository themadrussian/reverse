export const SIZES = [3, 4, 5];

export function createGame(size = 3) {
  return { size, tiles: Array(size * size).fill(false), steps: 0 };
}

export function isWon(tiles) {
  return tiles.length > 0 && tiles.every(Boolean);
}

export function flipTile(tiles, size, index) {
  const row = Math.floor(index / size);
  const col = index % size;
  const affected = new Set([index]);
  if (col > 0) affected.add(index - 1);
  if (col < size - 1) affected.add(index + 1);
  if (row > 0) affected.add(index - size);
  if (row < size - 1) affected.add(index + size);
  return tiles.map((tile, position) => affected.has(position) ? !tile : tile);
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'reset': return createGame(action.size ?? state.size);
    case 'next': return createGame(state.size === 5 ? 3 : state.size + 1);
    case 'flip':
      if (isWon(state.tiles)) return state;
      return { ...state, tiles: flipTile(state.tiles, state.size, action.index), steps: state.steps + 1 };
    default: return state;
  }
}
