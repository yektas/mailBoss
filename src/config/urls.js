const baseURL = "http://localhost:8000/api";

const urls = {
  CreateUser: `${baseURL}/auth/create-user/`,
  Login: `${baseURL}/auth/login/`,
  UsersFeed: `${baseURL}/feed/users/`,
  Users: `${baseURL}/users/`,
  Emails: `${baseURL}/emails/`,
  UserEmails: `${baseURL}/user/emails/`
};

export default urls;
