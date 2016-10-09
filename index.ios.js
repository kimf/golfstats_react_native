import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { Tabs, Tab, Icon } from 'react-native-elements'

import ScorecardsListView from './views/ScorecardsListView'
import SummariesView from './views/SummariesView'
import PlayView from './views/PlayView'

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
    const { selectedTab } = this.state;

    return (
      <Tabs>
        <Tab
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected]}
          selected={selectedTab === 'summaries'}
          title='SUMMARIES'
          renderIcon={() => <Icon name='ios-analytics-outline' type='ionicon' size={26} />}
          renderSelectedIcon={() => <Icon name='ios-analytics' type='ionicon' size={26} />}
          onPress={() => this.changeTab('summaries')}>
          <SummariesView />
        </Tab>

        <Tab
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected]}
          selected={selectedTab === 'scorecards'}
          title='SCORECARDS'
          renderIcon={() => <Icon name='ios-list-box-outline' type='ionicon' size={26} />}
          renderSelectedIcon={() => <Icon name='ios-list-box' type='ionicon' size={26} />}
          onPress={() => this.changeTab('scorecards')}>
          <ScorecardsListView />
        </Tab>

        <Tab
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected]}
          selected={selectedTab === 'play'}
          title='PLAY GOLF'
          renderIcon={() => <Icon name='ios-play-outline' type='ionicon' size={26} />}
          renderSelectedIcon={() => <Icon name='ios-play' type='ionicon' size={26} />}
          onPress={() => this.changeTab('play')}>
          <PlayView />
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
