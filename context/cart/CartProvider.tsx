import { FC, useEffect, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookies from "js-cookie";
export interface CartState {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
};

export const CartProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [];
		dispatch({
			type: "[Cart] - LoadCart from cookies | localStorage",
			payload: cart,
		});
	}, []);

	useEffect(() => {
		Cookies.set("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const numberOfItems = state.cart.reduce(
			(prevValue, currValue) => currValue.quantity + prevValue,
			0
		);
		const subTotal = state.cart.reduce(
			(prevValue, currValue) =>
				currValue.price * currValue.quantity + prevValue,
			0
		);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal + subTotal * taxRate,
		};

		dispatch({
			type: "[Cart] - Update order summary",
			payload: orderSummary,
		});
	}, [state.cart]);

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: "[Cart] - Change cart quantity", payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: "[Cart] - Remove product in cart", payload: product });
	};

	const addProductToCart = (product: ICartProduct) => {
		//Check if product already exists in cart
		const productInCart = state.cart.some((item) => item._id === product._id);
		if (!productInCart)
			return dispatch({
				type: "[Cart] - Add product to cart",
				payload: [...state.cart, product],
			});

		//If product already exists in cart, but with different size
		const productInCartButDifferentSize = state.cart.some(
			(item) => item._id === product._id && item.size === product.size
		);

		if (!productInCartButDifferentSize)
			return dispatch({
				type: "[Cart] - Add product to cart",
				payload: [...state.cart, product],
			});

		const updatedProducts = state.cart.map((item) => {
			if (item._id !== product._id) return item;
			if (item.size !== product.size) return item;

			// Don't work why?
			// if( item._id !== product._id && item.size !== product.size) return item

			// Update quantity
			item.quantity += product.quantity;
			return item;
		});

		dispatch({
			type: "[Cart] - Add product to cart",
			payload: updatedProducts,
		});
	};

	return (
		<CartContext.Provider
			value={{
				...state,

				//Methods
				addProductToCart,
				updateCartQuantity,
				removeCartProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
