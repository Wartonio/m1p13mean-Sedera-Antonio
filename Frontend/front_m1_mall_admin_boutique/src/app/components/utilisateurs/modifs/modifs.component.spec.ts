import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifsComponent } from './modifs.component';

describe('ModifsComponent', () => {
  let component: ModifsComponent;
  let fixture: ComponentFixture<ModifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
