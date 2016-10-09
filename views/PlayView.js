import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import ClubSelectionView from './ClubSelectionView';

export default class PlayView extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ClubSelectionView,
          title: 'Select Club',
        }}
        style={{flex: 1}}
      />
    );
  }
}
