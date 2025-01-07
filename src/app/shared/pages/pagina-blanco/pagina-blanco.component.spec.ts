import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaBlancoComponent } from './pagina-blanco.component';

describe('PaginaBlancoComponent', () => {
  let component: PaginaBlancoComponent;
  let fixture: ComponentFixture<PaginaBlancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaBlancoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaBlancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
