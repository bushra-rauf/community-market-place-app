import Link from "next/link"
import Image from "next/image"

const Hero = () => {
    return(
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
               <Image
                src="/image-community.png"   
                alt="community-image"
                fill
                className="object-cover object-center"
                priority />
            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    Connect, Buy, & Sell Locally
                </h1>
                <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl drop-shadow-md">
                    A safe and trusted community marketplace for local buyers and sellers
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Link
                        href="/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-lg transition-colors duration-200 shadow-lg">
                        Post a Listing
                    </Link>
                    <Link
                        href="#listings"
                        className="bg-white  hover:bg-gray-100 text-gray-800 font-semibold  px-5 py-3 rounded-lg transition-colors duration-200 shadow-lg">
                        Browse Listings
                    </Link>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
                </svg>
            </div>
        </div>
    )
}

export default Hero
