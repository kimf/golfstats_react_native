'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Component
} = React;

var ScorecardsListView = require('./views/ScorecardsListView');
var SummariesView      = require('./views/SummariesView');
var StartPlayView      = require('./views/StartPlayView');

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
        <TabBarItemIOS
          selected={this.state.selectedTab === 'summaries'}
          name='summaries'
          iconName={'ion|ios-analytics-outline'}
          title='Summaries'
          iconSize={32}
          onPress={() => {
            this.setState({
                selectedTab: 'summaries',
            });
          }}>
          <SummariesView />
        </TabBarItemIOS>

        <TabBarItemIOS
          selected={this.state.selectedTab === 'scorecards'}
          name='scorecards'
          iconName={'ion|ios-list-outline'}
          title='Scorecards'
          iconSize={32}
          onPress={() => {
            this.setState({
                selectedTab: 'scorecards',
            });
          }}>
          <ScorecardsListView />
        </TabBarItemIOS>

        <TabBarItemIOS
          selected={this.state.selectedTab === 'play'}
          name='play'
          iconName={'ion|ios-play-outline'}
          title='Play'
          iconSize={32}
          onPress={() => {
            this.setState({
                selectedTab: 'play',
            });
          }}>
          <StartPlayView />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  app: {
    flex: 1
  }
});

AppRegistry.registerComponent('Golftracker', () => Golftracker);
