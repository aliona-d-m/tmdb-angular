import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme';
import { ThemeT } from '../interfaces';

const STORAGE_ITEM = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    this.applyTheme(this.theme);
  }

  get theme(): ThemeT {
    const stored = localStorage.getItem(STORAGE_ITEM) as ThemeT | null;

    if (stored) return stored;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? Theme.Dark : Theme.Light;
  }

  set theme(mode: ThemeT) {
    localStorage.setItem(STORAGE_ITEM, mode);
    this.applyTheme(mode);
  }

  toggle() {
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
  }

  private applyTheme(mode: ThemeT) {
    document.documentElement.setAttribute('data-theme', mode);
  }
}