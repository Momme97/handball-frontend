import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionSquadComponent } from './selection-squad.component';

describe('SelectionSquadComponent', () => {
  let component: SelectionSquadComponent;
  let fixture: ComponentFixture<SelectionSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionSquadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
