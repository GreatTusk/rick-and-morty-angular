import {Component, effect, inject} from '@angular/core';
import {Character} from '../../domain/character';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Observable} from 'rxjs';
import {CharacterService} from '../../data/character-service';
import {CharacterGrid} from './components/character-grid/character-grid';
import {SearchBar} from './components/search-bar/search-bar';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    CharacterGrid,
    SearchBar,
    NgOptimizedImage
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private characterService = inject(CharacterService);
  characters$!: Observable<Character[]>;

  constructor() {
    effect(() => {
      this.characters$ = this.characterService.getCharacters();
    });
  }
}
