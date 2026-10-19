"use client";

import { useMemo, useState } from "react";
import { triptych, toLayers, GLASS_CLASSES } from "@/lib/ascii";
import AsciiArt from "@/components/common/AsciiArt";
import styles from "./Triptych.module.css";

export default function Triptych() {
  const [lit, setLit] = useState(false);
  const layers = useMemo(() => {
    const { chars, kinds } = triptych();
    return toLayers(chars, kinds, GLASS_CLASSES);
  }, []);

  return (
    <div className={`${styles.wrap} ${lit ? "lit" : ""}`.trim()}>
      <button
        type="button"
        aria-label="Three stained glass windows"
        aria-expanded={lit}
        onClick={() => setLit((v) => !v)}
        className={styles.win}
      >
        <AsciiArt
          layers={layers}
          fontSize="clamp(6px, 2.1vw, 13px)"
          className={lit ? `${styles.art} ${styles.artBlurred}` : styles.art}
        />
      </button>
      {lit && (
        <div className={styles.reveal}>
          <p className={styles.verse}>
            The LORD is my shepherd; I shall not want.
          </p>
          <p className={styles.ref}>Psalm 23:1</p>
        </div>
      )}
    </div>
  );
}
