import { NextApiRequest, NextApiResponse } from 'next'

export const adminAuth = (fn) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.headers.authorization === process.env.ADMIN_TOKEN) {
    return await fn(req, res)
  } else {
    res.status(403)
    res.send({ message: 'Forbidden' })
  }
}
