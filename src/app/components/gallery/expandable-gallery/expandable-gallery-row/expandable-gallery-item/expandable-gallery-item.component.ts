import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { Item } from './../../../../../models/item';
import { ItemService } from './../../../../../services/item.service';

@Component({
  selector: 'app-expandable-gallery-item',
  templateUrl: './expandable-gallery-item.component.html',
  styleUrls: ['./expandable-gallery-item.component.css']
})
export class ExpandableGalleryItemComponent implements OnInit {

  @Output() selectEvent = new EventEmitter()

  @Input() width: number;
  @Input() item: Item;
  @Input() itemIndex: number;
  @Input() rowIndex: number;

  widthCSS: string;
  anchorId: string;
  anchorHref: string;

  constructor(
    public itemService: ItemService
  ) { }

  ngOnInit() {
    this.widthCSS = `${this.width}px`
    this.anchorId = `item-${this.rowIndex}-${this.itemIndex}`
    this.anchorHref = `/gallery#${this.anchorId}`
  }

  select() {
    this.selectEvent.emit({index: this.itemIndex})
  }

}
