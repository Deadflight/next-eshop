import { ShopLayout } from "../../components/layouts/ShopLayout";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import {
	ItemCounter,
	ProductSlideShow,
	SizeSelector,
} from "../../components/products";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { dbProducts } from "../../database";
import { useState, useContext } from "react";
import { CartContext } from "../../context";
import { useRouter } from "next/router";

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
	const router = useRouter();
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		images: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1,
	});

	const { addProductToCart } = useContext(CartContext);

	const selectedSize = (size: ISize) => {
		// setTempCartProduct({
		// 	...tempCartProduct,
		// 	size,
		// });

		//Wich one is better?
		setTempCartProduct((currentProduct) => ({
			...currentProduct,
			size,
		}));
	};

	const onUpdateQuantity = (quantity: number) => {
		setTempCartProduct((currentProduct) => ({
			...currentProduct,
			quantity,
		}));
	};

	const onAddProduct = () => {
		if (!tempCartProduct.size) {
			return;
		}

		addProductToCart(tempCartProduct);
		router.push("/cart");
	};

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid spacing={3} container>
				<Grid item xs={12} sm={7}>
					<ProductSlideShow images={product.images} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Box display="flex" flexDirection="column">
						<Typography variant="h1" component="h1">
							{product.title}
						</Typography>
						<Typography
							variant="subtitle1"
							component="h2"
						>{`$${product.price}`}</Typography>
						<Box sx={{ my: 2 }}>
							<Typography variant="subtitle2">Quantity</Typography>
							<ItemCounter
								currentValue={tempCartProduct.quantity}
								updatedQuantity={onUpdateQuantity}
								maxValue={product.inStock > 10 ? 10 : product.inStock}
							/>
							<SizeSelector
								sizes={product.sizes}
								selectedSize={tempCartProduct.size}
								onSizeSelected={selectedSize}
							/>
						</Box>

						{product.inStock === 0 ? (
							<Chip label="Not available" color="error" variant="outlined" />
						) : (
							<Button
								color="secondary"
								className="circular-btn"
								disabled={tempCartProduct.size === undefined ? true : false}
								onClick={onAddProduct}
							>
								{tempCartProduct.size ? "Add to cart" : "Select size"}
							</Button>
						)}
						<Box sx={{ mt: 3 }}>
							<Typography variant="subtitle2">Description</Typography>
							<Typography variant="body2">{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const productSlugs = await dbProducts.getAllProductsSlug();

	return {
		paths: productSlugs.map(({ slug }) => ({ params: { slug } })),
		fallback: "blocking",
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string };

	return {
		props: {
			product: await dbProducts.getProductBySlug(slug),
		},
		revalidate: 60 * 60 * 24, // 1 day
	};
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// When you need to pre-render a page whose data must be fetched at request time, you can use getServerSideProps.
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//   const { slug } = params as {slug: string}
//   const product = await dbProducts.getProductBySlug(slug)

//   // Thi tell to the bots that this page is not indexable if product is not found
//   if(!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

export default ProductPage;
