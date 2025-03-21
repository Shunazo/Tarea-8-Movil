import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage-angular';
import { ServiciomultaService } from './app/services/serviciomulta.service';
import { HttpClientModule,  } from '@angular/common/http';  
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment.prod';

defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule),
    Storage,
    ServiciomultaService
  ],
});
