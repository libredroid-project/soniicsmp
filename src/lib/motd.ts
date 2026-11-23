/**
 * Minecraft MOTD parser: turns §-coded server list text
 * (as returned by mcsrvstat.us in `motd.raw`) into styled segments,
 * so the live MOTD renders exactly like it does in the Minecraft
 * multiplayer server list: colors, hex gradients, bold and all.
 */

export type MotdSegment = {
  text: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
};

/** Vanilla Java chat palette (§0-§9, §a-§f). */
const MC_COLORS: Record<string, string> = {
  "0": "#000000",
  "1": "#0000AA",
  "2": "#00AA00",
  "3": "#00AAAA",
  "4": "#AA0000",
  "5": "#AA00AA",
  "6": "#FFAA00",
  "7": "#AAAAAA",
  "8": "#555555",
  "9": "#5555FF",
  a: "#55FF55",
  b: "#55FFFF",
  c: "#FF5555",
  d: "#FF55FF",
  e: "#FFFF55",
  f: "#FFFFFF",
};

const DEFAULT_COLOR = "#FFFFFF";

/** Parse one MOTD line into segments ready to render as <span>s. */
export function parseMotdLine(line: string): MotdSegment[] {
  const segs: MotdSegment[] = [];
  let color = DEFAULT_COLOR;
  let bold = false;
  let italic = false;
  let underline = false;
  let strike = false;
  let buf = "";

  const push = () => {
    if (buf) {
      segs.push({ text: buf, color, bold, italic, underline, strike });
      buf = "";
    }
  };

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "§" && i + 1 < line.length) {
      const code = line[i + 1].toLowerCase();
      if (code === "#") {
        const hex = line.slice(i + 2, i + 8);
        if (/^[0-9a-fA-F]{6}$/.test(hex)) {
          push();
          color = `#${hex.toUpperCase()}`;
          bold = italic = underline = strike = false;
          i += 7; // 8 chars total (§#RRGGBB) including the loop's i++
          continue;
        }
        i += 1; // not a valid hex code, swallow the §
        continue;
      }
      if (code === "r") {
        push();
        color = DEFAULT_COLOR;
        bold = italic = underline = strike = false;
        i += 1;
        continue;
      }
      if (code === "l" || code === "o" || code === "n" || code === "m" || code === "k") {
        if (code === "l") bold = true;
        if (code === "o") italic = true;
        if (code === "n") underline = true;
        if (code === "m") strike = true;
        // §k (obfuscated) has no static representation and is ignored.
        i += 1;
        continue;
      }
      if (MC_COLORS[code]) {
        push();
        color = MC_COLORS[code];
        bold = italic = underline = strike = false;
        i += 1;
        continue;
      }
      i += 1; // unknown code, swallow it
      continue;
    }
    buf += ch;
  }
  push();

  return segs.length
    ? segs
    : [{ text: line, color: DEFAULT_COLOR, bold: false, italic: false, underline: false, strike: false }];
}
