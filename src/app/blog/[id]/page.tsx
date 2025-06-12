import { Blog } from "@/app/types/blog";
import axiosInstance from "@/app/lib/axios";
import Image from "next/image";
import { JSDOM } from "jsdom";
import { extractHeadingsFromHTML } from "@/app/lib/extractHeadingsFromHTML";
type Params = {
  params: { id: string };
};

export const revalidate = 60; // ISR: Regenerates every 60 seconds


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






// Pre-render blog post page
export default async function BlogPostPage({ params }: Params) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    return <p className="text-center text-red-500">Blog post not found.</p>;
  }

    const { toc, htmlWithIds } = extractHeadingsFromHTML(blog.content);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white lg:col-span-2 px-4 py-8 rounded-xl shadow-sm">
        <div className="my-4 space-y-3">
          <h1 className="lg:text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="lg:text-sm text-xs mb-4 text-blue-400 font-medium">
            Posted on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="my-4 pt-4">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded mb-4 w-full object-cover"
          />
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <hr className="my-10 border-gray-200" />
      {/* Comments Section */}

        <hr className="my-10 border-gray-200" />
          <p className="text-3xl font-semibold py-4">Recommended Blog</p>
      </div>

      {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Table Of Contents</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {toc.map(({ id, text, tag }) => (
                <li
                  key={id}
                  className={`ml-${(parseInt(tag[1]) - 1) * 4}`}
                >
                  <a href={`#${id}`} className="hover:underline">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  );
}

// Needed for SSG in dynamic routes
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
