import React, { Component } from 'react';
import { NetInfo, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './Store';
import BaseNavigation from './Router';

Text.defaultProps.allowFontScaling = false;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      effectiveType: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isConnected });
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.setState({
        effectiveType: connectionInfo.effectiveType,
      });
    });

    this.setState({
      isConnected,
    });
  };

  render() {
    const { isConnected, effectiveType } = this.state;
    return (
      <Provider store={store}>
        <BaseNavigation screenProps={{ isConnected, effectiveType }} />
      </Provider>
    );
  }
}

export default App;
