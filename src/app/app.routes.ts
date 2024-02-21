import { CanMatchFn, Route, Routes, UrlSegment } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { RouteGuardService } from './route-guard.service';
import { inject } from '@angular/core';

const canMatchTeam: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return inject(RouteGuardService).canMatch();
};

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canMatch: [canMatchTeam],
  },
  { path: '', component: IndexComponent, canActivate: [RouteGuardService] },
];
