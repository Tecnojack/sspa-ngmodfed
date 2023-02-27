// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'agrodat-test-dev',
    appId: '1:953545110146:web:e37d43765fc4b8c5adfa9b',
    storageBucket: 'agrodat-test-dev.appspot.com',
    apiKey: 'AIzaSyCjK8PbXYpHfGPU6SBz_vvGgmOPK_e2s5w',
    authDomain: 'agrodat-test-dev.firebaseapp.com',
    messagingSenderId: '953545110146',
  },
  production: false
};

export const environmentIdex = {
  production: false,
  INDEXDB:{
    SECRET_KEY: 'agrodataai-secret-key',
    OBJECT_STORAGE: 'ai-users',
    DATABASE_NAME:'ai-database'
  }}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
