import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitteeComponent } from './comittee.component';

describe('ComitteeComponent', () => {
  let component: ComitteeComponent;
  let fixture: ComponentFixture<ComitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
