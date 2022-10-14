import api from "./api";

async function getUserData(token) {
  let result;

  const accessHeader = {
    headers: {
      Authorization: `${token.accessToken}`,
    },
  };

  const refreshHeader = {
    headers: {
      Authorization: `${token.refreshToken}`,
    },
  };

  try {
    result = await api.get(`/auth/`, accessHeader);
  } catch (error) {
    try {
      result = await api.get(`/auth/`, refreshHeader);
    } catch (error) {
      result = false;
    }
  }

  return result?.data.userData;
}

export default getUserData;
