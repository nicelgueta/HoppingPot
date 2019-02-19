import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyTabsScreen from '../screens/MyTabsScreen';
import NewTabScreen from '../screens/NewTabScreen';
import TabScreen from '../screens/TabScreen';
import CalcScreen from '../screens/CalcScreen';
import NewPaymentScreen from '../screens/NewPaymentScreen';
import AboutScreen from '../screens/AboutScreen';

const HomeStack = createStackNavigator({
  Home: MyTabsScreen,
  NewTab: NewTabScreen,
  SelectedTab:TabScreen,
  Calc:CalcScreen,
  NewPayment:NewPaymentScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'My Tabs',
  tabBarVisible:true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'About the app..',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const BottomTabNavigatorConfig = {
  tabBarOptions : {
    style:{
      borderTopColor:'#fff'
    },
    tabStyle:{
      backgroundColor:'#fff',
    },
  }
}

export default createBottomTabNavigator({
  HomeStack,
  AboutStack,
},BottomTabNavigatorConfig);
