import BlogOverzicht from "@/components/blog/BlogOverzicht";
import { gepubliceerdePosts } from "@/lib/blog";

// Elk uur opnieuw opbouwen: ingeplande blogs verschijnen op hun dag zonder deploy.
export const revalidate = 3600;

export default function BlogPage() {
  return <BlogOverzicht posts={gepubliceerdePosts()} />;
}
