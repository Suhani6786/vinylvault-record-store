import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ALBUMS } from "./data/albums";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (album, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === album.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: Math.min(item.quantity + qty, item.stock) }
            : item,
        );
      }
      return [...prevCart, { ...album, quantity: Math.min(qty, album.stock) }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.min(item.quantity + change, item.stock);
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar cartCount={cartCount} onToggleCart={handleToggleCart} />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />

      <main className="page">
        <Routes>
          <Route
            path="/"
            element={<CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/album/:albumId"
            element={
              <AlbumDetailPage albums={ALBUMS} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;