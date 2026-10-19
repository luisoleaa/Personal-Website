import { candleRack, toLayers, CANDLE_CLASSES } from "@/lib/ascii";
import AsciiArt from "@/components/common/AsciiArt";
import styles from "./CandleRack.module.css";

export default function CandleRack({
  days,
  live,
}: {
  days: boolean[];
  live: boolean;
}) {
  const litCount = days.filter(Boolean).length;
  const { chars, kinds } = candleRack(days);
  const layers = toLayers(chars, kinds, CANDLE_CLASSES);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Candles</h2>
      <p className={styles.caption}>
        One for each day I pushed code over the last twelve weeks. {litCount}{" "}
        of 84 are lit.
      </p>
      <div className={styles.rackWrap}>
        <AsciiArt layers={layers} fontSize="clamp(6px, 1.15vw, 12px)" />
      </div>
      {!live && (
        <p className={styles.note}>
          Showing a sample pattern — live GitHub data is unavailable right
          now.
        </p>
      )}
    </div>
  );
}
