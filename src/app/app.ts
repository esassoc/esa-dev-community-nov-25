import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Head } from './body/head/head';
import { Legs } from './body/legs/legs';
import { Torso } from './body/torso/torso';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Head, Legs, Torso],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('esa-dev-community');
}
