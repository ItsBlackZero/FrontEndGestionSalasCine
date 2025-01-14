import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { FormCrearPeliculaComponent } from './components/form-crear-pelicula/form-crear-pelicula.component';
import { SalasComponent } from './components/salas/salas.component';
import { FormSalasComponent } from './components/form-salas/form-salas.component';
import { HttpClientModule } from '@angular/common/http';
import { PeliculasSalaCineComponent } from './components/peliculas-sala-cine/peliculas-sala-cine.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AutenticacionComponent,
    DashboardComponent,
    IndicadoresComponent,
    PeliculasComponent,
    FormCrearPeliculaComponent,
    SalasComponent,
    FormSalasComponent,
    PeliculasSalaCineComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FeaturesRoutingModule,
    MatSelectModule,
    MatTableModule,
    ToastrModule.forRoot()


  ],
  exports:[
    AutenticacionComponent,
    DashboardComponent,

  ]
})
export class FeaturesModule { }
