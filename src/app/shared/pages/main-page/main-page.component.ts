import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacionComponent } from '../../../features/components/autenticacion/autenticacion.component';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  logueado: boolean | false = false;
  private logueadoSubscription: Subscription | null = null;

  constructor(private sharedService: SharedService, private modal: MatDialog) {
  }

  ngOnInit() {
    this.logueadoSubscription = this.sharedService.logueado$.subscribe(
      (logueado) => {
        this.logueado = logueado;
        console.log('Logueado cambió:', this.logueado);
      }
    );
  }

  ngOnDestroy() {
    if (this.logueadoSubscription) {
      this.logueadoSubscription.unsubscribe();
    }
  }

  iniciarSesion():void{
    this.modal.open(AutenticacionComponent)
  }
}
