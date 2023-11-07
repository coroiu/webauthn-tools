(function () {
  if (window.webauthnIntercepted) {
    console.warn("WebAuthn data collection already enabled");
    return;
  }
  window.webauthnIntercepted = true;

  const BrowserPublicKeyCredential = window.PublicKeyCredential;
  const browserNativeWebauthnSupport = window.PublicKeyCredential != undefined;

  if (browserNativeWebauthnSupport) {
    BrowserPublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(
      (available) => {
        browserNativeWebauthnPlatformAuthenticatorSupport = available;

        if (!available) {
          // Polyfill platform authenticator support
          window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable =
            () => Promise.resolve(true);
        }
      }
    );

    const browserCredentials = {
      create: navigator.credentials.create.bind(navigator.credentials),
      get: navigator.credentials.get.bind(navigator.credentials),
    };

    navigator.credentials.create = async (options, abortController) => {
      const intercepted = {
        method: "navigator.credentials.create",
        options: convertToJSON(options),
        response: {
          value: undefined,
          error: undefined,
        },
      };

      try {
        const response = await browserCredentials.create(
          options,
          abortController
        );
        intercepted.response.value = convertToJSON(response);
        return response;
      } catch (error) {
        intercepted.response.error = convertErrorToJSON(error);
        throw error;
      } finally {
        const log = btoa(JSON.stringify(intercepted, null, 2));
        console.log("WebAuthn challenge/response intercepted:");
        console.log(log);
      }
    };

    navigator.credentials.get = async (options, abortController) => {
      const intercepted = {
        method: "navigator.credentials.get",
        options: convertToJSON(options),
        response: {
          value: undefined,
          error: undefined,
        },
      };

      try {
        const response = await browserCredentials.get(options, abortController);
        intercepted.response.value = convertToJSON(response);
        return response;
      } catch (error) {
        intercepted.response.error = convertErrorToJSON(error);
        throw error;
      } finally {
        const log = btoa(JSON.stringify(intercepted, null, 2));
        console.log("WebAuthn challenge/response intercepted:");
        console.log(log);
      }
    };
  }

  function convertToJSON(obj) {
    if (obj === undefined || obj === null) {
      return null;
    }

    try {
      if ("buffer" in obj && obj.buffer instanceof ArrayBuffer) {
        obj = obj.buffer;
      }
    } catch {}

    if (obj instanceof ArrayBuffer) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(obj)));
    }

    if (obj instanceof Array) {
      return obj.map(convertToJSON);
    }

    if (typeof obj === "object") {
      const result = {};
      for (const key of getAllObjectKeys(obj)) {
        let value = obj[key];

        if (typeof value === "function") {
          try {
            result[key] = convertToJSON(value.bind(obj)());
          } catch {
            result[key] = null;
          }
          continue;
        }

        result[key] = convertToJSON(value);
      }
      return result;
    }

    return obj;
  }

  function convertErrorToJSON(error) {
    const result = {
      name: error.constructor?.name,
    };

    for (const key of getAllObjectKeys(error)) {
      let value = error[key];
      result[key] = convertToJSON(value);
    }

    return result;
  }

  function getAllObjectKeys(obj) {
    const keys = new Set();

    try {
      Object.getOwnPropertyNames(obj).forEach((key) => keys.add(key));
    } catch {}

    try {
      for (const key in obj) {
        keys.add(key);
      }
    } catch {}

    return Array.from(keys.values());
  }

  const successStr = "WebAuthn data collection enabled";
  console.log(successStr);
})();
