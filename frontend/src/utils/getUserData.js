import api from "./api";

async function getUserDataByToken(token) {
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

async function getUserDataById(userId) {
  const result = await api.get(`/users/?case=userId&value=${userId}`);
  return await result?.data;
}

export { getUserDataByToken, getUserDataById };
