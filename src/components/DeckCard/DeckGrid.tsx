import React, { useState } from 'react';
import { DeckCard } from "@/components/DeckCard/DeckCard";
import { ClassifiedData } from '@/types/ClassifyData';
import { DeckTypeName } from '@/utils/DeckTypeName';
import { Button } from '@/components/ui/button';

interface deckGridProps {
  data: ClassifiedData[];
}

export const DeckGrid: React.FC<deckGridProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 1ページあたりの項目数を設定

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage)));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="w-full px-8 py-4">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {currentItems.map((d) => (
          <DeckCard key={d.id} deckCode={d.code} deckType={DeckTypeName(d.main, d.sub)} ace={d.ace} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <div className="mx-2">
          {currentPage} / {Math.ceil(data.length / itemsPerPage)}
        </div>
        <Button onClick={nextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
          Next
        </Button>
      </div>
    </div>
  );
};