import { Record } from 'immutable'
import _ from 'lodash'

export class Review extends Record({
  id: '',
  title: '',
  summary: '',
  createAt: '',
  updateAt: '',
  author: '',
  gameId: '',
  game: {},
  score: 0,
  scoreText: '',
}) {
  get baseInfo() {
    return _.pick(this, ['id', 'title', 'summary', 'createAt'])
  }
  static fromJson(jsonString: string) {
    return new Review(JSON.parse(jsonString))
  }
}
