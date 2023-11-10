import {
  DecodedAuthenticatorData,
  DecodedWebAuthnCreateChallengeResponse,
  WebAuthnCreateChallengeResponse,
} from '../../../types/webauthn-challenge-response';

export function decodeCreate(
  input: WebAuthnCreateChallengeResponse
): DecodedWebAuthnCreateChallengeResponse {
  return {
    ...input,
    response: {
      value: {
        authenticatorAttachment: input.response.value.authenticatorAttachment,
        getClientExtensionResults: {},
        id: input.response.value.id,
        rawId: input.response.value.rawId,
        type: input.response.value.type,
        response: {
          attestationObject: {},
          clientDataJSON: tryDecode(() =>
            JSON.parse(atob(input.response.value.response.clientDataJSON))
          ),
          getAuthenticatorData: decodeAuthenticatorData(
            input.response.value.response.getAuthenticatorData
          ),
          getPublicKey: {},
          getPublicKeyAlgorithm:
            input.response.value.response.getPublicKeyAlgorithm,
          getTransports: input.response.value.response.getTransports,
        },
      },
    },
  };
}

function decodeAuthenticatorData(data: string): DecodedAuthenticatorData {
  const buffer = decodeBase64Url(data);
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
    let attestedData      = !!(flagsByte & 0b01000000);
    let extensionData     = !!(flagsByte & 0b10000000);
    flags = {
      userPresence,
      reserved1,
      userVerification,
      backupEligibility,
      backupState,
      reserved2,
      attestedData,
      extensionData
    };
  }

  const counter = reader.readUInt32BE();
  const aaguid = toUuidStandardFormat(reader.read(16));
  const credentialIdLength = reader.readUInt16BE();
  const credentialId = toHexString(reader.read(credentialIdLength));
  const attestedCredentialData = {
    aaguid,
    credentialIdLength,
    credentialId,
  };

  const result = {
    rpIdHash,
    flags,
    counter,
    attestedCredentialData,
  } as DecodedAuthenticatorData;

  if (reader.remaining > 0) {
    result.unsupportedData = toHexString(reader.read(reader.remaining));
  }

  return result;
}

/** Hacky method to return a an error message even if the data is not of the correct type */
function tryDecode<T>(decode: () => T): T {
  try {
    return decode();
  } catch (error) {
    console.error(error);
    return `[Unable to decode; Error: ${error}]` as any;
  }
}

function decodeBase64Url(input: string): Uint8Array {
  return new Uint8Array(
    atob(input.replace(/-/g, '+').replace(/_/g, '/'))
      .split('')
      .map((c) => c.charCodeAt(0))
  );
}

class BufferReader {
  private offset = 0;

  constructor(private buffer: Uint8Array) {}

  get remaining() {
    return this.buffer.length - this.offset;
  }

  read(bytes: number): Uint8Array {
    const value = this.buffer.slice(this.offset, this.offset + bytes);
    this.offset += bytes;
    return value;
  }

  readByte(): number {
    return this.read(1)[0];
  }

  readUInt32BE(): number {
    const value = this.read(4);
    this.offset += 4;
    return (value[0] << 24) | (value[1] << 16) | (value[2] << 8) | value[3];
  }

  readUInt16BE(): number {
    const value = this.read(2);
    this.offset += 2;
    return (value[0] << 8) | value[1];
  }
}

function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
}

function toUuidStandardFormat(buffer: Uint8Array) {
  const hex = toHexString(buffer);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
    12,
    16
  )}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
