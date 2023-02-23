export function singleToDoubleQuotes(text: string): string {
  return text.replace(/'/g, `"`).replace(/(\w)"(\w)/g, `$1'$2`);
}