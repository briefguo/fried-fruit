import { API } from '@/helpers/API'
import { PostRepository } from '@/repositories/PostRepository'
import { adminAuth } from '@/middlewares/admin_auth'

export default API({
  post: adminAuth(PostRepository.create),
  get: PostRepository.findAll,
})
