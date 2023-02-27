import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  title = 'host';
  // constructor( private userSVC: UserService) {}
  ngOnInit(): void {
    // this.showHeader = this.userSVC.getHeader();
    // console.log('Header: ', this.userSVC.getHeader());
  }
}
