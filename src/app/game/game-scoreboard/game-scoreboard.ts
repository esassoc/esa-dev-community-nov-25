import {
  Component,
  computed,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  // Combined live message for screen readers
  liveMessage = computed(() => {
    const s = this.stats();
    return `Score ${s.score}. Caught ${s.caught}. Missed ${s.missed}.`;
  });

  // Position and bouncing
  pos = signal({ x: 24, y: 24 });
  private velocity = { x: 160, y: 120 }; // pixels per second
  private rafId = 0;
  private lastTs = 0;
  paused = signal(false);

  @ViewChild('board', { read: ElementRef }) boardRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    // start RAF loop
    this.lastTs = performance.now();
    this.rafId = requestAnimationFrame(this.frame);
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private frame = (ts: number) => {
    if (this.paused()) {
      this.lastTs = ts;
      this.rafId = requestAnimationFrame(this.frame);
      return;
    }

    const dt = Math.min(0.05, (ts - this.lastTs) / 1000); // clamp dt
    this.lastTs = ts;

    const el = this.boardRef?.nativeElement;
    if (!el) {
      this.rafId = requestAnimationFrame(this.frame);
      return;
    }

    const rect = el.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width - 8);
    const maxY = Math.max(0, window.innerHeight - rect.height - 8);

    let { x, y } = this.pos();
    x += this.velocity.x * dt;
    y += this.velocity.y * dt;

    // bounce on edges
    if (x <= 0) {
      x = 0;
      this.velocity.x = Math.abs(this.velocity.x);
    } else if (x >= maxX) {
      x = maxX;
      this.velocity.x = -Math.abs(this.velocity.x);
    }
    if (y <= 0) {
      y = 0;
      this.velocity.y = Math.abs(this.velocity.y);
    } else if (y >= maxY) {
      y = maxY;
      this.velocity.y = -Math.abs(this.velocity.y);
    }

    this.pos.set({ x, y });
    this.rafId = requestAnimationFrame(this.frame);
  };

  togglePause() {
    this.paused.update((p) => !p);
  }

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
