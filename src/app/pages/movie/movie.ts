import { NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LazyImage } from '../../components/lazy-image/lazy-image';
import { TmdbService } from '../../services/tmdb';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [LazyImage, NgTemplateOutlet],
  templateUrl: './movie.html',
  styleUrl: './movie.css',
})
export class Movie {
  private route = inject(ActivatedRoute);
  private tmdb = inject(TmdbService);

  movie = this.tmdb.movieDetails;
  loading = this.tmdb.loading;
  error = this.tmdb.error;

  idSignal = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  constructor() {
    effect(() => {
      const id = this.idSignal();
      if (!id) return;

      this.tmdb.getMovieDetails(Number(id));
    });
  }
}
