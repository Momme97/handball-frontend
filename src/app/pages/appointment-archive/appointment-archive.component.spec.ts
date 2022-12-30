import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentArchiveComponent } from './appointment-archive.component';

describe('AppointmentArchiveComponent', () => {
  let component: AppointmentArchiveComponent;
  let fixture: ComponentFixture<AppointmentArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
