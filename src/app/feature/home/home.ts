import {Component, inject, signal} from '@angular/core';
import {Character} from '../../domain/character';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, catchError, combineLatest, map, Observable, startWith, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {CharacterService} from '../../data/character-service';
import {CharacterGrid} from './components/character-grid/character-grid';
import {SearchBar} from './components/search-bar/search-bar';
import {SearchFilters} from '../../domain/search-filters';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Paginator} from './components/paginator/paginator';
import {PagingInfo} from '../../domain/character-results';

interface AppState {
  characters: Character[];
  pagingInfo?: PagingInfo;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    CharacterGrid,
    SearchBar,
    MatProgressSpinner,
    MatIcon,
    MatButton,
    Paginator
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

  currentPage = signal(1);
  private currentPage$ = toObservable(this.currentPage);

  state$: Observable<AppState> = combineLatest([
    this.searchFilters$,
    this.currentPage$
  ]).pipe(
    switchMap(([filters, page]) =>
      this.characterService.getCharacters(filters, page).pipe(
        map(characterResponse => ({
          characters: characterResponse.characters,
          loading: false,
          error: null,
          pagingInfo: characterResponse.pagingInfo
        })),
        startWith({
          characters: [],
          loading: true,
          error: null,
        }),
        catchError(error => {
          const errorMessage = error.status === 404 ? "No characters found." : "Something went wrong.";
          return [{
            characters: [],
            loading: false,
            error: errorMessage,
          }];
        })
      )
    )
  );

  characters$ = this.state$.pipe(map(state => state.characters));
  loading$ = this.state$.pipe(map(state => state.loading));
  error$ = this.state$.pipe(map(state => state.error));
  pagingInfo$ = this.state$.pipe(map(state => state.pagingInfo));

  onSearch(filters: SearchFilters) {
    this.searchFilters$.next(filters);
    this.currentPage.set(1);
  }

  handlePageChange(newPage: number) {
    this.currentPage.set(newPage + 1);
  }
}
