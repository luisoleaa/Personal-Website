"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { buildLabyrinth } from "@/lib/ascii";
import PlaqueButton from "@/components/common/PlaqueButton";
import styles from "./Labyrinth.module.css";

type Pos = [number, number];
type Maze = ReturnType<typeof buildLabyrinth>;

type GameState = {
  pos: Pos;
  trail: string[][];
  steps: number;
  best: number;
  done: boolean;
  auto: boolean;
};

function initState(maze: Maze): GameState {
  return {
    pos: maze.start.slice() as Pos,
    trail: Array.from({ length: maze.S }, () =>
      new Array(maze.S * 2).fill(" "),
    ),
    steps: 0,
    best: 0,
    done: false,
    auto: false,
  };
}

function pathIndexOf(maze: Maze, pos: Pos, best: number): number {
  for (let i = best; i < maze.path.length; i++) {
    if (maze.path[i][0] === pos[0] && maze.path[i][1] === pos[1]) return i;
  }
  for (let i = 0; i < best; i++) {
    if (maze.path[i][0] === pos[0] && maze.path[i][1] === pos[1]) return i;
  }
  return best;
}

function applyStep(
  maze: Maze,
  state: GameState,
  nx: number,
  ny: number,
): GameState {
  const trail = state.trail.slice();
  trail[state.pos[1]] = trail[state.pos[1]].slice();
  trail[state.pos[1]][state.pos[0] * 2] = ".";
  const pos: Pos = [nx, ny];
  const steps = state.steps + 1;
  const i = pathIndexOf(maze, pos, state.best);
  const best = Math.max(state.best, i);
  const done = state.done || maze.isCenter(nx, ny);
  return { pos, trail, steps, best, done, auto: done ? false : state.auto };
}

type Action =
  | { type: "move"; dx: number; dy: number }
  | { type: "advance"; count: number }
  | { type: "toggleWalk" }
  | { type: "reset" };

function createReducer(maze: Maze) {
  return function reducer(state: GameState, action: Action): GameState {
    switch (action.type) {
      case "move": {
        if (state.done) return state;
        const nx = state.pos[0] + action.dx;
        const ny = state.pos[1] + action.dy;
        const blocked =
          nx < 0 ||
          ny < 0 ||
          nx >= maze.S ||
          ny >= maze.S ||
          !maze.open[ny][nx];
        if (blocked) return state.auto ? { ...state, auto: false } : state;
        return applyStep(maze, { ...state, auto: false }, nx, ny);
      }
      case "advance": {
        if (state.done || !state.auto) return state;
        let next = state;
        for (let n = 0; n < action.count && !next.done; n++) {
          const i = pathIndexOf(maze, next.pos, next.best);
          const target = maze.path[Math.min(i + 1, maze.path.length - 1)];
          next = applyStep(maze, next, target[0], target[1]);
        }
        return next;
      }
      case "toggleWalk":
        return state.done ? state : { ...state, auto: !state.auto };
      case "reset":
        return initState(maze);
      default:
        return state;
    }
  };
}

