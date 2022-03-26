import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';

type Data = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch(req.method) {
    case 'GET':
      return  getProducts( req, res )

    default:
      return res.status(405).json({ message: 'Method not allowed' })

  }
}

const getProducts = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  
  const { gender = 'all'} = req.query
  const { validGenders } = SHOP_CONSTANTS

  let condition = {}

  if(gender !== 'all' && validGenders.includes(`${gender}`)){
    condition = { gender }
  }
  
  try {
    await db.connect()
    const products = await Product.find(condition)
                                  .select('title images price inStock slug')  // select only the fields we need
                                  .lean()
    await db.disconnect()
    return res.status(200).json( products )
  } catch (error: any) {
    await db.disconnect()
    return res.status(500).json({ message: error.errors.status.message })
  }
}
