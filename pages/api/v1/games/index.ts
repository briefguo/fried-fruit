import { API } from '@/helpers/API'
import { GameRepository } from '@/repositories/GameRepository'
import { adminAuth } from '@/middlewares/admin_auth'

export default API({
  post: adminAuth(GameRepository.create),
  get: GameRepository.findAll,
})
