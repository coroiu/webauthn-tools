import {
  DecodedAttestationObject,
  DecodedAttestedCredentialData,
  DecodedAuthenticatorData,
  DecodedWebAuthnCreateChallengeResponse,
  WebAuthnCreateChallengeResponse,
} from '../../../types/webauthn-challenge-response';

import { CBOR } from './cbor';
import {
  BufferReader,
  decodeAuthenticatorData,
  decodeBase64Url,
  decodePublicKeyAlgorithm,
  decodeWebAuthnOptionsPubKeyCredParam,
  recursiveConvertArrayBufferToHexString,
  toHexString,
  toUuidStandardFormat,
  tryDecode,
} from './decode-common';

export function decodeCreate(
  input: WebAuthnCreateChallengeResponse
): DecodedWebAuthnCreateChallengeResponse {
  return {
    ...input,
    options: {
      ...input.options,
      publicKey: {
        ...input.options.publicKey,
        pubKeyCredParams: tryDecode(() =>
          input.options.publicKey.pubKeyCredParams?.map(
            decodeWebAuthnOptionsPubKeyCredParam
          )
        ),
        excludeCredentials: tryDecode(() =>
          input.options.publicKey.excludeCredentials?.map(
            decodeWebAuthnOptionsPubKeyCredParam
          )
        ),
      },
    },
    response: {
      value: {
        authenticatorAttachment: input.response.value.authenticatorAttachment,
        getClientExtensionResults:
          input.response.value.getClientExtensionResults,
        id: input.response.value.id,
        rawId: toHexString(decodeBase64Url(input.response.value.rawId)),
        type: input.response.value.type,
        response: {
          attestationObject: tryDecode(() =>
            decodeAttestationObject(
              input.response.value.response.attestationObject
            )
          ),
          clientDataJSON: tryDecode(() =>
            JSON.parse(atob(input.response.value.response.clientDataJSON))
          ),
          getAuthenticatorData: tryDecode(() =>
            decodeAuthenticatorData(
              input.response.value.response.getAuthenticatorData
            )
          ),
          getPublicKey: tryDecode(() =>
            toHexString(
              decodeBase64Url(input.response.value.response.getPublicKey)
            )
          ),
          getPublicKeyAlgorithm: decodePublicKeyAlgorithm(
            input.response.value.response.getPublicKeyAlgorithm
          ),
          getTransports: input.response.value.response.getTransports,
        },
      },
    },
  };
}

export function decodeAttestationObject(
  data: string | Uint8Array
): DecodedAttestationObject {
  const buffer = data instanceof Uint8Array ? data : decodeBase64Url(data);
  const cborMap = CBOR.decode(buffer.buffer)[0];
  console.log({ cborMap, recursiveConvertArrayBufferToHexString });
  return {
    ...cborMap,
    attStmt: recursiveConvertArrayBufferToHexString(cborMap.attStmt),
    authData: decodeAuthenticatorData(cborMap.authData),
  };
}
