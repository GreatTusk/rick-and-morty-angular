import {Component} from '@angular/core';
import {CharacterState} from '../../domain/character-state';
import {Character} from '../../domain/character';
import {CharacterCard} from './components/character-card/character-card';

@Component({
  selector: 'app-home',
  imports: [
    CharacterCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  testCharacter: Character = {
    id: 1,
    name: "Rick Sanchez",
    species: "Human",
    state: CharacterState.ALIVE,
    imgUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  };
}
