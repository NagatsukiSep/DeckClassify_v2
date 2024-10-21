import { classifyDef } from "@/utils/ClassifyDict"
import { Code2Dict } from "@/utils/Code2Dict";
import { ClassifiedData } from "@/types/ClassifyData";

export async function Classify(code: string) {
  const classifiedData: ClassifiedData = {
    main: "その他",
    sub: undefined,
    ace: "無し",
    id: 0,
    code: code
  }
  const deckList = await Code2Dict(code);

  const pattern = /(.*)\(ACE SPEC\)/g;
  for (const card in deckList) {
    const match = pattern.exec(card);
    if (match) {
      classifiedData.ace = match[1];
    }
    //　たまに(ACE SPEC) がつかないACE SPECがあるのでその対応
    //  エネルギーはつかなそうなので対応
    if (card === "レガシーエネルギー") {
      classifiedData.ace = "レガシーエネルギー";
    }
    if (card === "ネオアッパーエネルギー") {
      classifiedData.ace = "ネオアッパーエネルギー";
    }
  }

  let possibleMain: string[] = [];

  for (const main in classifyDef) {
    if (deckList[main] >= 2) {
      classifiedData.main = main;
      if (classifyDef[main].sub.length === 0) {
        return classifiedData;
      }
      else {
        for (const sub of classifyDef[main].sub) {
          if (deckList[sub] >= 2) {
            classifiedData.main = main;
            classifiedData.sub = sub;
            return classifiedData;
          }
          else if (sub.includes("かがやく") && deckList[sub] >= 1) {
            classifiedData.main = main;
            classifiedData.sub = sub;
            return classifiedData;
          }
        }
        possibleMain.push(main);
      }
    }
  }
  if (possibleMain.length === 1) {
    classifiedData.main = possibleMain[0];
    return classifiedData;
  }
  if (deckList && Object.keys(deckList).length === 0) {
    classifiedData.main = "エラー";
    return classifiedData;
  }
  return classifiedData;
}