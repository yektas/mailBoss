import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  FlatList
} from "react-native";
import format from "date-fns/format";
import { observer } from "mobx-react/native";
import axios from "axios";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import UserStore from "../store/UserStore";
import urls from "../config/urls";
import images from "../config/images";
import { CustomText, Card, Spinner } from "../components/common";
import Fonts from "../config/fonts";
import { markAsDeleted } from "../helpers/api";

@observer
class PreviousMails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("mail").parentMail.message.subject
  });

  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      mail: props.navigation.getParam("mail"),
      currentUser: UserStore.user,
      loading: false,
      showAnimation: false,
      progress: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.getRecentReplies();
  }

  onDelete() {
    this.setState({
      showAnimation: true
    });
    markAsDeleted(this.state.mail).then(
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }).start(() => this.props.navigation.navigate("Inbox"))
    );
  }

  onReply() {
    this.props.navigation.navigate("Reply", {
      mail: this.state.mail
    });
  }

  getRecentReplies() {
    this.setState({
      loading: true
    });
    const header = {
      Authorization: `Token ${UserStore.authToken}`
    };
    const url = `${urls.EmailReplies}/${this.state.mail.parentMail.message.id}`;
    axios
      .get(url, {
        headers: header
      })
      .then(response => {
        this.setState({
          loading: false,
          replies: response.data.replies
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          loading: false
        });
      });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          backgroundColor: "transparent"
        }}
      />
    );
  };

  renderFormattedDate(date) {
    return format(new Date(date), "DD.MM.YYYY HH:mm");
  }
  renderItem(mail) {
    let cardStyle;
    if (mail.sender.id === this.state.currentUser.userId) {
      cardStyle = styles.replyFromContainer;
    } else {
      cardStyle = styles.replyToContainer;
    }
    return (
      <Card style={cardStyle}>
        <View style={styles.replyContainer}>
          <View style={{ marginTop: 10, marginBottom: 5 }}>
            <CustomText style={styles.emailText} numberOfLines={1}>
              <CustomText style={styles.labelStyle}>From: </CustomText>
              {mail.sender.id === this.state.currentUser.userId
                ? "Me"
                : mail.sender.email}
            </CustomText>
            <CustomText style={styles.subText} numberOfLines={4}>
              <CustomText style={styles.labelStyle}>Subject: </CustomText>
              {mail.subject}
            </CustomText>
            <CustomText style={styles.subText} numberOfLines={4}>
              <CustomText style={styles.labelStyle}>Date: </CustomText>
              {this.renderFormattedDate(mail.timestamp)}
            </CustomText>
          </View>
          <View style={styles.divider} />
          <View style={styles.bodyContainer}>
            <CustomText style={styles.bodyText}>{mail.body}</CustomText>
          </View>
        </View>
      </Card>
    );
  }

  render() {
    const { replies, mail, currentUser } = this.state;
    const parentMail = mail.parentMail;
    return (
      replies && (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <Card style={styles.parentCardStyle}>
              <CustomText style={styles.emailText} numberOfLines={4}>
                <CustomText style={styles.labelStyle}>From: </CustomText>
                {parentMail.message.sender.id === currentUser.userId
                  ? "Me"
                  : parentMail.message.sender.email}
              </CustomText>
              <CustomText style={styles.subText} numberOfLines={4}>
                <CustomText style={styles.labelStyle}>To: </CustomText>
                {parentMail.receiver.id === currentUser.userId
                  ? "Me"
                  : parentMail.receiver.email}
              </CustomText>
              <CustomText style={styles.subText}>
                <CustomText style={styles.labelStyle}>Date: </CustomText>
                {this.renderFormattedDate(parentMail.message.timestamp)}
              </CustomText>
              <CustomText style={styles.parentHeader}>
                {parentMail.message.subject}
              </CustomText>

              <View style={styles.divider} />
              <View style={{ flex: 0 }}>
                <CustomText style={styles.parentBody}>
                  {parentMail.message.body}
                </CustomText>
              </View>
            </Card>
            <View
              style={{
                backgroundColor: "transparent",
                padding: 10,
                marginTop: 5,
                flex: 3
              }}
            >
              {!this.state.loading ? (
                <FlatList
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item, index }) => this.renderItem(item, index)}
                  data={replies}
                  ItemSeparatorComponent={this.renderSeparator}
                  contentContainerStyle={{ paddingBottom: 5 }}
                />
              ) : (
                <Spinner animationType="fade" visible={this.state.loading} />
              )}
            </View>
          </ScrollView>
          {this.state.showAnimation && (
            <LottieView
              source={images.success}
              progress={this.state.progress}
              style={{
                zIndex: 9
              }}
            />
          )}
          <ActionButton
            buttonColor="#3663E3"
            renderIcon={() => <Icon name="menu" color="#ffff" size={22} />}
          >
            <ActionButton.Item
              buttonColor="#FFCA28"
              title="Reply"
              onPress={this.onReply.bind(this)}
            >
              <Icon name="reply" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#ff3d00"
              title="Delete"
              onPress={this.onDelete.bind(this)}
            >
              <Icon name="delete-forever" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      )
    );
  }
}
export default PreviousMails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  parentCardStyle: {
    flex: 0,
    backgroundColor: "#ffff",
    padding: 10
  },
  cardStyle: {
    flex: 1
  },
  replyFromContainer: {
    flex: 1,
    padding: 10,
    marginRight: 2,
    marginLeft: 20,
    backgroundColor: "#e4fce4"
  },
  emailText: {
    fontSize: 14,
    color: "#5597F5"
  },
  replyToContainer: {
    flex: 1,
    padding: 10,
    marginLeft: 2,
    marginRight: 20,
    backgroundColor: "#fffafa"
  },
  listContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: "blue"
  },
  divider: {
    height: 0.8,
    backgroundColor: "#DCDCDC"
  },
  parentHeader: {
    fontSize: 18,
    fontFamily: Fonts.productSansBold,
    alignSelf: "center",
    marginVertical: 10
  },
  parentBody: {
    fontSize: 16,
    paddingTop: 10
  },
  subText: {
    fontSize: 16,
    color: "#7B7B7B"
  },
  labelStyle: {
    fontSize: 16,
    color: "#494949",
    fontFamily: Fonts.productSansBold
  },
  bodyContainer: {
    paddingVertical: 10
  },
  bodyText: {
    fontSize: 16
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "#ffff"
  }
});
