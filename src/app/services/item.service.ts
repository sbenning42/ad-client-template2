import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Item } from './../models/item';

import 'rxjs/add/operator/publishReplay';

@Injectable()
export class ItemService {

  baseUrl = '/items';

  constructor(
    private http: HttpService
  ) { }

  gets() {
    return this.http.gets(this.baseUrl)
  }

  get(id: number) {
    return this.http.get(this.baseUrl, id)
  }

  isPrincipal(item: Item) {
    if (item && item.pictures) {
      const index = item.pictures.findIndex(picture => picture.principal)
      return index < 0 ? 0 : index
    }
    return -1 
  }

  principal(item: Item) {
    const host = this.http.baseImg()
    const index = this.isPrincipal(item)
    if (index < 0) {
      return 'assets/img/favicon.jpg'
    }
    const picture = item.pictures[index]
    if (!picture) {
      return 'assets/img/favicon.jpg'
    }
    if (picture.img_name !== 'UNK') {
      return `${picture.url_img}${picture.ref_user}/${picture.img_name}`
    }
    return `${host}/${item.pictures[index].url_img}`
  }

  picture(picture: any) {
    const host = this.http.baseImg()
    return !picture
      ? 'assets/img/favicon.jpg'
      : (picture.img_name !== 'UNK'
        ? `${picture.url_img}${picture.ref_user}/${picture.img_name}`
        : `${host}/${picture.url_img}`)
  }

}
