import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Input,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';

export default class NewTabScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      peopleContainers:[<PersonContainer key={0}/>]
    }
  }
  static navigationOptions = {
    title: 'Start a new tab',
  };
  addPerson(){
    let pplcont = this.state.peopleContainers;
    pplcont.push(<PersonContainer key={pplcont.length+1}/>)
    this.setState({
      peopleContainers:pplcont
    })
  }
  removePerson(){
    let pplcont = this.state.peopleContainers;
    pplcont.splice(-1,1)
    this.setState({
      peopleContainers:pplcont
    })
  }
  render() {
    console.log('render called');
    console.log('length of state.people in render '+this.state.peopleContainers.length)
    return(
      <View style={{backgroundColor: '#ef1580'}}>
        <ScrollView>
          <View>
            {this.state.peopleContainers}
          </View>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'center'}}>
                <Button titleStyle={{
                    flex:1,
                    color:'#fff'}}
                    type="clear"
                    title="Add new person"
                    onPress={this.addPerson.bind(this)}>
                </Button>
              </View>
              <View style={{flex:1,justifyContent:'center'}}>
                <Button titleStyle={{
                    flex:1,
                    color:'#fff'}}
                    type="clear"
                    title="Remove person"
                    onPress={this.removePerson.bind(this)}>
                </Button>
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
      nameSelected:false,
      startingAmountSelected:false
    }
  }
  handleNameSelect(){
    console.log('handle name called')
    this.setState({
      nameSelected:true,
      startingAmountSelected:false
    })
  }
  handleAmountSelect(){
    this.setState({
      nameSelected:true,
      startingAmountSelected:true
    })
  }
  render(){
    let ret = [];
    let nameSelect = (
      <Input
        inputStyle={styles.inputStyle}
        key={0}
        placeholder='  Enter person name...'
        onChange={this.handleNameSelect.bind(this)}
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
        onChange={this.handleAmountSelect.bind(this)}
        leftIcon={
          <Icon
            name='bitcoin'
            color='white'
            size={20}
            shake={true}
          />
        } />
    )
    let saveButton = (
        <Text key={2} style={{color:'#fff'}}>Person added!</Text>
    )
    if (!this.state.nameSelected){
      ret = [nameSelect]
    } else if (!this.state.startingAmountSelected) {
      ret = [nameSelect,amountSelect]
    } else {
      ret = [nameSelect,amountSelect,saveButton]
    }
    return(
      <View style={styles.formView}>
        {ret}
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
  }
})
