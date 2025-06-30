import {Component, input, output, signal} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginator,
  ],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator {
  pageEvent = output<number>()

  totalItems = input.required<number>();
  pageSize = 20;

  handlePageEvent(pageEvent: PageEvent) {
    console.log(pageEvent.pageIndex);
    this.pageEvent.emit(pageEvent.pageIndex);
  }
}
