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

export default class NewTabScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      people:[]
    }
  }
  static navigationOptions = {
    title: 'Start a new tab',
  };
  addPerson(obj){
    console.log('called parent func')
    let ppl = this.state.people;
    ppl.push(obj)
    this.setState({
      people:ppl
    })
  }
  render() {
    console.log(this.state.people)
    return(
      <View style={{backgroundColor: '#ef1580'}}>
        <ScrollView>
          <View>
            <PersonContainer handlePress={this.addPerson.bind(this)}/>
          </View>
          <View>
            <View style={styles.container}>
              {
                this.state.people.map((o,i)=><ListItem key={i} title={o.name} subtitle={o.amount}/>)
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

class PersonContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      amount:0
    }
  }
  addP(){
    console.log('Adding P');
    console.log('name '+this.state.name);
    console.log('amount '+this.state.amount);
    let data = {'name':this.state.name,'amount':this.state.amount};
    this.props.handlePress(data)
  }
  handleName(name){
    console.log('handle name called')
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
          <View style={{flex:1,justifyContent:'center'}}>
            <Button titleStyle={{
                flex:1,
                color:'#fff'}}
                type="clear"
                title="Add new person"
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
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
