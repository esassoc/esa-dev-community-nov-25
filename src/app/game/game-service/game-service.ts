import { Injectable, signal, Signal } from '@angular/core';
import { IGameObject, IGameService, IGameStats } from '../game-contracts';

@Injectable({
  providedIn: 'root',
})
export class GameService implements IGameService {
  gameObjects: Signal<IGameObject[]> = signal<IGameObject[]>([]);
  gameStats: Signal<IGameStats> = signal<IGameStats>({ score: 0, caught: 0, missed: 0 });

  startGame(): void {
    throw new Error('Method not implemented.');
  }
  stopGame(): void {
    throw new Error('Method not implemented.');
  }
  resetGame(): void {
    throw new Error('Method not implemented.');
  }
  clickedObject(objectId: string): void {
    throw new Error('Method not implemented.');
  }
  catch(objectId: string): void {
    throw new Error('Method not implemented.');
  }
  miss(objectId: string): void {
    throw new Error('Method not implemented.');
  }
}
