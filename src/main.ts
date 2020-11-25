import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {default as localForage, getAllDataFromLocalForage} from 'ngrx-store-persist';

if (environment.production) {
  enableProdMode();
}

getAllDataFromLocalForage({
  driver: localForage.INDEXEDDB,
  keys: [
    'user',
    'auth',
  ],
}).then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});

