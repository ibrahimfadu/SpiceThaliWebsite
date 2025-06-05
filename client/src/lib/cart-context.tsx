import { createContext, useContext, useReducer, ReactNode } from "react";
import type { Dish } from "@shared/schema";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; dish: Dish }
  | { type: "REMOVE_ITEM"; dishId: number }
  | { type: "UPDATE_QUANTITY"; dishId: number; quantity: number }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (dish: Dish) => void;
  removeItem: (dishId: number) => void;
  updateQuantity: (dishId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.dish.id === action.dish.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.dish.id === action.dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { dish: action.dish, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(item => item.dish.id !== action.dishId),
      };
    }
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.dish.id !== action.dishId),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.dish.id === action.dishId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (dish: Dish) => {
    dispatch({ type: "ADD_ITEM", dish });
  };

  const removeItem = (dishId: number) => {
    dispatch({ type: "REMOVE_ITEM", dishId });
  };

  const updateQuantity = (dishId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", dishId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (parseFloat(item.dish.price) * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
