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
import { removeFromOpenTab,addToOpenTab,newNameToTab,newAmountToTab, nameTab, clearOpenTab, saveTab } from '../state/actions/tabActions';


@connect((store) => {
  return {
    user: store.user.user,
    newTab:store.tabs.openTab,
    newTabName:store.tabs.newTabName,
    formName:store.tabs.formName,
    formAmount:store.tabs.formAmount,
    modalBody:store.modal.modalBody,
    myTabs: store.tabs.myTabs
  };
})
export default class NewTabScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Start a new tab',
  };
  openModal(bodytype){
    this.props.dispatch(enterModal())
    if (bodytype==='add'){
      this.props.dispatch(addModalBody(<NewTabModalBody/>))
    } else {

    }
  }
  nameTab(name){
    this.props.dispatch(nameTab(name))
  }
  saveTab(){
    let tab = {tabId: this.props.myTabs.length+1,tabName: this.props.newTabName,tabData:this.props.newTab}
    this.props.dispatch(clearOpenTab())
    this.props.dispatch(saveTab(tab))
    this.props.navigation.navigate('MyTabs')
  }
  render() {
    return(
      <View style={{backgroundColor: '#fff',flex:1,flexDirection:'row',paddingTop:25}}>
        <View style={{flex:0.1}} />
        <ScrollView style={{flex:1}}>
          <View style={{backgroundColor: '#fff'}}>
            <Input
              key={0}
              label="Tab Name"
              placeholder='Enter tab name...'
              onChangeText={(text)=>this.nameTab(text)}
              inputContainerStyle={{paddingTop:5}}
            />
          </View>
          <View style={styles.container}>
            {
                this.props.newTab.map((o,i)=><ListItem key={i} title={o.name} subtitle={'£'+o.amount}
                containerStyle={styles.item} leftIcon={LEFTICON} topDivider={true} bottomDivider={true}/>)
              }
          </View>
        </ScrollView>
        <View style={{flex:0.1}} />
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:3,justifyContent:'center',height:50}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Save"
                onPress={this.saveTab.bind(this)}
                >
            </Button>
          </View>
          <View style={{flex:3,justifyContent:'center',height:50}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Add +"
                onPress={this.openModal.bind(this, 'add')}
                >
            </Button>
          </View>
        </View>
        <Modal ref={input => { this.modal = input}} body={this.props.modalBody}/>
      </View>
    )
  }
};







@connect((store) => {
  return {
    formName:store.tabs.formName,
    formAmount:store.tabs.formAmount,
  };
})
class NewTabModalBody extends React.Component{
  addPerson(){
    var person = {name: this.props.formName,amount: this.props.formAmount}
    this.props.dispatch(addToOpenTab(person))
    this.props.dispatch(clearModal())
  }
  removePerson(person){
    this.props.dispatch(removeFromOpenTab(person))
  }
  dismissModal(){
    console.log('dismissed')
    this.props.dispatch(clearModal())
  }
  render(){
    let nameSelect = (
      <Input
        key={0}
        label="Name"
        labelStyle={{color:'#fff',alignSelf:'center',paddingBottom:7}}
        placeholder='  Enter person name...'
        onChangeText={(text)=>this.props.dispatch(newNameToTab(text))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:25,paddingTop:10,alignSelf:'center'}}
        inputStyle={{color:'#825ff4'}}
        leftIcon={
          <Icon
            name='user'
            color='#825ff4'
            size={17}
            shake={true}
          />
        } />
    )
    let amountSelect = (
      <Input
        label="Amount"
        labelStyle={{color:'#fff',alignSelf:'center',paddingBottom:7}}
        placeholder='  Enter amount...'
        onChangeText={(text)=>this.props.dispatch(newAmountToTab(text))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:25,paddingTop:10,alignSelf:'center'}}
        inputStyle={{color:'#825ff4'}}
        key={1}
        leftIcon={
          <Icon
            name='bitcoin'
            color='#825ff4'
            size={17}
            shake={true}
          />
        } />
    )
    return(
      <View style={{backgroundColor: '#825ff4'}}>
        <View>
          <Text style={{fontSize:20,color:'#fff'}}>Add Person to tab</Text>
          <View style={{padding:10}}>{nameSelect}</View>
          <View style={{padding:10}}>{amountSelect}</View>
        </View>
        <View style={styles.modalBarInfoContainer}>
          <View style={{flex:1,height:50, padding:10,bottom:0}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="outline"
                title="Dismiss"
                titleStyle={{color:'#825ff4'}}
                buttonStyle={{backgroundColor:'#fff',borderRadius:20}}
                onPress={()=>this.dismissModal()}
                >
              </Button>
            </View>
            <View style={{flex:1,height:50, padding:10,bottom:0}}>
              <Button titleStyle={{
                  flex:1,
                  color:'#fff'}}
                  type="outline"
                  title="Add"
                  titleStyle={{color:'#825ff4'}}
                  buttonStyle={{backgroundColor:'#fff',borderRadius:20}}
                  onPress={()=>this.addPerson()}
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
    backgroundColor: '#825ff4',
    paddingVertical: 20,
    flexDirection:'row'
  },
  modalBarInfoContainer: {
    alignItems: 'center',
    backgroundColor: '#825ff4',
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
