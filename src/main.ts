import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

(function() {
    const theme = localStorage.getItem('app-theme') || 'bootstrap4-light-blue';
    const colorScheme = localStorage.getItem('app-color-scheme') || 'light';
    const linkElement = document.getElementById('theme-css');
    const newHref = `assets/layout/styles/theme/${theme}/theme.css`;
    linkElement.setAttribute('href', newHref);
})();
