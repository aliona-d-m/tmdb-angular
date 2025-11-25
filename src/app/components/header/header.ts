import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { SearchBar, ThemeSwitcher } from '..';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeSwitcher, SearchBar],
  templateUrl: './header.html',
})
export class Header {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  keyword = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('query') ?? '')
    )
  );

  onSearch(keyword: string) {
    this.router.navigate(['/movies'], {
      relativeTo: this.route,
      queryParams: keyword
        ? { query: keyword, page: 1 }
        : { query: null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }
}
