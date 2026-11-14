import { useState } from "react";
import AlbumCard from "../components/AlbumCard";

function CatalogPage({ albums, onAddToCart }) {
  const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter((album) => album.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Indie Vinyl, Pressed to Last</h1>
        <p>Browse new pressings and reissues by genre.</p>
      </header>

      <div className="filter-bar">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={`filter-pill ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="album-grid">
        {filteredAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;