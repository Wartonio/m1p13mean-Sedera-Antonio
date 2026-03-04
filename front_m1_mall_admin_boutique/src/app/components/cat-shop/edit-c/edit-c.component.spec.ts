import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCComponent } from './edit-c.component';

describe('EditCComponent', () => {
  let component: EditCComponent;
  let fixture: ComponentFixture<EditCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
