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
    subFreq: { [sub: string]: number },
    aceFreq: { [ace: string]: number }
  }
};