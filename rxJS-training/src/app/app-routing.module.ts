
import { RouterModule, Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { NgModule } from '@angular/core';
import { LimitOffsetComponent } from './limit-offset/limit-offset.component';

const routes: Routes = [
  {
    path: '',
    component: PlantComponent,
  },
  {
    path: 'limit',
    component: LimitOffsetComponent,
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
