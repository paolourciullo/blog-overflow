import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import CategoryList from "@/components/CategoryList";
import matter from "gray-matter";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";

export default function CategoryblogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="md:w-3/4 mr-10 w-full">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {categoryName}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </div>
        </div>
        <div className="w-0 md:w-1/4 hidden md:block">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();

  //Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  //Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);

  //gets a list where each category is listed only once
  const uniqueCategories = [...new Set(categories)];

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
