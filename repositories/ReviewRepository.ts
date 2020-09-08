import { OSSEntityRepository } from './OSSEntityRepository'
import { Review } from '@/models/Review'

export class ReviewRepository {
  static get curd() {
    return OSSEntityRepository.from('reviews')
  }
  static findOne(req) {
    return ReviewRepository.curd.get(req.query.id)
  }
  static updateOne(req) {
    return ReviewRepository.curd.update(req.query.id, req.body)
  }

  static delete(req) {
    return ReviewRepository.curd.delete(req.query.id)
  }
  static create(req) {
    return ReviewRepository.curd.create(req.body)
  }

  static findAll() {
    return ReviewRepository.curd.findAll().then(list => {
      return list.map(res => Review.fromJson(res).baseInfo)
    })
  }
}
