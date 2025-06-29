import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CharacterRequest} from './dto/character-request';
import {map, Observable} from 'rxjs';
import {toCharacterDomain} from './mapper/character-mapper';
import {Character} from '../domain/character';
import {SearchFilters} from '../domain/search-filters';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private httpClient = inject(HttpClient);

  getCharacters(filters: SearchFilters, page: number): Observable<Character[]> {
    let params = new HttpParams().set("name", filters.name);

    if (filters.gender !== "") {
      params = params.append("gender", filters.gender);
    }

    if (filters.status !== "") {
      params = params.append('status', filters.status);
    }

    return this.httpClient.get<CharacterRequest>("https://rickandmortyapi.com/api/character", {
      params: params
    })
      .pipe(map(response => response.results))
      .pipe(map((characters) => characters.map(toCharacterDomain)));
  }
}
