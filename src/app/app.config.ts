import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedService } from './shared.service';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { RouteGuardService } from './route-guard.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'blog-76562',
          appId: '1:999672845642:web:15eabcb6a562dd9b07ddb3',
          storageBucket: 'blog-76562.appspot.com',
          apiKey: 'AIzaSyBN6Qg3EFuSSArjzE2pt7dg68PMDnvFfhE',
          authDomain: 'blog-76562.firebaseapp.com',
          messagingSenderId: '999672845642',
          measurementId: 'G-P0B1CD9W3M',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    SharedService,
    DatePipe,
    AuthService,
    RouteGuardService, provideAnimationsAsync(),
  ],
};
