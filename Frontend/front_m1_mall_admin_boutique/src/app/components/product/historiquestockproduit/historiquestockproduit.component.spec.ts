import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquestockproduitComponent } from './historiquestockproduit.component';

describe('HistoriquestockproduitComponent', () => {
  let component: HistoriquestockproduitComponent;
  let fixture: ComponentFixture<HistoriquestockproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquestockproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriquestockproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
