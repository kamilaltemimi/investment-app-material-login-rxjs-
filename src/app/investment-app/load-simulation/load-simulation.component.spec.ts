import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSimulationComponent } from './load-simulation.component';

describe('LoadSimulationComponent', () => {
  let component: LoadSimulationComponent;
  let fixture: ComponentFixture<LoadSimulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadSimulationComponent]
    });
    fixture = TestBed.createComponent(LoadSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
