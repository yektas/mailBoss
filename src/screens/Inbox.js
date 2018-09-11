import React, { Component } from "react";
import { View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import { Header, PlusButton } from "../components/common";
import urls from "../config/urls";
import ListItem from "../components/ListItem";

@observer
class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      mails: [],
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
    return null;
  }

  fetchData() {
    this.setState({
      loading: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .get(`${urls.UserEmails}1`, {
        headers: header
      })
      .then(response => {
        this.setState({
          mails: response.data,
          refreshing: false,
          loading: false
        });
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

  render() {
    const { loading } = this.state.loading;
    return (
      !loading && (
        <View style={styles.container}>
          <Header headerText="Inbox" />
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            data={this.state.mails}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
          <PlusButton />
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
  }
});
