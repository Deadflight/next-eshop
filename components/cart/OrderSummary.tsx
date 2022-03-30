import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

export const OrderSummary = () => {
	const { numberOfItems, tax, subTotal, total } = useContext(CartContext);
	const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100;

	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography>No. products</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>
					{numberOfItems} {numberOfItems > 1 ? "products" : "product"}
				</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography>SubTotal</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{currency.format(subTotal, "USD")}</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography>Tax ({taxRate}%)</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{currency.format(tax, "USD")}</Typography>
			</Grid>
			<Grid item xs={6} display="flex" sx={{ mt: 2 }}>
				<Typography variant="subtitle1">Total</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
				<Typography variant="subtitle1">
					{currency.format(total, "USD")}
				</Typography>
			</Grid>
		</Grid>
	);
};
