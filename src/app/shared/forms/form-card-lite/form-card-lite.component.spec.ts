import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardLiteComponent } from './form-card-lite.component';

describe('FormCardLiteComponent', () => {
  let component: FormCardLiteComponent;
  let fixture: ComponentFixture<FormCardLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCardLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCardLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
