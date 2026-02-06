import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsitCComponent } from './lsit-c.component';

describe('LsitCComponent', () => {
  let component: LsitCComponent;
  let fixture: ComponentFixture<LsitCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LsitCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LsitCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
