import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { IProduct } from '../../../../interfaces';
import {Product} from '../../../../models';

type Data = 
| { message: string }
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)

    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query

  try {
    await db.connect()
    const product = await Product.findOne({ slug })

    if(!product) {
      await db.disconnect()
      return res.status(404).json({ message: `Product ${slug} not found` })
    }
    await db.disconnect()
    return res.status(200).json(product!)

  } catch (error: any) {
    await db.disconnect()
    return res.status(500).json({ message: error.errors.status.message })
  }
}