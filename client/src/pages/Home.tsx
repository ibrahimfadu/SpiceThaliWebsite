import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Utensils, ShoppingBag, Leaf, Clock, Heart } from "lucide-react";
import { heroImages } from "@/data/menu-data";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
        <img
          src={heroImages.restaurant}
          alt="Elegant restaurant interior with warm lighting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            Welcome to Spice Thali
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Uniting Flavors from Chennai to Chandni Chowk - Authentic Indian cuisine crafted with tradition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button className="bg-saffron hover:bg-curry text-white px-8 py-4 text-lg font-semibold">
                <Utensils className="w-5 h-5 mr-2" />
                View Menu
              </Button>
            </Link>
            <Link href="/order">
              <Button
                variant="outline"
                className="border-2 border-white hover:bg-white hover:text-deep-brown text-white px-8 py-4 text-lg font-semibold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cuisine Highlights */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-brown dark:text-white mb-4">
              Our Culinary Journey
            </h2>
            <p className="text-xl text-warm-gray dark:text-gray-300 max-w-3xl mx-auto">
              Experience the rich tapestry of Indian flavors through our carefully curated dishes from both North and South India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* North Indian */}
            <div>
              <h3 className="font-playfair text-3xl font-bold text-deep-brown dark:text-white mb-6">
                North Indian Cuisine
              </h3>
              <p className="text-lg text-warm-gray dark:text-gray-300 mb-6">
                Rich, creamy gravies and aromatic spices define our North Indian collection. From butter chicken to fragrant biryanis, each dish tells a story of royal kitchens and time-honored recipes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={heroImages.northIndian1}
                  alt="Creamy butter chicken with naan bread"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src={heroImages.northIndian2}
                  alt="Fragrant chicken biryani with basmati rice"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* South Indian */}
            <div>
              <h3 className="font-playfair text-3xl font-bold text-deep-brown dark:text-white mb-6">
                South Indian Cuisine
              </h3>
              <p className="text-lg text-warm-gray dark:text-gray-300 mb-6">
                Light, healthy, and packed with authentic flavors. Our South Indian specialties feature coconut, curry leaves, and traditional preparations that have been perfected over generations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={heroImages.southIndian1}
                  alt="Crispy masala dosa with coconut chutney and sambar"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src={heroImages.southIndian2}
                  alt="Traditional South Indian thali with multiple curries"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-stone-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="bg-saffron text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8" />
                </div>
                <h4 className="font-playfair text-xl font-bold mb-2">Fresh & Authentic</h4>
                <p className="text-warm-gray dark:text-gray-300">
                  We source the finest spices and ingredients to maintain authentic flavors in every dish.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-stone-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="bg-saffron text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h4 className="font-playfair text-xl font-bold mb-2">Quick Delivery</h4>
                <p className="text-warm-gray dark:text-gray-300">
                  Hot, fresh meals delivered to your doorstep within 30-45 minutes of ordering.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-stone-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="bg-saffron text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-playfair text-xl font-bold mb-2">Made with Love</h4>
                <p className="text-warm-gray dark:text-gray-300">
                  Every dish is prepared with care and attention to traditional cooking methods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
