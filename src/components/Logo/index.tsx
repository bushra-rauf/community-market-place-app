import Image from "next/image"
import Link from "next/link"
const Logo = () => {
    return(
        <div className="flex items-center ">        
        <Link href = '/'>        
        <Image src= '/logo.png' alt='logo' width='60' height='60'></Image>
        </Link>
        <h1 className="font-bold text-blue-500">Community Marketplace</h1>
         </div>


    )
}
export default Logo