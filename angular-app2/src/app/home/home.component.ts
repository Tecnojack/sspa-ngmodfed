import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environmentIdex } from 'src/environments/environment.development';
import { GeneralService } from '../services/general.service';
import { AES, enc } from 'crypto-js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  textSession: string = '';
  routeHome: string = '';
  routeLogin: string = '';
  generalResponse: any;
  dbIndex: any;
  userFound: any;
  userResponse: any;
  constructor(
    private generalService: GeneralService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getToIndexDB();
    this.generalService.setHeader(true);
    console.log('general: ', this.getToIndexDB());
    if (this.generalService.getIndexedData() !== null) {
      this.textSession = 'Cerrar Sesión ';
    } else {
      this.textSession = 'Iniciar Sesión ';
    }
  }

  onClick() {
  this.deleteToIndexDB();
    if (this.generalService.getIndexedData() !== null) {
      this.generalService.logout();

      this.router.navigate(['/login']);
    } else {
      this.generalService.redirectTo('/login');
    }
  }
  public getToIndexDB = async () => {
    const transaction = this.dbIndex.transaction(
      environmentIdex.INDEXDB.OBJECT_STORAGE,
      'readwrite'
    );
    const objectStorage = await transaction.objectStore(
      environmentIdex.INDEXDB.OBJECT_STORAGE
    );
    const data = await objectStorage.get(1);
    data.onsuccess = (userIDB: any) => {
      if (userIDB.target.result) {
        const encrypt_user = userIDB.target.result.user;
        console.log('encrypt_user: ', encrypt_user);
        this.userFound = this.decrypt(encrypt_user);
      }
    };
  };
  private decrypt(encrypt: string) {
    const bytes = AES.decrypt(encrypt, environmentIdex.INDEXDB.SECRET_KEY);
    return JSON.parse(bytes.toString(enc.Utf8));
  }
  public deleteToIndexDB = async () => {
    const transaction = this.dbIndex.transaction(
      environmentIdex.INDEXDB.OBJECT_STORAGE,
      'readwrite'
    );
    const objectStorage = await transaction.objectStore(
      environmentIdex.INDEXDB.OBJECT_STORAGE
    );
    const deleteRequest = await objectStorage.delete(1);
    deleteRequest.onsuccess = (userIDB: any) => {
      this.userFound = undefined;
    };
  };

}
