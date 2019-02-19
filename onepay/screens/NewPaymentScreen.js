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
import { Button,Divider,ListItem } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { clearModal } from '../state/actions/modalActions';
import {Form, Item, Input, Label, Content, Container,Picker, Icon} from 'native-base';
import { editTab,addPaymentName,addPaymentAmount,addPaymentDescription,
  clearPayment,selectTab, setFormError } from '../state/actions/tabActions';
import { Col, Row, Grid } from 'react-native-easy-grid';

@connect((store) => {
  return {
    formName:store.tabs.formName,
    formErrorDesc:store.tabs.formErrorDesc,
    formErrorAmount:store.tabs.formErrorAmount,
    paymentAmount:store.tabs.formPaymentAmount,
    paymentDescription:store.tabs.formPaymentDescription,
    paymentName:store.tabs.formPaymentName,
    tabId:store.tabs.tabSelected.tabId,
    tabSelected:store.tabs.tabSelected,
    paymentArray:store.tabs.tabSelected.tabData
  };
})
export default class NewPaymentScreen extends React.Component{

  addPayment(){
    if (this.props.formErrorDesc || this.props.formErrorAmount){
      return(null)
    }
    if (this.props.paymentAmount.length < 1 || this.props.paymentDescription.length < 1 || this.props.paymentName.length < 1 || this.props.paymentName==='Please select an option...'){
      return(null)
    }
    let date = new Date()
    let dateStr = (date.getDate() + '/' +  date.getMonth() +'/'+  date.getFullYear())
    let payment = {
      name:this.props.paymentName,
      paymentId:date.getTime(),
      description:this.props.paymentDescription,
      amount:Math.round(parseFloat(this.props.paymentAmount) * 100) / 100,
      currency:'GBP',
      date:dateStr
    }
    let newArray = [payment].concat(this.props.paymentArray)
    let newTabObj = {...this.props.tabSelected,tabData: newArray}
    this.props.dispatch(editTab(this.props.tabId,newTabObj))
    this.props.dispatch(clearPayment())
    this.props.dispatch(selectTab(this.props.tabId))
    this.props.navigation.navigate('SelectedTab')
  }
  onSelectChange(value) {
    this.props.dispatch(addPaymentName(value))
  }
  clearPayment(){
    this.props.dispatch(clearPayment())
    this.props.navigation.navigate('SelectedTab')
  }
  handleAmountChange(text){
    if (!isNaN(text) && text.length >= 1){
      if (this.props.formErrorAmount){
        this.props.dispatch(setFormError({formErrorAmount:false}))
      }
      this.props.dispatch(addPaymentAmount(text))
    } else {
      this.props.dispatch(setFormError({formErrorAmount:true}))
    }
  }
  handleDescriptionChange(text){
    if (!text.length > 0){
      this.props.dispatch(setFormError({formErrorDesc:true}))
    } else {
      if (this.props.formErrorDesc){
        this.props.dispatch(setFormError({formErrorDesc:false}))
      }
      this.props.dispatch(addPaymentDescription(text))
    }
  }
  render(){
    var Acheck = this.props.formErrorAmount ? 'close-circle' : ''
    var AcheckCol = this.props.formErrorAmount ? 'red' : '#4b9de5'
    var pAmount = (
      <Item
        regular
        success={this.props.paymentAmount.length >= 1 ? true : false}
        error={this.props.formErrorAmount ? true : false}
        >
        <Input placeholder='Enter payment amount'
          onChangeText={(text)=>this.handleAmountChange(text)}/>
        <Icon name={Acheck} style={{color:AcheckCol}}/>
      </Item>
    )
    var Dcheck = this.props.formErrorDesc ? 'close-circle' : ''
    var DcheckCol = this.props.formErrorDesc ? 'red' : '#4b9de5'
    var pDesc = (
      <Item
        regular
        success={this.props.paymentDescription.length >= 1 ? true : false}
        error={this.props.formErrorDesc ? true : false}
        >
        <Input placeholder='Enter payment description'
          onChangeText={(text)=>this.handleDescriptionChange(text)}/>
        <Icon name={Dcheck} style={{color:DcheckCol}}/>
      </Item>
    )
    var selectedVal = this.props.paymentName.length > 0 ? this.props.paymentName : null
    let pName = (
      <Form>
            <Item picker success={(this.props.paymentName.length >= 1 && this.props.paymentName !== 'Please select an option...')?true:false}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Who paid?"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selectedVal}
                onValueChange={(value)=>this.onSelectChange(value)}
              >
                <Picker.Item label='Please select an option...' value='Please select an option...' />
                {
                  this.props.tabSelected.peopleInTab.map((person,i)=><Picker.Item key={i} label={person} value={person} />)
                }
              </Picker>
            </Item>
          </Form>
    )
    return(
      <Grid>
        <Col size={11/12}>
          <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
          <Col size={5/6}>
            <Text style={{padding:10,fontSize:20,color:'#4b9de5'}}>Add payment to tab</Text>
              <View style={{padding:10}}>{pName}</View>
              <View style={{padding:10}}>{pDesc}</View>
              <View style={{padding:10}}>{pAmount}</View>
          </Col>
          <Row size={1/6}>
            <View style={{flex:0.05}} />
            <View style={{flex:0.5,justifyContent:'center'}}>
              <Button titleStyle={{
                  flex:1,
                  color:'#fff'}}s
                  type="solid"
                  buttonStyle={{
                    borderRadius:5,borderColor:'#4b9de5', alignSelf:'center', backgroundColor:'#4b9de5'
                  }}
                  title="Cancel"
                  onPress={()=>this.clearPayment()}
                  >
                </Button>
              </View>
              <View style={{flex:0.1}} />
              <View style={{flex:0.5,justifyContent:'center'}}>
                <Button titleStyle={{
                    flex:1,
                    color:'#fff'}}
                    type="solid"
                    disabled={(this.props.formErrorDesc || this.props.formErrorAmount) || (this.props.paymentAmount.length < 1 || this.props.paymentDescription.length < 1 || this.props.paymentName.length < 1 || this.props.paymentName === 'Please select an option...') ? true:false}
                    buttonStyle={{
                      borderRadius:5,borderColor:'#3ae0a6', alignSelf:'center', backgroundColor:'#3ae0a6'
                    }}
                    title="Save"
                    onPress={()=>this.addPayment()}
                    >
                  </Button>
                </View>
                <View style={{flex:0.05}} />
            </Row>
          </KeyboardAvoidingView>
        </Col>
        <Row size={1/12} />
      </Grid>
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
