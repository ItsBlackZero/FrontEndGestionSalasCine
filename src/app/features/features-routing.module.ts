import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SalasComponent } from './components/salas/salas.component';
import { PeliculasSalaCineComponent } from './components/peliculas-sala-cine/peliculas-sala-cine.component';
import { permisosGuard } from '../guards/permisos.guard';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [permisosGuard]
  },
  {
    path:'peliculas',
    component:PeliculasComponent,
    canActivate:[permisosGuard]
  },
  {
    path:'salas',
    component:SalasComponent,
    canActivate:[permisosGuard]
  },
  {
    path:'salas-cine',
    component:PeliculasSalaCineComponent,
    canActivate:[permisosGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
