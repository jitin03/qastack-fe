/* eslint-disable no-bitwise */

export default function hex2rgba(hex: string, alpha = 1): string {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let colorArr = hex.substring(1).split('');
    if (colorArr.length === 3) {
      colorArr = [colorArr[0], colorArr[0], colorArr[1], colorArr[1], colorArr[2], colorArr[2]];
    }
    const color = parseInt(`0x${colorArr.join('')}`, 16);
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    return `rgba(${[r, g, b].join(',')},${alpha})`;
  }
  throw new Error('Bad Hex');
}
