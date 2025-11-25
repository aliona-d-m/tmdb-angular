import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieI, MoviesI } from '../interfaces';

@Injectable({ providedIn: 'root' })
// export class TmdbService {
//   private http = inject(HttpClient);

//   loading = signal(false);
//   error = signal<string | null>(null);

//   movies = signal<MovieI[]>([]);
//   movieDetails = signal<MovieI | null>(null);
//   totalPages = signal(0);

//   private loadingCount = 0;

//   private setLoading(value: boolean) {
//     this.loadingCount += value ? 1 : -1;
//     this.loading.set(this.loadingCount > 0);
//   }

//   private request<T>(
//     path: string,
//     params: Record<string, any> = {},
//   ) {
//     this.setLoading(true);

//     const fullParams = new HttpParams({ fromObject: { api_key: environment.apiKey, ...params } });

//     return this.http
//       .get<T>(`${environment.apiUrl}/${path}`, { params: fullParams })
//       .pipe(
//         catchError(err => {
//           const msg = err?.error?.status_message ?? err?.message ?? 'Error loading data';
//           this.error.set(msg);
//           return throwError(() => err);
//         }),
//         finalize(() => {
//           this.setLoading(false);
//         })
//       );
//   }

//   getPopularMovies(page = 1) {
//     return this.request<MoviesI>('movie/popular', { page }).subscribe(res => {
//       this.movies.set(res.results);
//       this.totalPages.set(res.total_pages);
//     });
//   }

//   getMovieDetails(id: number) {
//     this.loading.set(true);

//     this.request<MovieI>(`movie/${id}`).subscribe({
//       next: res => {
//         this.movieDetails.set(res);
//         this.error.set(null);
//       },
//       error: err => {
//         this.error.set(err.message ?? 'Error');
//       },
//       complete: () => this.loading.set(false)
//     });
//   }

//   searchMovies(keyword: string, page = 1) {
//     return this.request<{ results: MovieI[], total_pages: number }>(
//       'search/movie',
//       { query: keyword, page }
//     ).subscribe(res => {
//       this.movies.set(res.results);
//       this.totalPages.set(res.total_pages);
//     });
//   }
// }
export class TmdbService {
  private http = inject(HttpClient);

  loading = signal(false);
  error = signal<string | null>(null);

  movies = signal<MovieI[]>([]);
  movieDetails = signal<MovieI | null>(null);
  totalPages = signal(0);

  private loadingCount = 0;

  private setLoading(value: boolean) {
    this.loadingCount += value ? 1 : -1;
    this.loading.set(this.loadingCount > 0);
  }

  private request<T>(path: string, params: Record<string, any> = {}) {
    this.setLoading(true);

    const fullParams = new HttpParams({
      fromObject: { api_key: environment.apiKey, ...params }
    });

    return this.http.get<T>(`${environment.apiUrl}/${path}`, { params: fullParams }).pipe(
      catchError(err => {
        const msg = err?.error?.status_message ?? err?.message ?? 'Error loading data';
        this.error.set(msg);
        return throwError(() => err);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getPopularMovies(page = 1) {
    this.loading.set(true);
    this.request<MoviesI>('movie/popular', { page }).subscribe({
      next: res => {
        this.movies.set(res.results);
        this.totalPages.set(res.total_pages);
        this.error.set(null);
      },
      error: err => this.error.set(err.message ?? 'Error'),
      complete: () => this.loading.set(false)
    });
  }

  searchMovies(keyword: string, page = 1) {
    this.loading.set(true);
    this.request<{ results: MovieI[], total_pages: number }>('search/movie', { query: keyword, page }).subscribe({
      next: res => {
        this.movies.set(res.results);
        this.totalPages.set(res.total_pages);
        this.error.set(null);
      },
      error: err => this.error.set(err.message ?? 'Error'),
      complete: () => this.loading.set(false)
    });
  }

  getMovieDetails(id: number) {
    this.loading.set(true);
    this.request<MovieI>(`movie/${id}`).subscribe({
      next: res => {
        this.movieDetails.set(res);
        this.error.set(null);
      },
      error: err => this.error.set(err.message ?? 'Error'),
      complete: () => this.loading.set(false)
    });
  }
}