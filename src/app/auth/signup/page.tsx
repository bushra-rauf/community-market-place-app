import Link from "next/link"
import SignUpForm from "./SignUpForm"
import Image from "next/image"
const SignUp = () => {
    return(
        <>
        <div className="relative mt-2 h-[60vh] md:h-[70vh] overflow-hidden">
            <Image src="/image-community.png"   
                    alt="community-image"
                    fill
                    className="object-cover object-center"
                    priority />
            {/* Background overlay for better text readability */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                    <div className="absolute inset-0 bg-black/20"></div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            Connect, Buy, & Sell Locally
                        </h1>
                        <p className="text-lg md:text-xl text-white/95 mb-[-140] max-w-2xl drop-shadow-md">
                            A safe and trusted community marketplace for local buyers and sellers
                        </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
                    </svg>
                </div>
        </div>
        <div className="mt-5 text-center mb-4 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                Join Our Community!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Create your account and become part of our vibrant marketplace community. Share your ideas, discover great content, and connect with others.
            </p>
        </div>
        <div className="mt-2 border-1 rounded-2xl lg:w-140 h-85 m-3 sm:m-auto p-4">
            <SignUpForm/>
            <p className="pl-2">
                Already have an account ? log in  <Link className='text-red-500' href='/auth/login'>here!</Link>
            </p>
        </div>
        </>
    )
}
export default SignUp