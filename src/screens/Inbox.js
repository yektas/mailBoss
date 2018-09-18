import React, { Component } from "react";
import { View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import ActionButton from "react-native-action-button";
import UserStore from "../store/UserStore";
import { CustomText, Spinner } from "../components/common";
import urls from "../config/urls";
import { markAsRead } from "../helpers/api";
import ListItem from "../components/ListItem";

@observer
class Inbox extends Component {
  static navigationOptions = () => ({
    title: "Inbox"
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      showModal: false,
      selectedMail: null,
      inbox: null
    };
  }

  async componentDidMount() {
    if (UserStore.user === null) {
      try {
        const user = await AsyncStorage.getItem("loggedInUser");
        UserStore.setUser(JSON.parse(user));
      } catch (error) {
        console.log(error);
      }
    }
    const didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      () => {
        this.fetchData();
      }
    );
    const willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.fetchData();
      }
    );
    this.fetchData();
  }

  componentWillUnmount() {}
  onMailPress(mail) {
    markAsRead(mail);
    this.props.navigation.navigate("PreviousMails", {
      mail: this.state.selectedMail
    });
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
          loading: false,
          inbox: response.data
        });
        UserStore.setInbox(response.data);
      })
      .catch(error => {
        console.log(error);
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
        onPress={() =>
          this.setState({ selectedMail: mail }, () => this.onMailPress(mail))
        }
        data={mail}
      />
    );
  }

  renderMails() {
    return UserStore.inbox.length !== 0 ? (
      <FlatList
        keyExtractor={item => item.parentMail.id.toString()}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        data={this.state.inbox}
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

    return !loading ? (
      <View style={styles.container}>
        {this.renderMails()}
        <ActionButton
          buttonColor="#ff3d00"
          onPress={this.onNewButtonPress.bind(this)}
        />
      </View>
    ) : (
      <Spinner animationType="fade" visible={this.state.loading} />
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
