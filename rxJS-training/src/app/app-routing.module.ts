
import { RouterModule, Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PlantComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
