import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Book, Users } from "lucide-react";
import { heroImages } from "@/data/menu-data";

export function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-brown dark:text-white mb-4">
            About Spice Thali
          </h1>
          <p className="text-xl text-warm-gray dark:text-gray-300 max-w-3xl mx-auto">
            Uniting Flavors from Chennai to Chandni Chowk - Our journey of bringing authentic Indian flavors to your table
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-deep-brown dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-lg text-warm-gray dark:text-gray-300 mb-6">
              Founded in 2015 by Chef Priya Sharma, Spice Thali began as a dream to share the authentic flavors of India with food lovers everywhere. Growing up in a family where cooking was an art form, Chef Priya learned traditional recipes from her grandmother in Kerala and her mother-in-law in Punjab.
            </p>
            <p className="text-lg text-warm-gray dark:text-gray-300 mb-6">
              What started as a small family kitchen has now grown into a beloved restaurant that serves both North and South Indian cuisine with equal passion and authenticity. Every spice is carefully selected, every recipe is time-tested, and every dish is prepared with love.
            </p>
            <p className="text-lg text-warm-gray dark:text-gray-300">
              At Spice Thali, we believe that food is not just sustenance—it's a celebration of culture, tradition, and the connections that bring us together around the dining table.
            </p>
          </div>
          <div>
            <img
              src={heroImages.chef}
              alt="Chef preparing traditional Indian dishes in kitchen"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-stone-50 dark:bg-gray-800 rounded-xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-deep-brown dark:text-white mb-4">
              Our Culinary Philosophy
            </h2>
            <p className="text-lg text-warm-gray dark:text-gray-300 max-w-3xl mx-auto">
              We believe in preserving the authentic essence of Indian cuisine while adapting to modern tastes and dietary preferences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-saffron text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sprout className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4 text-deep-brown dark:text-white">
                Fresh Ingredients
              </h3>
              <p className="text-warm-gray dark:text-gray-300">
                We source the finest spices, vegetables, and proteins daily to ensure every dish bursts with flavor and nutrition.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-saffron text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4 text-deep-brown dark:text-white">
                Traditional Recipes
              </h3>
              <p className="text-warm-gray dark:text-gray-300">
                Our recipes have been passed down through generations, preserving the authentic taste of regional Indian cuisine.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-saffron text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4 text-deep-brown dark:text-white">
                Community Focus
              </h3>
              <p className="text-warm-gray dark:text-gray-300">
                We're more than a restaurant—we're a place where families gather and communities connect over shared meals.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-deep-brown dark:text-white mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src={heroImages.chef1}
                alt="Chef Priya Sharma, head chef and founder"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-playfair text-xl font-bold mb-2 text-deep-brown dark:text-white">
                Chef Priya Sharma
              </h3>
              <p className="text-warm-gray dark:text-gray-300 mb-2">Founder & Head Chef</p>
              <p className="text-sm text-warm-gray dark:text-gray-400">25+ years of culinary expertise</p>
            </div>
            <div className="text-center">
              <img
                src={heroImages.chef2}
                alt="Sous chef specializing in South Indian cuisine"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-playfair text-xl font-bold mb-2 text-deep-brown dark:text-white">
                Chef Ravi Kumar
              </h3>
              <p className="text-warm-gray dark:text-gray-300 mb-2">South Indian Specialist</p>
              <p className="text-sm text-warm-gray dark:text-gray-400">Expert in traditional Kerala & Tamil cuisine</p>
            </div>
            <div className="text-center">
              <img
                src={heroImages.chef3}
                alt="Chef Meera specializing in North Indian breads and desserts"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-playfair text-xl font-bold mb-2 text-deep-brown dark:text-white">
                Chef Meera Patel
              </h3>
              <p className="text-warm-gray dark:text-gray-300 mb-2">Breads & Desserts</p>
              <p className="text-sm text-warm-gray dark:text-gray-400">Master of tandoor breads & Indian sweets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
