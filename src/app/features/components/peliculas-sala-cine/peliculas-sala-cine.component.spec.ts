import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasSalaCineComponent } from './peliculas-sala-cine.component';

describe('PeliculasSalaCineComponent', () => {
  let component: PeliculasSalaCineComponent;
  let fixture: ComponentFixture<PeliculasSalaCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeliculasSalaCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculasSalaCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
