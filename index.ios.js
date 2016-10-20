import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'
import { Router, Scene, Modal, Reducer, ActionConst } from 'react-native-mobx';
import { create } from 'mobx-persist'
import { Provider } from 'mobx-react/native'

import ScorecardsListView from './views/ScorecardsListView'
import SummariesView from './views/SummariesView'
import ClubSelectionView from './views/ClubSelectionView'
import CourseSelectionView from './views/CourseSelectionView'
import ScoringRoot from './views/Scoring/ScoringRoot'

import AppStore from './mobx/AppStore'
const persistStore = create({ storage: AsyncStorage })
const appStore = persistStore('store', AppStore)

import { startLogging }from './mobx/logger'
// startLogging()

const TabBarIcon = (props) => {
  const { selected, sceneKey, title } = props
  let icon = ''
  switch (sceneKey) {
    case 'summaries':
      icon = selected ? 'ios-analytics' : 'ios-analytics-outline'
      break;
    case 'scorecards':
      icon = selected ? 'ios-list-box' : 'ios-list-box-outline'
      break;
    case 'play':
      icon = selected ? 'ios-play' : 'ios-play-outline'
      break;
  }
  return (
    <View>
      <Icon name={icon} type='ionicon' size={26} />
      <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
    </View>
  );
}

class Golftracker extends Component{
  render() {
    return (
      <Provider appStore={appStore}>
        <Router>
          <Scene key="root" tabs tabBarStyle={styles.tabBar}>
            <Scene
              key="summaries"
              component={SummariesView}
              title="Summaries"
              icon={TabBarIcon}
              titleStyle={styles.titleStyle}
              initial />
            <Scene
              key="scorecards"
              component={ScorecardsListView}
              icon={TabBarIcon}
              titleStyle={styles.titleStyle}
              title="Scorecards" />
            <Scene
              key="play"
              icon={TabBarIcon}
              titleStyle={styles.titleStyle}
              title="Play Golf">
                <Scene key="chooseClub" title="Choose Club" component={ClubSelectionView} />
                <Scene key="chooseCourse" title="Choose Course" component={CourseSelectionView} />
                <Scene
                  key="playModal"
                  hideTabBar
                  hideNavBar
                  component={ScoringRoot} />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#777'
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    height: 64
  }
});

AppRegistry.registerComponent('Golftracker', () => Golftracker);
