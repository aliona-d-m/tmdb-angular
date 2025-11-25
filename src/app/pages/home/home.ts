import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MoviesList } from '../../components';
import { TmdbService } from '../../services/tmdb';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesList],
  templateUrl: './home.html',
})
export class Home {
  private route = inject(ActivatedRoute);
  private tmdb = inject(TmdbService);

  movies = this.tmdb.movies;
  totalPages = this.tmdb.totalPages;
  loading = this.tmdb.loading;
  error = this.tmdb.error;

  page = toSignal(this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')))
  ));

  keyword = toSignal(this.route.queryParamMap.pipe(
    map(params => params.get('query') ?? '')
  ));

  constructor() {
    effect(() => {
      const p = this.page();
      const q = this.keyword() || '';

      if (!p) return;

      if (q.length > 0) {
        this.tmdb.searchMovies(q, p);
      } else {
        this.tmdb.getPopularMovies(p);
      }
    });
  }
}