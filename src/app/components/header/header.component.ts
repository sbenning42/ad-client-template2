import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user$: Observable<User>;
  @Output() select = new EventEmitter();

  userName$: Observable<string>;
  avatarSrc$: Observable<string>;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    const mapUserName = user => user.name
    const mapAvatarSrc = user => this.userService.avatar(user)
    this.userName$ = this.user$.map(mapUserName)
    this.avatarSrc$ = this.user$.map(mapAvatarSrc)
  }

  navigate(key: string) {
    this.select.emit(key)
  }

}
