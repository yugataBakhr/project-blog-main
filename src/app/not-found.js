import React from "react";
import { BLOG_TITLE, DESCRIPTION } from "@/constants";
import styles from "./not-found.module.css";

export function generateMetadata({ params }) {
  return {
    title: `404 Not Found • ${BLOG_TITLE}`,
    desctption: DESCRIPTION,
  };
}

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <p>
        This page does not exist. Please check the URL and try again.
      </p>
    </div>
  );
}
