import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsWrapperComponent } from './downloads-wrapper.component';

describe('DownloadsWrapperComponent', () => {
  let component: DownloadsWrapperComponent;
  let fixture: ComponentFixture<DownloadsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadsWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
