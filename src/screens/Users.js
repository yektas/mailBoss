import React, { Component } from "react";
import {
  ScrollView,
  View,
  StatusBar,
  FlatList,
  StyleSheet
} from "react-native";
import axios from "axios";
import ListItem from "../components/ListItem";
import { Header, PlusButton } from "../components/common";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    axios
      .get("http://192.168.1.2:8000/api/v1/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(error => console.log(error));
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
    return <ListItem data={item} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Header headerText="Users" />
        <ScrollView styles={{ flex: 1 }}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            data={this.state.users}
            ItemSeparatorComponent={this.renderSeparatorRR}
          />
        </ScrollView>
        <PlusButton />
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
