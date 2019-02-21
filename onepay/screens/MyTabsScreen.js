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
  Alert,
  Separator
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button,Divider,ListItem } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import { fetchUser,setUserName,setUpdateRequired } from "../state/actions/userActions"
import { connect } from "react-redux"
import { enterModal,clearModal,addModalBody } from '../state/actions/modalActions';
import { deleteTab,saveTab,selectTab,clearPayment } from '../state/actions/tabActions';
import Swipeout from 'react-native-swipeout';
import { postRequest } from '../components/callApi';
import { callCalcApi,setCalcResponse,setCalcError } from '../state/actions/calcActions';
import { Icon } from 'native-base';
import APP_JSON from '../app.json';

const sumArray = (accumulator, currentValue) => {return accumulator + currentValue};
const axios = require('axios');

const APP_VERSION = APP_JSON.expo.version;

@connect((store) => {
  return {
    user: store.user.user,
    myTabs: store.tabs.myTabs,
    modalBody:store.modal.modalBody,
    tabSelected:store.tabs.tabSelected,
    update:store.user.updateRequired
  };
})
export default class MyTabsScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'My tabs',
    headerStyle: {
      backgroundColor: '#561CB3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight:(
      <View style={{paddingRight:10}}>
        <Button icon={<Icon name="information-circle" style={{color:'#7aadf9'}} />}
          onPress={()=>navigation.navigate('About')} type="clear"/>
      </View>
    )
  }}
  componentWillMount(){
    //need to reset all non-data reducers to allow app to start
    this.props.dispatch(clearPayment())
    //check for update
    axios.get('https://botsorted.herokuapp.com/sys/update/'+APP_VERSION)
      .then(function (response) {
        // handle success
        var update = response.data.update;
        if (update === 'Y'){
          Alert.alert('Update this App!',"There is an update available for this app. It's recommended to download the new version as this older version will eventually stop working...")
        }
      })
      .catch(function (error) {
        // handle error
        Alert.alert('Just a note!',"We couldn't detect an internet connection. No worries if you're just totting up payments, but currently the calc won't work if you're not connected.")
      });
  }
  deleteTab(tabId){
    this.props.dispatch(deleteTab(tabId))
  }
  selectTab(tabId){
    this.props.dispatch(selectTab(tabId))
    this.props.navigation.navigate('SelectedTab')
  }
  getTotalPaidAmount(person,tabData){
    return tabData.map(o=>{if (o.name===person){return o.amount}else{return 0}}).reduce(sumArray);
  }
  getCalc(tabId){
    let url = 'https://botsorted.herokuapp.com/calc';
    let tab = this.props.myTabs.filter(o=>o.tabId===tabId)[0];
    let postData = {};
    for (let i=0; i < tab.peopleInTab.length;i++){
      console.log('LOGGING i');
      let person = tab.peopleInTab[i];
      let amount = this.getTotalPaidAmount(person,tab.tabData)
      postData[person] = amount;
    }

    console.log('POSTDATA: '+JSON.stringify(postData))

    let responseHandleFunc = (response) => {
      this.props.dispatch(setCalcResponse(response.data))
    }
    let errorHandleFunc = (e) => {
      this.props.dispatch(setCalcError(e))
    }
    this.props.dispatch(callCalcApi()) //calling api
    console.log('calling API')
    axios.post(url,postData)
      .then(function (response) {
        // handle success
        responseHandleFunc(response)
      })
      .catch(function (error) {
        // handle error
        errorHandleFunc(error)
      });
  }
  validCalc(tabId){
    console.log('valdaiting tab '+tabId)
    let tab = this.props.myTabs.filter(o=>o.tabId===tabId)[0];
    if (tab.tabData.length === 0){
      var tabAmount = 0;
    } else {
      var tabAmount = tab.tabData.map(o=>o.amount).reduce(sumArray);
    }
    if (tabAmount > 0){return true} else {return false};
  }
  sureDelete(tabName,tabId){
    Alert.alert(
      'Delete '+tabName+'?',
      'Are you sure you want to delete this tab?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.deleteTab(tabId)},
      ],
      {cancelable: false},
    );
  }
  calc(tabId){
    console.log('this.calc called')
    if (!this.validCalc(tabId)){
      return (Alert.alert("Oi oi Saveloy!","You can't calculate an empty tab! Try adding a payment first, then press the magic button.."))
    }
    this.props.dispatch(selectTab(tabId));
    this.props.navigation.navigate('Calc');
    this.getCalc(tabId)
  }
  renderRow(rowData,i) {
    let swipeBtns = [{
      text: 'Calculate',
      backgroundColor: '#4b9de5',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress:() => {this.calc(rowData.tabId) }
    },
    {
      text: 'Delete',
      backgroundColor: '#ea5b80',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.sureDelete(rowData.tabName,rowData.tabId) }
    },
    ];
    var subtitle = rowData.peopleInTab.join(', ')
    const sumArray = (accumulator, currentValue) => {return accumulator + currentValue};
    try{
      var total = rowData.tabData.map(o=>o.amount).reduce(sumArray)
    } catch (TypeError) {
      var total = 0.00
    }
    return (
      <Swipeout key={i} right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableHighlight>
          <View>
            <ListItem title={rowData.tabName} subtitle={subtitle}
            containerStyle={styles.item} leftIcon={LEFTICON} rightIcon={<Text style={{paddingRight:20}}>{'£'+total}</Text>}
            topDivider={true} bottomDivider={true} onPress={() => { this.selectTab(rowData.tabId) }}/>
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
                buttonStyle={{backgroundColor:'#561CB3',borderRadius:20}}
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
    name='people'
    style={{color:'#561CB3'}}
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
    backgroundColor: '#561CB3',
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
