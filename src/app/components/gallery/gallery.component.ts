import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable'

import { ShareService } from './../../services/share.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  user$: Observable<any>;
  items$: Observable<any>;

  constructor(
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.user$ = this.shareService.userService.get()
    this.items$ = this.shareService.itemService.gets()
  }

}
