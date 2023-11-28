window.coroiu.webauthn = {
  native: {
    get: window.navigator.credentials.get,
    create: window.navigator.credentials.create,
    credentialsContainer: window.navigator.credentials,
  },
  interceptors: {},
};

window.navigator.credentials.get = (options, abortController) => {
  const interceptor = window.coroiu.webauthn.interceptors.get;
  if (interceptor) {
    return interceptor(options, abortController);
  } else {
    return window.coroiu.webauthn.native.get.bind(
      window.coroiu.webauthn.native.credentialsContainer
    )(options, abortController);
  }
};

window.navigator.credentials.create = (options, abortController) => {
  const interceptor = window.coroiu.webauthn.interceptors.create;
  if (interceptor) {
    return interceptor(options, abortController);
  } else {
    return window.coroiu.webauthn.native.create.bind(
      window.coroiu.webauthn.native.credentialsContainer
    )(options, abortController);
  }
};
