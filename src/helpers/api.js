import axios from "axios";
import urls from "../config/urls";
import UserStore from "../store/UserStore";

export function markAsRead(mail) {
  return new Promise((resolve, reject) => {
    const url = `${urls.UserEmails}/mark-as-read/`;
    const header = { Authorization: `Token ${UserStore.authToken}` };
    axios
      .post(
        url,
        {
          mail,
          current_user: UserStore.user.userId
        },
        {
          headers: header
        }
      )
      .then(response => {
        return resolve(true);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function markAsDeleted(mail) {
  return new Promise((resolve, reject) => {
    const url = `${urls.UserEmails}/mark-as-deleted/`;
    const header = { Authorization: `Token ${UserStore.authToken}` };
    axios
      .post(
        url,
        {
          mail,
          current_user: UserStore.user.userId
        },
        {
          headers: header
        }
      )
      .then(response => {
        return resolve(true);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function getRecentMails(userId, authToken) {
  const header = {
    Authorization: `Token ${authToken}`
  };
  axios
    .get(`${urls.UserEmails}/${userId}`, {
      headers: header
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error.response);
    });
}
