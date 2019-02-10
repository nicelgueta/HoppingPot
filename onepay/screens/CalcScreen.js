import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button,Divider,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { callCalcApi,setCalcResponse,setCalcError } from '../state/actions/calcActions';
import Swipeout from 'react-native-swipeout';
import NewPaymentModalBody from '../components/NewPaymentModalBody'

const sumArray = (accumulator, currentValue) => {return accumulator + currentValue};


@connect((store) => {
  return {
    user: store.user.user,
    modalBody:store.modal.modalBody,
    myTabs: store.tabs.myTabs,
    tabSelected:store.tabs.tabSelected,
    calcApiResponse: store.calcs.calcApiResponse,
    calcApiCalling: store.calcs.calcApiCalling,
    calcApiError:store.calcs.calcApiError
  };
})
export default class CalcScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Tab Split',
  };
  openModal(){
    //this.props.dispatch(addModalBody(<NewPaymentModalBody />))
    //this.props.dispatch(enterModal())
  }
  renderCalcSpinner(){
    return(
      <View style={{alignSelf:'center',justifyContent:'center',paddingTop:200}}>
        <ActivityIndicator size="large" color="#561CB3" />
        <Text style={{color:"#561CB3"}}>Calculating..</Text>
      </View>
    )
  }
  renderPaymentRow(paymentObj,i){
    let swipeBtns = [{
      text: 'Settled',
      backgroundColor: '#4b9de5',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress:() => {console.log('settle');}
    }
    ];
    return(
      <Swipeout key={i} right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableHighlight>
          <View>
            <ListItem title={paymentObj.name+' pays '+paymentObj.payee+' £'+paymentObj.amount}
            containerStyle={styles.item} leftIcon={LEFTICON}
            topDivider={true} bottomDivider={true} onPress={() => { this.selectTab(rowData.tabId) }}/>
            <Divider />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }
  renderCalcMain(){
    let apiResponse = [{name: "Edgar", payee:"me",amount: 73.33},{name: "Josh", payee:"me",amount: 12.33},{name: "Noah", payee:"Edgar",amount: 73.33}]//this.props.calcApiResponse.json();
    let list = (
      <View>
        {
          apiResponse.map((o,i)=>this.renderPaymentRow(o,i))
        }
      </View>
    )
    return(list)
  }
  render() {
    var ret = this.renderCalcMain()//this.renderCalcSpinner()
    return(
      <KeyboardAvoidingView style={{flex:1}}>
        <View style={{backgroundColor: 'blue',flex:1,flexDirection:'row',paddingTop:10}}>
          <View style={{backgroundColor: 'red',flex:0.05}} />

          {/* MAIN SCREEN AREA */}
          <View style={{backgroundColor: 'cyan',flex:1}}>
            {ret}
          </View>
          {/* END MAIN SCREEN AREA */}

          <View style={{backgroundColor: 'green',flex:0.05}} />
        </View>
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:0.05}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#4b9de5'}}
                type="outline"
                buttonStyle={{
                  borderRadius:5,paddingLeft:10,borderColor:'#4b9de5'
                }}
                title="Back"
                onPress={()=>this.props.navigation.navigate('MyTabs')}
                >
            </Button>
          </View>
          <View style={{flex:0.1}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#4b9de5'}}
                type="outline"
                buttonStyle={{
                  borderRadius:5,paddingRight:10,borderColor:'#4b9de5'
                }}
                title="placeholder"
                >
            </Button>
          </View>
          <View style={{flex:0.05}} />
        </View>
        <Modal ref={input => { this.modal = input}} body={this.props.modalBody}/>
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
