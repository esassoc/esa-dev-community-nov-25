import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../game-service/game-service';

@Component({
  selector: 'app-game-canvas',
  imports: [],
  templateUrl: './game-canvas.html',
  styleUrls: ['./game-canvas.scss'],
})
export class GameCanvas implements OnInit {
  private gameService = inject(GameService);
  // locally track clicked objects to trigger DOM-only animations
  private clickedIds = new Set<string>();

  ngOnInit(): void {
  }

  // Expose the signal to the template (templates can call functions on component)
  get gameObjects() {
    return this.gameService.gameObjects();
  }

  // Handler when a game object is clicked
  onObjectClick(id: string) {
      // trigger local animation state
      this.clickedIds.add(id);
      // clear the local state after animation finishes so the animation can re-run
      window.setTimeout(() => this.clickedIds.delete(id), 900);

      // inform the GameService (may be unimplemented in some teams)
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn = (this.gameService as any).clickedGameObject;
        if (typeof fn === 'function') {
          fn.call(this.gameService, id);
        }
      } catch (err) {
        // swallow to avoid breaking the canvas when GameService isn't implemented
        // but log for visibility
        // eslint-disable-next-line no-console
        console.warn('clickedGameObject call failed', err);
      }
  }

  // Template helper used to add the zoom-off class for coins that were clicked
  isZoomed(id: string) {
    return this.clickedIds.has(id);
  }
}
