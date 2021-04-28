import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HeroesComponent } from './heroes/heroes.component';
import { PageNotFoundComponent } from './shared/Components/page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/Services/auth-guard.service';
import { HeroesResolverService } from './heroes/Services/heroes-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuardService],
    resolve: { heroesList: HeroesResolverService },
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
