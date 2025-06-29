import {Component, output} from '@angular/core';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SearchFilters} from '../../../../domain/search-filters';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchFilters = output<SearchFilters>();

  searchForm = new FormGroup({
    name: new FormControl(""),
    status: new FormControl(""),
    gender: new FormControl(""),
  });

  search() {
    const filters: SearchFilters = {
      name: this.searchForm.value.name || '',
      status: this.searchForm.value.status || '',
      gender: this.searchForm.value.gender || ''
    };

    this.searchFilters.emit(filters);
  }
}
