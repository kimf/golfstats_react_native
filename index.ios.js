import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'

import {Router, Scene, Modal, Reducer} from 'react-native-mobx';

import ScorecardsListView from './views/ScorecardsListView'
import SummariesView from './views/SummariesView'
import ClubSelectionView from './views/ClubSelectionView'
import CourseSelectionView from './views/CourseSelectionView'
import RoundView from './views/RoundView'


const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};


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
      <Router createReducer={reducerCreate}>
        <Scene key="modal" component={Modal} >
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
            </Scene>
          </Scene>
        </Scene>
        <Scene key="playModal" hideTabBar hideNavBar direction="vertical" component={RoundView} />
      </Router>
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
