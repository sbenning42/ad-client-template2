import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expandable-gallery-row',
  templateUrl: './expandable-gallery-row.component.html',
  styleUrls: ['./expandable-gallery-row.component.css']
})
export class ExpandableGalleryRowComponent implements OnInit {

  @Output() selectEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();

  @Input() itemWidth: number;
  @Input() leftPadding: number;
  @Input() rowIndex: number;
  @Input() items: any[];

  _expanded: boolean;
  @Input()
    get expanded() { return this._expanded }
    set expanded(expanded: boolean) { this._expanded = expanded };

  selectedItem: any;
  selectedItemIndex: number;

  ready = true

  constructor() { }

  ngOnInit() {
    this.selectedItemIndex = -1
    this.selectedItem = undefined
  }

  select($event) {
    this.selectedItemIndex = $event.index
    this.selectedItem = this.items[$event.index]
    if (!this.expanded) {
      this.selectEvent.emit({index: this.rowIndex})
    }
  }

  close() {
    this.selectedItemIndex = -1
    this.closeEvent.emit()
  }

}