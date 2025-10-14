import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import Footer from './Footer'; // Footer import karo

const API_BASE = 'https://movie-app-sace.onrender.com';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [category, setCategory] = useState('trending');

  const categories = [
    { key: 'trending', label: 'Trending' },
    { key: 'action', label: 'Action' },
    { key: 'comedy', label: 'Comedy' },
    { key: 'horror', label: 'Horror' },
    { key: 'romance', label: 'Romance' },
    { key: 'sci-fi', label: 'Sci-Fi' },
    { key: 'adventure', label: 'Adventure' },
    { key: 'animation', label: 'Animation' },
    { key: 'documentary', label: 'Documentary' },
    { key: 'motivational', label: 'Motivational' }
  ];

  useEffect(() => { fetchMovies(category); }, [category]);

  const fetchMovies = async (cat) => {
    setLoading(true);
    try {
      let url = `${API_BASE}/api/trending`;
      if(cat !== 'trending') url = `${API_BASE}/api/category/${cat}`;
      const res = await axios.get(url);
      setMovies(res.data.results || []);
    } catch(err) { console.error(err); }
    setLoading(false);
  };

  const searchMoviesByQuery = async (q) => {
    if(!q) return fetchMovies(category);
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/search`, { params: { q } });
      setMovies(res.data.results || []);
    } catch(err) { console.error(err); }
    setLoading(false);
  };

  const searchMovies = async (e) => {
    e?.preventDefault();
    searchMoviesByQuery(query);
  };

  const handleCategoryClick = (catLabel) => {
    setQuery(catLabel);          // category as query
    searchMoviesByQuery(catLabel);
  };

  const openMovie = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/movie/${id}`);
      setSelected(res.data);
      document.body.style.overflow = 'hidden';
    } catch(err) { console.error(err); }
  };

  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen transition-colors duration-500`}>
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:px-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">MovieZone</h1>
        <button onClick={()=>setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-white/20 transition">
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400"/> : <MoonIcon className="w-6 h-6 text-gray-800"/>}
        </button>
      </header>

      {/* Search Bar */}
      <form onSubmit={searchMovies} className="flex flex-col sm:flex-row gap-3 p-4 sm:px-6">
        <input
          type="text"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="Search movies..."
          className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition w-full sm:w-auto">Search</button>
      </form>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 px-4 sm:px-6 mb-6">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => handleCategoryClick(cat.label)}
            className={`px-4 py-2 rounded-xl transition font-semibold ${
              query===cat.label 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : `${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
     {/* Movies Grid */}
{loading ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 sm:px-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="animate-pulse bg-white/10 h-[250px] sm:h-[300px] rounded-xl backdrop-blur-md"></div>
    ))}
  </div>
) : movies.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-4 sm:px-6 mb-6">
    {movies.map((m) => (
      <div
        key={m.id}
        className="relative cursor-pointer rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg hover:scale-105 transform transition shadow-lg hover:shadow-2xl"
        onClick={() => openMovie(m.id)}
      >
        <img
          src={m.poster_path ? IMAGE_BASE + m.poster_path : `https://via.placeholder.com/500x750?text=${encodeURIComponent(m.title)}`}
          alt={m.title}
          className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[300px] object-cover rounded-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent text-white font-semibold text-center text-sm sm:text-base">
          {m.title}
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="flex justify-center items-center h-[300px] text-center px-4">
    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-400">
      😔 No movies found! Try a different search or category.
    </p>
  </div>
)}


      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-start z-50 p-4 overflow-y-auto pt-10 sm:pt-16">
          <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-6 rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col md:flex-row gap-4 sm:gap-6">
            <img
              src={selected.poster_path ? IMAGE_BASE + selected.poster_path : ''}
              alt={selected.title}
              className="w-full md:w-64 rounded-xl shadow-lg"
            />
            <div className="flex-1 text-white flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{selected.title}</h2>
              <p className="mb-2 text-sm sm:text-base">{selected.overview}</p>
              <p className="text-xs sm:text-sm mb-2">Rating: {selected.vote_average} • Runtime: {selected.runtime} min</p>
              {selected.videos?.results?.slice(0,2).map(v => v.site === 'YouTube' && (
                <div key={v.id} className="mb-4">
                  <p className="text-xs sm:text-sm mb-1">{v.name} ({v.type})</p>
                  <iframe
                    width="100%"
                    height="200"
                    className="rounded-lg"
                    src={`https://www.youtube.com/embed/${v.key}`}
                    title={v.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
              <div className="mt-auto text-right">
                <button
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer darkMode={darkMode} onSearchCategory={handleCategoryClick} />
    </div>
  );
}
