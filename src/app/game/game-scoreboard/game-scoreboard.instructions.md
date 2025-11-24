# Team 3 (Score and Controls):

Rules: Only modify code in the `game-scoreboard` directory. You can read from the `GameService` but do not modify it. You can create additional components if desired within this directory.

VP:
Display three numbers (`IGameStats`) from the `GameService`
User Interface for controls that call service methods for `startGame`, `stopGame`, and `resetGame`

Bonus:
1. Implement a control for toggling Dark/Light mode through the `GameService` and style UI for each mode, e.g.:

```css
div {
  background: light-dark(#ffffff, #000000);
  color: light-dark(#000000, #ffffff);
}
```
