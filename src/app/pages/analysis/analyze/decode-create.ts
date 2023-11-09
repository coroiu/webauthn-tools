import {
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
          getAuthenticatorData: {},
          getPublicKey: {},
          getPublicKeyAlgorithm:
            input.response.value.response.getPublicKeyAlgorithm,
          getTransports: input.response.value.response.getTransports,
        },
      },
    },
  };
}

/** Hacky method to return a an error message even if the data is not of the correct type */
function tryDecode<T>(decode: () => T): T {
  try {
    return decode();
  } catch (error) {
    console.error(error);
    return '[Unable to decode]' as any;
  }
}
