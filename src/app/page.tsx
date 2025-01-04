import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url(/image/bg3.jpg)] bg-center bg-cover w-full h-screen flex flex-col items-center justify-center">
    <h1 className="text-5xl font-bold text-gold-glow font-sixtyfour mb-8 text-blue-600 ">
        Welcome to the Winter Remedies
      </h1>
    <button className="px-6 py-3 bg-gradient-to-r from-purple-200 to-pink-300 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
      <Link href="/blog"> Go to Blogs</Link>
      </button>
      </div> 
   
  );
}
