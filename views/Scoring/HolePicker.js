import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { observer, inject } from 'mobx-react/native'

@observer(['appStore']) class HolePicker extends Component {
  render() {
    const appStore = this.props.appStore;
    return (
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            {appStore.playingCourse.club} - {appStore.playingCourse.name}
          </Text>
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {
            appStore.playingCourse.holes.sort((a, b) => a.number - b.number).map((h, i) => (
              <ListItem
                key={h.id}
                title={`Hole ${h.number} - par: ${h.par}`}
                subtitle={`index: ${h.index}`}
                onPress={() => appStore.changeHole(h)}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    height: 64,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#eee'
  },
  headingText: {
    color: '#777',
    fontWeight: 'bold'
  }
})

export default HolePicker
