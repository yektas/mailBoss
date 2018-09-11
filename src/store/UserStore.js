import { observable, action, computed } from "mobx";

class UserStore {
  @observable
  user = null;

  @action
  setUser(user) {
    this.user = user;
  }

  @computed
  get authToken() {
    return this.user.authToken;
  }
}

const userStore = new UserStore();

export default userStore;
