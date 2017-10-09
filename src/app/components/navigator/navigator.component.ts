import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { ItemService } from './../../services/item.service';
import { Item } from './../../models/item';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  subscription: Subscription;
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user$ = this.userService.get()
  }
  
  navigate($event) {
    this.router.navigate([`/${$event}`])
  }
}
