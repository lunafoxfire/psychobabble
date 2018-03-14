import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDesignComponent } from './program-design.component';

describe('ProgramDesignComponent', () => {
  let component: ProgramDesignComponent;
  let fixture: ComponentFixture<ProgramDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
