'use strict';

import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, ListView, View} from 'react-native'
import { List, ListItem } from 'react-native-elements'

import LoadingScreen from '../views/LoadingScreen'
import RoundView from './RoundView'

class CourseSelectionView extends Component{
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    console.log(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    this.state = {
      dataSource: ds.cloneWithRows(props.club.courses)
    };

    console.log(this.state.dataSource);

    this.renderRow = this.renderRow.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={this.props.club.name}
        onPress={() => this.selectRow(rowData)}
      />
    )
  }

  selectRow(course) {
    const club = this.props.club;
    this.props.navigator.push({
      title: `Round Setup`,
      component: RoundView,
      passProps: {club, course}
    });
  }

  render() {
    return (
      <ListView
        style={styles.listview}
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
      />
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    padding: 10
  },
  listview: {
    backgroundColor: '#F5FBFD',
    flex: 1
  },
  headerText: {
    color: '#fff'
  }
});

module.exports = CourseSelectionView;
