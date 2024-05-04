import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSimulationComponent } from './new-simulation.component';

describe('NewSimulationComponent', () => {
  let component: NewSimulationComponent;
  let fixture: ComponentFixture<NewSimulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSimulationComponent]
    });
    fixture = TestBed.createComponent(NewSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
