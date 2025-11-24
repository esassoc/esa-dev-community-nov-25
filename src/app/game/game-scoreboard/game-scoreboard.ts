import { Component, computed, inject } from '@angular/core';
import { GameService } from '../game-service/game-service';

@Component({
  selector: 'app-game-scoreboard',
  imports: [],
  templateUrl: './game-scoreboard.html',
  styleUrl: './game-scoreboard.scss',
})
export class GameScoreboard {
  private gameService = inject(GameService);

  // Expose stats as computed signals for the template
  stats = computed(() => this.gameService.gameStats());
  colorScheme = computed(() => this.gameService.colorScheme());

  start() {
    this.gameService.startGame();
  }

  stop() {
    this.gameService.stopGame();
  }

  reset() {
    this.gameService.resetGame();
  }

  toggleTheme() {
    const next = this.colorScheme() === 'light' ? 'dark' : 'light';
    this.gameService.setColorScheme(next);
  }
}
