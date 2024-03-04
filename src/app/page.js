import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "@/helpers/file-helpers";
import Spinner from "@/components/Spinner";

import styles from "./homepage.module.css";

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      <React.Suspense
        fallback={
          <Spinner color={`var(--color-primary)`} size={48} />
        }
      >
        <RenderedBlogPosts />
      </React.Suspense>
    </div>
  );
}

const RenderedBlogPosts = async () => {
  const resolve = await getBlogPostList();

  return (
    <>
      {resolve.map((blogPost) => {
        return (
          <BlogSummaryCard
            key={blogPost.slug}
            slug={blogPost.slug}
            title={blogPost.title}
            abstract={blogPost.abstract}
            publishedOn={blogPost.publishedOn}
          />
        );
      })}
    </>
  );
};

export default Home;
