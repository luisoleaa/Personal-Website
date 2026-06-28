"use client";

import { useEffect, useState } from "react";
import styles from "./GitHubActivityGrid.module.css";

type ContributionDay = {
  date: string;
  contributionCount: number;
  weekday: number;
};

type Week = {
  contributionDays: ContributionDay[];
};

type CalendarData = {
  totalContributions: number;
  weeks: Week[];
};

type ApiResponse = CalendarData & { error?: string };

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Only label Mon, Wed, Fri rows
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

// 13px cell + 2px gap = 15px per column
const STEP = 15;

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GitHubActivityGrid() {
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.error) throw new Error(data.error);
        setCalendar(data);
      })
      .catch(() => setError("Unable to load contribution data."));
  }, []);

  if (error) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.errorMsg}>{error}</p>
      </section>
    );
  }

  if (!calendar) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.skeleton} />
      </section>
    );
  }

  // Month labels: track the first column where each month starts
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  calendar.weeks.forEach((week, col) => {
    const first = week.contributionDays[0];
    if (!first) return;
    const month = new Date(first.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ label: MONTH_NAMES[month], col });
      lastMonth = month;
    }
  });

  const DAY_LABEL_W = 28;

  return (
    <section className={styles.wrapper} aria-label="GitHub contribution activity">
      <p className={styles.total}>
        <span className={styles.totalCount}>
          {calendar.totalContributions.toLocaleString()}
        </span>{" "}
        contributions in the last 6 months
      </p>

      <div className={styles.body}>
        {/* Day-of-week labels on the left */}
        <div className={styles.dayLabels}>
          <div className={styles.monthSpacer} />
          {DAY_LABELS.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        {/* Weeks area: month labels above, columns of cells below */}
        <div className={styles.weeksArea}>
          <div className={styles.monthRow}>
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className={styles.monthLabel}
                style={{ left: col * STEP }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className={styles.weeksRow} role="grid">
            {calendar.weeks.map((week, wi) => (
              <div key={wi} className={styles.weekCol} role="row">
                {Array.from({ length: 7 }, (_, di) => {
                  const day = week.contributionDays.find((d) => d.weekday === di);
                  if (!day) {
                    return <div key={di} className={styles.phantom} role="gridcell" />;
                  }
                  const level = getLevel(day.contributionCount);
                  return (
                    <div
                      key={di}
                      className={`${styles.cell} ${styles[`level${level}`]}`}
                      title={`${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatDate(day.date)}`}
                      role="gridcell"
                      aria-label={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
