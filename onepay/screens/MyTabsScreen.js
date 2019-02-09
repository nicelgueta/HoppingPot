import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  View,
  Separator
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button,Divider,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { enterModal,clearModal,addModalBody } from '../state/actions/modalActions';
import { deleteTab,saveTab } from '../state/actions/tabActions';
import Swipeout from 'react-native-swipeout';

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
    console.log('no modal body set')
  }
  deleteTab(tabId){
    this.props.dispatch(deleteTab(tabId))
  }
  renderRow(rowData,i) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#ea5b80',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.deleteTab(rowData.tabId) }
    },
    {
      text: 'Calculate',
      backgroundColor: '#ae5aea',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.deleteTab(rowData.tabId) }
    }];

    return (
      <Swipeout key={i} right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableHighlight>
          <View>
            <ListItem title={rowData.tabName} subtitle={'placeholder'}
            containerStyle={styles.item} leftIcon={LEFTICON} topDivider={true} bottomDivider={true}/>
            <Divider />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }
  render() {
    const {navigate} = this.props.navigation
    if (this.props.myTabs.length < 1){
      var list = <View style={{alignSelf:'center'}} ><Text style={{color:'grey', fontSize:18,alignSelf:'center'}}> You have no tabs! </Text></View>
    } else {
      var list = this.props.myTabs.map((o,i)=>this.renderRow(o,i))
    }
    return(
      <View style={{backgroundColor: '#fff',flex:1,flexDirection:'column'}}>
        <ScrollView style={{paddingTop:25}}>
          {list}
        </ScrollView>
        <View style={{alignSelf: 'flex-end',backgroundColor: '#fff',flex:1,flexDirection:'row',paddingBottom:25}}>
          <View style={{flex:1,height:50, padding:10,bottom:0}}>
          </View>
          <View style={{alignSelf: 'flex-end',flex:1,height:50, padding:10}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="outline"
                title="Add new tab"
                buttonStyle={{backgroundColor:'#825ff4',borderRadius:20}}
                onPress={()=>navigate('NewTab')}
                >
            </Button>
          </View>
        </View>
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
   paddingBottom: 22,
   paddingTop: 22,
   top:0,
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
