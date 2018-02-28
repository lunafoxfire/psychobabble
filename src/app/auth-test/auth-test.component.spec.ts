import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTestComponent } from './auth-test.component';

describe('AuthTestComponent', () => {
  let component: AuthTestComponent;
  let fixture: ComponentFixture<AuthTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
