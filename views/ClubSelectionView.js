'use strict';

import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, ListView, View} from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'

import LoadingScreen from '../views/LoadingScreen'
import CourseSelectionView from './CourseSelectionView'

var REQUEST_URL = 'http://golfstats.fransman.se/tisdagsgolfendata'

class ClubSelectionView extends Component{
  static propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };

    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.searchClub = this.searchClub.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }


  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.clubs),
          originalJSON: responseData.clubs,
          loaded: true,
        });
      })
      .done();
  }

  componentDidMount() {
    this.fetchData();
  }

  searchClub(query) {
    const { originalJSON } = this.state
    const searchResults = originalJSON.filter(club => club.name.toLowerCase().includes(query.toLowerCase()) )
    this.setState({dataSource: this.state.dataSource.cloneWithRows(searchResults)});
  }

  selectRow(club) {
    this.props.navigator.push({
      title: `Choose a course`,
      component: CourseSelectionView,
      passProps: {club}
    });
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={`${rowData.courses.length} Banor`}
        onPress={() => this.selectRow(rowData)}
      />
    )
  }

  render() {
    if(!this.state.loaded) { return <LoadingScreen/>; }

    return (
      <View>
        <View style={styles.header}>
          <Text style={[styles.text, styles.headerText]}>
            Choose Club
          </Text>
        </View>
        <SearchBar
          lightTheme
          onChangeText={(query) => this.searchClub(query)}
          placeholder='Sök klubb...' />
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
        </List>
      </View>
    );
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
    flexDirection: 'row'
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
  headerText: {
    color: '#fff'
  }
});

module.exports = ClubSelectionView;
