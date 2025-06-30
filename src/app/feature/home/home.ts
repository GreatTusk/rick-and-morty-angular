import {Component, computed, effect, inject, signal} from '@angular/core';
import {Character} from '../../domain/character';
import {AsyncPipe} from '@angular/common';
import {CharacterService} from '../../data/character-service';
import {CharacterGrid} from './components/character-grid/character-grid';
import {SearchBar} from './components/search-bar/search-bar';
import {emptySearchFilters, SearchFilters} from '../../domain/search-filters';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Paginator} from './components/paginator/paginator';
import {PagingInfo} from '../../domain/character-results';
import {map} from 'rxjs';

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

  protected searchFilters = signal<SearchFilters>(emptySearchFilters);
  protected currentPage = signal(0);
  protected appState = signal<AppState>({
    characters: [],
    loading: false,
    error: null
  });

  protected characters = computed(() => this.appState().characters);
  protected pagingInfo = computed(() => this.appState().pagingInfo);
  protected loading = computed(() => this.appState().loading);
  protected error = computed(() => this.appState().error);

  onSearch(filters: SearchFilters) {
    this.searchFilters.set(filters);
    this.currentPage.set(0);
  }

  handlePageChange(newPage: number) {
    this.currentPage.set(newPage);
  }

  constructor() {
    effect(() => {
      const filters = this.searchFilters();
      const page = this.currentPage() + 1;

      // Set loading state
      this.appState.update(state => ({
        ...state,
        loading: true,
        error: null
      }));

      // Subscribe to the observable
      const subscription = this.characterService.getCharacters(filters, page).subscribe({
        next: (result) => {
          this.appState.set({
            characters: result.characters,
            pagingInfo: result.pagingInfo,
            loading: false,
            error: null
          });
        },
        error: (error) => {
          this.appState.update(state => ({
            ...state,
            loading: false,
            error: error.message || 'Failed to load characters'
          }));
        }
      });

      return () => subscription.unsubscribe();
    });
  }

  protected readonly emptySearchFilters = emptySearchFilters;
}
