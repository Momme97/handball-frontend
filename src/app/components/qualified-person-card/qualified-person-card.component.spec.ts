import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifiedPersonCardComponent } from './qualified-person-card.component';

describe('QualifiedPersonCardComponent', () => {
  let component: QualifiedPersonCardComponent;
  let fixture: ComponentFixture<QualifiedPersonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualifiedPersonCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualifiedPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
