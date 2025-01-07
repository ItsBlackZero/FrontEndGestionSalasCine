import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SalasComponent } from './components/salas/salas.component';
import { PeliculasSalaCineComponent } from './components/peliculas-sala-cine/peliculas-sala-cine.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'peliculas',
    component:PeliculasComponent
  },
  {
    path:'salas',
    component:SalasComponent
  },
  {
    path:'salas-cine',
    component:PeliculasSalaCineComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
