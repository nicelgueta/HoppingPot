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
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button,Divider,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import { enterModal,clearModal,addModalBody } from '../state/actions/modalActions';
import { removeFromOpenTab,addToOpenTab,newNameToTab,newAmountToTab, nameTab, clearOpenTab, saveTab } from '../state/actions/tabActions';
import {Form, Item, Input, Label, Content, Container, Left, Right, Body, Switch} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Swipeout from 'react-native-swipeout';

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
    headerStyle: {
      backgroundColor: '#561CB3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  nameTab(name){
    this.props.dispatch(nameTab(name))
  }
  handleName(name){
    this.props.dispatch(newNameToTab(name))
  }
  postName(name){
    var person = this.props.formName
    if (!person || person.length < 1){
    } else {
    this.props.dispatch(addToOpenTab(person));
  }
  }
  saveTab(){
    let tabId = new Date().getTime() //current time as int as the tab id
    let tab = {tabId: tabId,tabName: this.props.newTabName,tabData:[], peopleInTab:this.props.newTab}
    this.props.dispatch(clearOpenTab())
    this.props.dispatch(saveTab(tab))
    this.props.navigation.navigate('Home')
  }
  removePerson(person){
    this.props.dispatch(removeFromOpenTab(person))
  }
  renderListItem(name,i){
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#ea5b80',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.removePerson(name) }
      },
    ]
    return(<Swipeout key={i} right={swipeBtns}
      autoClose={true}
      backgroundColor= 'transparent'>
      <TouchableHighlight>
        <View>
          <ListItem title={name} titleStyle={{color:'#8f79b2'}} containerStyle={styles.container}
          topDivider={false} bottomDivider={true}/>
          <Divider />
        </View>
      </TouchableHighlight>
    </Swipeout>)
  }
  renderList(){
      let listItems = this.props.newTab.map((name,i)=>{return(this.renderListItem(name,i))})
      let text = (<Item key={1}>
                    <Input placeholder='Start typing a name...' onChangeText={(text)=>this.handleName(text)}
                      onBlur={(text)=>this.postName(text)}  value={this.props.formName} placeholderTextColor={'#aa99c4'}
                      style={{color:'#aa99c4'}}/>
                  </Item>)
      if (!this.props.newTabName || this.props.newTabName.length === 0){
        var renderArr = [null]
      } else {
        var renderArr = [listItems,text]
      }
      return(
        <Col>
          {renderArr}
        </Col>
      )
  }
  render() {
    var ppl = (!this.props.newTabName || this.props.newTabName.length < 1) ? null :<Text style={{fontSize:18,color:'#4b9de5'}}>Add people to tab..</Text> ;
    console.log(ppl)
    return(
      <Container>
        <Grid>
          <Row size={1/6}>
            <Col size={1/12}/>
            <Col size={10/12}>
              <Form>
                <Item floatingLabel>
                  <Label style={{color:'#aa99c4'}}>Enter tab name</Label>
                  <Input style={{color:'#8f79b2',fontSize:20}} onChangeText={(text)=>this.nameTab(text)} value={this.props.newTabName}/>
                </Item>
              </Form>
            </Col>
            <Col size={1/12}/>
            <Divider />
          </Row>
          <Row size={4/6}>
            <Col size={1/12}/>
            <Col size={10/12}>
              <ScrollView>
                {ppl}
                {this.renderList()}
              </ScrollView>
            </Col>
            <Col size={1/12}/>
        </Row>
          <Col size={1/6}/>
          <Row size={1/6}>
            <Col size={1/20}/>
            <Col>
              <Col size={3/10}/>
              <Button titleStyle={{
                  flex:1,
                  color:'#fff'}}
                  type="solid"
                  disabled={this.props.newTab.length >= 2 && this.props.newTabName.length > 0 ? false : true}
                  buttonStyle={{
                    borderRadius:5,padding:20,borderColor:'#3ae0a6', alignSelf:'center', backgroundColor:'#3ae0a6'
                  }}
                  title="Save"
                  onPress={this.saveTab.bind(this)}
                  >
              </Button>
            </Col>
            <Col size={1/20}/>
          </Row>
        </Grid>
      </Container>
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
   paddingTop:20,
   backgroundColor:'#fff'
  },
  item: {
    padding: 10,
    justifyContent:'center'
  },
  tabBarInfoContainer: {
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
    alignSelf:'flex-end',
    justifyContent:'center',
    backgroundColor: '#fff',
    paddingVertical: 10
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
