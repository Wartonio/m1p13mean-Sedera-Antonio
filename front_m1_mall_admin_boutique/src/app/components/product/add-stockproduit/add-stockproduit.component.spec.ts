import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockproduitComponent } from './add-stockproduit.component';

describe('AddStockproduitComponent', () => {
  let component: AddStockproduitComponent;
  let fixture: ComponentFixture<AddStockproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStockproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStockproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
