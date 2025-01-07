import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearPeliculaComponent } from './form-crear-pelicula.component';

describe('FormCrearPeliculaComponent', () => {
  let component: FormCrearPeliculaComponent;
  let fixture: ComponentFixture<FormCrearPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCrearPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
