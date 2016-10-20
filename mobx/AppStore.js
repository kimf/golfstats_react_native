import { observable, action, autorun, computed } from 'mobx'
import { Actions } from 'react-native-mobx'
import { persist } from 'mobx-persist'

class Shot {
  @persist @observable club = null
  @persist @observable outcome = null
  @persist @observable distance = null
  @persist @observable attemptDistance = null

  @action setField(field, value) {
    this[field] = value
  }
}

class Hole {
  @persist id
  @persist number
  @persist index
  @persist par
  @persist  @observable strokes
  @persist  @observable putts
  @persist('object', Shot) @observable teeShot = new Shot
  @persist('object', Shot) @observable approachShot = new Shot
  @persist('object', Shot) @observable firstPutt = new Shot

  constructor(id, number, index, par) {
    this.id = id
    this.number = number
    this.index = index
    this.par = par
    this.strokes = par
    this.putts = 2
  }

  @action subtract(field) {
    this[field]--
  }

  @action add(field) {
    this[field]++
  }
}

class Course {
  @persist club = ''
  @persist id = 0
  @persist name = ''
  @persist holes_count = 0
  @persist par = 0
  @persist('list', Hole) holes = []

  constructor(club, course) {
    this.club = club || ''
    if(course) {
      this.id = course.id
      this.name = course.name
      this.holes_count = course.holes_count
      this.par = course.par
      this.holes = course.holes.map(hole => {
        return new Hole(hole.id, hole.number, hole.index, hole.par)
      })
    }
  }
}

class AppStore {
  @persist @observable isPlaying = false
  @persist('object', Hole) @observable currentHole
  @persist('object', Course) @observable playingCourse

  @action startPlaying (club, course) {
    this.isPlaying = true
    this.playingCourse = new Course(club.name, course)
    Actions.playModal();
  }

  @action resumePlaying () {
    Actions.playModal()
  }

  @action stopPlaying () {
    this.isPlaying = false
    this.playingCourse = null
    this.currentHole = null
    Actions.summaries();
  }

  @action changeHole (hole) {
    this.currentHole = hole
  }


}

const appStore = new AppStore()

autorun(() => {
  console.log("currentHole: " + appStore.currentHole)
})

export default appStore
