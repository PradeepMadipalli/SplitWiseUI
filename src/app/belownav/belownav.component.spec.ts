import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelownavComponent } from './belownav.component';

describe('BelownavComponent', () => {
  let component: BelownavComponent;
  let fixture: ComponentFixture<BelownavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BelownavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BelownavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
