import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import urls from "../config/urls";
import ListItem from "../components/ListItem";
import { Header, PlusButton } from "../components/common";

@observer
class Users extends Component {
  static navigationOptions = {
    headerTransparent: true
  };
  constructor() {
    super();
    this.state = {
      users: [],
      refreshing: false,
      loading: false
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .get(urls.UsersFeed, {
        headers: header
      })
      .then(response => {
        this.setState({
          users: response.data,
          refreshing: false,
          loading: false
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
      <ListItem
        avatarIcon
        onPress={this.mailOnPress.bind(this, item)}
        data={item}
      />
    );
  }
  render() {
    const { loading } = this.state.loading;
    return (
      !loading && (
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
      )
    );
  }
}
export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  }
});
