import { Component, inject } from '@angular/core';
import { GameScoreboard } from './game-scoreboard/game-scoreboard';
import { GameCanvas } from './game-canvas/game-canvas';
import { GameService } from './game-service/game-service';

@Component({
  selector: 'app-game',
  imports: [GameScoreboard, GameCanvas],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  gameService = inject(GameService);
}
