import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return(
        <Link href='/' className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                </svg>
            </div>
            <h2 className="font-bold text-gray-900 text-sm sm:text-base md:text-xl">
                <span className="hidden sm:inline">Community </span>
                <span className="text-blue-600">
                    <span className="sm:hidden">CM</span>
                    <span className="hidden sm:inline">Marketplace</span>
                </span>
            </h2>
        </Link>
    )
}

export default Logo