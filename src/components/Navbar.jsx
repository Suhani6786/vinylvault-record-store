import { Link } from "react-router-dom";

function Navbar({ cartCount, onToggleCart }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-logo" to="/">
          VinylVault
        </Link>
        <nav className="nav-actions">
          <Link className="nav-link" to="/">
            Catalog
          </Link>
          <button
            type="button"
            className="btn-cart-badge"
            onClick={onToggleCart}
            aria-label={`Cart with ${cartCount} items`}
          >
            Cart
            {cartCount > 0 && <span className="badge-pill">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;