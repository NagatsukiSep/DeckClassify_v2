import React, { useState } from 'react';
import { DeckCard } from "@/components/DeckCard/DeckCard";
import { ClassifiedData } from '@/types/ClassifyData';
import { DeckTypeName } from '@/utils/DeckTypeName';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface deckGridProps {
  data: ClassifiedData[];
}


export const DeckGrid: React.FC<deckGridProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9; // 1ページあたりの項目数を設定
  const [itemsPerPageValue, setItemsPerPageValue] = useState("9");
  const fetchItemsPerPage = (itemsPerPageValue: string) => {
    setItemsPerPageValue(itemsPerPageValue);
    setCurrentPage(1);
  }

  const itemsPerPage = itemsPerPageValue === "all" ? data.length : Number(itemsPerPageValue);



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
      <div className="m-2 w-48 ml-auto">
        <Select value={itemsPerPageValue} onValueChange={(value) => fetchItemsPerPage(value)}>
          <SelectTrigger>
            <SelectValue>表示件数:{itemsPerPageValue}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>表示件数</SelectLabel>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="60">60</SelectItem>
              <SelectItem value="90">90</SelectItem>
              <SelectItem value="all">all</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {currentItems.map((d) => (
          <DeckCard key={d.id} deckCode={d.code} deckType={DeckTypeName(d.main, d.sub)} ace={d.ace} />
        ))}
      </div>
      {itemsPerPageValue !== "all" && (
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
      )};
    </div>
  );
};