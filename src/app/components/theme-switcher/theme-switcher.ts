import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: 'theme-switcher.html',
})
export class ThemeSwitcher {
  private themeService = inject(ThemeService);

  theme() {
    return this.themeService.theme;
  }

  toggle() {
    this.themeService.toggle();
  }
}