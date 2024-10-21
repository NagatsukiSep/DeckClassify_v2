import { useState } from "react";
import { FreqType } from "@/types/ClassifyData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"


type RankingTableProps = {
  freq: FreqType,
  total: number
}

export const RankingTable: React.FC<RankingTableProps> = ({ freq, total }) => {
  const [showAce, setShowAce] = useState<boolean>(false);
  const handleShowAce = () => {
    setShowAce(!showAce);
  };
  return (
    <div>
      <div className="py-2">
        <div className="w-full flex justify-between">
          <b>デッキタイプ別割合</b>
          <div className="">
            {total}   デッキ中
          </div>
        </div>
        <div className="w-full flex justify-end text-sm">
          <Checkbox id="showAce" onCheckedChange={handleShowAce} />
          <label htmlFor="showAce">ACE SPECを表示する</label>
        </div>
        <Table
          className="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <TableHeader
            className="border-b border-neutral-200 font-medium dark:border-white/10">
            <TableRow>
              <TableHead scope="col" className="mx-6 py-4 w-16 text-center"></TableHead>
              <TableHead scope="col" className="mx-6 py-4">デッキタイプ</TableHead>
              <TableHead scope="col" className="mx-6 py-4 w-16 text-center">数</TableHead>
              <TableHead scope="col" className="mx-6 py-4 w-16 text-center">割合</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(freq).map((deckType) => (
              <TableRow key={deckType} className="border-b border-neutral-200 dark:border-white/10">
                <TableCell className="mx-6 py-4 font-medium text-center">{Object.keys(freq).indexOf(deckType) + 1}</TableCell>
                <TableCell className="mx-6 py-4">
                  <div className="font-bold">{deckType}</div>
                  {showAce && (
                    <ul className="ml-4">
                      {Object.keys(freq[deckType].aceFreq).map((ace) => (
                        <li key={ace} className="border-l border-neutral-400 dark:border-white/10 pl-2">
                          {ace}: {freq[deckType].aceFreq[ace]} <small>({(freq[deckType].aceFreq[ace] / freq[deckType].freq * 100).toFixed(0)}%)</small>
                        </li>
                      ))}
                    </ul>
                  )}
                </TableCell>
                <TableCell className="mx-6 py-4 text-center">{freq[deckType].freq}</TableCell>
                <TableCell className="mx-6 py-4 text-center">{(freq[deckType].freq / total * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}