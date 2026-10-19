// ASCII art generators for the cathedral site.
// Pure functions, no DOM. Each generator returns { chars, kinds }:
//   chars[y][x] = the character in that cell
//   kinds[y][x] = a short "material" key ('' = empty) used to pick a color
// Render with toLayers(): one <span> per material, all stacked in the same
// CSS grid cell (grid-area: 1 / 1) with white-space: pre and a monospace font.
// One span per color keeps the DOM tiny (a few elements instead of thousands).

// ---------------------------------------------------------------------------
// Rendering helper
// ---------------------------------------------------------------------------

export type Grid = string[][];

export type Layer = { className: string; text: string };

/**
 * Split a char grid into one text block per material.
 */
export function toLayers(
  chars: Grid,
  kinds: Grid,
  classMap: Record<string, string>,
): Layer[] {
  const out: Layer[] = [];
  for (const key of Object.keys(classMap)) {
    let any = false;
    const text = chars
      .map((row, y) =>
        row
          .map((ch, x) => {
            if (kinds[y][x] === key) {
              any = true;
              return ch;
            }
            return " ";
          })
          .join(""),
      )
      .join("\n");
    if (any) out.push({ className: classMap[key], text });
  }
  return out;
}

// Material keys used by the stained glass:
//   s = stone frame, l = lead lines, q = pale grisaille glass,
//   g = gold, r = ruby, b = cobalt, e = emerald, v = violet, w = white emblem
export const GLASS_CLASSES: Record<string, string> = {
  s: "c-s",
  l: "c-l",
  g: "gl c-g",
  r: "gl c-r",
  b: "gl c-b",
  e: "gl c-e",
  v: "gl c-v",
  q: "gl c-q",
  w: "gl c-w",
};

// ---------------------------------------------------------------------------
// Home: the triptych (three pointed lancet windows)
// ---------------------------------------------------------------------------

export type Medallion = { cy: number; k: string; emb: string[] };

type CharKinds = { chars: Grid; kinds: Grid };

/**
 * One lancet window: a pointed (equilateral) arch on top of a rectangle.
 * Cells are twice as tall as they are wide, so y is doubled for geometry.
 * @param C  width in columns (odd)
 * @param R  height in rows
 * @param meds  medallions: center row, glass color key, emblem lines
 */
export function lancet(C: number, R: number, meds: Medallion[]): CharKinds {
  const half = (C - 1) / 2;
  const ys = Math.round((C * 0.866) / 2); // springing line row
  const rad = C - 1;
  const chars: Grid = [],
    kinds: Grid = [];
  for (let y = 0; y < R; y++) {
    const cr: string[] = [],
      kr: string[] = [];
    for (let x = 0; x < C; x++) {
      const X = x - half,
        Y = y * 2,
        Ys = ys * 2;
      let inside: boolean, edge: boolean;
      if (Y >= Ys) {
        inside = Math.abs(X) <= half;
        edge = Math.abs(X) > half - 1.2 || y === R - 1;
      } else {
        const dl = Math.hypot(X + half, Y - Ys),
          dr = Math.hypot(X - half, Y - Ys);
        inside = dl <= rad && dr <= rad;
        edge = inside && (dl > rad - 1.6 || dr > rad - 1.6);
      }
      let ch = " ",
        k = "";
      if (!inside) {
        // outside the window
      } else if (edge) {
        ch = "#";
        k = "s";
      } else {
        let hit: { m: Medallion; d: number } | null = null;
        for (const m of meds) {
          const d = Math.hypot(X, (y - m.cy) * 2);
          if (d < half - 1.5) {
            hit = { m, d };
            break;
          }
        }
        if (hit) {
          if (hit.d > half - 2.6) {
            ch = "o";
            k = "l";
          } else {
            ch = "%";
            k = hit.m.k;
          }
        } else if ((x + y) % 3 === 0) {
          ch = "/";
          k = "l";
        } else if (((x - y) % 3 + 3) % 3 === 0) {
          ch = "\\";
          k = "l";
        } else {
          ch = ":";
          k = "q";
        }
      }
      cr.push(ch);
      kr.push(k);
    }
    chars.push(cr);
    kinds.push(kr);
  }
  // Emblems: centered in each medallion, white, with a one-space clear margin.
  for (const m of meds) {
    m.emb.forEach((s, i) => {
      const y = m.cy - Math.floor(m.emb.length / 2) + i;
      const p = " " + s + " ";
      const x0 = Math.round(half - Math.floor(p.length / 2));
      for (let j = 0; j < p.length; j++) {
        chars[y][x0 + j] = p[j];
        kinds[y][x0 + j] = p[j] === " " ? "" : "w";
      }
    });
  }
  return { chars, kinds };
}

