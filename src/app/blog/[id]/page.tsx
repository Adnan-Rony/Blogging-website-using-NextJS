
import { Blog } from "@/app/types/blog";
import axiosInstance from "@/app/lib/axios";
import Image from "next/image";
import { extractHeadingsFromHTML } from "@/app/lib/extractHeadingsFromHTML";
import Head from "next/head";
import RecommendedBlogs from "@/app/components/RecommendedBlogs";

type Params = {
  params: { id: string };
};



export const revalidate = 60; 

// Fetch single blog by ID
async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data || null;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: Params) {

  const blog = await getBlogById(params.id);

  if (!blog) {
    return <p className="text-center text-red-500">Blog post not found.</p>;
  }

  const { toc, htmlWithIds } = extractHeadingsFromHTML(blog.content);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    image: blog.image,
    datePublished: blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author?.name || "Author",
    },
    description: blog.excerpt || blog.title,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `http://localhost:3000/blog/${blog._id}`,
    },
  };

  return (
    <>
      <Head>
        <title>{blog.title} | YourSiteName</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt || blog.title} />
        <meta name="twitter:image" content={blog.image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="bg-white lg:col-span-2 px-4 py-8 rounded-xl shadow-sm">
          <div className="my-4 space-y-3">
            <h1 className="lg:text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="lg:text-sm text-xs mb-4 text-blue-400 font-medium">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          {blog.image && (
            <div className="my-4 pt-4">
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded mb-4 w-full object-cover"
                 loading="lazy"
              />
            </div>
          )}

          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          <hr className="my-10 border-gray-200" />

          {/* TODO: Comments Section */}

          <hr className="my-10 border-gray-200" />

          {/* TODO: Recommended Blog Section */}
          <p className="text-3xl font-semibold py-4">Recommended Blog</p>
          <RecommendedBlogs key={blog._id} blogId={blog._id}/>
        </main>

        <aside className="lg:col-span-1">
          <nav
            aria-label="Table of contents"
            className="sticky top-8 space-y-6"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Table Of Contents</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {toc.map(({ id, text, tag }) => (
                  <li
                    key={id}
                    style={{ marginLeft: `${(parseInt(tag[1]) - 1) * 16}px` }}
                  >
                    <a
                      href={`#${id}`}
                      rel="nofollow"
                      className="hover:underline"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const res = await axiosInstance.get("/blogs");
    const blogs: Blog[] = res.data || [];

    return blogs.map((blog) => ({
      id: blog._id,
    }));
  } catch (err) {
    console.error("Failed to generate static params:", err);
    return [];
  }
}
