const baseURL = "http://localhost:8000/api";

const urls = {
  CheckUser: `${baseURL}/user/check-user/`,
  CreateUser: `${baseURL}/auth/create-user/`,
  SendEmail: `${baseURL}/email/send/`,
  Login: `${baseURL}/auth/login/`,
  UsersFeed: `${baseURL}/feed/users`,
  Users: `${baseURL}/users/`,
  UserEmails: `${baseURL}/user/emails`,
  EmailReplies: `${baseURL}/user/emails/replies`
};

export default urls;
