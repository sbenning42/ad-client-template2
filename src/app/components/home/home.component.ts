import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { ShareService } from './../../services/share.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @Input() items$: Observable<any>;
  items$Sub: Subscription;

  src: string;

  @Output() navigateEvent = new EventEmitter()
  constructor(
    private router: Router,
    public shareService: ShareService
  ) { }

  ngOnInit() {
    this.items$Sub = this.shareService.itemService.gets().subscribe(
      response => this.src = this.shareService.itemService.principal(response.items[0])
    )
  }

  ngOnDestroy() {
    this.items$Sub.unsubscribe()
  }

  navigate() {
    this.router.navigate(['/gallery']);
  }

}
