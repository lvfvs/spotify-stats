const getAccessToken = () => {
  const queryString = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString);
  const accessToken = urlSearchParams.get("access_token");
  const refreshToken = urlSearchParams.get("refresh_token");

  return accessToken;
};

export const accessToken = getAccessToken();
