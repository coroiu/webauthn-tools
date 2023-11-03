export type WebAuthnChallengeResponse =
  | WebAuthnGetChallengeResponse
  | WebAuthnCreateChallengeResponse;

export interface WebAuthnGetChallengeResponse {
  method: 'navigator.credentials.get';
  options: {
    publicKey: WebAuthnGetOptions;
  };
}

export interface WebAuthnCreateChallengeResponse {
  method: 'navigator.credentials.create';
  options: {
    publicKey: WebAuthnCreateOptions;
  };
}

export type WebAuthnMethod =
  | 'navigator.credentials.get'
  | 'navigator.credentials.create';

export type WebAuthnOptions = WebAuthnGetOptions | WebAuthnCreateOptions;

export interface WebAuthnGetOptions {
  timeout: number;
  challenge: string;
  allowCredentials: WebAuthnOptionsPubKeyCredParam[];
  userVerification: 'required' | 'preferred' | 'discouraged';
  rpId: string;
  extensions: WebAuthnGetOptionsExtensions;
}

export interface WebAuthnCreateOptions {
  rp: WebAuthnCreateOptionsRp;
  user: WebAuthnCreateOptionsUser;
  challenge: string;
  pubKeyCredParams: WebAuthnOptionsPubKeyCredParam[];
  authenticatorSelection: WebAuthnCreateOptionsAuthenticatorSelection;
  timeout: number;
  attestation: 'none' | 'indirect' | 'direct';
  extensions: WebAuthnCreateOptionsExtensions;
  excludeCredentials: WebAuthnOptionsPubKeyCredParam[];
}

export interface WebAuthnCreateOptionsRp {
  id: string;
  name: string;
}

export interface WebAuthnCreateOptionsAuthenticatorSelection {
  authenticatorAttachment: 'platform' | 'cross-platform';
  requireResidentKey: boolean;
  userVerification: 'required' | 'preferred' | 'discouraged';
}

export interface WebAuthnCreateOptionsUser {
  id: string;
  name: string;
  displayName: string;
}

export interface WebAuthnOptionsPubKeyCredParam {
  type: 'public-key';
  id: string;
  alg: number;
  transports?: ('usb' | 'nfc' | 'ble' | 'internal' | 'hybrid')[];
}

export interface WebAuthnCreateOptionsExtensions {
  // WIP
}

export interface WebAuthnGetOptionsExtensions {
  // WIP
}
