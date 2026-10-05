export default function Board({ tiles, size, colors, won, onFlip }) {
  return (
    <div className="board" style={{ '--size': size }} aria-describedby="instructions">
      {tiles.map((target, index) => (
        <button key={index} className="tile" disabled={won}
          style={{ backgroundColor: target ? colors.to : colors.from }}
          aria-label={`Row ${Math.floor(index / size) + 1}, column ${index % size + 1}: ${target ? 'target' : 'starting'} color`}
          aria-pressed={target} onClick={() => onFlip(index)}>
          <span className="tile-marker" aria-hidden="true">{target ? '•' : ''}</span>
        </button>
      ))}
    </div>
  );
}
