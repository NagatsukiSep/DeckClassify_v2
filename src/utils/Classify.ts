import { classifyDict } from "./ClassifyDict"
import { Code2Dict } from "./Code2Dict";
import { ClassifiedData } from "@/types/ClassifyData";

export async function Classify(code: string) {
  const classifiedData : ClassifiedData = {
    deckType: "その他",
    ace: "無し"
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

  for (const deckType in classifyDict) {
    const condition = classifyDict[deckType];
    let flag = true;
    for (const cardName in condition) {
      switch (condition[cardName].gl) {
        case "g":
          if (deckList[cardName] < condition[cardName].amount || deckList[cardName] === undefined) {
            flag = false;
          }
          break;
        case "l":
          if (deckList[cardName] >= condition[cardName].amount && deckList[cardName] !== undefined) {
            flag = false;
          }
          break;
        default:
          flag = false;
          break;
      }
    }
    if (flag) {
      classifiedData.deckType = deckType;
      return classifiedData;
    }
  }
  if (deckList && Object.keys(deckList).length === 0) {
    classifiedData.deckType = "エラー";
    return classifiedData;
  }
  return classifiedData;
}