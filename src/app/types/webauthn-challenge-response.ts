export type WebAuthnChallengeResponse =
  | WebAuthnGetChallengeResponse
  | WebAuthnCreateChallengeResponse;

export type DecodedWebAuthnChallengeResponse =
  | DecodedWebAuthnGetChallengeResponse
  | DecodedWebAuthnCreateChallengeResponse;

export interface WebAuthnGetChallengeResponse {
  method: 'navigator.credentials.get';
  options: {
    publicKey: WebAuthnGetOptions;
  };
  response: {
    value: WebAuthnGetResponse;
  };
}

export interface DecodedWebAuthnGetChallengeResponse {
  method: 'navigator.credentials.get';
  options: {
    publicKey: DecodedWebAuthnGetOptions;
  };
  response: {
    value: DecodedWebAuthnGetResponse;
  };
}

export interface WebAuthnGetResponse {
  rawId: string;
  id: string;
  type: string;
  response: {
    authenticatorData: string;
    signature: string;
    userHandle: string;
    clientDataJSON: string;
  };
  getClientExtensionResults: {};
}

export interface DecodedWebAuthnGetResponse {
  rawId: string;
  id: string;
  type: string;
  response: {
    authenticatorData: DecodedAuthenticatorData;
    signature: string;
    userHandle: string;
    clientDataJSON: object;
  };
  getClientExtensionResults: {};
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
    publicKey: DecodedWebAuthnCreateOptions;
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

export interface DecodedWebAuthnGetOptions {
  timeout: number;
  challenge: string;
  allowCredentials: DecodedWebAuthnOptionsPubKeyCredParam[];
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

export interface DecodedWebAuthnCreateOptions {
  rp: WebAuthnCreateOptionsRp;
  user: WebAuthnCreateOptionsUser;
  challenge: string;
  pubKeyCredParams: DecodedWebAuthnOptionsPubKeyCredParam[];
  authenticatorSelection: WebAuthnCreateOptionsAuthenticatorSelection;
  timeout: number;
  attestation: 'none' | 'indirect' | 'direct';
  extensions: WebAuthnCreateOptionsExtensions;
  excludeCredentials: DecodedWebAuthnOptionsPubKeyCredParam[];
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

export interface DecodedWebAuthnOptionsPubKeyCredParam {
  type: 'public-key';
  id: string;
  alg: string;
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
    getPublicKey: string;
    getPublicKeyAlgorithm: string;
    getTransports: string[];
    clientDataJSON: object;
  };
  authenticatorAttachment: string;
  id: string;
  type: 'public-key';
  getClientExtensionResults: object;
}

export interface DecodedAttestationObject {
  fmt: string;
  attStmt: object;
  authData: DecodedAuthenticatorData;
}

export interface DecodedAuthenticatorData {
  rpIdHash: string;
  flags: DecodedAuthenticatorDataFlags;
  counter: number;
  attestedCredentialData?: DecodedAttestedCredentialData;
  unsupportedData?: string;
  extensionData?: object;
}

export interface DecodedAuthenticatorDataFlags {
  userPresence: boolean;
  reserved1: boolean;
  userVerification: boolean;
  backupEligibility: boolean;
  backupState: boolean;
  reserved2: boolean;
  attestationData: boolean;
  extensionData: boolean;
}

export interface DecodedAttestedCredentialData {
  aaguid: string;
  credentialIdLength: number;
  credentialId: string;
  // credentialPublicKey?: string;
  credentialPublicKey: object;
}
