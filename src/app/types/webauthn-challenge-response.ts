export type WebAuthnChallengeResponse =
  | WebAuthnGetChallengeResponse
  | WebAuthnCreateChallengeResponse;

export type DecodedWebAuthnChallengeResponse =
  | WebAuthnGetChallengeResponse
  | DecodedWebAuthnCreateChallengeResponse;

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
  response: {
    value: WebAuthCreateResponse;
  };
}

export interface DecodedWebAuthnCreateChallengeResponse {
  method: 'navigator.credentials.create';
  options: {
    publicKey: WebAuthnCreateOptions;
  };
  response: {
    value: DecodedWebAuthCreateResponse;
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

export interface WebAuthCreateResponse {
  rawId: string;
  response: {
    attestationObject: string;
    getAuthenticatorData: string;
    getPublicKey: string;
    getPublicKeyAlgorithm: number;
    getTransports: string[];
    clientDataJSON: string;
  };
  authenticatorAttachment: string;
  id: string;
  type: 'public-key';
  getClientExtensionResults: {};
}

export interface DecodedWebAuthCreateResponse {
  rawId: string;
  response: {
    attestationObject: DecodedAttestationObject;
    getAuthenticatorData: DecodedAuthenticatorData;
    getPublicKey: object;
    getPublicKeyAlgorithm: number;
    getTransports: string[];
    clientDataJSON: object;
  };
  authenticatorAttachment: string;
  id: string;
  type: 'public-key';
  getClientExtensionResults: {};
}

export interface DecodedAttestationObject {}

export interface DecodedAuthenticatorData {}
