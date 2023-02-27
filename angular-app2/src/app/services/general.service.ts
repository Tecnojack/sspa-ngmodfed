import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  indexedDBRes: any;

  header = false;
  constructor(
    private router: Router,
    private indexedDB: NgxIndexedDBService
  ) {}
  setHeader(header: boolean) {
    this.header = header;
  }
  getHeader() {
    return this.header;
  }
  logout() {
  }
  redirectTo(rute: string) {
    this.router.navigate([rute]);
  }
  getIndexedData(): void {
    this.indexedDB.bulkGet('Users', [1]).subscribe((response: any) => {
      console.log('RespuestaIdexedDB: ', response);
      this.indexedDBRes = response[0].User;
      console.log('generalResponse: ', this.indexedDBRes);
      return this.indexedDBRes;
    });
  }
}
