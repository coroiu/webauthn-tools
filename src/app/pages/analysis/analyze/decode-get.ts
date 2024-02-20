import {
  DecodedWebAuthnGetChallengeResponse,
  WebAuthnGetChallengeResponse,
} from '../../../types/webauthn-challenge-response';
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

export function decodeGet(
  input: WebAuthnGetChallengeResponse
): DecodedWebAuthnGetChallengeResponse {
  return {
    ...input,
    options: {
      ...input.options,
      publicKey: {
        ...input.options.publicKey,
        allowCredentials: tryDecode(() =>
          input.options.publicKey.allowCredentials?.map(
            decodeWebAuthnOptionsPubKeyCredParam
          )
        ),
      },
    },
    response: {
      value: {
        id: input.response.value.id,
        rawId: toHexString(decodeBase64Url(input.response.value.rawId)),
        type: input.response.value.type,
        getClientExtensionResults:
          input.response.value.getClientExtensionResults,
        authenticatorAttachment: input.response.value.authenticatorAttachment,
        response: {
          authenticatorData: tryDecode(() =>
            decodeAuthenticatorData(
              input.response.value.response.authenticatorData
            )
          ),
          clientDataJSON: tryDecode(() =>
            JSON.parse(atob(input.response.value.response.clientDataJSON))
          ),
          signature: tryDecode(() =>
            toHexString(
              decodeBase64Url(input.response.value.response.signature)
            )
          ),
          userHandle: tryDecode(() =>
            toHexString(
              decodeBase64Url(input.response.value.response.userHandle)
            )
          ),
        },
      },
    },
  };
}
