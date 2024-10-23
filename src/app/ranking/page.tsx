"use client";

import { useDeckDataContext } from "@/app/context/DeckDataContext";
import { RankingTable } from '@/components/RankingTable';

const Ranking = () => {
  const { freq, total } = useDeckDataContext();
  return (
    <div>
      <RankingTable freq={freq} total={total} />
      {total === 0 && (
        <div className="text-center m-4">デッキコードをアップロードしてください</div>
      )}
    </div>
  );
};

export default Ranking;