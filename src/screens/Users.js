import React, { Component } from "react";
import { View, FlatList, StyleSheet, AsyncStorage } from "react-native";
import axios from "axios";
import urls from "../config/urls";
import UserFeedItem from "../components/UserFeedItem";
import { Header, PlusButton } from "../components/common";

class Users extends Component {
  static navigationOptions = {
    headerTransparent: true
  };
  constructor() {
    super();
    this.state = {
      users: [],
      auth_token: "",
      refreshing: false
    };
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem("auth_token");
      if (value !== null) {
        this.setState({
          auth_token: `Token ${value}`
        });
      }
    } catch (error) {
      console.log(error);
    }
    this.fetchData();
  }

  fetchData() {
    const header = { Authorization: this.state.auth_token };
    axios
      .get(urls.FetchUsersFeed, {
        headers: header
      })
      .then(response => {
        this.setState({
          users: response.data,
          refreshing: false
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
  }
  handleCloseNotification() {
    this.setState({ formValid: true, registerFailed: false });
  }

  mailOnPress(mail) {
    this.props.navigation.navigate("MailDetail", {
      mail
    });
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

  renderItem(item) {
    return (
      <UserFeedItem onPress={this.mailOnPress.bind(this, item)} data={item} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Users" />
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          data={this.state.users}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
        <PlusButton />
      </View>
    );
  }
}
export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
