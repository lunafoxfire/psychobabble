import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectVerificationComponent } from './subject-verification.component';

describe('SubjectVerificationComponent', () => {
  let component: SubjectVerificationComponent;
  let fixture: ComponentFixture<SubjectVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
