import React from 'react';

interface AnimeCardProps {
  imageUrl: string;
  title: string;
  onClick?: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ imageUrl, title, onClick }) => (
  <div
    className="aspect-[3/4] rounded-lg bg-[#232323] flex flex-col items-center justify-center overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-[#e50914] cursor-pointer group"
    onClick={onClick}
  >
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-3/4 object-cover mb-2 group-hover:scale-105 transition-transform duration-200"
    />
    <div className="px-2 text-center text-base font-semibold text-white group-hover:text-[#e50914] line-clamp-2">{title}</div>
  </div>
);

export default AnimeCard; 