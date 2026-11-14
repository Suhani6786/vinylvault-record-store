import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function AlbumDetailPage({ albums, onAddToCart }) {
  const { albumId } = useParams();
  const [qty, setQty] = useState(1);

  const album = albums.find((a) => a.id === albumId);

  if (!album) {
    return (
      <div className="detail-error">
        <h2>Album Not Found</h2>
        <Link className="btn btn-primary" to="/">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <nav className="breadcrumb">
        <Link to="/">Catalog</Link> &gt; <span>{album.title}</span>
      </nav>

      <div className="detail-grid">
        <img src={album.image} alt={album.title} className="detail-img" />

        <div className="detail-info">
          <span className="album-genre">{album.genre}</span>
          <h1 className="detail-title">{album.title}</h1>
          <p className="detail-artist">{album.artist}</p>
          <p className="detail-price">${album.price.toFixed(2)}</p>
          <p className="detail-desc">{album.description}</p>

          <dl className="specs-list">
            <div>
              <dt>Catalog Number</dt>
              <dd>{album.specs.catalogNumber}</dd>
            </div>
            <div>
              <dt>Pressing Weight</dt>
              <dd>{album.specs.weight}</dd>
            </div>
            <div>
              <dt>Speed</dt>
              <dd>{album.specs.speed}</dd>
            </div>
            <div>
              <dt>Label</dt>
              <dd>{album.specs.label}</dd>
            </div>
          </dl>

          <p className="stock-tag">
            {album.stock > 0
              ? `In stock (${album.stock} available)`
              : "Out of stock"}
          </p>

          <h3>Tracklist</h3>
          <ol className="tracklist">
            {album.tracklist.map((track) => (
              <li key={track}>{track}</li>
            ))}
          </ol>

          <div className="detail-actions">
            <label htmlFor="detail-qty">Quantity:</label>
            <input
              type="number"
              id="detail-qty"
              min="1"
              max={album.stock}
              value={qty}
              onChange={(e) =>
                setQty(
                  Math.min(
                    album.stock,
                    Math.max(1, parseInt(e.target.value, 10) || 1),
                  ),
                )
              }
            />
            <button
              type="button"
              className="btn btn-primary"
              disabled={album.stock === 0}
              onClick={() => onAddToCart(album, qty)}
            >
              Add {qty} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;