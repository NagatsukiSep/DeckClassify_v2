import Papa from 'papaparse';
import { useState } from 'react';

interface CSVRow {
  [key: string]: string;
}

export const useDeckCodeExtractor = () => {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [deckCodes, setDeckCodes] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as CSVRow[];
          setCsvData(data);
        },
      });
    }
  };

  const extractSelectedColumns = (columns: string[]) => {
    if (columns.length === 0) {
      alert('列名が入力されていません');
      return [];
    }
    if (csvData.length === 0) {
      alert('CSVファイルが選択されていません');
      return [];
    }
    let tmp: string[] = [];
    for (const column of columns) {
      if (!csvData[0][column]) {
        continue;
      }
      const extractedData = csvData.map((row) => row[column]);
      tmp = [...tmp, ...extractedData];
    }
    if (tmp.length === 0) {
      alert('列名が間違っているか、データが存在しません');
    }
    setDeckCodes(tmp);
    return tmp;
  };

  return { handleFileChange, extractSelectedColumns, deckCodes };
};
