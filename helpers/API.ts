import { NextApiRequest, NextApiResponse } from 'next'

interface CClass {
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
  delete?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
}

export const API = (c: CClass) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let result = { message: 'method not allowd' }
    switch (req.method) {
      case 'GET':
        result = await c.get(req, res)
        break
      case 'POST':
        result = await c.post(req, res)
        break
      case 'DELETE':
        result = await c.delete(req, res)
        break
      default:
        break
    }
    res.send(result)
  }
}
