import { Component } from '@angular/core';
import {Home} from './feature/home/home';
import {MatIconRegistry} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Home, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rick-and-morty-angular';

  constructor(private iconRegistry: MatIconRegistry) {
    this.iconRegistry.setDefaultFontSetClass("material-symbols");
  }
}
