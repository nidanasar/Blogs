import Card from '@/components/card'
import { client } from '@/sanity/lib/client';
import React from 'react'

export default async function Blog({post}:{post:Post}) {
    const query=`*[_type=='post'] | order(_createdAt asc){
        summary, title, image, 
          "slug": slug.current
      }`;
      const posts:Post[] = await client.fetch(query)
    //   console.log(posts)
  return (
    <div>
       <main className="bg-[url(/image/bg.jpeg)] bg-cover bg-center min-h-screen py-10">
      <section className="container mx-auto px-4 md:px-8">
        <h1 className="text-5xl font-bold text-center text-white mb-12">
        My winter Blogs   </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post:Post) => (
            <Card post={post} key={post.slug} />
          ))}
        </div> 
      </section>
    </main>
    </div>
  )
}
