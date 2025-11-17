import Hero from "@/components/Hero";
import { getHomePosts } from "@/utils/supabase/quries";
import { createClient } from "@/utils/supabase/server-client";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Featured Listings Section */}
      <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Listings</h2>
          <p className="text-gray-600">Discover amazing items from your local community</p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data && data.map(({ id, title, slug, users, image, content }) => (
            <Link
              href={`/${slug}`}
              key={id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {title}
                </h3>

                {/* Preview of content */}
                {content && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {content.substring(0, 80)}...
                  </p>
                )}

                {/* Seller Info */}
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {users?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Listed by</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {users?.username}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {(!data || data.length === 0) && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No listings yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new listing.</p>
            <div className="mt-6">
              <Link
                href="/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Listing
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

