import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorHeaderComponent } from './sponsor-header.component';

describe('SponsorHeaderComponent', () => {
  let component: SponsorHeaderComponent;
  let fixture: ComponentFixture<SponsorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
