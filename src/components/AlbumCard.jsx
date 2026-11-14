import { Link } from "react-router-dom";

function AlbumCard({ album, onAddToCart }) {
  return (
    <article className="album-card">
      <Link to={`/album/${album.id}`}>
        <img className="album-image" src={album.image} alt={album.title} />
      </Link>
      <div className="album-body">
        <span className="album-genre">{album.genre}</span>
        <h3 className="album-title">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
        </h3>
        <p className="album-artist">{album.artist}</p>
        <p className="album-price">${album.price.toFixed(2)}</p>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => onAddToCart(album)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default AlbumCard;