export default function Labyrinth() {
  const maze = useMemo(() => buildLabyrinth(), []);
  const reducer = useMemo(() => createReducer(maze), [maze]);
  const [state, dispatch] = useReducer(reducer, maze, initState);

  const rafRef = useRef<number | null>(null);
  const holdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const accRef = useRef(0);
  const lastRef = useRef(0);
  const runningRef = useRef(false);
  const walkTickRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    runningRef.current = state.auto && !state.done;
  }, [state.auto, state.done]);

  const walkTick = useCallback(
    (now: number) => {
      if (!runningRef.current) {
        rafRef.current = null;
        return;
      }
      accRef.current += Math.min(0.1, (now - lastRef.current) / 1000) * 38;
      lastRef.current = now;
      const count = Math.floor(accRef.current);
      if (count > 0) {
        accRef.current -= count;
        dispatch({ type: "advance", count });
      }
      rafRef.current = requestAnimationFrame(walkTickRef.current);
    },
    [dispatch],
  );

  useEffect(() => {
    walkTickRef.current = walkTick;
  }, [walkTick]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (holdRef.current) clearInterval(holdRef.current);
    };
  }, []);

  const move = useCallback(
    (dx: number, dy: number) => {
      runningRef.current = false;
      dispatch({ type: "move", dx, dy });
    },
    [dispatch],
  );

  const toggleWalk = () => {
    if (state.done) return;
    const nextAuto = !state.auto;
    dispatch({ type: "toggleWalk" });
    runningRef.current = nextAuto;
    if (nextAuto) {
      lastRef.current = performance.now();
      accRef.current = 0;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(walkTick);
    }
  };

  const resetLab = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (holdRef.current) {
      clearInterval(holdRef.current);
      holdRef.current = null;
    }
    runningRef.current = false;
    dispatch({ type: "reset" });
  };

  const onLabKey = (e: React.KeyboardEvent) => {
    const map: Record<string, Pos> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    const m = map[e.key];
    if (!m) return;
    e.preventDefault();
    move(m[0], m[1]);
  };

  const release = useCallback(() => {
    if (holdRef.current) {
      clearInterval(holdRef.current);
      holdRef.current = null;
    }
  }, []);

  const handlePadPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const dx = Number(e.currentTarget.dataset.dx);
      const dy = Number(e.currentTarget.dataset.dy);
      move(dx, dy);
      if (holdRef.current) clearInterval(holdRef.current);
      holdRef.current = setInterval(() => move(dx, dy), 90);
    },
    [move],
  );

  const handlePadClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.detail !== 0) return;
      const dx = Number(e.currentTarget.dataset.dx);
      const dy = Number(e.currentTarget.dataset.dy);
      move(dx, dy);
    },
    [move],
  );

  const marks: string[] = [];
  for (let y = 0; y < maze.S; y++) {
    const row = new Array(maze.S * 2).fill(" ");
    if (y === maze.M) row[maze.M * 2] = state.done ? " " : "+";
    if (y === state.pos[1]) row[state.pos[0] * 2] = "@";
    marks.push(row.join(""));
  }

  const pct = Math.round((100 * state.best) / (maze.path.length - 1));
  const walkLabel = state.auto
    ? "Pause"
    : state.steps > 0 && !state.done
      ? "Keep walking with me"
      : "Walk with me";
  const labMsg = state.done
    ? `You reached the center in ${state.steps} steps.`
    : state.steps === 0
      ? "You are at the entrance."
      : `${pct}% of the way in, ${state.steps} steps so far.`;

  return (
    <>
      <div className={styles.left}>
        <h2 className={styles.title}>The labyrinth</h2>
        <p className={styles.copy}>
          Cathedrals set labyrinths into their floors to be walked slowly, one
          turn at a time. This one has eleven rings and four quarters, in the
          style of the one at Chartres. There&apos;s only one path, and it
          always reaches the center.
        </p>
        <p className={styles.hint}>
          Click the labyrinth and use your arrow keys, or let it walk you in.
        </p>
        <div className={styles.buttonsRow}>
          <PlaqueButton type="button" variant="secondary" onClick={toggleWalk}>
            {walkLabel}
          </PlaqueButton>
          <PlaqueButton type="button" variant="quiet" onClick={resetLab}>
            Start over
          </PlaqueButton>
        </div>
        <div role="group" aria-label="Step controls" className={styles.pad}>
          <button
            type="button"
            aria-label="Step up"
            data-dx={0}
            data-dy={-1}
            onClick={handlePadClick}
            onPointerDown={handlePadPointerDown}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            className={`${styles.padBtn} ${styles.btnUp}`}
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Step left"
            data-dx={-1}
            data-dy={0}
            onClick={handlePadClick}
            onPointerDown={handlePadPointerDown}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            className={`${styles.padBtn} ${styles.btnLeft}`}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Step down"
            data-dx={0}
            data-dy={1}
            onClick={handlePadClick}
            onPointerDown={handlePadPointerDown}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            className={`${styles.padBtn} ${styles.btnDown}`}
          >
            ↓
          </button>
          <button
            type="button"
            aria-label="Step right"
            data-dx={1}
            data-dy={0}
            onClick={handlePadClick}
            onPointerDown={handlePadPointerDown}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            className={`${styles.padBtn} ${styles.btnRight}`}
          >
            →
          </button>
        </div>
        <p aria-live="polite" className={styles.status}>
          {labMsg}
        </p>
        {state.done && (
          <p className={styles.verse}>
            Blessed is the one who perseveres under trial because, having stood
            the test, that person will receive the crown of life that the Lord
            has promised to those who love him.
          </p>
        )}
      </div>
      <div className={styles.mazeCol}>
        <div
          tabIndex={0}
          aria-label="Labyrinth. Use the arrow keys to walk."
          onKeyDown={onLabKey}
          className={styles.maze}
        >
          <span aria-hidden="true" className={styles.walls}>
            {maze.wallText}
          </span>
          <span aria-hidden="true" className={styles.trail}>
            {state.trail.map((row) => row.join("")).join("\n")}
          </span>
          <span aria-hidden="true" className={styles.marks}>
            {marks.join("\n")}
          </span>
        </div>
      </div>
    </>
  );
}
