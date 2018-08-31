import { StackNavigator } from 'react-navigation';

import { UIkit } from '@components';
import MapView from '@containers/MapView';

const BaseNavigation = StackNavigator(
  {
    UIkit: { screen: UIkit },
    MapView: { screen: MapView },
  },
  {
    headerMode: 'none',
    initialRouteName: 'MapView',
  },
);

export default BaseNavigation;
