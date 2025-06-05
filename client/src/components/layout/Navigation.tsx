import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Order", path: "/order" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePage = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="font-playfair text-2xl font-bold text-saffron cursor-pointer">
                Spice Thali
              </h1>
            </Link>
            <span className="ml-2 text-warm-gray text-sm hidden sm:inline">
              Authentic Indian Cuisine
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "transition-colors duration-200 font-medium",
                  isActivePage(item.path)
                    ? "text-saffron font-bold"
                    : "text-deep-brown hover:text-saffron"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link href="/order">
              <Button className="relative bg-saffron text-white hover:bg-curry">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-curry text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-deep-brown"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "block py-2 transition-colors duration-200",
                  isActivePage(item.path)
                    ? "text-saffron font-bold"
                    : "text-deep-brown hover:text-saffron"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
