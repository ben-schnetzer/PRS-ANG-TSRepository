import { Component } from '@angular/core';
import { MenuItem } from '../../../model/menu-item';
import { SystemService } from '../../../service/system-service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  title: string = "PRS";

  constructor(public sysSvc: SystemService) {}

  get menuItems(): MenuItem[] {
    const items = [
      new MenuItem('User', '/user-list', 'User List'),
      new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
      new MenuItem('Product', '/product-list', 'Product List'),
      new MenuItem('Request', '/request-list', 'Request List'),
      new MenuItem('LineItem', '/line-item-list', 'Line Item List'),
      new MenuItem('Login', '/user-login', 'User Login')
    ];

    const userId = this.sysSvc.loggedInUser?.id;

    // If logged in, insert "Review" before "Login"
    if (userId) {
      items.splice(5, 0, new MenuItem('Review', `/list-review/${userId}`, 'Review List'));
    }

    return items;
  }
}
