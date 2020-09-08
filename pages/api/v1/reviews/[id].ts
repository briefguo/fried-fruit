import { API } from '@/helpers/API'
import { ReviewRepository } from '@/repositories/ReviewRepository'
import { adminAuth } from '@/middlewares/admin_auth'

export default API({
  get: ReviewRepository.findOne,
  post: adminAuth(ReviewRepository.updateOne),
  delete: adminAuth(ReviewRepository.delete),
})
