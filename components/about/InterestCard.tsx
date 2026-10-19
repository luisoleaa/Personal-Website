import styles from "./InterestCard.module.css";

export default function InterestCard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
