import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommingMatchesComponent } from './upcomming-matches.component';

describe('UpcommingMatchesComponent', () => {
  let component: UpcommingMatchesComponent;
  let fixture: ComponentFixture<UpcommingMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcommingMatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcommingMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
