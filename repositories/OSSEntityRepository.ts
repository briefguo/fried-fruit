import OSS from 'ali-oss'
import fs from 'fs'
import path from 'path'
import { parseFormdata } from '@/middlewares/parse_formdata'

// https://github.com/ali-sdk/ali-oss?spm=5176.8466032.0.0.954f1450k3vo16#node-usage
export const client = new OSS({
  region: process.env.ALIYUN_OSS_REGION_ID,
  accessKeyId: process.env.ALIYUN_ACCESSKEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESSKEY_SECRET,
  bucket: process.env.ALIYUN_OSS_BUCKET,
})

export class OSSEntityRepository {
  static entity = ''
  static from(entity) {
    this.entity = entity
    return OSSEntityRepository
  }
  static async findAll() {
    const result = await client.list(
      { 'prefix': `${this.entity}/1`, 'max-keys': 10 },
      {},
    )
    const resultObjects = result.objects || []
    return await Promise.all(
      resultObjects.map(o =>
        client.get(o.name).then(res => res.content.toString()),
      ),
    )
  }
  static async create(data) {
    const createAt = Date.now()
    const id = createAt.toString()
    const filename = `${this.entity}/${id}`
    await client.put(
      filename,
      new Buffer(JSON.stringify({ ...data, id, createAt, updateAt: createAt })),
      { mime: 'application/json' },
    )
    return { ...data, id }
  }
  static get(id) {
    return client
      .get(`${this.entity}/${id}`)
      .then(res => res.content.toString())
  }
  static async update(id, data) {
    const filename = `${this.entity}/${id}`
    await client.put(
      filename,
      new Buffer(JSON.stringify({ ...data, updateAt: Date.now() })),
      { mime: 'application/json' },
    )
    return { ...data, id }
  }

  static async delete(id) {
    await client.delete(`${this.entity}/${id}`)
    return { id }
  }

  static uploadFile = parseFormdata(async req => {
    const file = req.body.files.file
    const filebuffer = await fs.promises.readFile(file.path)
    const fileBasename = path.basename(file.path)
    const filename = `assets/${fileBasename}`
    const result = await client.put(filename, filebuffer)
    return {
      name: result.name,
      url: `https://oss.briefguo.com/${filename}`,
    }
  })
}
