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
import { deleteTab,saveTab,selectTab } from '../state/actions/tabActions';
import Swipeout from 'react-native-swipeout';
import { postRequest } from '../components/callApi';
import { callCalcApi,setCalcResponse,setCalcError } from '../state/actions/calcActions';

const sumArray = (accumulator, currentValue) => {return accumulator + currentValue};
const axios = require('axios');

@connect((store) => {
  return {
    user: store.user.user,
    myTabs: store.tabs.myTabs,
    modalBody:store.modal.modalBody,
    tabSelected:store.tabs.tabSelected
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
  selectTab(tabId){
    this.props.dispatch(selectTab(tabId))
    this.props.navigation.navigate('SelectedTab')
  }
  getTotalPaidAmount(person,tabData){
    return tabData.map(o=>{if (o.name===person){return o.amount}else{return 0}}).reduce(sumArray);
  }
  getCalc(){
    console.log('does get here?')
    let url = 'https://payonesplit.herokuapp.com/calc';
    let postData = {};
    for (let i=0; i < this.props.tabSelected.peopleInTab.length;i++){
      console.log('LOGGING i');
      let person = this.props.tabSelected.peopleInTab[i];
      let amount = this.getTotalPaidAmount(person,this.props.tabSelected.tabData)
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
  calc(tabId){
    console.log('this.calc called')
    this.props.dispatch(selectTab(tabId));
    console.log('tab selected')
    this.props.navigation.navigate('Calc');
    console.log('navigated')
    this.getCalc()
    console.log('will it ever get here?');
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
      onPress: () => { this.deleteTab(rowData.tabId) }
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
