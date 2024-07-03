import {
  DecodedAttestedCredentialData,
  DecodedAuthenticatorData,
  DecodedWebAuthnOptionsPubKeyCredParam,
  WebAuthnOptionsPubKeyCredParam,
} from '../../../types/webauthn-challenge-response';
import { CBOR } from './cbor';

/** Hacky method to return a an error message even if the data is not of the correct type */
export function tryDecode<T>(decode: () => T): T {
  try {
    return decode();
  } catch (error) {
    console.error(error);
    return `[Unable to decode; Error: ${error}]` as any;
  }
}

export function decodeBase64Url(input: string): Uint8Array {
  return new Uint8Array(
    atob(input.replace(/-/g, '+').replace(/_/g, '/'))
      .split('')
      .map((c) => c.charCodeAt(0))
  );
}

export class BufferReader {
  private offset = 0;

  constructor(private buffer: Uint8Array) {}

  get remaining() {
    return this.buffer.length - this.offset;
  }

  read(bytes: number): Uint8Array {
    if (bytes > this.remaining) {
      throw new Error(
        `Trying to read ${bytes} bytes, but only ${this.remaining} bytes are available`
      );
    }
    const value = this.buffer.slice(this.offset, this.offset + bytes);
    this.offset += bytes;
    return value;
  }

  readByte(): number {
    return this.read(1)[0];
  }

  readUInt32BE(): number {
    const value = this.read(4);
    return (value[0] << 24) | (value[1] << 16) | (value[2] << 8) | value[3];
  }

  readUInt16BE(): number {
    const value = this.read(2);
    return (value[0] << 8) | value[1];
  }

  getCopyOfRemainingData(): Uint8Array {
    return this.buffer.slice(this.offset);
  }
}

export function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
}

export function toUuidStandardFormat(buffer: Uint8Array) {
  const hex = toHexString(buffer);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
    12,
    16
  )}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function recursiveConvertArrayBufferToHexString(data: object): any {
  if (data instanceof ArrayBuffer) {
    return toHexString(new Uint8Array(data));
  }
  if (data instanceof Uint8Array) {
    return toHexString(data);
  }
  if (Array.isArray(data)) {
    return data.map(recursiveConvertArrayBufferToHexString);
  }
  if (typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        recursiveConvertArrayBufferToHexString(value),
      ])
    );
  }
  return data;
}

export function decodePublicKeyAlgorithm(data: number): string;
export function decodePublicKeyAlgorithm(data: undefined): undefined;
export function decodePublicKeyAlgorithm(
  data: number | undefined
): string | undefined {
  if (data === undefined) {
    return undefined;
  }

  const map: Record<string, string | undefined> = {
    '-65535': 'RS1',
    '-65534': 'A128CTR',
    '-65533': 'A192CTR',
    '-65532': 'A256CTR',
    '-65531': 'A128CBC',
    '-65530': 'A192CBC',
    '-65529': 'A256CBC',
    '-260': 'WalnutDSA',
    '-259': 'RS512',
    '-258': 'RS384',
    '-257': 'RS256',
    '-47': 'ES256K',
    '-46': 'HSS-LMS',
    '-45': 'SHAKE256',
    '-44': 'SHA-512',
    '-43': 'SHA-384',
    '-42': 'RSAES-OAEP w/ SHA-512',
    '-41': 'RSAES-OAEP w/ SHA-256',
    '-40': 'RSAES-OAEP w/ RFC 8017 default parameters',
    '-39': 'PS512',
    '-38': 'PS384',
    '-37': 'PS256',
    '-36': 'ES512',
    '-35': 'ES384',
    '-34': 'ECDH-SS + A256KW',
    '-33': 'ECDH-SS + A192KW',
    '-32': 'ECDH-SS + A128KW',
    '-31': 'ECDH-ES + A256KW',
    '-30': 'ECDH-ES + A192KW',
    '-29': 'ECDH-ES + A128KW',
    '-28': 'ECDH-SS + HKDF-512',
    '-27': 'ECDH-SS + HKDF-256',
    '-26': 'ECDH-ES + HKDF-512',
    '-25': 'ECDH-ES + HKDF-256',
    '-18': 'SHAKE128',
    '-17': 'SHA-512/256',
    '-16': 'SHA-256',
    '-15': 'SHA-256/64',
    '-14': 'SHA-1',
    '-13': 'direct+HKDF-AES-256',
    '-12': 'direct+HKDF-AES-128',
    '-11': 'direct+HKDF-SHA-512',
    '-10': 'direct+HKDF-SHA-256',
    '-8': 'EdDSA',
    '-7': 'ES256',
    '-6': 'direct',
    '-5': 'A256KW',
    '-4': 'A192KW',
    '-3': 'A128KW',
    '1': 'A128GCM',
    '2': 'A192GCM',
    '3': 'A256GCM',
    '4': 'HMAC 256/64',
    '5': 'HMAC 256/256',
    '6': 'HMAC 384/384',
    '7': 'HMAC 512/512',
    '10': 'AES-CCM-16-64-128',
    '11': 'AES-CCM-16-64-256',
    '12': 'AES-CCM-64-64-128',
    '13': 'AES-CCM-64-64-256',
    '14': 'AES-MAC 128/64',
    '15': 'AES-MAC 256/64',
    '24': 'ChaCha20/Poly1305',
    '25': 'AES-MAC 128/128',
    '26': 'AES-MAC 256/128',
    '30': 'AES-CCM-16-128-128',
    '31': 'AES-CCM-16-128-256',
    '32': 'AES-CCM-64-128-128',
    '33': 'AES-CCM-64-128-256',
    '34': 'IV-GENERATION',
  };

  const key = String(data);
  const value = map[key];

  if (value == undefined) {
    return `[Unknown algorithm: ${key}]`;
  }

  return value;
}

