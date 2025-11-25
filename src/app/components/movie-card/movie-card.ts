import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImage } from '..';
import { MovieI } from '../../interfaces';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink, LazyImage, SlicePipe],
  templateUrl: './movie-card.html',
})
export class MovieCard {
  item = input.required<MovieI>();
}
