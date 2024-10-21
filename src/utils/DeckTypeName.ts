export function DeckTypeName(main: string, sub?: string) {
  if (sub === "キュワワー") {
    return `ロスト ${main}`;
  }
  else if (main === "キュワワー") {
    return `${sub?.replace("かがやく", "")} ロスト`;
  }
  else if (sub === undefined) {
    return main;
  }
  else {
    return `${main} / ${sub}`;
  }
}