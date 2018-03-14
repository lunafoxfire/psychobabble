import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseEvaluationComponent } from './response-evaluation.component';

describe('ResponseEvaluationComponent', () => {
  let component: ResponseEvaluationComponent;
  let fixture: ComponentFixture<ResponseEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
