import { Injectable, signal, Signal } from '@angular/core';
import { IGameObject, IGameService, IGameStats } from '../game-contracts';

@Injectable({
  providedIn: 'root',
})
export class GameService implements IGameService {
  private gameObjectsSignal = signal<IGameObject[]>([]);
  private gameStatsSignal = signal<IGameStats>({ score: 0, caught: 0, missed: 0 });
  
  gameObjects: Signal<IGameObject[]> = this.gameObjectsSignal.asReadonly();
  gameStats: Signal<IGameStats> = this.gameStatsSignal.asReadonly();

  // For other team's bonuses
  colorScheme = signal<'light' | 'dark'>('light');

  private spawnInterval: number | null = null;
  private objectTimeouts = new Map<string, number>();

  startGame(): void {
    // Clear any existing game state
    this.stopGame();
    
    // Start spawning objects every second
    this.spawnInterval = window.setInterval(() => {
      this.spawnGameObject();
    }, 1000);
  }

  stopGame(): void {
    // Clear spawn interval
    if (this.spawnInterval !== null) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = null;
    }
    
    // Clear all object timeouts
    this.objectTimeouts.forEach(timeout => clearTimeout(timeout));
    this.objectTimeouts.clear();
  }

  resetGame(): void {
    // Stop the game
    this.stopGame();
    
    // Clear all objects
    this.gameObjectsSignal.set([]);
    
    // Reset stats
    this.gameStatsSignal.set({ score: 0, caught: 0, missed: 0 });
  }

  clickedGameObject(objectId: string): void {
    const objects = this.gameObjectsSignal();
    const clickedObject = objects.find(obj => obj.id === objectId);
    
    if (clickedObject) {
      // Clear the auto-remove timeout for this object
      const timeout = this.objectTimeouts.get(objectId);
      if (timeout) {
        clearTimeout(timeout);
        this.objectTimeouts.delete(objectId);
      }
      
      // Remove object from list
      this.gameObjectsSignal.update(objs => objs.filter(obj => obj.id !== objectId));
      
      // Update stats
      const currentStats = this.gameStatsSignal();
      this.gameStatsSignal.set({
        score: currentStats.score + clickedObject.points,
        caught: currentStats.caught + 1,
        missed: currentStats.missed
      });
    }
  }

  // For other team's bonuses
  setColorScheme(scheme: 'light' | 'dark'): void {
    this.colorScheme.set(scheme);
  }

  private spawnGameObject(): void {
    const objectId = `obj-${Date.now()}-${Math.random()}`;
    const objectType = Math.random() > 0.3 ? 'coin' : 'bomb';
    
    const newObject: IGameObject = {
      id: objectId,
      objectType: objectType,
      xPosition: Math.random() * 80 + 10, // 10-90% to keep objects away from edges
      yPosition: Math.random() * 80 + 10, // 10-90% to keep objects away from edges
      points: objectType === 'coin' ? 10 : -20
    };
    
    // Add object to list
    this.gameObjectsSignal.update(objs => [...objs, newObject]);
    
    // Set timeout to auto-remove after 3 seconds
    const timeout = window.setTimeout(() => {
      this.removeObjectAsMissed(objectId);
    }, 3000);
    
    this.objectTimeouts.set(objectId, timeout);
  }

  private removeObjectAsMissed(objectId: string): void {
    const objects = this.gameObjectsSignal();
    const missedObject = objects.find(obj => obj.id === objectId);
    
    if (missedObject) {
      // Remove object from list
      this.gameObjectsSignal.update(objs => objs.filter(obj => obj.id !== objectId));
      
      // Update stats (only count as missed if it was a positive object)
      if (missedObject.objectType === 'coin') {
        const currentStats = this.gameStatsSignal();
        this.gameStatsSignal.set({
          score: currentStats.score,
          caught: currentStats.caught,
          missed: currentStats.missed + 1
        });
      }
      
      // Clean up timeout reference
      this.objectTimeouts.delete(objectId);
    }
  }
}
