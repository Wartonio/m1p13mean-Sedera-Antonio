import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSComponent } from './list-s.component';

describe('ListSComponent', () => {
  let component: ListSComponent;
  let fixture: ComponentFixture<ListSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
