import {CharacterDto} from '../dto/character-request';
import {Character} from '../../domain/character';
import {CharacterState} from '../../domain/character-state';

export function toCharacterDomain(character: CharacterDto): Character {
  return {
    id: character.id,
    imgUrl: character.image,
    name: character.name,
    species: character.species,
    state: toCharacterState(character.status)
  }
}

function toCharacterState(status: string): CharacterState {
  switch (status) {
    case "Alive":
      return CharacterState.ALIVE;
    case "Dead":
      return CharacterState.DEAD;
    case "unknown":
      return CharacterState.UNKNOWN;
  }
  throw new Error("Unknown character status " + status);
}
