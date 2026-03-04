import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategoryproduitComponent } from './addcategoryproduit.component';

describe('AddcategoryproduitComponent', () => {
  let component: AddcategoryproduitComponent;
  let fixture: ComponentFixture<AddcategoryproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcategoryproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcategoryproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
