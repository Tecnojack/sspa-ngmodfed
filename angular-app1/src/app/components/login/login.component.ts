import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AES, enc } from 'crypto-js';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environmentIdex } from 'src/environments/environment.development';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authToken: string = '';
  isLogged: boolean = false;
  formLogin: FormGroup;
  userResponse: any;
  index: number = 0;
  userFound: any;
  dbIndex: any;
  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userService.setUserStatus(false);
    this.userService.setHeader(false);
  }

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        console.log('Response: ', response);
        this.userResponse = response.user;
        console.log('Token: ', this.userResponse);
        this.createIndexDB();
        this.saveInIndexDB();
        if (this.userResponse.accessToken) {
          this.userService.setUser(this.userResponse.accessToken);
          this.userService.setUserStatus(true);
          console.log('status: ', this.userService.getUserStatus());
        } else this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  createIndexDB = async () => {
    const database = indexedDB.open(environmentIdex.INDEXDB.DATABASE_NAME, 1);
    database.onupgradeneeded = async (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(environmentIdex.INDEXDB.OBJECT_STORAGE))
        db.createObjectStore(environmentIdex.INDEXDB.OBJECT_STORAGE, {
          keyPath: 'id',
        });
    };
    database.onsuccess = async (event: any) => {
      this.dbIndex = event.target.result;
      this.getToIndexDB();
    };
  };
  public saveInIndexDB = async () => {
    const transaction = this.dbIndex.transaction(
      environmentIdex.INDEXDB.OBJECT_STORAGE,
      'readwrite'
    );
    const objectStorage = await transaction.objectStore(
      environmentIdex.INDEXDB.OBJECT_STORAGE
    );
    const request = await objectStorage.add({ id: 1, user: this.encrypt() });
    request.onsuccess = (event: any) => {
      this.getToIndexDB();
    };
  };
  public getToIndexDB = async () => {
    const transaction = this.dbIndex.transaction(
      environmentIdex.INDEXDB.OBJECT_STORAGE,
      'readwrite'
    );
    const objectStorage = await transaction.objectStore(
      environmentIdex.INDEXDB.OBJECT_STORAGE
    );
    const data = await objectStorage.get(this.userResponse.id);
    data.onsuccess = (userIDB: any) => {
      if (userIDB.target.result) {
        const encrypt_user = userIDB.target.result.user;
        this.userFound = this.decrypt(encrypt_user);
      }
    };
  };
  public deleteToIndexDB = async () => {
    const transaction = this.dbIndex.transaction(
      environmentIdex.INDEXDB.OBJECT_STORAGE,
      'readwrite'
    );
    const objectStorage = await transaction.objectStore(
      environmentIdex.INDEXDB.OBJECT_STORAGE
    );
    const deleteRequest = await objectStorage.delete(this.userResponse.id);
    deleteRequest.onsuccess = (userIDB: any) => {
      this.userFound = undefined;
    };
  };
  public encrypt() {
    const encrypt_user = AES.encrypt(
      JSON.stringify(this.userResponse),
      environmentIdex.INDEXDB.SECRET_KEY
    ).toString();
    return encrypt_user;
  }
  private decrypt(encrypt: string) {
    const bytes = AES.decrypt(encrypt, environmentIdex.INDEXDB.SECRET_KEY);
    return JSON.parse(bytes.toString(enc.Utf8));
  }

  onClick() {
    this.userService
      .loginWithGoogle()
      .then((response) => {
        this.userResponse = response.user;
        // this.addUserInfo();
        console.log(response);
        this.userService.setUserStatus(true);
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log(error));
  }
  onInitSubmit() {
    this.userService.redirectTo('/register');
  }
  // addUserInfo() {
  //   this.indexedDB
  //     .bulkAdd('Users', [
  //       {
  //         User: {
  //           uid: this.userResponse.uid,
  //           email: this.userResponse.email,
  //           emailVerified: this.userResponse.emailVerified,
  //           isAnonymous: this.userResponse.isAnonymous,
  //           providerData: [
  //             {
  //               providerId: this.userResponse.providerData[0].providerId,
  //               uid: this.userResponse.providerData[0].uid,
  //               displayName: this.userResponse.providerData[0].displayName,
  //               email: this.userResponse.providerData[0].email,
  //               phoneNumber: this.userResponse.providerData[0].phoneNumber,
  //               photoURL: this.userResponse.providerData[0].photoURL,
  //             },
  //           ],
  //           stsTokenManager: {
  //             refreshToken: this.userResponse.stsTokenManager.refreshToken,
  //             accessToken: this.userResponse.stsTokenManager.accessToken,
  //             expirationTime: this.userResponse.stsTokenManager.expirationTime,
  //           },
  //           createdAt: this.userResponse.createdAt,
  //           lastLoginAt: this.userResponse.lastLoginAt,
  //           apiKey: this.userResponse.apiKey,
  //           appName: this.userResponse.appName,
  //         },
  //       },
  //     ])
  //     .subscribe((response) => {
  //       console.log('Datos enviados: ', response);
  //       this.getUserCache();
  //     });
  // }
  // getUserCache() {
  //   this.indexedDB.bulkGet('Users', [1]).subscribe((response: any) => {
  //     console.log('RespuestaIdexedDB: ', response);
  //   });
  // }
}
