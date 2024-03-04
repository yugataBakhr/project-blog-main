import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import { loadBlogPost } from "@/helpers/file-helpers";
import Spinner from "@/components/Spinner";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
// using dynamic to import the component below
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";

import styles from "./postSlug.module.css";

import dynamic from "next/dynamic";
const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  {
    loading: () => (
      <Spinner color={"var(--color-primary)"} size={32} />
    ),
    ssr: false,
  }
);
const CircularColorsDemo = dynamic(
  () => import("@/components/CircularColorsDemo"),
  {
    loading: () => (
      <Spinner color={"Var(--color-primary)"} size={32} />
    ),
    ssr: false,
  }
);

export async function generateMetadata({ params }) {
  const resolve = await loadBlogPost(params.postSlug);
  const { frontmatter } = resolve;

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const postSlug = params.postSlug;

  return (
    <article className={styles.wrapper}>
      <RenderedBlogHero postSlug={postSlug} />
      <RenderedBlogContent postSlug={postSlug} />
    </article>
  );
}

const RenderedBlogHero = async ({ postSlug }) => {
  const resolve = await loadBlogPost(postSlug);
  const { frontmatter } = resolve;
  return (
    <BlogHero
      title={frontmatter.title}
      publishedOn={frontmatter.publishedOn}
    />
  );
};

const RenderedBlogContent = async ({ postSlug }) => {
  const resolve = await loadBlogPost(postSlug);
  const { content } = resolve;
  return (
    <div className={styles.page}>
      <CustomMDX source={content} />
    </div>
  );
};

const components = {
  pre: (props) => (
    <CodeSnippet {...props}>{props.children}</CodeSnippet>
  ),
  DivisionGroupsDemo: (props) => <DivisionGroupsDemo {...props} />,
  CircularColorsDemo: (props) => <CircularColorsDemo {...props} />,
};

const CustomMDX = (props) => {
  return (
    <MDXRemote
      {...props}
      components={{
        ...components,
        ...(props.components || {}),
      }}
    />
  );
};

export default BlogPost;
