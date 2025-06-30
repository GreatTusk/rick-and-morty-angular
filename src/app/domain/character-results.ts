import {Character} from './character';

export interface CharacterResults {
  characters: Character[];
  pagingInfo: PagingInfo;
}

export interface PagingInfo {
  count: number;
  totalPages: number;
}
