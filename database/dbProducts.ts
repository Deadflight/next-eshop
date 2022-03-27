import { db } from "./"
import { IProduct } from "../interfaces"
import { Product } from "../models"

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  try {
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    await db.disconnect()
    return null
  }
}

interface ProductSlug {
  slug: string
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {
  try {
    await db.connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect()
    return slugs
  } catch (error) {
    await db.disconnect()
    return []
  }
}