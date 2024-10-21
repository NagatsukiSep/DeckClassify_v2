export type ClassifiedData = {
  main: string;
  sub?: string;
  ace: string;
  id: number;
  code: string;
};

export type FreqType = {
  [deckType: string]: {
    freq: number,
    aceFreq: { [ace: string]: number }
  }
};