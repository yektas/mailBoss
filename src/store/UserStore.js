import { observable, action, computed } from "mobx";

class UserStore {
  @observable
  user = null;

  @observable
  inbox = [];

  @action
  setUser(user) {
    this.user = user;
  }

  @action
  setInbox(mails) {
    this.inbox = mails;
  }

  @computed
  get unreadCount() {
    let count = 0;
    for (let i = 0; i < this.inbox.length; i++) {
      if (!this.inbox[i].status.isRead) count += 1;
    }
    return count;
  }

  @computed
  get authToken() {
    return this.user.authToken;
  }
}

const userStore = new UserStore();

export default userStore;
