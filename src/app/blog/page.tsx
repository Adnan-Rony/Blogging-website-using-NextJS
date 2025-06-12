import Image from "next/image";
import axiosInstance from "../lib/axios";
import { Blog } from "../types/blog";
import Link from "next/link";

export const revalidate = 60;
const BlogPage = async () => {
  const res = await axiosInstance.get("/blogs");
  const blogs: Blog[] = res.data || [];

  return (
    <div className="max-w-screen-xl mx-auto py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 px-4 space-y-2">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <Link
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 overflow-hidden lg:h-[510px] block"
              key={blog._id}
              href={`/blogs/${blog._id}`}
            >
              <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={224} // 16:9 aspect ratio or adjust as needed
              className="object-center lg:object-cover rounded-xl"
              priority={false} // lazy loading by default
            />

              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                  {blog.title}
                </h2>

                <div className="text-sm text-gray-500 flex flex-wrap gap-4 items-center">
                  {/* <p>{blog.author?.name || "Unknown Author"}</p> */}
                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                  <p>💬 {blog.comments?.length ?? 0}</p>
                </div>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
                </p>

                <div>
                  <button className="btn btn-outline border-blue-200 text-blue-500 rounded-3xl hover:text-white hover:bg-blue-600">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogPage;
