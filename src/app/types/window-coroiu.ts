declare global {
  interface Window {
    coroiu: WindowCoroiu;
  }
}

export interface WindowCoroiu {
  webauthn: {
    interceptors: {
      get?: Window['navigator']['credentials']['get'];
      create?: Window['navigator']['credentials']['get'];
    };
    injectors: {
      get?: Window['navigator']['credentials']['get'];
      create?: Window['navigator']['credentials']['get'];
    };
    native: {
      readonly get: Window['navigator']['credentials']['get'];
      readonly create: Window['navigator']['credentials']['get'];
      readonly credentialsContainer: Window['navigator']['credentials'];
    };
  };
}

export function getCoroiu(): WindowCoroiu {
  return window.coroiu;
}
