function isBrowser() {
  return typeof window !== "undefined";
}

function environment(): BrowserEnvironment | ServerEnvironment {
  return isBrowser() ? window.ENV : process.env;
}

export default environment;
