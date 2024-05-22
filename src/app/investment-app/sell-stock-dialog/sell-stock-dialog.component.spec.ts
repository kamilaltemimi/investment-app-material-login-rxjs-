import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStockDialogComponent } from './sell-stock-dialog.component';

describe('SellStockDialogComponent', () => {
  let component: SellStockDialogComponent;
  let fixture: ComponentFixture<SellStockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellStockDialogComponent]
    });
    fixture = TestBed.createComponent(SellStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
