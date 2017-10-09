import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableGalleryComponent } from './expandable-gallery.component';

describe('ExpandableGalleryComponent', () => {
  let component: ExpandableGalleryComponent;
  let fixture: ComponentFixture<ExpandableGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
