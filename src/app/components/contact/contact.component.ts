import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user$: Observable<any>;

  address$: Observable<any>;

  userName$: Observable<string>;
  avatar$: Observable<string>;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.get()
    this.userName$ = this.user$.map(user => user.name)
    this.address$ = this.user$.map(user => user.address)
    this.avatar$ = this.user$.map(user => this.userService.avatar(user))
  }

}
