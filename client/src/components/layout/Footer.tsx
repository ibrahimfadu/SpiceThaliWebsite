import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-deep-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-saffron mb-4">
              Spice Thali
            </h3>
            <p className="text-gray-300 mb-4">
              Uniting Flavors from Chennai to Chandni Chowk - Authentic North & South Indian cuisine.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-saffron transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-saffron transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-saffron transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-saffron transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-300 hover:text-saffron transition-colors duration-200"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-gray-300 hover:text-saffron transition-colors duration-200"
                >
                  Order Online
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-saffron transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                No. 21, Food Street, Indiranagar, Bengaluru, Karnataka – 560038
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                +91 98765 43210
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                contact@spicethali.in
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Mon-Fri: 11:00 AM - 10:30 PM</li>
              <li>Sat-Sun: 9:00 AM - 11:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center text-gray-300">
          <p>
            &copy; 2024 Spice Thali. All rights reserved. | Made with ❤️ for authentic Indian cuisine lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
