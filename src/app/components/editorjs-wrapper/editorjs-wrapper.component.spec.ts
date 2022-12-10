import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorjsWrapperComponent } from './editorjs-wrapper.component';

describe('EditorjsWrapperComponent', () => {
  let component: EditorjsWrapperComponent;
  let fixture: ComponentFixture<EditorjsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorjsWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorjsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
