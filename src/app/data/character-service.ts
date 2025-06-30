import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CharacterRequest} from './dto/character-request';
import {map, Observable} from 'rxjs';
import {toCharacterDomain} from './mapper/character-mapper';
import {SearchFilters} from '../domain/search-filters';
import {CharacterResults} from '../domain/character-results';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private httpClient = inject(HttpClient);

  getCharacters(filters: SearchFilters, page: number): Observable<CharacterResults> {
    let params = new HttpParams().set("name", filters.name).set("page", page);

    if (filters.gender !== "") {
      params = params.append("gender", filters.gender);
    }

    if (filters.status !== "") {
      params = params.append('status', filters.status);
    }

    return this.httpClient.get<CharacterRequest>("https://rickandmortyapi.com/api/character", {
      params: params
    })
      .pipe(map(response => {
        return {
          characters: response.results.map(toCharacterDomain),
          pagingInfo: {
            count: response.info.count,
            totalPages: response.info.pages
          }
        }
      }));
  }
}
