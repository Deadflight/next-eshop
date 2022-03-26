// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product } from '../../models'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  if( process.env.NODE_ENV === 'production'){
    return res.status(401).json({ message: "Don't have access to this service" })
  }

  // Connect for first time to the database
  try{
    await db.connect();
    await Product.deleteMany(); // Delete all products
    await Product.insertMany(seedDatabase.initialData.products); // Insert all products
    await db.disconnect();
  }catch(error: any){
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message })
  }

  return res.status(200).json({ message: 'Database seeded' })
}
