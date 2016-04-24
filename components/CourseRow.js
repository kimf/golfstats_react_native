'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} = React;

var CourseRow = React.createClass({
  underlayColor: function() {
    return '#D3EED5';
  },

  render: function() {
    var course = this.props.course;
    return (
      <TouchableHighlight underlayColor={this.underlayColor()} onPress={this.props.onSelect}>
        <View key={course.id} style={styles.wrapper}>
          <Text>{course.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
})

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E7ECEE',
    flexDirection: 'column',
    marginBottom: 5,
    padding: 10    
  }
});

module.exports = CourseRow
