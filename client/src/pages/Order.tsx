import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/CartItem";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface OrderFormData {
  customerName: string;
  phone: string;
  address: string;
}

export function Order() {
  const { state, clearCart, getSubtotal } = useCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    phone: "",
    address: "",
  });

  const subtotal = getSubtotal();
  const deliveryFee = 40;
  const gst = subtotal * 0.18;
  const total = subtotal + deliveryFee + gst;

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation call shortly.",
      });
      clearCart();
      setFormData({ customerName: "", phone: "", address: "" });
    },
    onError: (error) => {
      toast({
        title: "Failed to place order",
        description: "Please try again or contact us for assistance.",
        variant: "destructive",
      });
      console.error("Order error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) return;

    const orderData = {
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      items: JSON.stringify(state.items.map(item => ({
        dishId: item.dish.id,
        name: item.dish.name,
        price: item.dish.price,
        quantity: item.quantity,
      }))),
      subtotal: subtotal.toString(),
      deliveryFee: deliveryFee.toString(),
      gst: gst.toString(),
      total: total.toString(),
      status: "pending",
    };

    placeOrderMutation.mutate(orderData);
  };

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-brown dark:text-white mb-4">
            Order Online
          </h1>
          <p className="text-xl text-warm-gray dark:text-gray-300">
            Review your cart and place your order for delivery
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-stone-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-deep-brown dark:text-white">
                  Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {state.items.length === 0 ? (
                  <div className="text-center py-12 text-warm-gray dark:text-gray-300">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Your cart is empty</p>
                    <Link href="/menu">
                      <Button className="mt-4 bg-saffron text-white hover:bg-curry">
                        Browse Menu
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <CartItem key={item.dish.id} item={item} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-playfair text-xl text-deep-brown dark:text-white">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>₹{deliveryFee.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{gst.toFixed(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {state.items.length > 0 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => handleInputChange("customerName", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address</Label>
                      <Textarea
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your full address"
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-saffron text-white hover:bg-curry"
                      disabled={placeOrderMutation.isPending}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {placeOrderMutation.isPending ? "Placing Order..." : "Place Order"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
