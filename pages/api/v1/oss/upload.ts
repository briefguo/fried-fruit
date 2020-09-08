import { API } from '@/helpers/API'
import { OSSEntityRepository } from '@/repositories/OSSEntityRepository'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default API({
  post: OSSEntityRepository.uploadFile,
})
