import type { Metadata } from "next";
import PostList from "../components/PostList";

export const metadata: Metadata = {
  title: "Posts | Your part App",
  description: "Generated by Your part app",
};
export default function Posts() {
  return <PostList />;
}
