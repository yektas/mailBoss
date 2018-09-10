const baseURL = "http://localhost:8000/api";

const urls = {
  CreateUser: `${baseURL}/auth/create-user/`,
  Login: `${baseURL}/auth/login/`,
  FetchUsersFeed: `${baseURL}/feed/users/`,
  FetchUsers: `${baseURL}/users/`,
  FetchEmails: `${baseURL}/emails/`
};

export default urls;
