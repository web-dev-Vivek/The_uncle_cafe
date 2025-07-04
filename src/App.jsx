import React, { useState } from "react";
import {
  ShoppingCart,
  Clock,
  Star,
  Smile,
  Heart,
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Minus,
  X,
} from "lucide-react";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [animatingItems, setAnimatingItems] = useState(new Set());

  const burgers = [
    {
      id: 1,
      name: "Classic the_uncle_cafe",
      description: "Beef patty, lettuce, tomato, onion, pickles, special sauce",
      price: 12.99,
      image:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Classic",
    },
    {
      id: 2,
      name: "BBQ Bacon Deluxe",
      description: "Double beef patty, crispy bacon, BBQ sauce, cheddar cheese",
      price: 16.99,
      image:
        "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Premium",
    },
    {
      id: 3,
      name: "Mushroom Swiss",
      description: "Beef patty, sautéed mushrooms, Swiss cheese, garlic aioli",
      price: 14.99,
      image:
        "https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Gourmet",
    },
    {
      id: 4,
      name: "Spicy Jalapeño",
      description: "Beef patty, jalapeños, pepper jack cheese, chipotle mayo",
      price: 13.99,
      image:
        "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Spicy",
    },
    {
      id: 5,
      name: "Veggie Supreme",
      description: "Plant-based patty, avocado, sprouts, tomato, vegan mayo",
      price: 13.49,
      image:
        "https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetarian",
    },
    {
      id: 6,
      name: "Double Trouble",
      description: "Two beef patties, double cheese, bacon, special sauce",
      price: 18.99,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Premium",
    },
  ];

  const addToCart = (burger) => {
    // Add animation effect
    setAnimatingItems((prev) => new Set([...prev, burger.id]));

    // Remove animation after 600ms
    setTimeout(() => {
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(burger.id);
        return newSet;
      });
    }, 600);

    const existingItem = cart.find((item) => item.id === burger.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...burger, quantity: 1 }]);
    }
  };

  const removeFromCart = (burgerId) => {
    setCart(cart.filter((item) => item.id !== burgerId));
  };

  const updateQuantity = (burgerId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(burgerId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === burgerId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="logo.jpg" class="rounded-full h-9" alt="" />
            <span className="text-lg md:text-2xl font-bold text-gray-900">
              the_uncle_cafe
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#menu"
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Menu
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Contact
            </a>
          </nav>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-red-500 text-white px-3 py-2 md:px-6 md:py-2 rounded-full hover:bg-red-600 transition-colors flex items-center space-x-2 relative text-sm md:text-base"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Order Now</span>
            <span className="sm:hidden">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">
                Your Order
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 bg-gray-50 p-3 md:p-4 rounded-2xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                          {item.name}
                        </h3>
                        <p className="text-red-500 font-bold text-sm md:text-base">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg md:text-xl font-bold text-gray-900">
                      Total:
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-red-500">
                      ${getTotalPrice()}
                    </span>
                  </div>
                  <button className="w-full bg-red-500 text-white py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-red-600 transition-colors">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen bg-red-500 flex items-center justify-center pt-20 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight leading-tight">
              YUM!
              <br />
              BURGER
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
              Life's too short for bad burgers. Experience the perfect blend of
              premium ingredients and bold flavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-white/10 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 shadow-lg"
              >
                Order Online
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                More About Us
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Delicious Burger"
                  className="w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-yellow-400 text-black px-2 md:px-4 py-1 md:py-2 rounded-full font-bold text-xs md:text-sm rotate-12 shadow-lg">
                Best Seller!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen bg-sky-500 flex items-center justify-center relative py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-8 md:mb-12 uppercase tracking-tight leading-tight">
            LIFE'S TOO SHORT
            <br />
            FOR BAD BURGERS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 hover:shadow-3xl">
              <img
                src="https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Fresh Ingredients"
                className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-2xl mb-4 md:mb-6"
              />
              <div className="bg-green-400 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Smile className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4 uppercase">
                Fresh Daily
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Hand-selected ingredients delivered fresh every morning
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:shadow-3xl">
              <img
                src="https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Gourmet Burgers"
                className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-2xl mb-4 md:mb-6"
              />
              <div className="bg-yellow-400 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4 uppercase">
                Gourmet Taste
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Premium beef patties grilled to perfection
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 hover:shadow-3xl sm:col-span-2 lg:col-span-1">
              <img
                src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Fast Service"
                className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-2xl mb-4 md:mb-6"
              />
              <div className="bg-orange-400 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4 uppercase">
                Lightning Fast
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Ready in under 10 minutes without compromising quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="min-h-screen bg-red-500 flex items-center justify-center relative py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-6 md:mb-8 uppercase tracking-tight leading-tight">
              Our Menu
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              From classic burgers to gourmet creations, we've got something for
              every taste
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {burgers.map((burger) => (
              <div
                key={burger.id}
                className={`bg-white rounded-3xl p-4 md:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 ${
                  animatingItems.has(burger.id)
                    ? "animate-bounce scale-110"
                    : ""
                }`}
              >
                <div className="relative mb-4">
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-2xl"
                  />
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-yellow-400 text-black px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                    {burger.category}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 uppercase">
                  {burger.name}
                </h3>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm md:text-sm leading-relaxed">
                  {burger.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-500">
                    ${burger.price}
                  </span>
                  <button
                    onClick={() => addToCart(burger)}
                    className={`bg-red-500 text-white px-3 sm:px-4 md:px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 active:scale-95 text-sm md:text-base ${
                      animatingItems.has(burger.id)
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span>
                      {animatingItems.has(burger.id) ? "Added!" : "Add"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen bg-sky-500 flex items-center justify-center py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Restaurant Interior"
                className="w-full h-48 sm:h-60 md:h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-6 md:mb-8 uppercase tracking-tight leading-tight">
              Why Choose
              <br />
              the_uncle_cafe?
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full border border-white/30">
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <span className="text-lg md:text-2xl text-white font-bold uppercase">
                  Fast Service
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full border border-white/30">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <span className="text-lg md:text-2xl text-white font-bold uppercase">
                  Premium Quality
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full border border-white/30">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <span className="text-lg md:text-2xl text-white font-bold uppercase">
                  Made with Love
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-red-500 flex items-center justify-center relative py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-8 md:mb-12 uppercase tracking-tight leading-tight">
            Visit Us Today
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 sm:col-span-2 lg:col-span-1">
              <div className="bg-green-400 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4 uppercase">
                Location
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                FARIDABAD , Sector 30
                <br />
                bangalsuiting
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-yellow-400 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Phone className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4 uppercase">
                Call Us
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                +91**********
                <br />
                Open 11AM - 11PM
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-orange-400 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Mail className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-4 uppercase">
                Email
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                hello@uncleburger.com
                <br />
                We reply within 24hrs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black relative overflow-hidden">
        {/* Wavy Top */}
        <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-red-500">
          <svg
            className="absolute bottom-0 w-full h-12 md:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#000000"
            />
          </svg>
        </div>

        {/* Moving Ticker */}
        <div className="bg-yellow-400 text-black font-bold py-3 md:py-4 overflow-hidden mt-12 md:mt-16">
          <div className="animate-scroll whitespace-nowrap">
            <span className="inline-block px-4 sm:px-8 text-sm sm:text-base md:text-xl uppercase">
              🍔 TASTE THE DIFFERENCE 🌮 FRESH INGREDIENTS 🍟 FAST SERVICE 🥤
              PREMIUM QUALITY 🍔 TASTE THE DIFFERENCE 🌮 FRESH INGREDIENTS 🍟
              FAST SERVICE 🥤 PREMIUM QUALITY
            </span>
          </div>
        </div>

        {/* Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4 md:mb-6">
                <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
                <span className="text-lg md:text-2xl font-bold text-white uppercase">
                  the_uncle_cafe
                </span>
              </div>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                Serving the best burgers in town since 2020. Quality
                ingredients, fast service, unbeatable taste.
              </p>
              <div className="flex space-x-4">
                <div className="bg-red-500 p-2 md:p-3 rounded-full hover:bg-red-600 transition-colors cursor-pointer">
                  <Facebook className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div className="bg-red-500 p-2 md:p-3 rounded-full hover:bg-red-600 transition-colors cursor-pointer">
                  <Instagram className="h-4 w-4 md:h-6 md:w-6 text-white"></Instagram>
                </div>
                <div className="bg-red-500 p-2 md:p-3 rounded-full hover:bg-red-600 transition-colors cursor-pointer">
                  <Twitter className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 uppercase">
                Quick Links
              </h3>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-white transition-colors"
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 uppercase">
                Contact Info
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start space-x-3 text-gray-400 text-sm md:text-base">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                  <span>Faridabad , sector-30 , bangalsuiting</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span>+91**********</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span>hello@bobsburger.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 uppercase">
                Our Specialties
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-yellow-400 p-3 md:p-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-black" />
                </div>
                <div className="bg-green-400 p-3 md:p-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-black" />
                </div>
                <div className="bg-orange-400 p-3 md:p-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-black" />
                </div>
                <div className="bg-purple-400 p-3 md:p-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Smile className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>
              &copy; 2024 the_uncle_cafe. All rights reserved. Made with ❤️ for
              burger lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
