import axios from "axios";

const baseURL = "http://localhost:8000/api";

export function markAsRead(mailId, authToken) {
  return new Promise((resolve, reject) => {
    const url = `${baseURL}/email/mark-as-read/`;
    const header = { Authorization: `Token ${authToken}` };
    axios
      .post(
        url,
        { id: mailId },
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
