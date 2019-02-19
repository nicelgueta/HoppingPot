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
import { Input,Button,Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Modal from '../components/overlay';
import { fetchUser,setUserName } from "../state/actions/userActions"
import { connect } from "react-redux"
import Swipeout from 'react-native-swipeout';
import { Container, Header,Footer, FooterTab,List, ListItem, Left, Right, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { setCalcResponse } from '../state/actions/calcActions';

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
  componentWillUnmount(){
    this.props.dispatch(setCalcResponse(null));
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
      <Col size={1} style={{alignSelf:'center',alignItems:'center',justifyContent:'center',paddingTop:200}}>
        <Row><ActivityIndicator size="large" color="#561CB3" /></Row>
        <Row><Text style={{color:"#561CB3",paddingTop:5}}>Calculating..</Text></Row>
      </Col>
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
            <ListItem>
              <Text>{paymentObj.name+' pays '+paymentObj.payee+' £'+paymentObj.amount}</Text>
            </ListItem>
            <Divider />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }
  renderCalcMain(){
    let apiResponse = this.props.calcApiResponse;
    let list = (
      <Content>
        <ScrollView>
          <List>
            <ListItem itemHeader first>
              <Text style={{fontSize:20, color:'#4b9de5'}}>Final Payments</Text>
            </ListItem>
            {
              apiResponse.map((o,i)=>this.renderPaymentRow(o,i))
            }
          </List>
        </ScrollView>
      </Content>
    )
    return(list)
  }
  renderApiError(){
    return <Text>API ERROR</Text>
  }
  render() {
    if (this.props.calcApiCalling && !this.props.calcApiResponse){
      var ret = this.renderCalcSpinner()
    } else if (this.props.calcApiResponse){
      var ret = this.renderCalcMain()//this.renderCalcSpinner()
    } else if (this.props.calcApiError){
      var ret = this.renderApiError()
    }
    return(
      <Container>
          <Grid>
            <Col size={5} />


            <Col size={90} >
              <Col>
                {ret}
              </Col>
              <Row />
            </Col>


            <Col size={5} />
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
