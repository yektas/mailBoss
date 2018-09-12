import React, { Component } from "react";
import { View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import { FloatingButton, CustomText } from "../components/common";
import urls from "../config/urls";
import { markAsRead } from "../helpers/api";
import ListItem from "../components/ListItem";

@observer
class Inbox extends Component {
  static navigationOptions = () => ({
    title: "Inbox"
  });

  constructor() {
    super();
    this.state = {
      loading: false,
      refreshing: false
    };
  }

  async componentWillMount() {
    if (UserStore.user === null) {
      try {
        const user = await AsyncStorage.getItem("loggedInUser");
        UserStore.setUser(JSON.parse(user));
      } catch (error) {
        console.log(error);
      }
    }
    this.fetchData();
  }

  onMailPress(mail) {
    const authToken = UserStore.authToken;
    if (!mail.read) {
      markAsRead(mail.id, authToken).then(this.fetchData());
    }
    this.props.navigation.navigate("MailDetail", { mail });
  }

  onNewButtonPress() {
    this.props.navigation.navigate("NewEmail");
  }

  fetchData() {
    this.setState({
      loading: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .get(`${urls.UserEmails}/${UserStore.user.userId}`, {
        headers: header
      })
      .then(response => {
        this.setState({
          refreshing: false,
          loading: false
        });
        UserStore.setInbox(response.data);
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          refreshing: false
        });
      });
  }
  handleRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  renderItem(mail) {
    return (
      <ListItem
        avatarIcon={false}
        type={"email"}
        onPress={this.onMailPress.bind(this, mail)}
        data={mail}
      />
    );
  }

  renderMails() {
    const mailCount = UserStore.inbox.length;
    console.log(UserStore.inbox);
    return mailCount !== 0 ? (
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        data={UserStore.inbox}
        ItemSeparatorComponent={this.renderSeparator}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
    ) : (
      <View style={styles.textContainer}>
        <CustomText style={styles.textStyle}>
          There is no email, yet.
        </CustomText>
      </View>
    );
  }

  render() {
    const { loading } = this.state.loading;

    return (
      !loading && (
        <View style={styles.container}>
          {this.renderMails()}
          <FloatingButton
            onPress={this.onNewButtonPress.bind(this)}
            iconName="plus"
          />
        </View>
      )
    );
  }
}
export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: "#999798",
    fontSize: 18,
    alignSelf: "center"
  }
});