/** The Home page triptych: 61 x 37 cells. Left = code, center = Luis, right = ML. */
export function triptych(): CharKinds {
  const W = 61,
    H = 37;
  const chars: Grid = Array.from({ length: H }, () => new Array(W).fill(" "));
  const kinds: Grid = Array.from({ length: H }, () => new Array(W).fill(""));
  const blit = (L: CharKinds, x0: number, y0: number) => {
    L.chars.forEach((row, y) =>
      row.forEach((ch, x) => {
        if (ch !== " " || L.kinds[y][x]) {
          chars[y0 + y][x0 + x] = ch;
          kinds[y0 + y][x0 + x] = L.kinds[y][x];
        }
      }),
    );
  };
  blit(
    lancet(17, 30, [
      { cy: 13, k: "r", emb: ["{ }"] },
      { cy: 22, k: "b", emb: ["</>"] },
    ]),
    0,
    7,
  );
  blit(
    lancet(21, 37, [
      { cy: 15, k: "g", emb: ["L.O."] },
      { cy: 24, k: "r", emb: ["(X)"] }, // volleyball
      { cy: 32, k: "b", emb: ["o=o", "\\|/"] }, // basketball hoop
    ]),
    20,
    0,
  );
  blit(
    lancet(17, 30, [
      { cy: 13, k: "e", emb: ["o-o", "|X|", "o-o"] }, // neural net
      { cy: 22, k: "v", emb: ["[][]", " [][]"] }, // tetris piece
    ]),
    44,
    7,
  );
  return { chars, kinds };
}

// ---------------------------------------------------------------------------
// Portfolio: candle rack (one votive per day of GitHub activity)
// ---------------------------------------------------------------------------

export const CANDLE_CLASSES: Record<string, string> = {
  s: "c-s",
  k: "wick",
  off: "cup-off",
  on: "cup-on",
  f0: "fl fl0",
  f1: "fl fl1",
  f2: "fl fl2",
};

/**
 * @param days  oldest first, length = perTier * tiers (default 84 = 12 weeks)
 * Each candle is 3 cells wide: flame row ('^' lit, '.' unlit wick), cup row '[_]', shelf row '='.
 * Flames are split across three classes (f0/f1/f2) so they flicker out of sync.
 */
export function candleRack(
  days: boolean[],
  perTier = 21,
  tiers = 4,
): CharKinds {
  const W = perTier * 4 - 1;
  const chars: Grid = [],
    kinds: Grid = [];
  for (let t = 0; t < tiers; t++) {
    const flame = new Array(W).fill(" "),
      fk = new Array(W).fill("");
    const cup = new Array(W).fill(" "),
      ck = new Array(W).fill("");
    const shelf = new Array(W).fill("="),
      sk = new Array(W).fill("s");
    for (let i = 0; i < perTier; i++) {
      const day = t * perTier + i,
        x = i * 4,
        on = !!days[day];
      flame[x + 1] = on ? "^" : ".";
      fk[x + 1] = on ? "f" + (day % 3) : "k";
      cup[x] = "[";
      cup[x + 1] = "_";
      cup[x + 2] = "]";
      ck[x] = ck[x + 1] = ck[x + 2] = on ? "on" : "off";
    }
    chars.push(flame, cup, shelf);
    kinds.push(fk, ck, sk);
  }
  return { chars, kinds };
}

/** Deterministic fake data for the mock (weekdays more likely lit). Replace with GitHub data. */
export function sampleDays(seed = 20261017, n = 84): boolean[] {
  let s = seed;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from(
    { length: n },
    (_, d) => rnd() < (d % 7 === 5 || d % 7 === 6 ? 0.25 : 0.62),
  );
}

// ---------------------------------------------------------------------------
// About: walkable 11-ring labyrinth (Chartres style, unicursal, verified)
// ---------------------------------------------------------------------------

// Path spec found by search: which quarter-ring segments pass straight through
// each axis, and where the path makes a hairpin turn between ring c and c+1.
// Quadrants: 0=SW 1=NW 2=NE 3=SE. Rings: 1 = outermost, 11 = innermost.
type Side = "W" | "N" | "E" | "S";

const LAB_SPEC: {
  passes: Record<Side, number[]>;
  turns: [Side, number, number][];
  entry: number;
  entryQ: number;
  exitQ: number;
} = {
  passes: { W: [1, 6, 7, 8, 11], N: [9], E: [1, 10, 11], S: [] },
  turns: [
    ["W", 0, 4], ["S", 0, 3], ["W", 0, 2], ["S", 0, 1], ["N", 1, 1],
    ["W", 1, 2], ["N", 1, 3], ["W", 1, 4], ["N", 1, 5], ["S", 0, 6],
    ["N", 1, 7], ["S", 0, 8], ["W", 0, 9], ["S", 0, 10], ["N", 1, 10],
    ["W", 1, 9], ["E", 2, 8], ["N", 2, 7], ["E", 2, 6], ["N", 2, 5],
    ["E", 2, 4], ["N", 2, 3], ["E", 2, 2], ["N", 2, 1], ["S", 3, 1],
    ["E", 3, 2], ["S", 3, 3], ["E", 3, 4], ["S", 3, 5], ["E", 3, 6],
    ["S", 3, 7], ["E", 3, 8], ["S", 3, 9], ["N", 2, 10],
  ],
  entry: 5,
  entryQ: 0,
  exitQ: 3,
};

