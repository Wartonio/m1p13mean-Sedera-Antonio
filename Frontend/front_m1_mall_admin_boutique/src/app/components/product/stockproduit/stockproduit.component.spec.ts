import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockproduitComponent } from './stockproduit.component';

describe('StockproduitComponent', () => {
  let component: StockproduitComponent;
  let fixture: ComponentFixture<StockproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
