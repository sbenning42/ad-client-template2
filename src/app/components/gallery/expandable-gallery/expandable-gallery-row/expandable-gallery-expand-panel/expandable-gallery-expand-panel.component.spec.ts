import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableGalleryExpandPanelComponent } from './expandable-gallery-expand-panel.component';

describe('ExpandableGalleryExpandPanelComponent', () => {
  let component: ExpandableGalleryExpandPanelComponent;
  let fixture: ComponentFixture<ExpandableGalleryExpandPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableGalleryExpandPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableGalleryExpandPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
