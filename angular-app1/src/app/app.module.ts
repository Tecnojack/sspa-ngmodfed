import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.development';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';

// const dbConfig: DBConfig = {
//   name: 'Users',
//   version: 1,
//   objectStoresMeta: [
//     {
//       store: 'Users',
//       storeConfig: { keyPath: 'id', autoIncrement: true },
//       storeSchema: [
//         { name: 'Users', keypath: 'UserCache', options: { unique: false } },
//       ],
//     },
//   ],
//   // provide the migration factory to the DBConfig
// };

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
