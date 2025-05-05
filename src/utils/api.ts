import type { Anime } from '../types/anime';

export interface FetchAnimeListParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface FetchAnimeListResult {
  data: Anime[];
  lastVisiblePage: number;
}

export async function fetchAnimeList({ query = '', page = 1, limit = 10 }: FetchAnimeListParams): Promise<FetchAnimeListResult> {
  let url = '';
  if (query.trim() === '') {
    url = `https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}`;
  } else {
    url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return {
    data: data.data || [],
    lastVisiblePage: data.pagination?.last_visible_page || 1,
  };
} 