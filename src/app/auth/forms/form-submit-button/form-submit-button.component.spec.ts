import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitButtonComponent } from './form-submit-button.component';

describe('FormSubmitButtonComponent', () => {
  let component: FormSubmitButtonComponent;
  let fixture: ComponentFixture<FormSubmitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
