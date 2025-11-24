# Team 2 (Game Display and Interaction w/ GameObjects):

Rules: Only modify code in the `game-canvas` directory. You can read from the `GameService` but do not modify it. You can create additional components if desired within this directory.

MVP:
Display `IGameObjects` on the screen from the `GameService`
Inform the `GameService` on click of the `IGameObjects`
Style the `bomb` and `coin` types of GameObjects differently

Bonus time:
1. Implement styles for Dark/Light mode, e.g.:

```css
div {
  background: light-dark(#ffffff, #000000);
  color: light-dark(#000000, #ffffff);
}
```

2. Make it not easy? (falling targets? Various sizes? etc?)
