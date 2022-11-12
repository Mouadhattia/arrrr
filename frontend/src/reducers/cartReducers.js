import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESSE, CART_SAVE_PAYMENT, CART_CLEAR, CART_UPDATE_ITEM } from '../constants/cartConstants'

function forceInt(x) {
    return typeof (x) === typeof ("") ? parseInt(x) : x
}
export const cartReducer = (state = { cartItems: [], shippingAddress: {}, images: [] }, action) => {
    let existItem = null;
    let item = null;

    switch (action.type) {
        case CART_ADD_ITEM:
            item = action.payload;
            if (state.cartItems.find(x => item.requestId === x.requestId)) {
                return state;
            }
            existItem = state.cartItems.find(x => item.product === x.product && x.color === item.color && x.size === item.size)
            if (existItem) {
                return state;
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        item.product === x.product && x.color === item.color && x.size === item.size ? {
                            ...x,
                            qty: forceInt(item.qty) + forceInt(x.qty),
                            requestId: item.requestId
                        } : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_UPDATE_ITEM:
            let newItem = action.payload;
            let prevItem = state.cartItems.find(x => newItem.requestId === x.requestId);
            let colorOrSizeUpdated = newItem.color != prevItem.color || newItem.size != prevItem.size ; 
            if (colorOrSizeUpdated)
            {
                let existItem = state.cartItems.find(x => newItem.product === x.product && x.color === newItem.color && x.size === newItem.size)
                if (existItem) {
                    alert("Item already exist, please change quantity there and remove this item...");
                    return state;
                }
            }
            return {
                ...state,
                cartItems: state.cartItems.map(x => x.requestId == action.payload.requestId ? action.payload : x)
            }
        case CART_CLEAR:
            return {
                ...state,
                cartItems: []
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => !(x.product == action.payload.product && x.color == action.payload.color && x.size == action.payload.size)),
            }
        case CART_SAVE_SHIPPING_ADRESSE:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default: return state

    }
}