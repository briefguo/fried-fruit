import { API } from '@/helpers/API'
import { ReviewRepository } from '@/repositories/ReviewRepository'
import { adminAuth } from '@/middlewares/admin_auth'

export default API({
  post: adminAuth(ReviewRepository.create),
  get: ReviewRepository.findAll,
})
