import { API } from '@/helpers/API'
import { PostRepository } from '@/repositories/PostRepository'
import { adminAuth } from '@/middlewares/admin_auth'

export default API({
  get: PostRepository.findOne,
  post: adminAuth(PostRepository.updateOne),
  delete: adminAuth(PostRepository.delete),
})
