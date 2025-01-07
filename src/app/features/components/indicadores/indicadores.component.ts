import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css'
})
export class IndicadoresComponent {

  @Input() titulo!: string;
  @Input() valor!: string | number;
  @Input() icono!: string; 
}
