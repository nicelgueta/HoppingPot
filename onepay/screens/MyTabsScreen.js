import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button,Divider,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { enterModal,clearModal,addModalBody } from '../state/actions/modalActions';
import { deleteTab,saveTab } from '../state/actions/tabActions';

@connect((store) => {
  return {
    user: store.user.user,
    myTabs: store.tabs.myTabs,
    modalBody:store.modal.modalBody
  };
})
export default class MyTabsScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'My Tabs',
  };
  openModal(bodytype){
    this.props.dispatch(enterModal())
  }
  deleteTab(tabId){
    this.props.dispatch(deleteTab(tabId))
  }
  render() {
    const {navigate} = this.props.navigation
    return(
      <View style={{backgroundColor: '#fff',flex:1,flexDirection:'column'}}>
        <View style={{backgroundColor: '#fff',flex:1,flexDirection:'row'}}>
          <View style={{flex:4,height:50, padding:10,bottom:0}}>
          </View>
          <View style={{flex:5,height:50, padding:10,bottom:0}}>
            <Button titleStyle={{
                flex:2,
                color:'#fff'}}
                type="outline"
                title="Add new tab"
                buttonStyle={{backgroundColor:'#825ff4',borderRadius:20}}
                onPress={()=>navigate('NewTab')}
                >
            </Button>
          </View>
        </View>
        <ScrollView style={styles.container}>

            {
                this.props.myTabs.map((o,i)=><ListItem key={i} title={o.tabName}
                containerStyle={styles.item} leftIcon={LEFTICON} topDivider={true} bottomDivider={true}/>)
              }

        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:3,justifyContent:'center',height:50}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="placeholder"
                >
            </Button>
          </View>
          <View style={{flex:3,justifyContent:'center',height:50}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="placeholder"
                >
            </Button>
          </View>
        </View>
        <Modal ref={input => { this.modal = input}} body={this.props.modalBody}/>
      </View>
    )
  }
};
const LEFTICON = (
  <Icon
    name='money'
    color='white'
    size={20}
    shake={true}
  />
)
const styles = StyleSheet.create({
  formView:{
    flexDirection:'column',
    flex:1,
    alignItems:'center'
  },
  inputStyle:{
    color:'#fff'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  container: {
   flex: 1,
   paddingBottom: 22,
   backgroundColor:'#fff'
  },
  item: {
    padding: 10,
    justifyContent:'center'
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
    backgroundColor: '#825ff4',
    paddingVertical: 20,
    flexDirection:'row'
  },
  modalBarInfoContainer: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    flexDirection:'row',
    paddingTop: 25
  },
  tabBarInfoText: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical:'bottom',
    flex:1
  },
})
