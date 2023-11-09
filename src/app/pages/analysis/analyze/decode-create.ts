import {
  DecodedWebAuthnChallengeResponse,
  WebAuthnChallengeResponse,
} from '../../../types/webauthn-challenge-response';

export function decodeCreate(
  input: WebAuthnChallengeResponse
): DecodedWebAuthnChallengeResponse {
  const decoded = input as DecodedWebAuthnChallengeResponse;
  return decoded;
}
