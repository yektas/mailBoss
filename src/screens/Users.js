import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { observer } from "mobx-react/native";
import UserStore from "../store/UserStore";
import urls from "../config/urls";
import { Spinner } from "../components/common";
import ListItem from "../components/ListItem";

@observer
class Users extends Component {
  static navigationOptions = () => ({
    title: "Users"
  });

  constructor() {
    super();
    this.state = {
      users: [],
      refreshing: false,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onPressUser(user) {
    this.props.navigation.navigate("MailsBetween", { user });
  }
  handleRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
  }
  handleCloseNotification() {
    this.setState({ formValid: true, registerFailed: false });
  }
  fetchData() {
    this.setState({
      loading: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    axios
      .get(`${urls.UsersFeed}/${UserStore.user.userId}`, {
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

  renderItem(user) {
    return (
      <ListItem
        avatarIcon
        onPress={this.onPressUser.bind(this, user)}
        data={user}
      />
    );
  }
  render() {
    const { loading } = this.state.loading;
    return (
      <View style={styles.container}>
        {!loading ? (
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            data={this.state.users}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
        ) : (
          <Spinner animationType="fade" visible={this.state.loading} />
        )}
      </View>
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
