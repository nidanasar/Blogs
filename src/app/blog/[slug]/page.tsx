import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image"; // Ensure this is configured correctly
import { PortableText } from "@portabletext/react";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  // Query to fetch post data based on the slug
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title, 
    summary, 
    image, 
    content, 
    author->{name, bio, image}
  }`;

  const post = await client.fetch(query, { slug: params.slug });

  // Handle case where the post might not exist
  if (!post) {
    return (
      <div>
        <h1 className="text-2xl text-center text-gray-800 mt-10">
          Post Not Found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <main className="min-h-screen bg-gray-100 py-10">
        <section className="container mx-auto px-4 md:px-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {post.title}
          </h1>

          {/* Post Image */}
          <div className="text-center">
            {post.image && (
              <Image
                src={urlForImage(post.image)} // Ensure urlForImage returns a valid URL
                alt={post.title}
                width={800}
                height={600}
                className="mx-auto"
              />
            )}
          </div>

          {/* Author Details */}
          {post.author && (
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {post.author.name}
              </h3>
              <p className="text-sm text-gray-600">{post.author.bio}</p>
            </div>
          )}

          {/* Summary */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">Summary</h2>
            <p className="text-gray-800 mt-2">{post.summary}</p>
          </section>

          {/* Content */}
          <div className="text-gray-800 mt-8">
            {post.content && <PortableText value={post.content} />}
          </div>
        </section>
      </main>
    </div>
  );
}