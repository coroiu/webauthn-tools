import { JsonMetadata } from '../../../pretty-json/json-metadata';
import { WebAuthnCreateChallengeResponse } from '../../../types/webauthn-challenge-response';

export const WebAuthnCreateMetadata: JsonMetadata<WebAuthnCreateChallengeResponse> =
  {
    method: {
      genericDescription: 'This is a method used to create a new passkey',
      fields: undefined,
    },
    options: {
      fields: {
        publicKey: {
          genericDescription: 'WebAuthn options object',
          fields: {
            attestation: {
              genericDescription: 'Attestation type',
              fields: undefined,
            },
            authenticatorSelection: {
              genericDescription: 'Authenticator selection',
              fields: {
                authenticatorAttachment: {
                  genericDescription: 'Authenticator attachment',
                  fields: undefined,
                },
                requireResidentKey: {
                  genericDescription: 'Require resident key',
                  fields: undefined,
                },
                userVerification: {
                  genericDescription: 'User verification',
                  fields: undefined,
                },
              },
            },
            challenge: {
              genericDescription: 'Challenge',
              fields: undefined,
            },
            excludeCredentials: {
              genericDescription: 'Exclude credentials',
              fields: {
                id: {
                  genericDescription: 'ID',
                  fields: undefined,
                },
                transports: {
                  genericDescription: 'Transports',
                  fields: undefined,
                },
                type: {
                  genericDescription: 'Type',
                  fields: undefined,
                },
                alg: {
                  genericDescription: 'Algorithm',
                  fields: undefined,
                },
              },
            },
            extensions: {
              genericDescription: 'Extensions',
              fields: {},
            },
            pubKeyCredParams: {
              genericDescription: 'Public key credential parameters',
              fields: {
                type: {
                  genericDescription: 'Type',
                  fields: undefined,
                },
                id: {
                  genericDescription: 'ID',
                  fields: undefined,
                },
                alg: {
                  genericDescription: 'Algorithm',
                  fields: undefined,
                },
                transports: {
                  genericDescription: 'Transports',
                  fields: undefined,
                },
              },
            },
            rp: {
              genericDescription: 'RP',
              fields: {
                id: {
                  genericDescription: 'ID',
                  fields: undefined,
                },
                name: {
                  genericDescription: 'Name',
                  fields: undefined,
                },
              },
            },
            timeout: {
              genericDescription: 'Timeout',
              fields: undefined,
            },
            user: {
              genericDescription: 'User',
              fields: {
                displayName: {
                  genericDescription: 'Display name',
                  fields: undefined,
                },
                id: {
                  genericDescription: 'ID',
                  fields: undefined,
                },
                name: {
                  genericDescription: 'Name',
                  fields: undefined,
                },
              },
            },
          },
        },
      },
    },
  };