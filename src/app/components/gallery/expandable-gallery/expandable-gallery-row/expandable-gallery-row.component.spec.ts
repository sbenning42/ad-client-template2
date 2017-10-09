import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableGalleryRowComponent } from './expandable-gallery-row.component';

describe('ExpandableGalleryRowComponent', () => {
  let component: ExpandableGalleryRowComponent;
  let fixture: ComponentFixture<ExpandableGalleryRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableGalleryRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableGalleryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
