import { Component, effect, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchSvg } from '../../icons/search-svg/search-svg';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, SearchSvg],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  keyword = new FormControl('');
  value = input('');
  search = output<string>();

  constructor() {
    this.keyword.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => this.search.emit(value ?? ''));

    effect(() => {
      this.keyword.setValue(this.value(), { emitEvent: false });
    });
  }

  clear() {
    this.keyword.setValue('', { emitEvent: false });
    this.search.emit('');
  }
}