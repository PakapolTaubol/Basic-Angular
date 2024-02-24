import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: 'main',
        component: AppComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    }
];
