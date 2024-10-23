"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClassifiedData, FreqType } from '@/types/ClassifyData';
import { Classify } from "@/utils/Classify";

interface DeckDataContextType {
  data: ClassifiedData[];
  freq: FreqType;
  total: number;
  deckCodes: string[];
  setDeckCodes: React.Dispatch<React.SetStateAction<string[]>>;
  setData: React.Dispatch<React.SetStateAction<ClassifiedData[]>>;
  setFreq: React.Dispatch<React.SetStateAction<FreqType>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const DeckDataContext = createContext<DeckDataContextType | undefined>(undefined);

export const useDeckDataContext = () => {
  const context = useContext(DeckDataContext);
  if (!context) {
    throw new Error('useDeckDataContext must be used within a DeckDataProvider');
  }
  return context;
};

export const DeckDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ClassifiedData[]>([]);
  const [freq, setFreq] = useState<FreqType>({});
  const [total, setTotal] = useState<number>(0);
  const [deckCodes, setDeckCodes] = useState<string[]>([]); // deckCodesを管理

  useEffect(() => {
    const classifyCodesSequentially = async () => {
      const newFreq: FreqType = {};
      const newData: ClassifiedData[] = [];
      let newTotal = 0;

      for (const code of deckCodes) {
        try {
          const res = await Classify(code);
          // Initialize main deck frequency if not present
          if (!newFreq[res.main]) {
            newFreq[res.main] = {
              freq: 0,
              subFreq: {},
              aceFreq: {}
            };
          }

          // Update frequency of main deck
          newFreq[res.main].freq += 1;

          // Update subFreq for the main deck
          if (res.sub) {
            if (newFreq[res.main].subFreq[res.sub]) {
              newFreq[res.main].subFreq[res.sub] += 1;
            } else {
              newFreq[res.main].subFreq[res.sub] = 1;
            }
          } else {
            newFreq[res.main].subFreq["サブ無し"] = 1;
          }

          // Update aceFreq for the main deck
          if (newFreq[res.main].aceFreq[res.ace]) {
            newFreq[res.main].aceFreq[res.ace] += 1;
          } else {
            newFreq[res.main].aceFreq[res.ace] = 1;
          }
          newTotal += 1;
          newData.push({ id: newData.length, code, main: res.main, sub: res.sub, ace: res.ace });
        } catch (e) {
          console.error(e);
        }
      }

      // freqのソート
      const sortedFreq = sortFreq(newFreq);
      setFreq(sortedFreq);
      setData(newData);
      setTotal(newTotal);
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

  return (
    <DeckDataContext.Provider value={{ data, freq, total, deckCodes, setDeckCodes, setData, setFreq, setTotal }}>
      {children}
    </DeckDataContext.Provider>
  );
};
