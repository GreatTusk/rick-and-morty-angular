import { Component } from '@angular/core';
import {Home} from './feature/home/home';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rick-and-morty-angular';

  constructor(private iconRegistry: MatIconRegistry) {
    this.iconRegistry.setDefaultFontSetClass("material-symbols");
  }
}
