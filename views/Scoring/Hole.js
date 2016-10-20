import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { observer, inject } from 'mobx-react/native'

const CLUBS = ['1w', '3w', '3hy', '4i', '5i', '6i', '7i', '8i', '9i', 'Pw', 'Gw', 'Sw', 'Lw']

const ScoreInput = ({number, title, subtract, add}) => {
  return (
    <View style={{flex: 1, marginRight: 10, marginLeft: 10}}>
      <Text style={styles.label}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, paddingTop: 15, backgroundColor: '#E8EDEE'}}>
          <Icon name='ios-remove-circle-outline' type='ionicon' onPress={subtract} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.result}>{number}</Text>
        </View>
        <View style={{flex: 1, paddingTop: 15, backgroundColor: '#E8EDEE'}}>
          <Icon name='ios-add-circle-outline' type='ionicon' onPress={add} />
        </View>
      </View>
    </View>
  )
}

@observer(['appStore']) class Hole extends Component {
  componentWillReact() {
    console.log("I will re-render, since the appStore has changed!");
  }

  render() {
    const appStore = this.props.appStore
    const hole = appStore.currentHole
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            par {hole.par}
          </Text>
          <Text style={[styles.headingText, {fontWeight: 'bold', fontSize: 30}]}>{hole.number}</Text>
          <Text style={styles.headingText}>
            index {hole.index}
          </Text>
        </View>
        <View style={[styles.row]}>
          <ScoreInput
            number={hole.strokes ? hole.strokes : hole.par}
            title="STROKES"
            subtract={() => hole.subtract('strokes') }
            add={() => hole.add('strokes') }
          />
          <ScoreInput
            number={appStore.currentHole.putts ? appStore.currentHole.putts : 2}
            title="PUTTS"
            subtract={() => hole.subtract('putts') }
            add={() => hole.add('putts') }
          />
        </View>
        <View style={styles.row}>
          <View style={{flex:1, marginRight: 10, marginLeft: 10, alignItems: 'flex-start'}}>
            <Text style={styles.label}>TEE SHOT</Text>
            <ScrollView horizontal>
              {CLUBS.map((club, index) => {
                const active = club === hole.teeShot.club
                return <TouchableOpacity key={`tee_shot_button_${index}`} onPress={() => hole.teeShot.setField('club', club)}>
                  <View style={[styles.cellButton, active ? styles.activeCellButton : null]}>
                    <Text style={[styles.cellButtonText, active ? styles.activeCellButtonText : null]}>{club}</Text>
                  </View>
                </TouchableOpacity>
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    height: 74,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#25A24D',
    flexDirection: 'row'
  },
  headingText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    marginTop: 10,
    flexDirection: 'row'
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    padding: 5,
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#777'
  },
  cellButton: {
    backgroundColor: '#E8EDEE',
    margin: 0,
    flex: 1,
    borderColor: '#ccc',
    borderRightWidth: 1,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeCellButton: {
    backgroundColor: '#A1A4A4',
  },
  cellButtonText: {
    color: '#839596',
    fontWeight: 'bold',
    fontSize: 18,
  },
  activeCellButtonText: {
    color: '#fff'
  },
  null: {}
})

export default Hole
