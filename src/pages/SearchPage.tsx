import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import type { Anime } from '../types/anime';
import { fetchAnimeList, fetchAnimeById } from '../utils/api';

const SearchPage: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debouncedSearch = useDebounce(search, 250);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchAnimeList({
          query: debouncedSearch,
          page,
          limit: pageSize,
        });
        setAnimeList(result.data);
        // const sortedAnime = result.data.slice().sort((a, b) => a.title.localeCompare(b.title));
        // setAnimeList(sortedAnime);
        setTotalPages(result.lastVisiblePage);
      } catch (err) {
        setError('Failed to fetch anime.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearch, page, pageSize]);

  // Reset to page 1 when search or pageSize changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, pageSize]);

  // Fetch anime details when selectedAnimeId changes
  useEffect(() => {
    if (selectedAnimeId !== null) {
      setModalLoading(true);
      fetchAnimeById(selectedAnimeId)
        .then(setSelectedAnime)
        .catch(() => setSelectedAnime(null))
        .finally(() => setModalLoading(false));
    } else {
      setSelectedAnime(null);
    }
  }, [selectedAnimeId]);

  // Helper to render page numbers (show up to 6 pages around current)
  const renderPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 3);
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`px-2 py-0.5 rounded font-bold border-2 transition-all duration-150
            ${i === page
              ? 'bg-[#e50914] text-white border-[#e50914]'
              : 'bg-[#232323] text-white border-transparent hover:border-[#e50914] hover:text-[#e50914]'}
          `}
          onClick={() => setPage(i)}
          disabled={i === page}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen w-full bg-[#141414] flex flex-col items-center overflow-x-hidden font-bold">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 text-white tracking-wide" style={{ letterSpacing: '2px' }}>Anime Search App</h1>
        {/* Search Bar */}
        <div className="w-full mt-8 mb-8">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder="Search anime..."
              className="w-full pl-10 pr-4 py-2 bg-[#232323] text-white border border-[#232323] rounded-full focus:outline-none focus:ring-2 focus:ring-[#e50914] placeholder-gray-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 min-h-[300px] pb-10">
          {loading ? (
            <div className="col-span-full flex justify-center items-center min-h-[200px]">
              <span className="text-center text-gray-400 text-lg font-semibold">Loading...</span>
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-[#e50914]">{error}</div>
          ) : animeList.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No results found.</div>
          ) : (
            animeList.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                imageUrl={anime.images.jpg.image_url}
                title={anime.title}
                onClick={() => setSelectedAnimeId(anime.mal_id)}
              />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="fixed left-0 bottom-0 w-full z-50 bg-[#141414] bg-opacity-95 shadow-[0_-2px_8px_rgba(0,0,0,0.5)] px-4 md:px-8">
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            renderPageNumbers={renderPageNumbers}
          />
        </div>

        {/* Modal for Anime Details */}
        {selectedAnimeId !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-all"
            onClick={() => setSelectedAnimeId(null)}
          >
            <div
              className="relative bg-[#181818] rounded-lg shadow-2xl max-w-3xl w-full mx-4 flex flex-col md:flex-row overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {modalLoading || !selectedAnime ? (
                <div className="flex-1 flex items-center justify-center min-h-[300px] text-white text-xl">Loading...</div>
              ) : (
                <>
                  <img
                    src={selectedAnime.images.jpg.image_url}
                    alt={selectedAnime.title}
                    className="w-full md:w-1/3 object-cover h-72 md:h-auto"
                  />
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedAnime.title}</h2>
                      <p className="text-gray-300 mb-4 line-clamp-6">{selectedAnime.synopsis}</p>
                      <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                        <span>Rank: <span className="text-white font-semibold">#{selectedAnime.rank}</span></span>
                        <span>Popularity: <span className="text-white font-semibold">#{selectedAnime.popularity}</span></span>
                        <span>Members: <span className="text-white font-semibold">{selectedAnime.members.toLocaleString()}</span></span>
                      </div>
                    </div>
                    <button
                      className="mt-4 px-6 py-2 bg-[#e50914] text-white rounded-lg font-bold text-lg hover:bg-[#b0060f] transition-colors self-start"
                      onClick={() => setSelectedAnimeId(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 