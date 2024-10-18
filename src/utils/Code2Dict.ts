import { AliasName } from "./AliasName";

interface Card {
  name: string;
  imagePath: string;
}
interface CardDict {
  [id: string]: Card;
}

export async function Code2Dict(deckCode: string): Promise<{ [key: string]: number; }> {
  if (deckCode === null) {
    return {};
  }
  const response = await fetch('https://www.pokemon-card.com/deck/confirm.html/deckID/' + deckCode);
  const text = await response.text();
  const cardDict = GenCardDict(text);
  const deckList = GetCardAmount(text, cardDict);
  return deckList;

}

function GenCardDict(htmlText: string) {
  const cardDict: CardDict = {};
  const pattern = /NameAlt\[(\d+)\]='(.+)';[\s\S]{2}PCGDECK\.searchItemCardPict\[\d+\]='(.+)'/g;
  let match;
  while ((match = pattern.exec(htmlText)) !== null) {
    const [, id, name, imagePath] = match;
    cardDict[id] = {
      name: AliasName(name),
      imagePath: imagePath,
    };
  }
  return cardDict;
};

function extractDeckData(pattern: RegExp, htmlText: string, cardDict: CardDict) {
  const amountPattern = /(\d+)_(\d){1,2}/g;

  const deckList: { [key: string]: number; } = {};

  const match = pattern.exec(htmlText);
  const data = match ? match[1] : '';
  let subMatch;
  while ((subMatch = amountPattern.exec(data)) !== null) {
    const [, id, amount] = subMatch;
    if (deckList[cardDict[id].name] !== undefined) {
      deckList[cardDict[id].name] += parseInt(amount);
    } else {
      deckList[cardDict[id].name] = parseInt(amount);
    }
  }
  return deckList;
}

function GetCardAmount(htmlText: string, cardDict: CardDict) {
  const deckList: { [key: string]: number; } = {};

  const patterns = [
    /id="deck_pke"[\s\S]value="(.+)"/g,
    /id="deck_gds"[\s\S]value="(.+)"/g,
    /id="deck_tool"[\s\S]value="(.+)"/g,
    /id="deck_sup"[\s\S]value="(.+)"/g,
    /id="deck_sta"[\s\S]value="(.+)"/g,
    /id="deck_ene"[\s\S]value="(.+)"/g,
  ];

  patterns.forEach(pattern => {
    const subDeckList = extractDeckData(pattern, htmlText, cardDict);
    Object.keys(subDeckList).forEach(key => {
      deckList[key] = subDeckList[key];
    });
  });

  return deckList;
}