import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonSearchComponent,
  },
  {
    path: 'detail',
    component: PokemonDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
