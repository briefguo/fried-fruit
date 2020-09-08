import { Record } from 'immutable'
import _ from 'lodash'
import moment from 'moment'

export class Post extends Record({
  id: '',
  title: '',
  summary: '',
  cover: '',
  createAt: 0,
  author: 'briefguo',
  updateAt: 0,
  content: '',
}) {
  get baseInfo() {
    return _.pick(this, [
      'id',
      'title',
      'summary',
      'cover',
      'createAt',
      'updateAt',
    ])
  }
  get updateFromNow() {
    return moment(this.updateAt).fromNow()
  }
  get createFromNow() {
    return moment(+this.createAt).fromNow()
  }
  static fromJson(jsonString: string) {
    return new Post(JSON.parse(jsonString))
  }
}
