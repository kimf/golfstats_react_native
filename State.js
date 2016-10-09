import {Record, OrderedMap} from 'immutable'

export default Record({
  clubs: OrderedMap(),
  scorecards: OrderedMap(),
  club: Record(),
  course: Record(),
  hole: Record(),
  isPlaying: false,
  currentTab: 'summaries'
})
