import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecategoryproduitComponent } from './listecategoryproduit.component';

describe('ListecategoryproduitComponent', () => {
  let component: ListecategoryproduitComponent;
  let fixture: ComponentFixture<ListecategoryproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListecategoryproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListecategoryproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
