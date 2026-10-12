import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';

export default function BakingWebsite() {
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [bakeryName, setBakeryName] = useState('Geeta\'s Bakery');
  const [editingBakeryName, setEditingBakeryName] = useState(false);
  const [tempBakeryName, setTempBakeryName] = useState('Geeta\'s Bakery');
  const [products, setProducts] = useState([
    { id: 1, name: 'Sourdough', price: 6.99, image: '🥖', description: 'Tangy artisanal sourdough', category: 'Classic' },
    { id: 2, name: 'Whole Wheat', price: 5.99, image: '🍞', description: 'Hearty whole wheat', category: 'Whole Grains' },
    { id: 3, name: 'Focaccia', price: 7.99, image: '🥒', description: 'Italian-style focaccia', category: 'Specialty' },
    { id: 4, name: 'Rye Bread', price: 6.49, image: '🌾', description: 'Dense flavorful rye', category: 'Classic' },
    { id: 5, name: 'Multigrain', price: 7.49, image: '🌱', description: 'Blend of seeds and grains', category: 'Whole Grains' },
    { id: 6, name: 'Ciabatta', price: 5.49, image: '🧈', description: 'Light and airy Italian bread', category: 'Specialty' }
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: '', description: '' });
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { id: 'hero', label: 'Home', ref: heroRef },
    { id: 'products', label: 'Our Bread', ref: productsRef },
    { id: 'contact', label: 'Contact', ref: contactRef }
  ];

  // Admin functions
  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminPanel(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminPanel(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image && newProduct.category) {
      const id = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { 
        id, 
        name: newProduct.name, 
        price: parseFloat(newProduct.price),
        image: newProduct.image,
        category: newProduct.category,
        description: newProduct.description
      }]);
      setNewProduct({ name: '', price: '', image: '', category: '', description: '' });
    }
  };

  const handleImageUpload = (e, isNewProduct = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isNewProduct) {
          setNewProduct({ ...newProduct, image: event.target.result });
        } else if (editingProduct) {
          setEditingProduct({ ...editingProduct, image: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBakeryName = () => {
    setBakeryName(tempBakeryName);
    setEditingBakeryName(false);
  };

  // Cart functions
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      if (contactRef.current && window.scrollY >= contactRef.current.offsetTop - 100) {
        current = 'contact';
      } else if (productsRef.current && window.scrollY >= productsRef.current.offsetTop - 100) {
        current = 'products';
      } else {
        current = 'hero';
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${contactForm.name}! We'll get back to you soon at ${contactForm.email}`);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f5f1e8' }}>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col p-8 z-50" style={{ backgroundColor: '#f5f1e8' }}>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🥖</span>
            {isAdmin && editingBakeryName ? (
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={tempBakeryName}
                  onChange={(e) => setTempBakeryName(e.target.value)}
                  className="flex-1 px-2 py-1 rounded text-sm"
                  style={{ backgroundColor: '#faf8f3', color: '#6b4423', border: '1px solid #d4c4a8' }}
                />
                <button onClick={handleSaveBakeryName} className="p-1 text-sm font-bold" style={{ color: '#a85d3a' }}>
                  ✓
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <h1 className="text-xl font-bold" style={{ color: '#6b4423' }}>{bakeryName}</h1>
                {isAdmin && (
                  <button 
                    onClick={() => {
                      setEditingBakeryName(true);
                      setTempBakeryName(bakeryName);
                    }}
                    className="mt-1 text-xs"
                    style={{ color: '#a85d3a' }}
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="text-sm" style={{ color: '#9b7653' }}>Bread Bakery</p>
        </div>

        {!isAdmin ? (
          <button 
            onClick={() => setShowAdminPanel(true)}
            className="mb-8 text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(168, 93, 58, 0.1)', color: '#a85d3a' }}
          >
            Admin
          </button>
        ) : (
          <button 
            onClick={handleLogout}
            className="mb-8 text-xs px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: '#a85d3a' }}
          >
            Logout
          </button>
        )}

        <nav className="space-y-3 flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.ref)}
              className="w-full text-left px-5 py-3 transition-all duration-300"
              style={
                activeSection === section.id
                  ? { 
                      backgroundColor: 'rgba(169, 106, 70, 0.15)',
                      color: '#6b4423',
                      fontWeight: '600',
                      borderRadius: '25px'
                    }
                  : { 
                      color: '#9b7653', 
                      backgroundColor: 'transparent',
                      borderRadius: '25px'
                    }
              }
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div style={{ paddingTop: '1.5rem' }}>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart size={20} style={{ color: '#a85d3a' }} />
            <span className="text-sm font-semibold" style={{ color: '#6b4423' }}>Cart</span>
          </div>
          <div className="rounded-3xl p-4 mb-4" style={{ backgroundColor: 'rgba(237, 232, 220, 0.6)' }}>
            <p className="text-2xl font-bold" style={{ color: '#a85d3a' }}>${cartTotal}</p>
            <p className="text-xs" style={{ color: '#9b7653' }}>{cart.length} items</p>
          </div>
          <button className="w-full text-white py-3 rounded-full font-semibold text-sm" style={{ backgroundColor: '#a85d3a' }}>
            Checkout
          </button>
          
          {/* Cart Items Preview */}
          {cart.length > 0 && (
            <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
              <p className="text-xs font-semibold" style={{ color: '#6b4423' }}>Items in cart:</p>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-xs p-2 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="flex-1">
                    <span style={{ color: '#6b4423' }}>{item.name}</span>
                    <div style={{ color: '#a85d3a' }}>${item.price}</div>
                  </div>
                  <button
                    onClick={() => {
                      const newCart = cart.filter((_, i) => i !== index);
                      setCart(newCart);
                    }}
                    className="ml-2 text-white px-2 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: '#a85d3a' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full">
        {/* Hero */}
        <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-8 py-20" style={{ backgroundColor: '#f5ede0' }}>
          <div className="max-w-2xl text-center">
            <div className="text-7xl mb-6">🥖</div>
            <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ color: '#6b4423' }}>
              Artisan Bread Crafted Daily
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: '#9b7653' }}>
              Handmade loaves baked fresh every morning using traditional methods and the finest organic grains.
            </p>
            <button
              onClick={() => scrollToSection(productsRef)}
              className="px-8 py-3 text-white rounded-lg font-semibold"
              style={{ backgroundColor: '#8b4513' }}
            >
              Explore Products
            </button>
          </div>
        </section>

        {/* Products */}
        <section ref={productsRef} className="min-h-screen px-8 py-20 flex flex-col justify-center" style={{ backgroundColor: '#f5f1e8' }}>
          <div className="max-w-6xl">
            <h3 className="text-4xl font-light mb-16" style={{ color: '#6b4423' }}>Our Bread Selection</h3>
            
            <div className="relative p-16 rounded-3xl shadow-2xl" style={{ backgroundColor: '#ede8dc' }}>
              {Array.from({ length: Math.ceil(products.length / 3) }).map((_, shelfIndex) => (
                <div key={shelfIndex} className="mb-32">
                  <div className="flex justify-around items-end px-8 mb-6 gap-6">
                    {products.slice(shelfIndex * 3, (shelfIndex + 1) * 3).map((product, idx) => (
                      <div
                        key={product.id}
                        className="group cursor-pointer transition-transform duration-500 ease-out hover:scale-105 flex-1"
                        onClick={() => !isAdmin && addToCart(product)}
                        style={{
                          animation: !isAdmin ? `softFloat 3s ease-in-out ${(shelfIndex * 3 + idx) * 0.5}s infinite` : 'none'
                        }}
                      >
                        {isAdmin ? (
                          <div className="relative mb-6 p-4 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            {typeof product.image === 'string' && product.image.startsWith('data:') ? (
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-2xl mb-3"
                              />
                            ) : (
                              <div className="w-full h-32 flex items-center justify-center text-5xl mb-3 rounded-2xl" style={{ backgroundColor: '#ede8dc' }}>
                                {product.image}
                              </div>
                            )}
                            <div className="text-xs" style={{ color: '#6b4423' }}>
                              <p className="font-bold">{product.name}</p>
                              <p>${product.price}</p>
                            </div>
                            <div className="flex gap-1 mt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditProduct(product);
                                }}
                                className="flex-1 text-xs px-2 py-1 rounded-full text-white"
                                style={{ backgroundColor: '#a85d3a' }}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProduct(product.id);
                                }}
                                className="flex-1 text-xs px-2 py-1 rounded-full text-white"
                                style={{ backgroundColor: '#d4a5a0' }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="relative mb-6" style={{ filter: 'drop-shadow(0 15px 30px rgba(168, 93, 58, 0.2))' }}>
                              <div 
                                style={{
                                  position: 'relative',
                                  width: '100%',
                                  aspectRatio: '1',
                                  borderRadius: '52% 48% 45% 55% / 48% 55% 48% 48%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  overflow: 'hidden',
                                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)'
                                }}
                              >
                                {typeof product.image === 'string' && product.image.startsWith('data:') ? (
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: '52% 48% 45% 55% / 48% 55% 48% 48%' }}
                                  />
                                ) : (
                                  <span style={{ fontSize: '90px' }}>{product.image}</span>
                                )}
                              </div>
                            </div>
                            
                            <div 
                              className="text-center px-4 py-3 backdrop-blur-md"
                              style={{ 
                                borderRadius: '30px',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                boxShadow: '0 8px 32px rgba(168, 93, 58, 0.1)',
                                border: '1px solid rgba(255,255,255,0.2)'
                              }}
                            >
                              <h4 className="text-sm font-bold" style={{ color: '#6b4423' }}>{product.name}</h4>
                              <p className="text-xs" style={{ color: '#9b7653' }}>{product.category}</p>
                              <p className="text-xs font-semibold mt-1" style={{ color: '#a85d3a' }}>${product.price}</p>
                            </div>
                            
                            <button 
                              className="mt-3 w-full text-xs px-3 py-2 text-white rounded-full font-semibold"
                              style={{ 
                                backgroundColor: '#a85d3a',
                                boxShadow: '0 4px 15px rgba(168, 93, 58, 0.3)'
                              }}
                            >
                              Add
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div 
                    className="h-2 shadow-lg mx-8"
                    style={{ 
                      backgroundColor: '#8b6f47',
                      borderRadius: '50px',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section ref={contactRef} className="min-h-screen px-8 py-20 flex flex-col justify-center" style={{ backgroundColor: '#f5ede0' }}>
          <div className="max-w-5xl">
            <h3 className="text-4xl font-light mb-16" style={{ color: '#6b4423' }}>Get In Touch</h3>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#d4c4a8', color: '#a85d3a' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#6b4423' }}>Phone</p>
                    <p style={{ color: '#9b7653' }}>(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#d4c4a8', color: '#a85d3a' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#6b4423' }}>Email</p>
                    <p style={{ color: '#9b7653' }}>hello@artisanbakery.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#d4c4a8', color: '#a85d3a' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#6b4423' }}>Location</p>
                    <p style={{ color: '#9b7653' }}>123 Baker Street, Sweet Town, ST 12345</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none h-32"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full text-white font-semibold py-3 rounded-lg"
                  style={{ backgroundColor: '#8b4513' }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-8 border-t text-center text-sm" style={{ backgroundColor: '#f5f1e8', borderColor: '#d4c4a8', color: '#9b7653' }}>
          <p>© 2024 Artisan Bakery. Baked fresh daily with love ❤️</p>
        </footer>
      </main>

      {/* Admin Login Modal */}
      {showAdminPanel && !isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full" style={{ backgroundColor: '#f5f1e8' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#6b4423' }}>Admin Login</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border"
              style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#a85d3a' }}
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminPanel(false)}
                className="flex-1 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: '#d4c4a8', color: '#6b4423' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto pt-20">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full my-20 relative" style={{ backgroundColor: '#f5f1e8' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#6b4423' }}>Manage Products</h2>
            </div>

            {/* Add New Product */}
            <div className="mb-8 p-6 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#6b4423' }}>Add New Product</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                />
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border h-20"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                />
                <div>
                  <label className="text-sm" style={{ color: '#6b4423' }}>Upload Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="w-full px-4 py-2 rounded-lg border mt-1"
                    style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                  />
                  {newProduct.image && (
                    <img 
                      src={newProduct.image} 
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg mt-2"
                    />
                  )}
                </div>
                <button
                  onClick={handleAddProduct}
                  className="w-full py-2 rounded-full text-white font-semibold"
                  style={{ backgroundColor: '#a85d3a' }}
                >
                  ➕ Add Product
                </button>
              </div>
            </div>

            {/* Edit Products */}
            <h3 className="text-lg font-bold mb-4" style={{ color: '#6b4423' }}>Existing Products</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#a85d3a #ede8dc' }}>
              {/* Scroll indicator */}
              <div className="text-center text-xs" style={{ color: '#9b7653', paddingBottom: '0.5rem' }}>
                ⬇️ Scroll to see all products ⬇️
              </div>
              {products.map((product) => (
                <div key={product.id} className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                  {editingProduct?.id === product.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border text-sm"
                        style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg border text-sm"
                        style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="w-full px-4 py-2 rounded-lg border text-sm"
                        style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f3', color: '#6b4423' }}
                      />
                      <button
                        onClick={handleSaveProduct}
                        className="w-full py-2 rounded-full text-white font-semibold text-sm"
                        style={{ backgroundColor: '#a85d3a' }}
                      >
                        💾 Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: '#6b4423' }}>{product.name}</p>
                        <p className="text-xs" style={{ color: '#9b7653' }}>${product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="px-3 py-1 rounded-full text-xs text-white"
                          style={{ backgroundColor: '#a85d3a' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1 rounded-full text-xs text-white"
                          style={{ backgroundColor: '#d4a5a0' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Logout Button */}
          <button 
            onClick={handleLogout} 
            className="fixed z-50 text-white px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: '#a85d3a',
              boxShadow: '0 4px 15px rgba(168, 93, 58, 0.4)',
              minWidth: '100px',
              textAlign: 'center',
              right: '20px',
              top: '40px'
            }}
            title="Click to logout"
          >
            ✕ Logout
          </button>
        </div>
      )}

      <style>{`
        @keyframes softFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}