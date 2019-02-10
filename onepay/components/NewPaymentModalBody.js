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
    let newArray = [payment].concat(this.props.paymentArray)
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
        labelStyle={{color:'#4b9de5',paddingBottom:7}}
        placeholder='Enter payment description'
        onChangeText={(text)=>this.props.dispatch(addPaymentDescription(text))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:5,paddingTop:10,borderColor:'#4b9de5',borderWidth:0.2,justifyContent:'center'}}
        inputStyle={{color:'#4b9de5',fontSize:14,paddingLeft:10,alignSelf:'center'}}
      />
    )
    let pName = (
      <ScrollView>
        {
          this.props.tabSelected.peopleInTab.map( (person,i) =>{
            if (person === this.props.paymentName){var color = '#4b9de5'} else {var color = '#fff'}
            return (<TouchableHighlight key={i} >
                      <View>
                        <ListItem title={person} onPress={()=>this.props.dispatch(addPaymentName(person))}
                        containerStyle={{padding:5,backgroundColor:color}}
                        leftIcon={LEFTICON}
                        topDivider={true} bottomDivider={true}/>
                      </View>
                    </TouchableHighlight>
          )})
        }
      </ScrollView>
    )
    let pAmount = (
      <Input
        key={0}
        label="Amount"
        labelStyle={{color:'#4b9de5',paddingBottom:7}}
        placeholder='Enter amount paid'
        onChangeText={(text)=>this.props.dispatch(addPaymentAmount(Math.round(parseFloat(text) * 100) / 100))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:5,paddingTop:10,borderColor:'#4b9de5',borderWidth:0.2,justifyContent:'center'}}
        inputStyle={{color:'#4b9de5',fontSize:14,paddingLeft:10,alignSelf:'center'}}
      />
    )
    return(
      <View style={{backgroundColor: '#fff'}}>
        <View>
          <Text style={{fontSize:20,color:'#4b9de5'}}>Add payment to tab</Text>
          <View style={{padding:10}}>{pName}</View>
          <View style={{padding:10}}>{pDesc}</View>
          <View style={{padding:10}}>{pAmount}</View>
        </View>
        <View style={styles.modalBarInfoContainer}>
          <View style={{flex:0.05}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#4b9de5'}}
                type="outline"
                buttonStyle={{
                  borderRadius:5,paddingLeft:10,borderColor:'#4b9de5'
                }}
                title="Cancel"
                onPress={()=>this.dismissModal()}
                >
            </Button>
          </View>
          <View style={{flex:0.1}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#3ae0a6'}}
                type="outline"
                buttonStyle={{
                  borderRadius:5,paddingRight:10,borderColor:'#3ae0a6'
                }}
                title="Save"
                onPress={this.addPayment.bind(this)}
                >
            </Button>
          </View>
          <View style={{flex:0.05}} />
        </View>
      </View>
    )
  }
}
const LEFTICON = (
  <Icon
    name='user'
    color='#3ae0a6'
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
    backgroundColor: '#fff',
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
