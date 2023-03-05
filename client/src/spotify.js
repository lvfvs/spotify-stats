import { urlencoded } from "express";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expiryTime: "spotify_token_expiry_time",
  timestamp: "spotify_token_timestamp",
};

const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expiryTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expiryTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expiryTime]: urlParams.get("expires_in"),
  };

  const hasError = urlParams.get("error");

  const hasTokenExpired = () => {
    const { accessToken, timestamp, expiryTime } = LOCALSTORAGE_VALUES;

    if (!accessToken || !timestamp) {
      return false;
    }

    const millisecondsElapsed = Date.now() - Number(timestamp);

    return millisecondsElapsed / 1000 > Number(expiryTime);
  };

  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }

    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  return false;
};

export const accessToken = getAccessToken();
