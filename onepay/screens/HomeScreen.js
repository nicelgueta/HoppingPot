import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"


@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  changeName(){
    this.props.dispatch(setUserName('Greg'))
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={{height:100}}>
            <Text style={styles.tabBarInfoText}>OnePay</Text>
          </View>
          <Text style={styles.tabBarInfoText}>{'Hi '+this.props.user.name+'!'}</Text>
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:1,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Change name"
                onPress={this.changeName.bind(this)}>
            </Button>
          </View>
          <View style={{flex:1,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Start new tab"
                onPress={()=>navigate('NewTab')}>
            </Button>
          </View>
          <View style={{flex:1,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear" title="My tabs">
            </Button>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ef1580'
  },
  contentContainer:{
    alignItems:'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#ef1580',
    paddingVertical: 20,
    flexDirection:'row'
  },
  tabBarInfoText: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical:'bottom',
    flex:1
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});
