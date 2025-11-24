# Esa Dev Community November 2025

## Lets make a game in Angular!
The Game:
A simple click on "object" game. Clicking on objects adds to a "score" that is displayed on the page that has simple controls (buttons) for starting, stopping and resetting the game. Minimal instructions were provided for styling, style it however you want!

Thought experiments?
* Should we prohibit use of copilot?
* Should we exclusively use copilot prompts?

Format:
* The entire group will be split into three breakout rooms at random (besides a few screen-sharers).
* Each room will make a branch off `main` and implement a segment of the code that relies on the other segments. Some minimal contracts are defined in `game-contracts.ts`.
  * Room 1: Implement the Game Service. See: `game-service.instructions.md`
  * Room 2: Implement the canvas with Game Objects. See: `game-canvas.instructions.md`
  * Room 3: Implement a UI overlay to track score and add controls. See: `game-scoreboard.instructions.md`
* Each room will submit a PR.
* Rejoin main room.
* Merge and "play" the game.
  * Does it work?

## Development server
To start a local development server, run:

```bash
npm  install
npm  start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# It worked!
![Gif of resulting game](esa-dev-community-nov-2025-game.gif "Gif of resulting game")
