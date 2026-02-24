import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoryproduitComponent } from './editcategoryproduit.component';

describe('EditcategoryproduitComponent', () => {
  let component: EditcategoryproduitComponent;
  let fixture: ComponentFixture<EditcategoryproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcategoryproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcategoryproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
