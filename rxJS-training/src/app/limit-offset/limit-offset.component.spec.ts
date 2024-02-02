import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitOffsetComponent } from './limit-offset.component';

describe('LimitOffsetComponent', () => {
  let component: LimitOffsetComponent;
  let fixture: ComponentFixture<LimitOffsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitOffsetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimitOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
