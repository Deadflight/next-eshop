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

export const getProductByTerm = async (term: string): Promise<IProduct[]> => {
  
  try {
    term = term.toString().toLowerCase()
    await db.connect()
    const products = await Product.find({ $text: { $search: term } })
    .select('title images price inStock slug -_id')
    .lean()
    await db.disconnect()
    return products
  } catch (error) {
    await db.disconnect()
    return []
  }
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    await db.connect()
    const products = await Product.find()
    .lean()
    await db.disconnect()
    return products
  } catch (error) {
    await db.disconnect()
    return []
  }
}