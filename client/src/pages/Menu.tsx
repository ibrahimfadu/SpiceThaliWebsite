import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { MenuCard } from "@/components/MenuCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dish } from "@shared/schema";

export function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "north" | "south">("all");

  const { data: dishes, isLoading, error } = useQuery<Dish[]>({
    queryKey: ["/api/dishes"],
  });

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    let filtered = dishes;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(dish => dish.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [dishes, selectedCategory, searchTerm]);

  const categories = [
    { id: "all", label: "All Dishes" },
    { id: "north", label: "North Indian" },
    { id: "south", label: "South Indian" },
  ] as const;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-deep-brown dark:text-white mb-4">
            Failed to load menu
          </h2>
          <p className="text-warm-gray dark:text-gray-300">
            Please try refreshing the page or contact us if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-brown dark:text-white mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-warm-gray dark:text-gray-300 max-w-3xl mx-auto">
            Explore our carefully crafted selection of authentic North and South Indian dishes
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-gray w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="flex justify-center mb-12">
          <div className="bg-stone-100 dark:bg-gray-800 p-2 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={
                  selectedCategory === category.id
                    ? "bg-saffron text-white hover:bg-curry"
                    : "text-deep-brown dark:text-white hover:bg-saffron hover:text-white"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-deep-brown dark:text-white mb-2">
              No dishes found
            </h3>
            <p className="text-warm-gray dark:text-gray-300">
              Try adjusting your search or category selection.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <MenuCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
