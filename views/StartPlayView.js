'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  NavigatorIOS
} = React;

var SelectCourseView = require('./SelectCourseView');

class StartPlayView extends View{

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <NavigatorIOS
      initialRoute={{
        component: SelectCourseView,
        title: 'Select Course',
        rightButtonTitle: 'Hej'
      }}
    />

    );
  }

  // selectRow(course) {
  //   this.props.navigator.push({
  //     title: 'New round at ${course.name}',
  //     component: CourseSelectionView,
  //     passProps: {course},
  //   });
  // }
}

var styles = StyleSheet.create({
});

module.exports = StartPlayView;
