import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Item } from './../../models/item';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() page: string;
  @Input() items$: Observable<any>;
  @Input() user$: Observable<any>;

  @Output() changePage = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  link() {
    this.changePage.emit('gallery')
  }

}
