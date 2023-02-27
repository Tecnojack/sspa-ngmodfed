import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  textSession: string = '';
  name = '';
  isLogged: boolean = false;
  userResponse: any;

  constructor() {}
  ngOnInit(): void {
    this.getUserCache();
  }

  getUserCache() {
    // this.indexedDB.bulkGet('Users', [1]).subscribe((response: any) => {
    //   console.log('RespuestaIdexedDB: ', response);
    //   this.userResponse = response[0].User;
    //   this.name = this.userResponse.providerData[0].displayName;

    //   console.log('UserResponse: ', this.userResponse, this.name);
    // });
  }
}
