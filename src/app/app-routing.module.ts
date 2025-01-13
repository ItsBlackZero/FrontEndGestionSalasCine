import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './shared/pages/main-page/main-page.component';
import { PaginaBlancoComponent } from './shared/pages/pagina-blanco/pagina-blanco.component';

const routes: Routes = [

  {
    path:'',
    component: PaginaBlancoComponent
  },
  {
    path: 'menu',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
