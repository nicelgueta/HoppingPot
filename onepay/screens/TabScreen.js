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
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button,Divider,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { enterModal,clearModal,addModalBody } from '../state/actions/modalActions';
import { editTab,deleteTab,selectTab,clearPayment } from '../state/actions/tabActions';
import Swipeout from 'react-native-swipeout';
import { postRequest } from '../components/callApi';
import { callCalcApi,setCalcResponse,setCalcError } from '../state/actions/calcActions';

const sumArray = (accumulator, currentValue) => {return accumulator + currentValue};
const axios = require('axios');

@connect((store) => {
  return {
    user: store.user.user,
    modalBody:store.modal.modalBody,
    myTabs: store.tabs.myTabs,
    tabSelected:store.tabs.tabSelected
  };
})
export default class TabScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    var calcFunc = navigation.getParam('calcFunc');
    var tabId = navigation.getParam('tabId');
    var comp = navigation.getParam('comp');
    console.log(tabId)
    return {
    title: 'View Tab',
    headerStyle: {
      backgroundColor: '#561CB3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight:(
      <View style={{paddingRight:10}}>
        <Button titleStyle={{
            flex:1,
            color:'#fff'}}
            type="solid"
            buttonStyle={{
              borderRadius:5,borderColor:'#8060ea', alignSelf:'center', backgroundColor:'#8060ea'
            }}
            title="Calculate"
            onPress={()=>calcFunc(comp,tabId)}
            >
        </Button>
    </View>
    )
  }};
  componentDidMount() {
    this.props.navigation.setParams({ tabId: this.props.tabSelected.tabId, calcFunc: this.calc,comp:this });
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
  componentWillMount(){
    //need to reset all non-data reducers to allow app to start
    this.props.dispatch(clearPayment())
  }
  __getCalc(comp,tabId){
    let url = 'https://botsorted.herokuapp.com/calc';
    let tab = comp.props.myTabs.filter(o=>o.tabId===tabId)[0];
    let postData = {};
    for (let i=0; i < tab.peopleInTab.length;i++){
      console.log('LOGGING i');
      let person = tab.peopleInTab[i];
      let amount = comp.getTotalPaidAmount(person,tab.tabData)
      postData[person] = amount;
    }

    console.log('POSTDATA: '+JSON.stringify(postData))

    let responseHandleFunc = (response) => {
      comp.props.dispatch(setCalcResponse(response.data))
    }
    let errorHandleFunc = (e) => {
      comp.props.dispatch(setCalcError(e))
    }
    comp.props.dispatch(callCalcApi()) //calling api
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
  __validCalc(comp,tabId){
    console.log('valdaiting tab '+tabId)
    let tab = comp.props.myTabs.filter(o=>o.tabId===tabId)[0];
    if (tab.tabData.length === 0){
      var tabAmount = 0;
    } else {
      var tabAmount = tab.tabData.map(o=>o.amount).reduce(sumArray);
    }
    if (tabAmount > 0){return true} else {return false};
  }
  calc(comp,tabId){
    console.log('this.calc called')
    if (!comp.__validCalc(comp,tabId)){
      return (Alert.alert("Oi oi Saveloy!","You can't calculate an empty tab! Try adding a payment first, then press the magic button.."))
    }
    comp.props.dispatch(selectTab(tabId));
    comp.props.navigation.navigate('Calc');
    comp.__getCalc(comp,tabId)
  }
  removePayment(paymentId){
    let paymentArr = this.props.tabSelected.tabData
    let newArr = paymentArr.filter(o=>o.paymentId!==paymentId)
    let newTabObj = {...this.props.tabSelected,tabData: newArr}
    this.props.dispatch(editTab(this.props.tabSelected.tabId,newTabObj))
    this.props.dispatch(selectTab(this.props.tabSelected.tabId))
  }
  renderPayment(paymentObj,i) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#ea5b80',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.removePayment(paymentObj.paymentId) }
    },
  ];

    var subtitle = (paymentObj.name + ' | ' + paymentObj.date)
    return (
      <Swipeout key={i} right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableHighlight>
          <View>
            <ListItem title={paymentObj.description} subtitle={subtitle}
            containerStyle={styles.item} leftIcon={LEFTICON} rightIcon={<Text style={{paddingRight:20}}>{paymentObj.amount +' '+ paymentObj.currency}</Text>}
            topDivider={true} bottomDivider={true}/>
            <Divider />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }
  renderPerson(personName,i) {

    try{
      var totalPaid = this.props.tabSelected.tabData.map(o=>{if (o.name===personName){return o.amount}else{return 0}}).reduce(sumArray)
      if (!totalPaid){
        totalPaid=0.00
      }
    } catch (TypeError) {
      var totalPaid = 0.00
    }
    return (
        <TouchableHighlight key={i}>
          <View>
            <ListItem title={personName}
            containerStyle={styles.item} leftIcon={LEFTICON} rightIcon={<Text style={{paddingRight:20}}>{'£'+Math.round(totalPaid*100)/100}</Text>}
            topDivider={true} bottomDivider={true}/>
            <Divider />
          </View>
        </TouchableHighlight>
    )
  }
  render() {
    try{
      var totalForTab = Math.round(this.props.tabSelected.tabData.map(o=>o.amount).reduce(sumArray)*100)/100
    } catch (TypeError) {
      var totalForTab = 0.00
    }
    if (this.props.tabSelected.tabData.length < 1){
      var list = <View style={{alignSelf:'center',paddingTop:5}} ><Text style={{color:'grey', fontSize:14,alignSelf:'center'}}>No payments have been added to this tab!</Text></View>
    } else{
      var list = this.props.tabSelected.tabData.map((o,i)=>this.renderPayment(o,i))
    }
    return(
      <KeyboardAvoidingView style={{backgroundColor: '#fff',flex:1}}>
        <View style={{backgroundColor: '#fff',flex:1,flexDirection:'row',paddingTop:10}}>
          <View style={{flex:0.05}} />

          <View style={{flex:1}}>
            <View style={{flex:0.05,flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:20,color:'#561CB3'}}>{this.props.tabSelected.tabName+'   |   £'+totalForTab}</Text>
              </View>
            </View>
            <View style={{flex:0.1}} />
            <View style={{flex:0.5}}>
              <View style={{flex:0.25}}>
                <Text style={{fontSize:20,color:'#4b9de5'}}>People in tab</Text>
              </View>
              <ScrollView style={{flex:1}}>
                {
                  this.props.tabSelected.peopleInTab.map((n,i)=>this.renderPerson(n,i))
                }
              </ScrollView>
            </View>
            <Divider />
            <View style={{flex:1}}>
              <View style={{flex:0.125,paddingTop:5}}>
                <Text style={{fontSize:20,color:'#4b9de5'}}>Payments</Text>
              </View>
              <ScrollView style={{flex:1}}>
                {list}
              </ScrollView>
            </View>
          </View>


          <View style={{flex:0.05}} />
        </View>
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:0.05}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="solid"
                buttonStyle={{
                  borderRadius:5,borderColor:'#3ae0a6', alignSelf:'center', backgroundColor:'#3ae0a6'
                }}
                title="Save"
                onPress={()=>this.props.navigation.navigate('Home')}
                >
            </Button>
          </View>
          <View style={{flex:0.1}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="solid"
                buttonStyle={{
                  borderRadius:5,borderColor:'#4b9de5', alignSelf:'center', backgroundColor:'#4b9de5'
                }}
                title="Add Payment"
                onPress={()=>this.props.navigation.navigate('NewPayment')}
                >
            </Button>
          </View>
          <View style={{flex:0.05}} />
        </View>
      </KeyboardAvoidingView>
    )
  }
};

const LEFTICON = (
  <Icon
    name='user'
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
    flex:0.1,
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    flexDirection:'row'
  },
  modalBarInfoContainer: {
    alignItems: 'center',
    backgroundColor: '#561CB3',
    flexDirection:'row',
    paddingTop: 20
  },
  tabBarInfoText: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical:'bottom',
    flex:1
  },
})
