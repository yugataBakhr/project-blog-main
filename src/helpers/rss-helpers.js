import { BLOG_TITLE, DESCRIPTION, SITE_URL } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";
// Import the rss package

export async function RSSGenerator() {
  // Create a new feed object
  const feed = new RSS({
    title: BLOG_TITLE,
    description: DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    language: "english",
  });
  // Get the blog post list
  const blogPostList = await getBlogPostList();
  // Add some items to the feed
  blogPostList.forEach((blogPost) =>
    feed.item({
      title: blogPost.title,
      description: blogPost.abstract,
      url: `${SITE_URL}/${blogPost.slug}`,
      date: blogPost.publishedOn,
    })
  );
  // Generate the XML string
  const xml = feed.xml();

  return xml;
}
