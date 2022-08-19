import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // api/redirect/[slug]
  const { slug } = req.query

  if (!slug || typeof slug !== 'string') {
    res.send(JSON.stringify({ message: 'please use a slug' }))
    return
  }

  const link = await prisma.link.findUnique({
    where: {
      slug,
    },
  })

  if (!link) {
    res.status(404).send(JSON.stringify({ message: 'slug not found' }))
    return
  }

  // cache header
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate')

  return res.json(link)
}
