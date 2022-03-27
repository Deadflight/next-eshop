import { CartState } from './';


// Con esto es como en typescript creamos algo como los actions creators
type CartActionType =
| {type: '[Cart] - LoadCart from cookies | localStorage'}

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch(action.type) {
    case '[Cart] - LoadCart from cookies | localStorage':
      return {
        ...state,
      }

    default :
      return state
  }
}