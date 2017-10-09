import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { ItemService } from './item.service';

@Injectable()
export class ShareService {

  constructor(
    public userService: UserService,
    public itemService: ItemService
  ) { }

}
