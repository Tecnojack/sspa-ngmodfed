import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// const dbConfig: DBConfig  = {
//   name: 'Users',
//   version: 1,
//   objectStoresMeta: [{
//     store: 'Users',
//     storeConfig: { keyPath: 'id', autoIncrement: true },
//     storeSchema: [
//       { name: 'Users', keypath: 'UserCache', options: { unique: false } },

//     ]
//   }],
//   // provide the migration factory to the DBConfig
// };
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    BrowserModule,
  ]
})
export class LoginModule { }
