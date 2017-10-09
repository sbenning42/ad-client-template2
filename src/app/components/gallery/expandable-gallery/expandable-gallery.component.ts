import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import{ UserService } from './../../../services/user.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/Observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-expandable-gallery',
  templateUrl: './expandable-gallery.component.html',
  styleUrls: ['./expandable-gallery.component.css']
})
export class ExpandableGalleryComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() width: string;
  @Input() itemWidth: number;
  @Input() items$: Observable<any>;
  @Input() user$: Observable<any>;
  
  cssItemSize: number;
  item$Sub: Subscription;

  items: any[];
  itemsCount: number;
  counter$: Observable<number[]>;
  counter$Sub: Subscription

  offsetWidth: number;
  nbrRow: number;
  nbrItemsByRow: number;
  leftPadding: number;
  lastLeftPadding: number;

  selectedRow: number;
  selectedRowBeforeResize: number;

  resizing: boolean;

  userName$: Observable<string>;
  avatar$: Observable<string>;

  @ViewChild('gallery') gallery: ElementRef;

  constructor(
    public userService: UserService
  ) {
    this.resizing = false
    this.selectedRow = -1
    this.cssItemSize = 8
    const resizeDone = event => {
      if (this.widthChange()) {
        this.resizing = false
        this.computizeOffsets()
      }
    }
    this.counter$Sub = Observable.fromEvent(window, 'resize')
      .debounceTime(250)
      .subscribe(resizeDone)
  }

  ngOnInit() {
    this.userName$ = this.user$.map(user => user.name)
    this.avatar$ =  this.user$.map(user => this.userService.avatar(user))
    const computeItemsCollection = items => {
      this.items = items.items
      this.itemsCount = items.count
      this.computizeOffsets()
    }
    this.item$Sub = this.items$.subscribe(computeItemsCollection, obsError);
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this.counter$Sub.unsubscribe()
    this.item$Sub.unsubscribe()
  }

  computizeOffsets() {
    // Get component width
    this.offsetWidth = this.gallery.nativeElement.offsetWidth
    // Get size of an item (+css)
    const itemSize = this.itemWidth + this.cssItemSize
    // Calc the left pad necessary to center the gallery
    this.leftPadding = Math.floor((this.offsetWidth % itemSize) / 2)
    // Calc the number of items that fit on one row // if the item size in greater than gallery size, force one item by row
    const itemsByRow = Math.floor(this.offsetWidth / itemSize)
    this.nbrItemsByRow = itemsByRow ? itemsByRow : 1 
    // Calc the number of items that remains for the last line
    const nbrItemsOnLastRow = this.itemsCount % this.nbrItemsByRow
    // Calc that last line left pad, to center it as well
    this.lastLeftPadding = this.leftPadding
    if (nbrItemsOnLastRow) {
      this.lastLeftPadding += Math.floor(((this.nbrItemsByRow - nbrItemsOnLastRow) * itemSize) / 2)
    }
    // Calc the number of rows and create an observable for the template to loop for
    const nbrFullRow = Math.floor(this.itemsCount / this.nbrItemsByRow)
    this.nbrRow = nbrItemsOnLastRow ? nbrFullRow + 1 : nbrFullRow
    this.counter$ = Observable.range(0, this.nbrRow).toArray();
  }

  widthChange() {
    return this.gallery.nativeElement.offsetWidth !== this.offsetWidth
  }

  select($event) {
    this.selectedRow = $event.index
  }

  close($event) {
    this.selectedRow = -1;
  }

  resize() {
    if (this.widthChange()) {
      this.resizing = true
      this.selectedRow = -1
    }
  }

  getPadding(index) {
    return index === (this.nbrRow - 1)
      ? this.lastLeftPadding
      : this.leftPadding
  }

}

function obsError(e) {
  console.log(<any>e)
}