async function createCredential(printParams, printOutput) {
  const wellKnownUser = user();
  const challenge = crypto.getRandomValues(new Uint8Array(16));
  const salt = document.querySelector("#salt").value;
  const attachment = document.querySelector("#attachment").value;
  const discoverable = document.querySelector("#discoverable").value;

  const request = {
    challenge,
    pubKeyCredParams: [],
    authenticatorSelection: {
      authenticatorAttachment: attachment === "null" ? undefined : attachment,
      residentKey: discoverable === "null" ? undefined : discoverable,
    },
    rp: {
      name: "PRF Demo",
    },
    user: wellKnownUser,
    userVerification: "discouraged",
    extensions: {
      prf: {},
    },
  };

  printParams({
    ...request,
    challenge: toB64Url(challenge),
    user: {
      ...request.user,
      id: toB64Url(request.user.id),
    },
  });

  const result = await navigator.credentials.create({
    publicKey: request,
  });
  const extensions = result.getClientExtensionResults();

  const credentialInput = document.querySelector("#credential");
  credentialInput.value = toB64Url(result.rawId);

  printOutput({
    id: result.id,
    rawId: toB64Url(result.rawId),
    response: {
      ...result.response,
      attestationObject: toB64Url(result.response.attestationObject),
      clientDataJSON: toB64Url(result.response.clientDataJSON),
      clientDataJSONDecoded: JSON.parse(
        new TextDecoder().decode(result.response.clientDataJSON)
      ),
    },
    authenticatorAttachment: result.authenticatorAttachment,
    type: result.type,
    extensions,
  });

  if (extensions?.prf?.enabled != true) {
    showFail();
    throw new Error(
      "PRF not supported, please try another credential or another platform/authenticator combination"
    );
  }
}

async function createKey(printParams, printOutput) {
  const wellKnownUser = user();
  const challenge = crypto.getRandomValues(new Uint8Array(16));
  const existingCredential = document.querySelector("#credential").value;

  const request = {
    challenge,
    pubKeyCredParams: [],
    allowCredentials: existingCredential
      ? [
          {
            id: fromB64Url(existingCredential),
            type: "public-key",
          },
        ]
      : [],
    user: wellKnownUser,
    userVerification: "discouraged",
    extensions: {
      prf: { eval: { first: new TextEncoder().encode(salt) } },
    },
  };

  printParams({
    ...request,
    challenge: toB64Url(challenge),
    allowCredentials: request.allowCredentials.map((cred) => ({
      ...cred,
      id: toB64Url(cred.id),
    })),
    user: {
      ...request.user,
      id: toB64Url(request.user.id),
    },
    extensions: {
      prf: { eval: { first: toB64Url(request.extensions.prf.eval.first) } },
    },
  });

  const result = await navigator.credentials.get({
    publicKey: request,
  });
  const extensions = result.getClientExtensionResults();

  printOutput({
    id: result.id,
    rawId: toB64Url(result.rawId),
    response: {
      ...result.response,
      attestationObject: toB64Url(result.response.attestationObject),
      clientDataJSON: toB64Url(result.response.clientDataJSON),
      clientDataJSONDecoded: JSON.parse(
        new TextDecoder().decode(result.response.clientDataJSON)
      ),
    },
    authenticatorAttachment: result.authenticatorAttachment,
    type: result.type,
    extensions: {
      prf: extensions?.prf?.results?.first
        ? { results: { first: toB64Url(extensions.prf.results.first) } }
        : {},
    },
  });

  if (extensions?.prf?.results?.first == undefined) {
    showFail();
    throw new Error(
      "PRF not supported, please try another credential or another platform/authenticator combination"
    );
  }

  const encryptionKey = document.querySelector("#encryption-key");
  encryptionKey.value = toB64Url(extensions.prf.results.first);
  showSuccess();
}

async function runWithDOMOutput(callback, selector) {
  initFooter(selector);
  const footer = document.querySelector(selector);
  const text = footer.querySelector(".text");
  const paramsAccordion = footer.querySelector(".params");
  const params = footer.querySelector(".params pre");
  const outputAccordion = footer.querySelector(".output");
  const output = footer.querySelector(".output pre");
  const errorAccordion = footer.querySelector(".error");
  const error = footer.querySelector(".error pre");

  let paramsObject = undefined;
  function printParamsCallback(params) {
    console.info("Params", params);
    paramsObject = params;
  }

  let outputObject = undefined;
  function printOutputCallback(output) {
    console.info("output", output);
    outputObject = output;
  }

  let errorObject = undefined;

  try {
    await callback(printParamsCallback, printOutputCallback);
    text.classList.add("text-success");
    text.innerText = "Success!";
  } catch (error) {
    console.error(error);
    text.classList.add("text-danger");
    text.innerText = String(error);
    errorObject = JSON.stringify(error, null, 2);
  }

  if (paramsObject === undefined) {
    paramsAccordion.remove();
  } else {
    params.innerText = JSON.stringify(paramsObject, null, 2);
  }

  if (outputObject === undefined) {
    outputAccordion.remove();
  } else {
    output.innerText = JSON.stringify(outputObject, null, 2);
  }

  if (errorObject === undefined) {
    errorAccordion.remove();
  } else {
    error.innerText = JSON.stringify(errorObject, null, 2);
  }

  footer.classList.remove("d-none");
}

function initFooter(selector) {
  const wrapper = document.querySelector(selector);
  wrapper.innerHTML = `
        <div class="card-footer pt-3">
          <div class="text mb-3"></div>
          <div class="accordion">
            <div class="accordion-item params">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="${selector} .params .accordion-collapse">
                  Params
                </button>
              </div>
              <div class="accordion-collapse collapse params">
                <div class="accordion-body">
                  <pre class="mb-0"></pre>
                </div>
              </div>
            </div>
            <div class="accordion-item output">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="${selector} .output .accordion-collapse">
                  Output
                </button>
              </div>
              <div class="accordion-collapse collapse output">
                <div class="accordion-body">
                  <pre class="mb-0"></pre>
                </div>
              </div>
            </div>
            <div class="accordion-item error">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="${selector} .error .accordion-collapse">
                  Error
                </button>
              </div>
              <div class="accordion-collapse collapse error">
                <div class="accordion-body">
                  <pre class="mb-0"></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
}

function user() {
  return {
    name: "PRF Demo User",
    displayName: "PRF Demo User",
    id: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  };
}

function toB64(input) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(input)));
}

function fromB64(input) {
  return Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
}

function toB64Url(input) {
  return toB64(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromB64Url(input) {
  return fromB64(input.replace(/-/g, "+").replace(/_/g, "/"));
}

function showSuccess() {
  resetAlerts();
  const alert = document.querySelector(".prf-success");
  alert.classList.remove("d-none");
}

function showFail() {
  resetAlerts();
  const alert = document.querySelector(".prf-fail");
  alert.classList.remove("d-none");
}

function resetAlerts() {
  const alerts = document.querySelectorAll(".prf-alert");
  for (const alert of alerts) {
    alert.classList.add("d-none");
  }
}
