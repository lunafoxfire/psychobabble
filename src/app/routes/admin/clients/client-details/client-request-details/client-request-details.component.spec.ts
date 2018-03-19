import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRequestDetailsComponent } from './client-request-details.component';

describe('ClientRequestDetailsComponent', () => {
  let component: ClientRequestDetailsComponent;
  let fixture: ComponentFixture<ClientRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