export function decodeAuthenticatorData(
  data: string | Uint8Array
): DecodedAuthenticatorData {
  const buffer = data instanceof Uint8Array ? data : decodeBase64Url(data);
  if (buffer.length < 37) {
    throw new Error('Authenticator data is too short');
  }
  const reader = new BufferReader(buffer);
  let rpIdHash = toHexString(reader.read(32));
  let flagsByte = reader.readByte();

  let flags;
  // prettier-ignore
  {
    let userPresence      = !!(flagsByte & 0b00000001);
    let reserved1         = !!(flagsByte & 0b00000010);
    let userVerification  = !!(flagsByte & 0b00000100);
    let backupEligibility = !!(flagsByte & 0b00001000);
    let backupState       = !!(flagsByte & 0b00010000);
    let reserved2         = !!(flagsByte & 0b00100000);
    let attestationData      = !!(flagsByte & 0b01000000);
    let extensionData     = !!(flagsByte & 0b10000000);
    flags = {
      userPresence,
      reserved1,
      userVerification,
      backupEligibility,
      backupState,
      reserved2,
      attestationData,
      extensionData
    };
  }

  const counter = reader.readUInt32BE();

  const result = {
    rpIdHash,
    flags,
    counter,
    attestedCredentialData: flags.attestationData
      ? tryDecode(() => decodeAttestedCredentialData(reader))
      : undefined,
  } as DecodedAuthenticatorData;

  if (flags.extensionData) {
    result.extensionData = tryDecode(() => {
      const remainingData = reader.getCopyOfRemainingData();
      const [data, length] = CBOR.decode(remainingData.buffer, {
        ignoreTrailingData: true,
      });
      reader.read(length);
      return recursiveConvertArrayBufferToHexString(data);
    });
  }

  if (reader.remaining > 0) {
    result.unsupportedData = toHexString(reader.read(reader.remaining));
  }

  return result;
}

export function decodeAttestedCredentialData(
  reader: BufferReader
): DecodedAttestedCredentialData {
  const attestationMinLen = 16 + 2 + 16 + 42; // aaguid + credIdLen + credId + pk
  if (reader.remaining < attestationMinLen)
    throw new Error(
      `The attestationData flag is set, but the remaining data is smaller than ${attestationMinLen} bytes. Did we encounter the attestationData flag for an assertion response?`
    );
  const aaguid = toUuidStandardFormat(reader.read(16));
  const credentialIdLength = reader.readUInt16BE();
  const credentialId = toHexString(reader.read(credentialIdLength));
  const credentialPublicKey = tryDecode(() => {
    const remainingData = reader.getCopyOfRemainingData();
    // Ignore data for the moment
    const [data, length] = CBOR.decode(remainingData.buffer, {
      ignoreTrailingData: true,
    });
    reader.read(length);
    return recursiveConvertArrayBufferToHexString(data);
    // const rawCredentialPublicKey = reader.read(length);
    // return toHexString(rawCredentialPublicKey);
  });
  return {
    aaguid,
    credentialIdLength,
    credentialId,
    credentialPublicKey,
  };
}

export function decodeWebAuthnOptionsPubKeyCredParam(
  data: WebAuthnOptionsPubKeyCredParam
): DecodedWebAuthnOptionsPubKeyCredParam {
  return {
    ...data,
    alg: decodePublicKeyAlgorithm(data.alg),
  };
}
