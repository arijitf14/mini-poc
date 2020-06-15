import {NgModule} from '@angular/core'
import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainFormComponent } from './register/main-form/main-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component'
import { ProfileComponent } from './profile/profile.component'
import { CategoriesComponent } from './categories/categories.component'

import { AuthGuard } from './auth/auth.guard'

 export const routes: Routes = [
    {
        path:"register", component:RegisterComponent,
        children: [
            { path:'', component:MainFormComponent}
        ]
    },
    {
        path:"login", component:LoginComponent,
        children: [
            { path:'', component:LoginFormComponent}
        ]
    },
    {
        path:"dashboard", component:DashboardComponent
    },
    {
        path:"categories", component:CategoriesComponent
    },
    {
        path: "profile", component:ProfileComponent , canActivate: [AuthGuard]
    },
    {
        path:"", component:DashboardComponent
    }
]

