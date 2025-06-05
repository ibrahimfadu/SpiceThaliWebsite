import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { CartItem as CartItemType } from "@/lib/cart-context";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.dish.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.dish.id);
  };

  const itemTotal = parseFloat(item.dish.price) * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <img
        src={item.dish.image}
        alt={item.dish.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-deep-brown dark:text-white">
          {item.dish.name}
        </h4>
        <p className="text-warm-gray dark:text-gray-300">
          ₹{parseFloat(item.dish.price).toFixed(0)} each
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-8 text-center font-semibold">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-right">
        <p className="font-semibold text-deep-brown dark:text-white">
          ₹{itemTotal.toFixed(0)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 mt-1"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
