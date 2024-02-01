import { Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';

export const routes: Routes = [
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
