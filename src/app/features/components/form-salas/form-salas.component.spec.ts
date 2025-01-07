import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSalasComponent } from './form-salas.component';

describe('FormSalasComponent', () => {
  let component: FormSalasComponent;
  let fixture: ComponentFixture<FormSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSalasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
