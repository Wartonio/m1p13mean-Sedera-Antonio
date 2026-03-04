import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesRComponent } from './listes-r.component';

describe('ListesRComponent', () => {
  let component: ListesRComponent;
  let fixture: ComponentFixture<ListesRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListesRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
