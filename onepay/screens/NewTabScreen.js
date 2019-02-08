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

export default class NewTabScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      people:[],
      personContainer:<PersonContainer handlePress={this.addPerson.bind(this)}/>,
      modalBody:<Text>Saved!</Text>
    }
  }
  static navigationOptions = {
    title: 'Start a new tab',
  };
  reset(){
    this.setState({people:[],personContainer:<PersonContainer handlePress={this.addPerson.bind(this)}/>});
  }
  addPerson(obj){
    console.log('called parent func')
    let ppl = this.state.people;
    ppl.push(obj)
    this.setState({
      people:ppl,
      personContainer:<PersonContainer handlePress={this.addPerson.bind(this)}/>
    })
  }
  saveTab(){
    this.modal.setState({isVisible:true})
  }
  render() {
    console.log(this.state.people)
    return(
      <View style={{backgroundColor: '#ef1580',flex:1,flexDirection:'row'}}>
        <ScrollView style={styles.container}>
          <View style={{backgroundColor: '#ef1580'}}>
            {this.state.personContainer}
          </View>
          <View style={styles.container}>
            <View style={styles.container}>
              {
                this.state.people.map((o,i)=><ListItem key={i} title={o.name} subtitle={'£'+o.amount}
                containerStyle={styles.item} leftIcon={LEFTICON} topDivider={true} bottomDivider={true}/>)
              }
            </View>
          </View>
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <View style={{flex:3,justifyContent:'center',height:50}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Save"
                onPress={()=>this.saveTab()}
                >
            </Button>
          </View>
          <View style={{flex:3,justifyContent:'center',height:50}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Reset"
                onPress={()=>this.reset()}>
            </Button>
          </View>
        </View>
        <Modal ref={input => { this.modal = input}} body={this.state.modalBody}/>
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
class PersonContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      amount:0
    }
  }
  addP(){
    console.log('name '+this.state.name);
    console.log('amount '+this.state.amount);
    let data = {'name':this.state.name,'amount':this.state.amount};
    this.nameInput.clear()
    this.amountInput.clear()
    this.props.handlePress(data)
  }
  handleName(name){
    this.setState({
      name:name,
      amount:this.state.amount
    })
  }
  handleAmount(amount){
    this.setState({
      name:this.state.name,
      amount:amount
    })
  }
  render(){
    let ret = [];
    let nameSelect = (
      <Input
        inputStyle={styles.inputStyle}
        key={0}
        ref={input => { this.nameInput = input}}
        placeholder='  Enter person name...'
        onChangeText={(text)=>this.handleName(text)}
        leftIcon={
          <Icon
            name='user'
            color='white'
            size={20}
            shake={true}
          />
        } />
    )
    let amountSelect = (
      <Input
        inputStyle={styles.inputStyle}
        placeholder='  Enter amount...'
        key={1}
        ref={input => { this.amountInput = input}}
        onChangeText={(text)=>this.handleAmount(text)}
        leftIcon={
          <Icon
            name='bitcoin'
            color='white'
            size={20}
            shake={true}
          />
        } />
    )
    let divider = (
      <Divider key={2} style={{backgroundColor:'white'}} />
    )
    ret = [nameSelect,amountSelect]
    return(
      <View style={styles.formView}>
        {divider}
        {ret}
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1,justifyContent:'flex-start'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Add +"
                onPress={this.addP.bind(this)}>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
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
    backgroundColor: '#ef1580',
    paddingVertical: 20,
    flexDirection:'row'
  },
  tabBarInfoText: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical:'bottom',
    flex:1
  },
})
