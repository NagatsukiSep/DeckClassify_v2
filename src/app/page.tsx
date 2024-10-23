"use client";
import React from 'react';
import { useDeckCodeExtractor } from "@/hooks/useDeckCodeExtractor";
import { DeckUploader } from "@/components/DeckUploader/DeckUploader";
import { DeckGrid } from "@/components/DeckCard/DeckGrid";
import { useDeckDataContext } from "@/app/context/DeckDataContext";

const Home = () => {
  const { handleFileChange, extractSelectedColumns } = useDeckCodeExtractor();
  const { data, setDeckCodes } = useDeckDataContext();

  // デッキコードが抽出されたら、setDeckCodesを通じてコンテキストに渡す
  const handleDeckUpload = (columns: string[]) => {
    const extractedCodes = extractSelectedColumns(columns);
    setDeckCodes(extractedCodes);  // デッキコードを更新
  };

  return (
    <div>
      {data.length === 0 && (
        <DeckUploader handleSubmit={handleDeckUpload} handleFileChange={handleFileChange} />
      )}
      {data.length > 0 && (
        <DeckGrid data={data} />
      )}
    </div>
  );
};

export default Home;
