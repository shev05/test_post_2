const BASE_URL = import.meta.env.VITE_API_URL || ''

export const URL_ADRESS = {
  AUTH_URL: `${BASE_URL}/auth/login`,
  REFRESH_URL: `${BASE_URL}/auth/refresh`,
  USERS_URL: `${BASE_URL}/users`,
  POSTS_URL: `${BASE_URL}/post`,
  REGISTER_URL: `${BASE_URL}/users/register`,
  POSTS_CREATE_URL: `${BASE_URL}/post/create`,
  COMMENT_URL: `${BASE_URL}/comments`,
  COMMENT_CREATE_URL: `${BASE_URL}/comments/create`,
}
