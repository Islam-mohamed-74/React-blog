import React from "react";

export default function RecentBlog() {
  return (
    <section className="py-16 container mx-auto px-8">
      <h2 className="text-4xl font-bold text-gray-400 mb-12">Recent Blogs</h2>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample Blog Card */}
        <div className="group cursor-pointer">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg h-48 mb-4 flex items-end p-6">
            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-600">
              Technology
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors">
            The Future of Digital Innovation
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Exploring the latest trends in technology and their impact on
            society.
          </p>
        </div>

        {/* Additional Blog Cards */}
        <div className="group cursor-pointer">
          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-lg h-48 mb-4 flex items-end p-6">
            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-600">
              Lifestyle
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors">
            Mindful Living in Modern Times
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Discovering balance and peace in our fast-paced world.
          </p>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg h-48 mb-4 flex items-end p-6">
            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-600">
              Business
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors">
            Entrepreneurship in the Digital Age
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Building successful businesses in today's connected world.
          </p>
        </div>
      </div>
    </section>
  );
}
