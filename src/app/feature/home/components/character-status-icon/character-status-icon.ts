import {Component, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CharacterState} from '../../../../domain/character-state';

@Component({
  selector: 'app-character-status-icon',
  imports: [
    MatIcon
  ],
  templateUrl: './character-status-icon.html',
  styleUrl: './character-status-icon.css'
})
export class CharacterStatusIcon {
  characterState = input.required<CharacterState>()

  protected getIcon() {
    switch (this.characterState()) {
      case CharacterState.ALIVE:
        return "favorite";
      case CharacterState.DEAD:
        return "skull";
      case CharacterState.UNKNOWN:
        return "question_mark";
    }
  }
}
