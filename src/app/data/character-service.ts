import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CharacterRequest} from './dto/character-request';
import {map, Observable} from 'rxjs';
import {toCharacterDomain} from './mapper/character-mapper';
import {Character} from '../domain/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private httpClient = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<CharacterRequest>("https://rickandmortyapi.com/api/character?name=&page=1")
      .pipe(map(response => response.results))
      .pipe(map((characters) => characters.map(toCharacterDomain)));
  }
}
