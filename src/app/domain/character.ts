import {CharacterState} from './character-state';

export interface Character {
  id: number,
  name: string,
  species: string,
  state: CharacterState,
  imgUrl: string
}
