import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutsRComponent } from './ajouts-r.component';

describe('AjoutsRComponent', () => {
  let component: AjoutsRComponent;
  let fixture: ComponentFixture<AjoutsRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutsRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutsRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
