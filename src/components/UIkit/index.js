import React, { Component } from 'react';
import {
  ScrollView, View, Text, TouchableHighlight,
} from 'react-native';

import MainStyle from './style';

class UIkit extends Component {
  static navigationOptions = {
    header: null,
  };

  renderNavigationItem(screen, text) {
    const { navigation } = this.props;

    return (
      <TouchableHighlight onPress={() => navigation.navigate(screen)} style={MainStyle.btnNavigate}>
        <Text style={MainStyle.textBtn}>{text}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView style={MainStyle.main}>
        <Text>UIKit</Text>
        <View style={{ minHeight: 1000 }}>{this.renderNavigationItem('MapView', 'map View')}</View>
      </ScrollView>
    );
  }
}

export default UIkit;
