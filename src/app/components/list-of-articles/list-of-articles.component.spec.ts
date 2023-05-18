import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfArticlesComponent } from './list-of-articles.component';

describe('ListOfArticlesComponent', () => {
  let component: ListOfArticlesComponent;
  let fixture: ComponentFixture<ListOfArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
