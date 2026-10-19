import styles from "./HymnBoard.module.css";

const ROWS = [
  { label: "Building", value: "Ball Up Top (App)" },
  { label: "Learning", value: "Computer Vision" },
  { label: "Playing", value: "Volleyball & Minecraft" },
];

export default function HymnBoard() {
  return (
    <div className={styles.board}>
      <h2 className={styles.title}>This week</h2>
      <dl className={styles.list}>
        {ROWS.map((row) => (
          <div key={row.label} className={styles.slat}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.posted}>Posted October 2026</p>
    </div>
  );
}
