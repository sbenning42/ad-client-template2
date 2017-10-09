import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableGalleryItemComponent } from './expandable-gallery-item.component';

describe('ExpandableGalleryItemComponent', () => {
  let component: ExpandableGalleryItemComponent;
  let fixture: ComponentFixture<ExpandableGalleryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableGalleryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
