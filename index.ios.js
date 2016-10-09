import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS
} from 'react-native';

var ScorecardsListView = require('./views/ScorecardsListView');
var SummariesView      = require('./views/SummariesView');
var StartPlayView      = require('./views/StartPlayView');

const Icon = require('react-native-vector-icons/Ionicons');

class Golftracker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'play'
    };
  }

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#000'}
        barTintColor={'#E7ECEE'}>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'summaries'}
          title='summaries'
          iconName='ios-analytics-outline'
          title='Summaries'
          iconSize={32}
          onPress={() => {
            this.setState({
                selectedTab: 'summaries',
            });
          }}>
          <SummariesView />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          selected={this.state.selectedTab === 'scorecards'}
          title='scorecards'
          iconName='ios-list-outline'
          title='Scorecards'
          iconSize={32}
          onPress={() => {
            this.setState({
                selectedTab: 'scorecards',
            });
          }}>
          <ScorecardsListView />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          selected={this.state.selectedTab === 'play'}
          title='play'
          iconName='ios-play-outline'
          title='Play'
          iconSize={32}
          onPress={() => {
            this.setState({
                selectedTab: 'play',
            });
          }}>
          <StartPlayView />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  }
});

AppRegistry.registerComponent('Golftracker', () => Golftracker);
