import { Record } from 'immutable'
import _ from 'lodash'

export class Game extends Record({
  id: '',
  name: '',
  description: '',
  shortDescription: '',
  tags: [],
  screenshots: [],
  videos: [],
  cover: '',
  developer: {},
  releaseDate: '',
  news: {},
  platform: [],
  recommendedGames: [],
  reviewSummary: '',
  userReviews: [],
  createAt: 0,
  updateAt: 0,
}) {
  get baseInfo() {
    return _.pick(this, [
      'id',
      'name',
      'shortDescription',
      'cover',
      'reviewSummary',
      'platform',
    ])
  }
  static fromJson(jsonString: string) {
    return new Game(JSON.parse(jsonString))
  }
}
