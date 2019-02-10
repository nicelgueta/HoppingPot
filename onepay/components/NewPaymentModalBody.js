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
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button,Divider,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { clearModal } from '../state/actions/modalActions';
import { editTab,addPaymentName,addPaymentAmount,addPaymentDescription, clearPayment,selectTab } from '../state/actions/tabActions';

@connect((store) => {
  return {
    formName:store.tabs.formName,
    paymentAmount:store.tabs.formPaymentAmount,
    paymentDescription:store.tabs.formPaymentDescription,
    paymentName:store.tabs.formPaymentName,
    tabId:store.tabs.tabSelected.tabId,
    tabSelected:store.tabs.tabSelected,
    paymentArray:store.tabs.tabSelected.tabData
  };
})
export default class NewPaymentModalBody extends React.Component{

  dismissModal(){
    console.log('dismissed')
    this.props.dispatch(clearModal())
  }
  addPayment(){
    let date = new Date()
    let dateStr = (date.getDate() + '/' +  date.getMonth() +'/'+  date.getFullYear())
    let payment = {
      name:this.props.paymentName,
      paymentId:date.getTime(),
      description:this.props.paymentDescription,
      amount:this.props.paymentAmount,
      currency:'GBP',
      date:dateStr
    }
    let newArray = this.props.paymentArray.concat(payment)
    let newTabObj = {...this.props.tabSelected,tabData: newArray}
    this.props.dispatch(editTab(this.props.tabId,newTabObj))
    this.props.dispatch(clearPayment())
    this.props.dispatch(selectTab(this.props.tabId))
    this.dismissModal()
  }
  render(){
    let pDesc = (
      <Input
        key={0}
        label="Description"
        labelStyle={{color:'#fff',alignSelf:'center',paddingBottom:7}}
        placeholder='  Enter payment description'
        onChangeText={(text)=>this.props.dispatch(addPaymentDescription(text))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:25,paddingTop:10,alignSelf:'center'}}
        inputStyle={{color:'#561CB3'}}
      />
    )
    let pName = (
      <Input
        key={0}
        label="Name"
        labelStyle={{color:'#fff',alignSelf:'center',paddingBottom:7}}
        placeholder='  Enter person who paid'
        onChangeText={(text)=>this.props.dispatch(addPaymentName(text))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:25,paddingTop:10,alignSelf:'center'}}
        inputStyle={{color:'#561CB3'}}
      />
    )
    let pAmount = (
      <Input
        key={0}
        label="Amount"
        labelStyle={{color:'#fff',alignSelf:'center',paddingBottom:7}}
        placeholder='  Enter amount paid'
        onChangeText={(text)=>this.props.dispatch(addPaymentAmount(Math.floor(parseFloat(text) * 100) / 100))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:25,paddingTop:10,alignSelf:'center'}}
        inputStyle={{color:'#561CB3'}}
      />
    )
    return(
      <View style={{backgroundColor: '#561CB3'}}>
        <View>
          <Text style={{fontSize:20,color:'#fff'}}>Add Person to tab</Text>
          <View style={{padding:10}}>{pName}</View>
          <View style={{padding:10}}>{pDesc}</View>
          <View style={{padding:10}}>{pAmount}</View>
        </View>
        <View style={styles.modalBarInfoContainer}>
          <View style={{flex:1,height:50, padding:10,bottom:0}}>
            <Button titleStyle={{
                flex:1,
                color:'#561CB3'}}
                type="outline"
                title="Dismiss"
                buttonStyle={{backgroundColor:'#fff',borderRadius:20}}
                onPress={()=>this.dismissModal()}
                >
              </Button>
            </View>
            <View style={{flex:1,height:50, padding:10,bottom:0}}>
              <Button titleStyle={{
                  flex:1,
                  color:'#561CB3'}}
                  type="outline"
                  title="Add"
                  buttonStyle={{backgroundColor:'#fff',borderRadius:20}}
                  onPress={()=>this.addPayment()}
                  >
              </Button>
            </View>
        </View>
      </View>
    )
  }
}
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
    backgroundColor: '#fff',
    paddingVertical: 20,
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
