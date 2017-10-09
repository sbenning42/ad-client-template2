import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({transform: 'translateX(-200%)'})),
      state('middle', style({transform: 'translateX(-100%)'})),
      state('right', style({transform: 'translateX(0%)'})),
      transition('middle => left', [animate('300ms ease-in-out')]),
      transition('middle => right', [animate('300ms ease-in-out')]),
      transition('right => middle', [animate('0ms')]),
      transition('left => middle', [animate('0ms')]),
    ])
  ]
})
export class SliderComponent implements OnInit {

  private _urls: string[];

  @Input()
    set urls(urls: string[]) {
      this._urls = urls
      this.ngOnInit()
    };
    get urls() { return this._urls }
  @Input() width: string;

  @Output() slideLeftEvent = new EventEmitter();
  @Output() slideRightEvent = new EventEmitter();

  storage: ItemStorage;
  slider: Slider;
  slideState: string;

  ready: boolean;
  multiple: boolean;

  constructor() {
    this.ready = false
    this.slideState = 'middle'
  }

  ngOnInit() {
    if (this.urls && this.urls.length < 2) {
      this.multiple = false
    } else {
      this.multiple = true
    }
    this.ready = true
    this.storage = new ItemStorage(this.urls)
    this.slider = new Slider(this.storage)
  }

  slideLeft() {
    this.slideState = 'left'
  }

  slideRight() {
    this.slideState = 'right'
  }

  done($event) {
    switch ($event.fromState) {
      case 'left': {
        this.doneFromLeft($event)
        break
      }
      case 'middle': {
        this.doneFromMiddle($event)
        break
      }
      case 'right': {
        this.doneFromRight($event)
        break
      }
      default: return
    }
  }

  doneFromLeft($event) {
    switch ($event.toState) {
      case 'middle': {
        break
      }
      case 'right': {
        break
      }
      default: return
    }
  }

  doneFromMiddle($event) {
    switch ($event.toState) {
      case 'left': {
        this.storage.sMoveIndex(1)
        this.slideState = 'middle'
        break
      }
      case 'right': {
        this.storage.sMoveIndex(-1)
        this.slideState = 'middle'
        break
      }
      default: return
    }
  }

  doneFromRight($event) {
    switch ($event.toState) {
      case 'left': {
        break
      }
      case 'middle': {
        break
      }
      default: return
    }
  }

  totourl(i: number) {
    let item
    if (i === 0) {
      item = this.storage.getItemFromIndex(-1)
    } else if (i === 1) {
      item = this.storage.getItemAtIndex()
    } else if (i === 2) {
      item = this.storage.getItemFromIndex(1)
    }
    return item ? item.src : undefined
  }

}

class Slider {

  storage: ItemStorage;

  contentSrc: string;
  shadowSrc: string;

  constructor(storage: ItemStorage) {
    this.storage = storage
    const content = this.storage.getItemAtIndex()
    if (content) {
      this.contentSrc = content.src
    }
    const shadow = this.storage.getItemFromIndex(1)
    if (shadow) {
      this.shadowSrc = shadow.src
    }
  }

}

class ItemStorage {

  height: number;
  items: Item[];
  length: number;
  index: number;

  loaded: number;

  constructor(srcs: string[]) {
    this.index = 0
    this.length = srcs.length
    this.items = srcs.map(src => {
      const item = new Item(src)
      return item
    })
  }

  sIndex(offset: number) {
    let index = (this.index + offset) % this.length
    index = index < 0 ? this.length + index : index
    return index
  }

  sMoveIndex(offset: number) {
    this.index = this.sIndex(offset)
  }

  getItemAtIndex() {
    return this.items[this.index]
  }

  getItemFromIndex(offset: number) {
    return this.items[this.sIndex(offset)]
  }

  getItemFrom(offset: number) {
    return this.items[this.sIndex(offset)]
  }

}

class Item {

  static id = 0;

  id: number;
  src: string;

  constructor(url: string) {
    this.id = ++Item.id
    this.src = url
  }

}
