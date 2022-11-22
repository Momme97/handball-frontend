import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralBasicTrainingComponent } from './central-basic-training.component';

describe('CentralBasicTrainingComponent', () => {
  let component: CentralBasicTrainingComponent;
  let fixture: ComponentFixture<CentralBasicTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralBasicTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralBasicTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
