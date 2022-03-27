import { useRouter } from "next/router"
import { ShopLayout } from "../../components/layouts"
import { useProducts } from '../../hooks';
import { Typography } from '@mui/material';
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";

const CategoryPage = () => {

  const router = useRouter()
  const { gender = '' } = router.query

  const { products, isLoading } = useProducts(`products?gender=${gender}`)
  const genderCapitalized = gender[0].toUpperCase() + gender.slice(1)

  return (
    <ShopLayout title={`Next-Eshop - ${genderCapitalized}`} pageDescription={`${genderCapitalized} category page`}>
      <Typography variant="h1" component={'h1'}>{genderCapitalized}</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Products for {gender}</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryPage