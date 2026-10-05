import { useEffect, useReducer, useRef, useState } from 'react';
import Board from './components/Board.jsx';
import { createGame, gameReducer, isWon, SIZES } from './game.js';

export default function App() {
  const [game, dispatch] = useReducer(gameReducer, undefined, createGame);
  const [colors, setColors] = useState({ from: '#ef4444', to: '#2563eb' });
  const dialog = useRef(null);
  const won = isWon(game.tiles);

  useEffect(() => {
    if (won && !dialog.current.open) dialog.current.showModal();
  }, [won]);

  function advance() {
    dispatch({ type: 'next' });
  }

  return (
    <main className="app">
      <header>
        <p className="eyebrow">A little puzzle. A fresh perspective.</p>
        <h1>Reverse<span>.</span></h1>
        <p className="instructions" id="instructions">Flip a tile and its neighbors. Turn the whole board into the target color.</p>
        <div className="palette">
          <label className="color-control">
            <input type="color" aria-label="Starting color" value={colors.from}
              onChange={event => setColors({ ...colors, from: event.target.value })} />
            <span>From</span>
          </label>
          <span className="arrow" aria-hidden="true">→</span>
          <label className="color-control">
            <input type="color" aria-label="Target color" value={colors.to}
              onChange={event => setColors({ ...colors, to: event.target.value })} />
            <span>To</span>
          </label>
        </div>
      </header>

      <section className="game" aria-label="Reverse puzzle">
        <div className="game-meta">
          <span>{game.size} × {game.size} board</span>
          <span role="status">{game.steps} {game.steps === 1 ? 'move' : 'moves'}</span>
        </div>
        <Board tiles={game.tiles} size={game.size} colors={colors} won={won}
          onFlip={index => dispatch({ type: 'flip', index })} />
        <button className="reset" onClick={() => dispatch({ type: 'reset' })}>Start again ↻</button>
      </section>

      <nav className="sizes" aria-label="Board size">
        {SIZES.map(size => (
          <button key={size} aria-pressed={game.size === size}
            onClick={() => dispatch({ type: 'reset', size })}>{size} × {size}</button>
        ))}
      </nav>
      <p className="hint">Choose your colors. Find your rhythm.</p>

      <dialog ref={dialog} onCancel={event => { event.preventDefault(); dialog.current.close(); }} onClose={advance}>
        <h2>Well done!</h2>
        <p>You reversed the board in {game.steps} {game.steps === 1 ? 'move' : 'moves'}.</p>
        <form method="dialog">
          <button className="primary" autoFocus>{game.size === 5 ? 'Back to 3 × 3' : `Try ${game.size + 1} × ${game.size + 1}`} →</button>
        </form>
      </dialog>
    </main>
  );
}
