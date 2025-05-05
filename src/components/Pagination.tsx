import React from 'react';
import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  renderPageNumbers: () => React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  renderPageNumbers,
}) => (
  <div className="w-full flex justify-end items-center flex-wrap gap-2 mb-8">
    <button
      className="px-2 py-0.5 rounded font-bold border-2 border-transparent bg-[#232323] text-white hover:border-[#e50914] hover:text-[#e50914] transition-all duration-150 flex items-center disabled:opacity-50"
      onClick={() => onPageChange(1)}
      disabled={page === 1}
      aria-label="First page"
    >
      <ChevronFirst size={20} />
    </button>
    <button
      className="px-2 py-0.5 rounded font-bold border-2 border-transparent bg-[#232323] text-white hover:border-[#e50914] hover:text-[#e50914] transition-all duration-150 flex items-center disabled:opacity-50"
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
      aria-label="Previous page"
    >
      <ChevronLeft size={20} />
    </button>
    {renderPageNumbers()}
    <button
      className="px-2 py-0.5 rounded font-bold border-2 border-transparent bg-[#232323] text-white hover:border-[#e50914] hover:text-[#e50914] transition-all duration-150 flex items-center disabled:opacity-50"
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
      aria-label="Next page"
    >
      <ChevronRight size={20} />
    </button>
    <button
      className="px-2 py-0.5 rounded font-bold border-2 border-transparent bg-[#232323] text-white hover:border-[#e50914] hover:text-[#e50914] transition-all duration-150 flex items-center disabled:opacity-50"
      onClick={() => onPageChange(totalPages)}
      disabled={page === totalPages}
      aria-label="Last page"
    >
      <ChevronLast size={20} />
    </button>
    <select
      className="ml-4 border border-[#232323] bg-[#232323] text-white rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#e50914]"
      value={pageSize}
      onChange={e => onPageSizeChange(Number(e.target.value))}
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={25}>25</option>
    </select>
  </div>
);

export default Pagination; 