"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion, MotionConfig } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  //const timeElapsed = 0;
  const savedTimeElapsed = Number(
    localStorage.getItem("timeElapsed")
  );
  const [timeElapsed, setTimeElapsed] = React.useState(
    savedTimeElapsed || 0
  );

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  // isCounting
  const [isCounting, setIsCounting] = React.useState(false);
  // reset Timer
  function resetTimeElapsed() {
    if (isCounting) {
      setIsCounting(false);
    }
    setTimeElapsed(0);
    localStorage.setItem("timeElapsed", 0);
  }
  // Timer effect
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isCounting) {
        const nextNumber = timeElapsed + 1;
        setTimeElapsed(nextNumber);
        localStorage.setItem("timeElapsed", nextNumber);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
    /* note to self.
    This is like `intervalId` uses a new timer for every second.
    `intervalId` never uses the same timer.
    Instead it throws away the used timer and get another one & another one until the end.
    Clean up function does the throwing away job.
    */
  }, [isCounting, timeElapsed]);

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    className={styles.selectedColorOutline}
                    layout={true}
                    layoutId="colorOutline"
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 60,
                      restDelta: 0.01,
                    }}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setIsCounting(!isCounting)}>
              {isCounting ? (
                <>
                  <Pause />
                  <VisuallyHidden>Pause</VisuallyHidden>
                </>
              ) : (
                <>
                  <Play />
                  <VisuallyHidden>Play</VisuallyHidden>
                </>
              )}
            </button>
            <button onClick={() => resetTimeElapsed()}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
