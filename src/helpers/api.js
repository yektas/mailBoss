import axios from "axios";

const baseURL = "http://192.168.1.2:8000/api";

export function markAsRead(mailId, authToken) {
  return new Promise((resolve, reject) => {
    const url = `${baseURL}/email/mark-as-read/`;
    const header = { Authorization: `Token ${authToken}` };
    console.log("mail ID", mailId);
    console.log("Token ", authToken);
    axios
      .post(url, {
        id: mailId,
        headers: header
      })
      .then(response => {
        return resolve(true);
      })
      .catch(error => {
        return reject(error);
      });
  });
}
