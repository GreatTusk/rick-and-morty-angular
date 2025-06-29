import {Component, input} from '@angular/core';
import {Character} from '../../../../domain/character';
import {CharacterCard} from '../character-card/character-card';

@Component({
  selector: 'app-character-grid',
  imports: [
    CharacterCard
  ],
  templateUrl: './character-grid.html',
  styleUrl: './character-grid.css'
})
export class CharacterGrid {
  characters = input.required<Character[]>()
}
