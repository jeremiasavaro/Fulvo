const EPHEMERAL_EXPECTED_KEY = "fulvo_ephemeral_expected";
const EPHEMERAL_COOKIE = "fulvo_ephemeral_alive";

function setSessionCookie(name, value) {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
}

function clearSessionCookie(name) {
  document.cookie = `${name}=; path=/; Max-Age=0; SameSite=Lax`;
}

function hasCookie(name) {
  const cookies = document.cookie ? document.cookie.split(";") : [];
  return cookies.some((rawCookie) => rawCookie.trim().startsWith(`${name}=`));
}

export function applyRememberChoice(remember) {
  if (typeof window === "undefined") {
    return;
  }

  if (remember) {
    window.localStorage.removeItem(EPHEMERAL_EXPECTED_KEY);
    clearSessionCookie(EPHEMERAL_COOKIE);
    return;
  }

  window.localStorage.setItem(EPHEMERAL_EXPECTED_KEY, "1");
  setSessionCookie(EPHEMERAL_COOKIE, "1");
}

export function clearRememberChoiceState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(EPHEMERAL_EXPECTED_KEY);
  clearSessionCookie(EPHEMERAL_COOKIE);
}

export function shouldForceEphemeralSignOut() {
  if (typeof window === "undefined") {
    return false;
  }

  const ephemeralExpected = window.localStorage.getItem(EPHEMERAL_EXPECTED_KEY) === "1";

  if (!ephemeralExpected) {
    return false;
  }

  const browserSessionStillAlive = hasCookie(EPHEMERAL_COOKIE);

  if (browserSessionStillAlive) {
    return false;
  }

  window.localStorage.removeItem(EPHEMERAL_EXPECTED_KEY);
  return true;
}
