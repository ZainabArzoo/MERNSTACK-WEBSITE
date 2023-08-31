export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":{
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case "CLEAR_CART":{
        return { ...state, cart: [] };
    }

    case "CLEAR_SINGLE_CART":{
      return { ...state, cart: [...state.cart.filter((val) => val._id != action.payload)] };
    }

    


    default:{ 
      return state;
    }
  }
};
