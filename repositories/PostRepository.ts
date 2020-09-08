import { OSSEntityRepository } from './OSSEntityRepository'
import { Post } from '@/models/Post'

export class PostRepository {
  static get curd() {
    return OSSEntityRepository.from('posts')
  }
  static findOne(req) {
    return PostRepository.curd.get(req.query.id)
  }
  static updateOne(req) {
    return PostRepository.curd.update(req.query.id, req.body)
  }

  static delete(req) {
    return PostRepository.curd.delete(req.query.id)
  }
  static create(req) {
    return PostRepository.curd.create(req.body)
  }

  static findAll() {
    return PostRepository.curd.findAll().then(list => {
      return list
        .map(res => Post.fromJson(res).baseInfo)
        .sort((a, b) => b.updateAt - a.updateAt)
    })
  }
}
