import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGalleryComponent } from './list-gallery.component';

xdescribe('ListGalleryComponent', () => {
  let component: ListGalleryComponent;
  let fixture: ComponentFixture<ListGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
