import {Component, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {NgOptimizedImage} from '@angular/common';
import {Character} from '../../../../domain/character';
import {MatChip} from '@angular/material/chips';
import {CharacterStatusIcon} from '../character-status-icon/character-status-icon';

@Component({
  selector: 'app-character-card',
  imports: [
    MatCard,
    MatCardContent,
    NgOptimizedImage,
    MatChip,
    MatCardImage,
    CharacterStatusIcon,
  ],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css'
})
export class CharacterCard {
  character = input.required<Character>()
}
