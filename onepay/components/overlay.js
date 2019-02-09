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
import { connect } from "react-redux"
import { clearModal } from '../state/actions/modalActions';

@connect((store) => {
  return {
    user: store.user.user,
    newTab:store.user.openTab,
    modalBody:store.modal.modalBody,
    isVisible:store.modal.isVisible,
  };
})
export default class Modal extends React.Component{
  constructor(props){
    super(props);
  }
  clearModal(){
    this.props.dispatch(clearModal())
  }
  render(){
    return(
      <Overlay
        isVisible={this.props.isVisible}
        onBackdropPress={this.clearModal.bind(this)}
        overlayStyle={{borderRadius:25}}
        >
        <View>{this.props.modalBody}</View>
      </Overlay>

    )
  }
}
