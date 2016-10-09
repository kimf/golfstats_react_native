import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class RoundView extends Component {
  render() {
    const { club, course } = this.props;
    return (
      <View style={styles.container}>
        <Text>{club.name}: {course.name}</Text>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  }
});
