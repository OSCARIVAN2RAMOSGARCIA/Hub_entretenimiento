import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    {
        path:'',
        component: LoginComponent
     },
     {
        path:'home',
        component: HomeComponent
     }
    ];
