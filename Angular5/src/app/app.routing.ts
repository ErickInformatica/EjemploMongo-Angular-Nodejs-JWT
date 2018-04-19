import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: RegistrarComponent},
    {path: 'editar-perfil', component: EditarPerfilComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[]= [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);