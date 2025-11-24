import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameCanvas } from './game/game-canvas/game-canvas';
import { Game } from './game/game';

@Component({
  selector: 'app-root',
  imports: [Game],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('esa-dev-community');
}
