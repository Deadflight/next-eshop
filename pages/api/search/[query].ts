import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces';
type Data = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch(req.method) {
    case 'GET':
      return searchProduct( req, res )

    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

const searchProduct = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  let { query = '' } = req.query
  
  if(query.length === 0) {
    return res.status(400).json({ message: 'Query is required' })
  }

  query = query.toString().toLowerCase()

  try {
    await db.connect()
    const products = await Product.find({
      $text: { $search: query }
    }).lean()
    await db.disconnect()
    return res.status(200).json(products)
  }catch(error: any) {
    await db.disconnect()
    return res.status(500).json({ message: error.errors.status.message })
  }

}