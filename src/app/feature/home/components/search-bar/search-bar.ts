import {Component} from '@angular/core';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

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
  searchForm = new FormGroup({
    name: new FormControl(""),
    status: new FormControl(""),
    gender: new FormControl(""),
  })

  search() {
    console.log(this.searchForm.value.name);
  }
}
