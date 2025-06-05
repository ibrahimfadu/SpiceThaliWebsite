import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Dish } from "@shared/schema";

interface MenuCardProps {
  dish: Dish;
}

export function MenuCard({ dish }: MenuCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(dish);
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart.`,
    });
  };

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case "Spicy":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
      case "Mild":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <div className="aspect-video overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-xl font-bold text-deep-brown dark:text-white">
            {dish.name}
          </h3>
          <Badge className={getSpiceLevelColor(dish.spiceLevel)}>
            {dish.spiceLevel}
          </Badge>
        </div>
        <p className="text-warm-gray dark:text-gray-300 mb-4 line-clamp-2">
          {dish.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl text-saffron">
            ₹{parseFloat(dish.price).toFixed(0)}
          </span>
          <Button
            onClick={handleAddToCart}
            className="bg-saffron text-white hover:bg-curry"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
