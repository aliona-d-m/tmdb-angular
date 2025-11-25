import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paging',
  standalone: true,
  templateUrl: './paging.html',
})
export class Paging {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  page = input.required<number>();
  total = input.required<number>();

  pageChange = output<number>();

  first() {
    this.pageChange.emit(1);
    this.updateQueryParam(1);
  }

  prev() {
    if (this.page() > 1) {
      const p = this.page() - 1;
      this.pageChange.emit(p);
      this.updateQueryParam(p);
    }
  }

  next() {
    if (this.page() < this.total()) {
      const p = this.page() + 1;
      this.pageChange.emit(p);
      this.updateQueryParam(p);
    }
  }

  goTo(p: number) {
    if (p !== this.page()) {
      this.pageChange.emit(p);
      this.updateQueryParam(p);
    };
  }

  get pages() {
    const pages: number[] = [];
    const total = this.total();
    const current = this.page();

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 5);

    start = Math.max(1, end - 5);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  private updateQueryParam(p: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: p },
      queryParamsHandling: 'merge'
    });
    window.scrollTo(0, 0);
  }
}
