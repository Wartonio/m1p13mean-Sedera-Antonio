import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCComponent } from './add-c.component';

describe('AddCComponent', () => {
  let component: AddCComponent;
  let fixture: ComponentFixture<AddCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
