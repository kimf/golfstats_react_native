import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { Tabs, Tab, Icon } from 'react-native-elements'

var ScorecardsListView = require('./views/ScorecardsListView');
var SummariesView      = require('./views/SummariesView');
var StartPlayView      = require('./views/StartPlayView');

class Golftracker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'summaries'
    };
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
  }


  render() {
    const { selectedTab } = this.state

    return (
      <Tabs>
        <Tab
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected]}
          selected={selectedTab === 'summaries'}
          title='SUMMARIES'
          renderIcon={() => <Icon name='ios-analytics-outline' type='ionicon' size={26} />}
          onPress={() => this.changeTab('summaries')}>
          <SummariesView />
        </Tab>

        <Tab
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected]}
          selected={selectedTab === 'scorecards'}
          title='SCORECARDS'
          renderIcon={() => <Icon name='ios-list-outline' type='ionicon' size={26} />}
          onPress={() => this.changeTab('scorecards')}>
          <ScorecardsListView />
        </Tab>

        <Tab
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected]}
          selected={selectedTab === 'play'}
          title='PLAY GOLF'
          renderIcon={() => <Icon name='ios-play-outline' type='ionicon' size={26} />}
          onPress={() => this.changeTab('play')}>
          <StartPlayView />
        </Tab>
      </Tabs>
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
  titleSelected: {}
});

AppRegistry.registerComponent('Golftracker', () => Golftracker);
