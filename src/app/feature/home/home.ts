import {Component, inject} from '@angular/core';
import {Character} from '../../domain/character';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {BehaviorSubject, catchError, combineLatest, map, Observable, startWith, switchMap} from 'rxjs';
import {CharacterService} from '../../data/character-service';
import {CharacterGrid} from './components/character-grid/character-grid';
import {SearchBar} from './components/search-bar/search-bar';
import {SearchFilters} from '../../domain/search-filters';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

interface AppState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    CharacterGrid,
    SearchBar,
    NgOptimizedImage,
    MatProgressSpinner,
    MatIcon,
    MatButton
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private characterService = inject(CharacterService);

  private searchFilters$ = new BehaviorSubject<SearchFilters>({
    name: '',
    status: '',
    gender: ''
  });

  page$ = new BehaviorSubject(1)

  state$: Observable<AppState> = this.searchFilters$.pipe(
    switchMap(filters =>
      this.characterService.getCharacters(filters, 1).pipe(
        map(characters => ({
          characters,
          loading: false,
          error: null,
        })),
        startWith({
          characters: [],
          loading: true,
          error: null
        }),
        catchError(error => {
          const errorMessage = error.status === 404 ? "No characters found." : "Something went wrong.";
          return [{
            characters: [],
            loading: false,
            error: errorMessage
          }];
        })
      )
    )
  )

  characters$ = this.state$.pipe(map(state => state.characters));
  loading$ = this.state$.pipe(map(state => state.loading));
  error$ = this.state$.pipe(map(state => state.error));

  onSearch(filters: SearchFilters) {
    this.searchFilters$.next(filters);
  }
}
