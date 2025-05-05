import React from 'react';
import { useParams } from 'react-router-dom';

const AnimeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Anime Details</h1>
        {/* Anime details will go here */}
        <p>Anime ID: {id}</p>
      </div>
    </div>
  );
};

export default AnimeDetailsPage; 