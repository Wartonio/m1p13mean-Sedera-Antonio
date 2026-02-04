import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutsComponent } from './ajouts.component';

describe('AjoutsComponent', () => {
  let component: AjoutsComponent;
  let fixture: ComponentFixture<AjoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
