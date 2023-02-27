export interface User {
  accessToken: string;
  email: string;
  displayName: string;
  emailverified: boolean;
  photoURL: string;
  phoneNumber: string;

}
export interface tokenResponse {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}
