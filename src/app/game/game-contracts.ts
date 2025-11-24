import { Signal } from '@angular/core';

export interface IGameObject {
  id: string; // unique ID (Guid?)
  objectType: 'coin' | 'bomb';
  xPosition: number; // 0 = left, 100 = right (percentage)
  yPosition: number; // 0 = top, 100 = bottom (percentage)
  points: number; // Value of the object (e.g., coin = +10, bomb = -20)
}

export interface IGameService {
  startGame(): void;
  stopGame(): void;
  resetGame(): void;
  clickedGameObject(objectId: string): void;
  setColorScheme(scheme: 'light' | 'dark'): void;
  gameObjects: Signal<IGameObject[]>;
  gameStats: Signal<IGameStats>;
}

export interface IGameStats {
  score: number;
  caught: number;
  missed: number;
}
