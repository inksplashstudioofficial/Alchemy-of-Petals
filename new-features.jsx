    const Navbar = ({ cartCount, onOpenCart, onOpenAssistant, onToggleTheme, isDark, searchQuery, setSearchQuery, onOpenWishlist, wishlistCount }) => {
      const [user, setUser] = useState(null);

      useEffect(() => {
        const stored = localStorage.getItem('garden_user');
        if (stored) setUser(JSON.parse(stored));
      }, []);

      const logout = () => {
        localStorage.removeItem('garden_user');
        setUser(null);
        window.location.reload();
      };

      return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
            <a href="index.html" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <span className="hidden sm:inline text-xl font-bold text-emerald-900 dark:text-emerald-100 serif">Alchemy of Petals</span>
            </a>
            
            <div className="flex-1 max-w-md mx-4 sm:mx-8">
               <div className="relative">
                 <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search cultivars..." 
                   className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"/>
               </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={onToggleTheme} className="text-xl p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {isDark ? '☀️' : '🌙'}
              </button>

              <button onClick={onOpenAssistant} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all">
                Plant Doctor
              </button>

              {user ? (
                <div className="hidden lg:flex items-center gap-4">
                  <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Hi, {user.name.split(' ')[0]}!</span>
                  <button onClick={logout} className="text-[10px] uppercase font-bold text-slate-400 hover:text-rose-500">Logout</button>
                </div>
              ) : (
                <a href="login.html" className="hidden lg:inline text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">Sign In</a>
              )}

              <button onClick={onOpenWishlist} className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors">
                ❤️
                {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{wishlistCount}</span>}
              </button>

              <button onClick={onOpenCart} className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
                🛍️
                {cartCount > 0 && <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{cartCount}</span>}
              </button>
            </div>
          </div>
        </nav>
      );
    };

    const Hero = () => (
      <div className="bg-white dark:bg-slate-900 transition-colors py-10 md:py-16 px-4">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 items-center gap-12">
          <div className="animate-in">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white serif leading-tight">
              Bring the <span className="text-emerald-600 dark:text-emerald-400 italic">Elegance</span> of Nature Home
            </h1>
            <p className="mt-6 text-slate-500 dark:text-slate-400 text-lg max-w-lg">
              Curated collection of rare flowering plants delivered with love from our nursery to your doorstep.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 transition-all">Explore Collection</button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative animate-in [animation-delay:200ms]">
            <img src="https://images.unsplash.com/photo-1512428813824-f713c244b55e?auto=format&fit=crop&q=80&w=1200" className="rounded-3xl shadow-2xl relative z-10" alt="Plants" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 rounded-full -z-0"></div>
          </div>
        </div>
      </div>
    );

    const ProductCard = ({ plant, onAddToCart, isWished, onToggleWish, onView }) => (
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-4 hover:shadow-2xl dark:hover:shadow-emerald-900/20 transition-all group animate-in flex flex-col h-full cursor-pointer" onClick={() => onView(plant)}>
        <div className="relative h-64 sm:h-72 mb-4 sm:mb-6 overflow-hidden rounded-2xl">
          <img src={plant.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={plant.name} />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 shadow-sm pointer-events-none">
            {plant.careLevel}
          </div>
          <button onClick={(e) => { e.stopPropagation(); onToggleWish(plant); }} className="absolute top-4 left-4 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:scale-110 transition-transform shadow-sm">
            {isWished ? '❤️' : '🤍'}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onAddToCart(plant); }} className="absolute bottom-4 right-4 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
        <div className="px-2 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 serif group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">{plant.name}</h3>
            <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg whitespace-nowrap">₹{plant.price.toFixed(2)}</p>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-xs italic mb-4">{plant.scientificName}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mt-auto">{plant.description}</p>
        </div>
      </div>
    );

    const QuickViewModal = ({ plant, isOpen, onClose, onAddToCart, isWished, onToggleWish }) => {
      if (!isOpen || !plant) return null;
      return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in" onClick={onClose}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl flex flex-col md:flex-row shadow-2xl overflow-hidden animate-in" onClick={e => e.stopPropagation()}>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <img src={plant.image} className="absolute inset-0 w-full h-full object-cover" alt={plant.name} />
              <button onClick={() => onToggleWish(plant)} className="absolute top-6 left-6 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-2xl hover:scale-110 transition-transform shadow-lg">
                {isWished ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold serif text-slate-900 dark:text-white mb-1">{plant.name}</h2>
                  <p className="text-slate-400 dark:text-slate-500 italic">{plant.scientificName}</p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-2xl">✕</button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">{plant.category}</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">{plant.sunlight}</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">{plant.careLevel} Care</span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10 flex-1">{plant.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">₹{plant.price.toFixed(2)}</p>
                <button onClick={() => { onAddToCart(plant); onClose(); }} className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 hover:-translate-y-1 transition-all">
                  Add to Box
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const PlantAssistant = ({ isOpen, onClose, cartContext, wishlistContext }) => {
      const [messages, setMessages] = useState([{ role: 'model', content: "Hello! I'm Bloom. I can help you identify plants, diagnose issues, or suggest the perfect flower. How can I assist you today?" }]);
      const [input, setInput] = useState('');
      const [loading, setLoading] = useState(false);
      const scrollRef = useRef(null);

      useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

      const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const context = \`User Cart: \${cartContext.map(i=>i.name).join(', ') || 'Empty'}. User Wishlist: \${wishlistContext.map(i=>i.name).join(', ') || 'Empty'}.\`;

        try {
          const ai = new GoogleGenAI({ apiKey: "AIzaSyBXa7BTOp-csD7hUBSEVoXsfm2e6Nxu7mY" });
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Context: " + context + "\\nUser says: " + input,
            config: {
              systemInstruction: "You are Bloom, a poetic and expert botanist for Alchemy of Petals. Help customers with plant care, selection, and diagnosis. You know their cart and wishlist contents. Keep it friendly and concise."
            }
          });
          setMessages(prev => [...prev, { role: 'model', content: response.text }]);
        } catch (e) {
          setMessages(prev => [...prev, { role: 'model', content: "My roots are a bit tangled! Please try again in a moment." }]);
        } finally {
          setLoading(false);
        }
      };

      if (!isOpen) return null;
      return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl h-[80vh] rounded-[2rem] flex flex-col shadow-2xl overflow-hidden border border-emerald-100 dark:border-slate-800">
            <div className="bg-emerald-600 dark:bg-emerald-800 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">🌿</div>
                <div>
                  <span className="font-bold serif text-xl block">Bloom Assistant</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">AI Botanist Online</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-xl shadow-none">✕</button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((m, i) => (
                <div key={i} className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                  <div className={\`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm \${m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-800 border dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-none'}\`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="flex gap-2 p-2"><div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce [animation-delay:0.2s]"></div></div>}
            </div>
            <div className="p-6 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-3">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} className="flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-none" placeholder="Ask Bloom..." />
              <button onClick={sendMessage} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-emerald-700 transition-colors">Send</button>
            </div>
          </div>
        </div>
      );
    };

    const App = () => {
      const [cart, setCart] = useState([]);
      const [wishlist, setWishlist] = useState([]);
      const [theme, setTheme] = useState('light');
      
      const [isCartOpen, setIsCartOpen] = useState(false);
      const [isWishlistOpen, setIsWishlistOpen] = useState(false);
      const [isAssistantOpen, setIsAssistantOpen] = useState(false);
      const [selectedPlant, setSelectedPlant] = useState(null);
      
      const [orderSuccess, setOrderSuccess] = useState(null);
      const [mockPaymentStage, setMockPaymentStage] = useState(null); // 'processing', 'success'
      
      const [activeCat, setActiveCat] = useState('All');
      const [sortBy, setSortBy] = useState('featured');
      const [careFilter, setCareFilter] = useState('All');
      const [searchQuery, setSearchQuery] = useState('');
      const [visibleCount, setVisibleCount] = useState(12);

      useEffect(() => {
        const storedTheme = localStorage.getItem('garden_theme');
        if (storedTheme) {
          setTheme(storedTheme);
          if (storedTheme === 'dark') document.documentElement.classList.add('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
          document.documentElement.classList.add('dark');
        }

        const storedWish = localStorage.getItem('garden_wishlist');
        if (storedWish) setWishlist(JSON.parse(storedWish));
      }, []);

      const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('garden_theme', newTheme);
        if (newTheme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      };

      const addToCart = (p) => {
        setCart(prev => {
          const ex = prev.find(i => i.id === p.id);
          if (ex) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
          return [...prev, { ...p, quantity: 1 }];
        });
        setIsCartOpen(true);
      };

      const toggleWishlist = (p) => {
        setWishlist(prev => {
          const isWished = prev.some(w => w.id === p.id);
          const next = isWished ? prev.filter(w => w.id !== p.id) : [...prev, p];
          localStorage.setItem('garden_wishlist', JSON.stringify(next));
          return next;
        });
      };

      const handleCheckout = () => {
        setMockPaymentStage('processing');
        setTimeout(() => {
          const tempId = 'ALCH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
          setOrderSuccess(tempId);
          setMockPaymentStage(null);
          setCart([]);
          setIsCartOpen(false);
        }, 2000);
      };

      const filteredAndSorted = useMemo(() => {
        let result = activeCat === 'All' ? [...PLANTS] : PLANTS.filter(p => p.category === activeCat);
        
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          result = result.filter(p => p.name.toLowerCase().includes(q) || p.scientificName.toLowerCase().includes(q));
        }

        if (careFilter !== 'All') {
          result = result.filter(p => p.careLevel === careFilter);
        }
        
        if (sortBy === 'priceAsc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'priceDesc') result.sort((a, b) => b.price - a.price);
        else if (sortBy === 'nameAsc') result.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === 'nameDesc') result.sort((a, b) => b.name.localeCompare(a.name));
        
        return result;
      }, [activeCat, careFilter, sortBy, searchQuery]);

      const visiblePlants = filteredAndSorted.slice(0, visibleCount);

      return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 selection:bg-emerald-100 selection:text-emerald-900 transition-colors">
          <Navbar 
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
            wishlistCount={wishlist.length}
            onOpenCart={() => setIsCartOpen(true)} 
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenAssistant={() => setIsAssistantOpen(true)} 
            isDark={theme === 'dark'}
            onToggleTheme={toggleTheme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <main className="flex-1">
            {orderSuccess ? (
              <div className="max-w-xl mx-auto py-32 px-4 text-center animate-in">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">✓</div>
                <h2 className="text-4xl font-bold serif mb-4 dark:text-white">Payment Successful</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10">Your spectacular floral order <span className="font-mono font-bold text-slate-800 dark:text-slate-200">#{orderSuccess}</span> has been received via Razorpay Mock.</p>
                <button onClick={() => setOrderSuccess(null)} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-100 dark:shadow-none hover:scale-105 transition-all">Keep Shopping</button>
              </div>
            ) : mockPaymentStage === 'processing' ? (
              <div className="max-w-xl mx-auto py-40 px-4 text-center animate-in">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-8"></div>
                <h2 className="text-2xl font-bold serif dark:text-white">Connecting to Mock Payment Gateway...</h2>
                <p className="text-slate-500 mt-2">Please do not refresh the page.</p>
              </div>
            ) : (
              <>
                <Hero />
                <section className="max-w-7xl mx-auto px-4 py-16">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                      <h2 className="text-4xl font-bold serif text-slate-900 dark:text-white mb-2">The Curator's Garden</h2>
                      <p className="text-slate-500 dark:text-slate-400">Hand-picked wonders from our boutique greenhouse.</p>
                    </div>
                    <div className="flex flex-col items-end gap-5 w-full md:w-auto">
                      <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                        {['All', 'Roses', 'Orchids', 'Ferns', 'Bougainvillea', 'Rare'].map(c => (
                          <button key={c} onClick={() => { setActiveCat(c); setVisibleCount(12); }} className={\`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all \${activeCat === c ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'}\`}>
                            {c}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center md:justify-end">
                        <select 
                          value={careFilter} 
                          onChange={(e) => { setCareFilter(e.target.value); setVisibleCount(12); }}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm"
                        >
                          <option value="All">All Care Levels</option>
                          <option value="Easy">Easy Care</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm"
                        >
                          <option value="featured">Featured (Default)</option>
                          <option value="priceAsc">Price: Low to High</option>
                          <option value="priceDesc">Price: High to Low</option>
                          <option value="nameAsc">Alphabetical: A-Z</option>
                          <option value="nameDesc">Alphabetical: Z-A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {filteredAndSorted.length === 0 ? (
                    <div className="text-center py-20 opacity-40 animate-in">
                      <p className="text-6xl mb-4">🪴</p>
                      <p className="font-bold text-xl font-serif text-slate-900 dark:text-white">No botanical matches</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Try loosening your filter parameters.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                        {visiblePlants.map(p => (
                          <ProductCard 
                            key={p.id} 
                            plant={p} 
                            onAddToCart={addToCart} 
                            isWished={wishlist.some(w => w.id === p.id)}
                            onToggleWish={toggleWishlist}
                            onView={setSelectedPlant}
                          />
                        ))}
                      </div>
                      
                      {visibleCount < filteredAndSorted.length && (
                        <div className="mt-16 text-center">
                          <button onClick={() => setVisibleCount(v => v + 12)} className="px-10 py-4 border-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                            Load More Beauties
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              </>
            )}
          </main>

          {/* Quick View Modal */}
          <QuickViewModal 
            isOpen={!!selectedPlant} 
            plant={selectedPlant} 
            onClose={() => setSelectedPlant(null)} 
            onAddToCart={addToCart}
            isWished={selectedPlant && wishlist.some(w => w.id === selectedPlant.id)}
            onToggleWish={toggleWishlist}
          />

          {/* Wishlist Drawer */}
          {isWishlistOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end animate-in">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)}></div>
              <div className="relative w-full flex-1 sm:max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-4 sm:p-8 border-l dark:border-slate-800">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-bold serif dark:text-white">Your Wishlist</h2>
                  <button onClick={() => setIsWishlistOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors text-2xl">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-20 opacity-40">
                      <p className="text-4xl mb-4">🤍</p>
                      <p className="font-medium dark:text-white">No favorites saved yet.</p>
                    </div>
                  ) : wishlist.map(i => (
                    <div key={i.id} className="flex gap-4 group items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors" onClick={() => { setIsWishlistOpen(false); setSelectedPlant(i); }}>
                      <img src={i.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt={i.name} />
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 dark:text-slate-100">{i.name}</p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">₹{i.price.toFixed(2)}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(i); }} className="text-slate-300 hover:text-rose-500 p-2 transition-colors text-xl">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shopping Cart Drawer */}
          {isCartOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end animate-in">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
              <div className="relative w-full flex-1 sm:max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-4 sm:p-8 border-l dark:border-slate-800">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-bold serif dark:text-white">Garden Box</h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-emerald-500 transition-colors text-2xl">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 opacity-40">
                      <p className="text-4xl mb-4">🌱</p>
                      <p className="font-medium dark:text-white">Your box is currently empty.</p>
                    </div>
                  ) : cart.map(i => (
                    <div key={i.id} className="flex gap-4 group items-center">
                      <img src={i.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt={i.name} />
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 dark:text-slate-100">{i.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{i.quantity} x ₹{i.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => setCart(prev => prev.filter(item => item.id !== i.id))} className="text-slate-300 hover:text-red-500 text-xl transition-colors p-2">✕</button>
                    </div>
                  ))}
                </div>
                <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between font-bold text-2xl mb-8">
                    <span className="serif dark:text-white">Total</span>
                    <span className="text-emerald-700 dark:text-emerald-400">₹{cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}</span>
                  </div>
                  <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-100 dark:shadow-none hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 transition-all">Secure Checkout via Mock Pay</button>
                </div>
              </div>
            </div>
          )}

          <PlantAssistant 
            isOpen={isAssistantOpen} 
            onClose={() => setIsAssistantOpen(false)} 
            cartContext={cart} 
            wishlistContext={wishlist} 
          />

          <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                  <span className="text-2xl font-bold text-white serif">Alchemy of Petals</span>
                </div>
                <p className="text-sm leading-relaxed max-w-xs">We source the finest flowering plants from ethical nurseries worldwide, delivering botanical luxury directly to your door.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Contact</h4>
                <ul className="space-y-4 text-sm">
                  <li>Email: hello@alchemyofpetals.com</li>
                  <li>Phone: +1 (800) FLOWERS</li>
                  <li>Location: 123 Botanical Way, Portland OR</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-emerald-600 hover:text-white transition-colors">IN</a>
                  <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-emerald-600 hover:text-white transition-colors">FB</a>
                  <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-emerald-600 hover:text-white transition-colors">TW</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    };

    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
