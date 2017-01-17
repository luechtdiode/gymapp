import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gymapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  clubid = 0;
  username = '';
  constructor() { }

  ngOnInit() {
  }

  logOut() {

  }

}
