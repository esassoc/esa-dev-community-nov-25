import { Injectable, signal, Signal } from '@angular/core';
import { IGameObject, IGameService, IGameStats } from '../game-contracts';

@Injectable({
  providedIn: 'root',
})
export class GameService implements IGameService {
  gameObjects: Signal<IGameObject[]> = signal<IGameObject[]>([]);
  gameStats: Signal<IGameStats> = signal<IGameStats>({ score: 0, caught: 0, missed: 0 });

  // For other team's bonuses
  colorScheme = signal<'light' | 'dark'>('light');

  startGame(): void {
    throw new Error('Method not implemented.');
  }
  stopGame(): void {
    throw new Error('Method not implemented.');
  }
  resetGame(): void {
    throw new Error('Method not implemented.');
  }
  clickedGameObject(objectId: string): void {
    throw new Error('Method not implemented.');
  }

  // For other team's bonuses
  setColorScheme(scheme: 'light' | 'dark'): void {
    this.colorScheme.set(scheme);
  }
}
