import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArticleCardComponent } from './featured-article-card.component';

describe('FeaturedArticleCardComponent', () => {
  let component: FeaturedArticleCardComponent;
  let fixture: ComponentFixture<FeaturedArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
