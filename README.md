# Reverse

A small tile-flipping puzzle, modernized from the original 2016 React / Cordova app to React and Vite.

Click or tap a tile to flip it and its orthogonal neighbors. Turn every tile into the target color to win. Choose a 3 × 3, 4 × 4, or 5 × 5 board, or customize both colors. Completing a board advances to the next size; 5 × 5 cycles back to 3 × 3. Selecting a size, including the current size, resets the puzzle.

## Development

Use Node.js 20.19+ or 22.12+ (a current supported LTS release is recommended).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm start` is also available.

```sh
npm test          # Game rules, boundaries, victory, resets, progression
npm run build    # Production output in dist/
npm run preview  # Serve the production build locally
```

Deploy `dist/` to any static web host. Relative asset URLs support hosting under a subdirectory.

## Migration review

- Replaced Webpack 1, Babel 6, mismatched React / React DOM versions, and React.createClass with Vite, matching modern React packages, function components, and hooks.
- Replaced direct state mutation, forceUpdate, and deprecated lifecycle methods with immutable reducer updates.
- Store tile values as booleans, independent of display colors. Changing either color preserves the puzzle and move count, even when colors match; a dot also identifies target tiles.
- Replaced old Bootstrap modals, react-color, and clickable spans with native buttons, color inputs, a responsive CSS grid, and a modal dialog with keyboard focus management.
- Removed unused runtime packages and Cordova build hooks from the active project. `npm install` no longer attempts to run Cordova.
- Preserved the old platform configuration, images, build files, and resources in `legacy/` for reference. Native iOS/Android packaging is not part of the Vite workflow.

## Source

- `src/App.jsx`: controls, game state, and completion dialog.
- `src/components/Board.jsx`: accessible tile buttons.
- `src/game.js`: pure game rules and reducer.
- `src/game.test.js`: game regression tests using Node's built-in test runner.

## License

MIT. Copyright (c) 2016 Mark Rogov.
