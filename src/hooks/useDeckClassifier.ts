import { useState, useEffect } from 'react';
import { Classify } from "@/utils/Classify";
import { ClassifiedData, FreqType } from '@/types/ClassifyData';


export const useDeckClassifier = (deckCodes: string[]) => {
  const [data, setData] = useState<ClassifiedData[]>([]);
  const [freq, setFreq] = useState<FreqType>({});
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const classifyCodesSequentially = async () => {
      const newFreq: FreqType = {};
      const newData: ClassifiedData[] = [];
      for (const code of deckCodes) {
        try {
          const res = await Classify(code);
          if (newFreq[res.main]) {
            newFreq[res.main].freq += 1;
            if (newFreq[res.main].aceFreq[res.ace]) {
              newFreq[res.main].aceFreq[res.ace] += 1;
            } else {
              newFreq[res.main].aceFreq[res.ace] = 1;
            }
          } else {
            newFreq[res.main] = {
              freq: 1,
              aceFreq: { [res.ace]: 1 }
            };
          }
          setTotal((prevTotal) => prevTotal + 1);
          newData.push({ id: newData.length, code, main: res.main, sub: res.sub, ace: res.ace });
        } catch (e) {
          console.error(e);
        }
      }
      // freqのソート
      const sortedFreq = sortFreq(newFreq);
      setFreq(sortedFreq);
      setData(newData);
    };

    if (deckCodes.length > 0) {
      classifyCodesSequentially();
    }
  }, [deckCodes]);

  const sortFreq = (newFreq: FreqType) => {
    const sortable = Object.entries(newFreq);
    sortable.sort((a, b) => b[1].freq - a[1].freq);
    const sortedFreq: FreqType = {};
    sortable.forEach(([key, value]) => {
      sortedFreq[key] = value;
    });
    return sortedFreq;
  };

  return { data, freq, total };
};
