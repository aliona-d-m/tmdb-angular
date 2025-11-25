import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

function initTheme() {
  const stored = localStorage.getItem('theme');
  const theme = stored === 'dark' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', theme);
}

initTheme();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
