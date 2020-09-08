import { OSSEntityRepository } from './OSSEntityRepository'
import { Game } from '@/models/Game'

export class GameRepository {
  static get curd() {
    return OSSEntityRepository.from('games')
  }
  static findOne(req) {
    return GameRepository.curd.get(req.query.id)
  }
  static delete(req) {
    return GameRepository.curd.delete(req.query.id)
  }
  static create(req) {
    return GameRepository.curd.create(req.body)
  }
  static updateOne(req) {
    return GameRepository.curd.update(req.query.id, req.body)
  }
  static findAll() {
    return GameRepository.curd.findAll().then((list) => {
      return list.map((res) => Game.fromJson(res).baseInfo)
    })
  }
}
