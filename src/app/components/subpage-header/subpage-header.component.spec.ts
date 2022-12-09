import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageHeaderComponent } from './subpage-header.component';

describe('SubpageHeaderComponent', () => {
  let component: SubpageHeaderComponent;
  let fixture: ComponentFixture<SubpageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
