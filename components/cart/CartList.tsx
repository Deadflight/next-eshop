import {
	Grid,
	Link,
	Typography,
	CardActionArea,
	CardMedia,
	Box,
	Button,
} from "@mui/material";
import NextLink from "next/link";
import { FC, useContext } from "react";
import { ItemCounter } from "../products";
import { CartContext } from "../../context/cart";
import { ICartProduct } from "../../interfaces/cart";

interface Props {
	editable?: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
	const { cart, updateCartQuantity, removeCartProduct } =
		useContext(CartContext);

	const onNewCartQuantityValue = (
		product: ICartProduct,
		newQuantityValue: number
	) => {
		product.quantity = newQuantityValue;
		updateCartQuantity(product);
	};

	return (
		<>
			{cart.map((product) => (
				<Grid
					container
					key={product.slug + product.size}
					spacing={2}
					sx={{ mb: 1 }}
				>
					<Grid item xs={3}>
						<NextLink href={`/product/${product.slug}`} passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.images}`}
										component="img"
										sx={{ borderRadius: "5px" }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display="flex" flexDirection="column">
							<Typography variant="body1">{product.title}</Typography>
							<Typography variant="body1">
								Size: <strong>{product.size}</strong>
							</Typography>

							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									maxValue={10}
									updatedQuantity={(value) =>
										onNewCartQuantityValue(product, value)
									}
								/>
							) : (
								<Typography variant="h5">
									{product.quantity}{" "}
									{product.quantity > 1 ? "product" : "products"}
								</Typography>
							)}
						</Box>
					</Grid>
					<Grid
						item
						xs={2}
						display="flex"
						alignItems={"center"}
						flexDirection="column"
					>
						<Typography variant="subtitle1">{`$${product.price}`}</Typography>
						{/* Editable */}
						{editable && (
							<Button
								variant="text"
								color="secondary"
								onClick={() => removeCartProduct(product)}
							>
								Remove
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
