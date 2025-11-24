import { Component } from '@angular/core';
import { GameScoreboard } from './game-scoreboard/game-scoreboard';
import { GameCanvas } from './game-canvas/game-canvas';

@Component({
  selector: 'app-game',
  imports: [GameScoreboard, GameCanvas],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {}
