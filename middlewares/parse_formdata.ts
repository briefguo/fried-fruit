import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'

export const parseFormdata = (fn) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const files: formidable.Files = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    // form.uploadDir = './'
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
  if (!req.body) {
    req.body = {}
  }
  req.body.files = files
  return await fn(req, res)
}
