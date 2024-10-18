"use client";
import React, { useEffect } from 'react';
import Papa from 'papaparse';
import { Classify } from "@/utils/Classify";
import { BasicButton } from "@/components/Button/BasicButton";
import { DeckGrid } from "@/components/DeckCard/DeckGrid";

interface CSVRow {
  [key: string]: string;
}

const Home = () => {
  // const codes = [
  //   "Fk5fFk-P1mhA0-5vbfvF",
  //   "PgQLnL-mXh5oJ-gHQQgg",
  //   "pMMp22-1XYzpI-2MUXyy",
  //   "pMMp22-1XYzpI-2MUXyy",
  // ];
  const [csvData, setCsvData] = React.useState<CSVRow[]>([]);
  const [deckCodes, setDeckCodes] = React.useState<string[]>([]);
  const addDeckCode = (code: string[]) => {
    setDeckCodes([...deckCodes, ...code]);
  }
  // const [column, setColumn] = React.useState<string>('デッキコード');


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

  const handleOnClick = () => {
    if (csvData.length === 0) {
      return;
    }
    // 二重に実行されないようにする
    if (data.length > 0) {
      return;
    }
    extractSelectedColumns(csvData, ["デッキコード", "デッキコード1", "デッキコード2", "デッキコード3"]);
  }

  const extractSelectedColumns = (data: CSVRow[], columns: string[]) => {
    // useEffectに敗北してる感あるけど一旦tmpにデッキコードを格納している
    let tmp: string[] = [];
    for (const column of columns) {
      if (!data[0][column]) {
        continue;
      }
      const extractedData = data.map((row) => row[column]);
      tmp = [...tmp, ...extractedData];
    }
    addDeckCode(tmp);
  };


  type DataType = {
    id: number,
    code: string,
    deckType: string
    ace: string
  }

  type FreqType = {
    [deckType: string]: {
      freq: number,
      aceFreq: {[ace: string]: number}
    }
  }

  const [data, setData] = React.useState<DataType[]>([]);
  const [freq, setFreq] = React.useState<FreqType>({});
  const [total, setTotal] = React.useState<number>(0);
  
  const [showAce, setShowAce] = React.useState<boolean>(false);
  const handleShowAce = () => {
    setShowAce(!showAce);
  }

  useEffect(() => {
    const classifyCodesSequentially = async () => {
      const newFreq: FreqType = {};
      const newData: DataType[] = [];
      for (const code of deckCodes) {
        try {
          const res = await Classify(code);
          if (newFreq[res.deckType]) {
            newFreq[res.deckType].freq += 1;
            if (newFreq[res.deckType].aceFreq[res.ace]) {
              newFreq[res.deckType].aceFreq[res.ace] += 1;
            } else {
              newFreq[res.deckType].aceFreq[res.ace] = 1;
            }
          } else {
            newFreq[res.deckType] = { 
              freq: 1, 
              aceFreq: {
                [res.ace]: 1
              } };
          }
          setTotal((prevTotal) => prevTotal + 1);
          newData.push({ id: newData.length, code, deckType: res.deckType, ace: res.ace});
        } catch (e) {
          console.error(e);
        }
      }
      setFreq((prevFreq) => ({ ...prevFreq, ...newFreq }));
      //freqをソートする
      const sortable = Object.entries(newFreq);
      sortable.sort((a, b) => b[1].freq - a[1].freq);
      const sortedFreq: FreqType = {};
      sortable.forEach(([key, value]) => {
        sortedFreq[key] = value;
      });
      setFreq(sortedFreq);
      //aceFreqをソートする
      Object.keys(sortedFreq).forEach((deckType) => {
        const aceFreq = sortedFreq[deckType].aceFreq;
        const sortableAce = Object.entries(aceFreq);
        sortableAce.sort((a, b) => b[1] - a[1]);
        const sortedAceFreq: {[ace: string]: number} = {};
        sortableAce.forEach(([key, value]) => {
          sortedAceFreq[key] = value;
        });
        sortedFreq[deckType].aceFreq = sortedAceFreq;
      });
      setFreq(sortedFreq);
      setData(newData);
    };
    classifyCodesSequentially();
  }, [deckCodes]);


  return (
    <div className="md:px-16 px-8 pt-8 overflow-x-hidden">
      <img src="Logo.png" alt="logo" className="w-32 h-auto m-2" />
      <div className="font-m-plus-1p">
      <label htmlFor="csvUpload">ここにCSVファイルをアップロードしてください</label>
      </div>
    <div className="font-m-plus-1p">
      <input type="file" id="csvUpload" accept=".csv" onChange={handleFileChange} title="CSVファイルを選択" />
    </div>
    <BasicButton onClick={handleOnClick}>集計</BasicButton>
    <div className="h-[1px] bg-black w-full px-3" />
    {data.length > 0 && (
      <div>
        <DeckGrid data={data} />
        <div className="h-[1px] bg-black w-full px-3" />
        <div className="py-2">
        {/* {Object.keys(freq).map((deckType) => (
          <li key={deckType}>
            <strong>{deckType}</strong>: {freq[deckType]}
          </li>
        ))} */}
        <div className="w-full flex justify-between">
          <b>デッキタイプ別割合</b>
          <div className="">
            {total}   デッキ中
          </div>
        </div>
        <div className="w-full flex justify-end text-sm">
          <input type="checkbox" id="showAce" onChange={handleShowAce} />
          <label htmlFor="showAce">ACE SPECを表示する</label>
        </div>
        <table
          className="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <thead
            className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="mx-6 py-4"></th>
              <th scope="col" className="mx-6 py-4">デッキタイプ</th>
              <th scope="col" className="mx-6 py-4">数</th>
              <th scope="col" className="mx-6 py-4">割合</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(freq).map((deckType) => (
              <tr key={deckType} className="border-b border-neutral-200 dark:border-white/10">
                <td className="mx-6 py-4 font-medium">{Object.keys(freq).indexOf(deckType) + 1}</td>
                <td className="mx-6 py-4">
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
                  </td>
                <td className="whitespace-break-spaces mx-6 py-4">{freq[deckType].freq}</td>
                <td className="mx-6 py-4">{(freq[deckType].freq / total * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    )}
    </div>
  );
}

export default Home;

