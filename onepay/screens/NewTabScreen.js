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
import { enterModal,clearModal,addModalBody } from '../state/actions/modalActions';
import { removeFromOpenTab,addToOpenTab,newNameToTab,newAmountToTab, nameTab, clearOpenTab, saveTab } from '../state/actions/tabActions';


@connect((store) => {
  return {
    user: store.user.user,
    newTab:store.tabs.openTab,
    newTabName:store.tabs.newTabName,
    formName:store.tabs.formName,
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
    let tabId = new Date().getTime() //current time as int as the tab id
    let tab = {tabId: tabId,tabName: this.props.newTabName,tabData:[], peopleInTab:this.props.newTab}
    this.props.dispatch(clearOpenTab())
    this.props.dispatch(saveTab(tab))
    this.props.navigation.navigate('MyTabs')
  }
  render() {
    return(
      <KeyboardAvoidingView style={{backgroundColor: '#fff',flex:1,flexDirection:'row',paddingTop:25}}>
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
                this.props.newTab.map((o,i)=><ListItem key={i} title={o}
                containerStyle={styles.item} leftIcon={LEFTICON} topDivider={true} bottomDivider={true}/>)
              }
          </View>
        </ScrollView>
        <View style={{flex:0.1}} />
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:0.05}} />
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#3ae0a6'}}
                type="outline"
                buttonStyle={{
                  borderRadius:5,paddingLeft:10,borderColor:'#3ae0a6'
                }}
                title="Save"
                onPress={this.saveTab.bind(this)}
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
                title="Add Person"
                onPress={this.openModal.bind(this, 'add')}
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







@connect((store) => {
  return {
    formName:store.tabs.formName,
  };
})
class NewTabModalBody extends React.Component{
  addPerson(){
    var person = this.props.formName
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
        labelStyle={{color:'#4b9de5',paddingBottom:7}}
        placeholder='Enter person name'
        onChangeText={(text)=>this.props.dispatch(newNameToTab(text))}
        inputContainerStyle={{backgroundColor:'#fff',borderRadius:5,paddingTop:10,borderColor:'#4b9de5',borderWidth:0.2,justifyContent:'center'}}
        inputStyle={{color:'#4b9de5',fontSize:14,paddingLeft:10,alignSelf:'center'}}
      />
    )
    return(
      <View style={{backgroundColor: '#fff'}}>
        <View>
          <Text style={{fontSize:20,color:'#4b9de5'}}>Add Person to tab</Text>
          <View style={{padding:10}}>{nameSelect}</View>
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
                onPress={this.addPerson.bind(this)}
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
    position:'absolute',
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
