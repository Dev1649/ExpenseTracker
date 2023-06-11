import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  menuItems: any = [{
    text: "Categories",
    path: 'categories'
  },
  {
    text: "Wallets",
    path: 'wallets'
  },
    // {
    //   text: "Reports",
    //   path: ''
    // }
  ]

}
