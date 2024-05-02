import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAppComponent } from './investment-app.component';

describe('InvestmentAppComponent', () => {
  let component: InvestmentAppComponent;
  let fixture: ComponentFixture<InvestmentAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentAppComponent]
    });
    fixture = TestBed.createComponent(InvestmentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
