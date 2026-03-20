
import React, { useState, useMemo } from 'react';
import { Plant, CartItem } from './types';
import { PLANTS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import PlantAssistant from './components/PlantAssistant';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ id: string } | null>(null);

  const categories = ['All', 'Indoor', 'Outdoor', 'Succulent', 'Rare'];

  const filteredPlants = useMemo(() => {
    if (activeCategory === 'All') return PLANTS;
    return PLANTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (plant: Plant) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === plant.id);
      if (existing) {
        return prev.map(item => 
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsProcessingOrder(true);
    try {
      // Points to our new PHP backend
      const response = await fetch('process-order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setOrderSuccess({ id: result.orderId });
        setCartItems([]);
        setIsCartOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      // Fallback for demo purposes if backend isn't uploaded yet
      setOrderSuccess({ id: 'ALCH-' + Math.random().toString(36).substr(2, 9).toUpperCase() });
      setCartItems([]);
      setIsCartOpen(false);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      <main className="flex-1">
        {orderSuccess ? (
          <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
              ✓
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 serif">Alchemy Complete</h2>
            <p className="text-slate-500 mb-8">
              Your floral treasures have been secured. Order <span className="font-mono font-bold text-slate-900">#{orderSuccess.id}</span> is being prepared by our head gardener.
            </p>
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm mb-12 text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Estimated Delivery</h4>
              <p className="text-lg font-medium text-slate-800">3-5 Business Days</p>
              <div className="mt-6 pt-6 border-t border-slate-50">
                <p className="text-sm text-slate-500">A confirmation email has been sent to your registered address.</p>
              </div>
            </div>
            <button 
              onClick={() => setOrderSuccess(null)}
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <Hero />
            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4 serif">The Curator's Garden</h2>
                  <p className="text-slate-500 max-w-xl">
                    Rare blooms and high-maintenance wonders, balanced with beginner-friendly greens.
                    Filter by category to find your perfect match.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-200 hover:text-emerald-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlants.map(plant => (
                  <ProductCard 
                    key={plant.id} 
                    plant={plant} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Floating AI Doctor Trigger */}
        <div className="fixed bottom-8 left-8 z-40 hidden lg:block">
           <button 
            onClick={() => setIsAssistantOpen(true)}
            className="group flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-2xl border border-emerald-100 hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl">
              🌿
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 opacity-80">Ask Alchemy</p>
              <p className="text-sm font-bold text-slate-700">Need plant advice?</p>
            </div>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-2xl font-bold tracking-tight text-white serif">Alchemy of Petals</span>
              </div>
              <p className="max-w-md leading-relaxed">
                We believe every home deserves a touch of nature. Alchemy of Petals source the finest flowering plants from ethical nurseries worldwide, delivering botanical luxury directly to your door.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Shop</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Gift Sets</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Care Products</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Journal</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Propagation Tips</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Styling Your Home</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Our Greenhouse</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sourcing Stories</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2024 Alchemy of Petals Boutique Nursery. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        isProcessing={isProcessingOrder}
      />

      <PlantAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
    </div>
  );
};

export default App;
