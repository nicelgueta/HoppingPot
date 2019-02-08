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
import { Input,Button,Divider,ListItem,Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {isVisible:false}
  }
  render(){
    return(
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}>
        <View>{this.props.body}</View>
      </Overlay>

    )
  }
}
