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
import { Button, Tile } from 'react-native-elements';
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
    header: null
  };
  changeName(){
    this.props.dispatch(setUserName('Greg'))
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={{
                   flex: 1,
                   alignSelf: 'stretch',
                   width: undefined,
                   height: undefined
                 }}
                 source={require('../assets/images/main2.png')}
        />
      <View style={{flex:1,alignItems:'center',paddingTop:20}}>
          <Text style={{color:'#fff',fontSize:18}}>The easy way to split pay</Text>
        </View>
        <View style={{flex:0.5,height:50, padding:10,bottom:0,flexDirection:'row'}}>
          <View style={{flex:0.1}} />
          <View style={{flex:1}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="outline"
                title="Start..."
                titleStyle={{color:'#561CB3'}}
                buttonStyle={{backgroundColor:'#fff',borderRadius:20}}
                onPress={()=>navigate('MyTabs')}
                >
            </Button>
          </View>
          <View style={{flex:0.1}} />
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
    backgroundColor: '#561CB3',
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
    alignItems: 'stretch',
    justifyContent:'center',
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
