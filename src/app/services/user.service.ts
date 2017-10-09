import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import 'rxjs/add/operator/publishReplay';

import { User } from './../models/user';

@Injectable()
export class UserService {

  baseUrl = '/user';

  constructor(
    private http: HttpService
  ) { }

  get() {
    const connectableObservable = this.http.gets(this.baseUrl).publishReplay()
    connectableObservable.connect()
    return connectableObservable
  }

  address() {
    const connectableObservable = this.http.gets(`${this.baseUrl}/infos`).publishReplay()
    connectableObservable.connect()
    return connectableObservable
  }

  avatar(user: User) {
    const host = this.http.baseImg()
    return user.picture
      ? `${host}/${user.picture.public_path}`
      : 'assets/img/favicon.jpg'
  }

}