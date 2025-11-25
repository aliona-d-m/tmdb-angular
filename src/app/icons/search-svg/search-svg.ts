import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-search-svg',
  standalone: true,
  imports: [NgClass],
  templateUrl: './search-svg.html',
})
export class SearchSvg {
  class = input<string>();
}
