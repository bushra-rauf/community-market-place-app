import AccountLinks from "../Accountslinks"
import Logo from "../Logo"
import SearchInput from "../Search"

const Header = () => {
    return(
        <>
        <header className="flex items-center justify-between flex-wrap">
        <Logo/>
         <SearchInput/> 
         <AccountLinks/> 
        </header>
        <div className='border-b '></div>
       </>
    )
}

export default Header 