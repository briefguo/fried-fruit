import { API } from '@/helpers/API'
import { GameRepository } from '@/repositories/GameRepository'
import { adminAuth } from '@/middlewares/admin_auth'

export default API({
  get: GameRepository.findOne,
  post: adminAuth(GameRepository.updateOne),
  delete: adminAuth(GameRepository.delete),
})