export type Labyrinth = {
  S: number;
  M: number;
  open: boolean[][];
  wallText: string;
  path: [number, number][];
  start: [number, number];
  isCenter: (x: number, y: number) => boolean;
};

/**
 * Build the labyrinth on a 53 x 53 unit grid. Each unit renders as 2 characters
 * wide x 1 row tall (square on screen with a 0.6em-wide mono font and line-height 1.2).
 * Returns:
 *   open[y][x]  walkable?
 *   wallText    the line-drawn walls as one pre-formatted string (render with the stone color)
 *   path        the single route from the entrance (start) to the center, as [x, y] units
 *   start       entrance cell, below the bottom wall
 *   isCenter(x, y)
 * Player/trail are drawn in separate layers at column x*2 of row y.
 */
export function buildLabyrinth(): Labyrinth {
  const M = 26,
    S = 2 * M + 1;
  const dist = (x: number, y: number) =>
    Math.max(Math.abs(x - M), Math.abs(y - M));
  const open: boolean[][] = Array.from({ length: S }, (_, y) =>
    Array.from({ length: S }, (_, x) => {
      const d = dist(x, y);
      return d <= 2 || (d <= 24 && d % 2 === 0);
    }),
  );
  const set = (ux: number, uy: number, v: boolean) => {
    open[uy + M][ux + M] = v;
  };
  const dOf = (c: number) => 4 + 2 * (11 - c);
  const hwOf = (X: Side) => (X === "S" ? 1 : 0);
  const cell = (X: Side, d: number, o: number): [number, number] =>
    X === "S" ? [o, d] : X === "N" ? [o, -d] : X === "E" ? [d, o] : [-d, o];
  const SIDE: Record<Side, Record<number, number>> = {
    S: { 0: -1, 3: 1 },
    N: { 1: -1, 2: 1 },
    E: { 2: -1, 3: 1 },
    W: { 1: -1, 0: 1 },
  };
  for (const X of ["W", "N", "E", "S"] as Side[]) {
    const hw = hwOf(X);
    for (let c = 1; c <= 11; c++) {
      if (LAB_SPEC.passes[X].includes(c)) continue;
      for (let o = -hw; o <= hw; o++) {
        const p = cell(X, dOf(c), o);
        set(p[0], p[1], false);
      }
    }
  }
  for (const [X, q, c] of LAB_SPEC.turns) {
    const p = cell(X, dOf(c) - 1, SIDE[X][q] * (hwOf(X) + 1));
    set(p[0], p[1], true);
  }
  for (let d = M; d > dOf(LAB_SPEC.entry); d--) set(0, d, true);
  set(0, dOf(LAB_SPEC.entry), true);
  set(SIDE.S[LAB_SPEC.entryQ], dOf(LAB_SPEC.entry), true);
  set(SIDE.S[LAB_SPEC.exitQ] * 2, 3, true);

  const isWall = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < S && y < S && !open[y][x] && dist(x, y) <= 25;
  const vert = (x: number, y: number) =>
    isWall(x, y) && isWall(x, y - 1) && isWall(x, y + 1);
  const hEdge = (x: number, y: number) =>
    isWall(x, y) && isWall(x + 1, y) && !(vert(x, y) && vert(x + 1, y));
  const rows: string[] = [];
  for (let y = 0; y < S; y++) {
    let l = "";
    for (let x = 0; x < S; x++) {
      if (!isWall(x, y)) {
        l += "  ";
        continue;
      }
      const H = hEdge(x - 1, y) || hEdge(x, y),
        V = isWall(x, y - 1) || isWall(x, y + 1);
      const interior = vert(x, y) && vert(x - 1, y) && vert(x + 1, y);
      l +=
        (interior ? " " : V && H ? "+" : V ? "|" : H ? "-" : "+") +
        (hEdge(x, y) ? "-" : " ");
    }
    rows.push(l);
  }

  // BFS from the entrance; the maze is unicursal so this is THE path (1,223 steps).
  const key = (x: number, y: number) => y * S + x,
    start: [number, number] = [M, 2 * M],
    prev = new Map<number, number>([[key(M, 2 * M), -1]]),
    q: [number, number][] = [start];
  let end: [number, number] | null = null;
  while (q.length) {
    const [cx, cy] = q.shift()!;
    if (dist(cx, cy) <= 2) {
      end = [cx, cy];
      break;
    }
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx,
        ny = cy + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < S &&
        ny < S &&
        open[ny][nx] &&
        !prev.has(key(nx, ny))
      ) {
        prev.set(key(nx, ny), key(cx, cy));
        q.push([nx, ny]);
      }
    }
  }
  const path: [number, number][] = [];
  for (let k = key(end![0], end![1]); k !== -1; k = prev.get(k)!) {
    path.unshift([k % S, Math.floor(k / S)]);
  }

  return {
    S,
    M,
    open,
    wallText: rows.join("\n"),
    path,
    start,
    isCenter: (x: number, y: number) => dist(x, y) <= 2,
  };
}
