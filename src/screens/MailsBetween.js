import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { observer } from "mobx-react/native";
import axios from "axios";
import urls from "../config/urls";
import ListItem from "../components/ListItem";
import UserStore from "../store/UserStore";

@observer
class MailsBetween extends Component {
  static navigationOptions = {
    title: `Mails between user`
  };

  constructor(props) {
    super(props);
    this.state = {
      mails: [],
      betweenUser: this.props.navigation.getParam("user"),
      refreshing: false,
      loading: false
    };
  }

  componentWillMount() {
    this.fetchData();
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
    const userId = UserStore.user.userId;
    const url = `${urls.UserEmails}/${userId}/${this.state.betweenUser.id}/`;
    axios
      .get(url, {
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
      });
  }

  mailOnPress(mail) {
    this.props.navigation.navigate("MailDetails", { mail });
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
        avatarIcon={false}
        type={"email"}
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
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            data={this.state.mails}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
        </View>
      )
    );
  }
}
export default MailsBetween;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  }
});
