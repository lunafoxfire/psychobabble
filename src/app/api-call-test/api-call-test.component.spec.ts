import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallTestComponent } from './api-call-test.component';

describe('ApiCallTestComponent', () => {
  let component: ApiCallTestComponent;
  let fixture: ComponentFixture<ApiCallTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCallTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
