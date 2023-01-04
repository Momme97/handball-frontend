import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPersonComponent } from './featured-person.component';

describe('FeaturedPersonComponent', () => {
  let component: FeaturedPersonComponent;
  let fixture: ComponentFixture<FeaturedPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
