import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterRoutingModule } from './register-routing.module';

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
    RegisterRoutingModule,
    BrowserModule,
  ]
})
export class RegisterModule { }
