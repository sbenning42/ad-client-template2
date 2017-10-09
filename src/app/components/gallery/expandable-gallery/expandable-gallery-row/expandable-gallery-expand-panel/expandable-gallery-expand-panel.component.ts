import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from './../../../../../models/item';
import { ItemService } from './../../../../../services/item.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-expandable-gallery-expand-panel',
  templateUrl: './expandable-gallery-expand-panel.component.html',
  styleUrls: ['./expandable-gallery-expand-panel.component.css'],
  animations: [
    trigger('shrinkInOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate('200ms ease-in-out', style({height: 0}))
      ]),
      transition('void => *', [
        style({height: 0}),
        animate('200ms ease-in-out', style({height: '*'}))
      ])
    ]),
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(500%)'}),
        animate('250ms ease-in-out')
      ]),
      transition('* => void', [
        animate('250ms ease-in-out', style({transform: 'translateY(500%)'}))
      ])
    ])
  ]
})
export class ExpandableGalleryExpandPanelComponent implements OnInit {

  private _itemIndex: number;
  private _leftPadding: number;
  private _item: Item;

  sliderReady: boolean

  @Output() closeEvent = new EventEmitter();

  @Input() set item(item: Item) {
    this.sliderReady = false
    this._item = item
    if (this._item.pictures) {
      this.listOfItems = []
      this._item.pictures.forEach(picture => this.listOfItems.push(this.itemService.picture(picture)))
    }
    this.sliderReady = true
  };
  get item() { return this._item };

  @Input() itemWidth: number;
  @Input() set itemIndex(index: number) {
    this._itemIndex = index
    this.computizeOffset()
  };
  @Input() set leftPadding(padding: number) {
    this._leftPadding = padding
    this.computizeOffset()
  };
  cssItemSize = 8;

  selectorTop: number;
  selectorLeft: number;

  left: string;

  closed: boolean;

  listOfItems = [];

  constructor(
    public itemService: ItemService
  ) {
    this.closed = false
  }

  ngOnInit() {
    this.computizeOffset()
    this.listOfItems = []
    if (this._item.pictures) {
      this._item.pictures.forEach(picture => this.listOfItems.push(this.itemService.picture(picture)))
    }
  }

  close() {
    const obs$ = Observable.of([1]).delay(250)
    this.closed = true
    obs$.subscribe(tick => {
      this.closed = false
      this.closeEvent.emit()
    })
  }

  computizeOffset() {
    this.selectorLeft = ((this.itemWidth + 8) / 2) + this._itemIndex * (this.itemWidth + 8) + this._leftPadding - 20
    this.left = `${this.selectorLeft}px`
  }

}
