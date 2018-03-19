import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProgramDetailsComponent } from './client-program-details.component';

describe('ClientProgramDetailsComponent', () => {
  let component: ClientProgramDetailsComponent;
  let fixture: ComponentFixture<ClientProgramDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProgramDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
