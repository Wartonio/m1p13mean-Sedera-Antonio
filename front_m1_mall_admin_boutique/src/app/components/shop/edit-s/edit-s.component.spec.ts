import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSComponent } from './edit-s.component';

describe('EditSComponent', () => {
  let component: EditSComponent;
  let fixture: ComponentFixture<EditSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
