import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  mode = 'prod';

  clientId = 6;

  backendUrl: string;
  baseImgUrl: string;

  backendUrlDev = 'http://laravelback.app/api/public/stock';
  baseImgUrlDev = 'http://laravelback.app/storage';

  backendUrlPreprod = 'http://preprod.authenticdesign.fr/api/public/stock';
  baseImgUrlPreprod = 'http://preprod.authenticdesign.fr/public/storage';

  backendUrlProd = 'https://api.authenticdesign.fr/api/public/stock';
  baseImgUrlProd = 'https://api.authenticdesign.fr/public/storage';

  constructor(
    private http: HttpClient
  ) {

    switch (this.mode) {
      case 'dev': {
        this.backendUrl = this.backendUrlDev
        this.baseImgUrl = this.baseImgUrlDev
        break
      }
      case 'preprod': {
        this.backendUrl = this.backendUrlPreprod
        this.baseImgUrl = this.baseImgUrlPreprod
        break
      }
      case 'prod': {
        this.backendUrl = this.backendUrlProd
        this.baseImgUrl = this.baseImgUrlProd
        break
      }
      default: {
        this.backendUrl = 'blank'
        this.baseImgUrl = 'blank'
        break
      }
    }

  }

  backend() {
    return this.backendUrl
  }

  baseImg() {
    return this.baseImgUrl
  }

  gets(endpoint: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/${this.clientId}${endpoint}`)
  }

  get(endpoint: string, id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${this.clientId}${endpoint}/${id}`)
  }
}
