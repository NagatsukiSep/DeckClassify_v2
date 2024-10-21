"use client";
import React from 'react';
import { useDeckCodeExtractor } from "@/hooks/useDeckCodeExtractor";
import { useDeckClassifier } from "@/hooks/useDeckClassifier";
import { DeckUploader } from "@/components/DeckUploader/DeckUploader";
import { DeckGrid } from "@/components/DeckCard/DeckGrid";
import { RankingTable } from '@/components/RankingTable';

const Home = () => {
  const { handleFileChange, extractSelectedColumns, deckCodes } = useDeckCodeExtractor();
  const { data, freq, total } = useDeckClassifier(deckCodes);

  return (
    <div>
      {data.length === 0 && (
        <DeckUploader handleSubmit={extractSelectedColumns} handleFileChange={handleFileChange} />
      )}
      {data.length > 0 && (
        <div>
          <DeckGrid data={data} />
          <div className="h-[1px] bg-black w-full px-3" />
          <RankingTable freq={freq} total={total} />
        </div>
      )}
    </div>
  );
};

export default Home;
