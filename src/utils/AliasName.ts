export function AliasName(name: string) {
  if (name.includes("ボスの指令")) {
    return "ボスの指令";
  } else if (name.includes("博士の研究")) {
    return "博士の研究";
  } else {
    return name;
  }
}