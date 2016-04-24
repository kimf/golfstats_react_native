'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  Component,
  View,
  Text
} = React;

var LoadingScreen = require('./LoadingScreen');
var CourseRow = require('../components/CourseRow');

var REQUEST_URL = 'http://golfstats.fransman.se/clubs';

class SelectCourseView extends View{

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.courses),
          loaded: true,
        });
      })
      .done();
  }

  componentDidMount() {
    this.fetchData();
  }

  renderRow(course) {
    return (
      <CourseRow
        onSelect={() => this.selectRow(course)}
        course={course}
      />
    );
  }

  renderHeader() {
    return(
      <View>
        <Text style={styles.text}>
          Choose Course
        </Text>
      </View>
    )
  }

  render() {
    if(!this.state.loaded) { return <LoadingScreen/>; }

    return (
      <View style={styles.page}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    );
  }

  selectRow(course) {
    this.props.navigator.push({
      title: 'New round at ${course.name}',
      component: CourseSelectionView,
      passProps: {course},
    });
  }
}

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  listview: {
    backgroundColor: '#F5FBFD',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    padding: 10
  },
  page: {
    flex: 1,
    paddingTop: 64,
   },
});

module.exports = SelectCourseView;
