import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
import {getAllDataFromLocalForage, default as localForage} from 'ngrx-store-persist';

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

