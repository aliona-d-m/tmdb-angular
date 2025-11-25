import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MovieCard, Paging } from '..';
import { TmdbService } from '../../services/tmdb';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  templateUrl: './movies-list.html',
  imports: [MovieCard, Paging, NgTemplateOutlet]
})
export class MoviesList {
  private tmdb = inject(TmdbService);

  movies = this.tmdb.movies;
  totalPages = this.tmdb.totalPages;
  loading = this.tmdb.loading;
  error = this.tmdb.error;

  page = input.required<number>();
  skeletons = Array.from({ length: 20 });
}