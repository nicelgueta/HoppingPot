import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right } from 'native-base';
import APP_JSON from '../app.json';

const APP_VERSION = APP_JSON.expo.version;

export default class AboutHoppingPot extends Component {
  static navigationOptions = {
    title: 'About HoppingPot',
    headerStyle: {
      backgroundColor: '#561CB3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Why?</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  HoppingPot was designed to be as simple as possible: a bog standard tool to split payments with your mates
                  without all the faff that comes along with creating accounts and wading through a plethora of
                  bells and whistles just to do a simple task. The intention is to be more like a calculator than an "app" per se.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  It works by summing up all the payments on the tab, and simplifying the split so that everyone on the tab
                  makes at most, only one payment. So no matter how many people on the tab, or however many different contributions,
                  the payment will still be split so that everyone only pays at most, once.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  To use, simply create a tab, add people to it and just add payments periodically. Once you're ready to do all the working
                  out, hit calculate, and the app will do everything for you. Hope you find it handy!
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{fontSize:14}}>
                  Logo design attributed to Eucalyp from Flaticon.com
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Nicelgueta Feb 2019</Text>
              <Right><Text style={{fontSize:10}}>{'V'+APP_VERSION}</Text></Right>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}
