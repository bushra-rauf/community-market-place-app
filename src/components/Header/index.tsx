import AccountLinks from "../Accountslinks"
import Logo from "../Logo"
import SearchInput from "../Search"

const Header = () => {
    return(
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-1">
                <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3 md:gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0 min-w-0">
                        <Logo/>
                    </div>

                    {/* Search - Hidden on mobile, shown on md+ */}
                    <div className="hidden md:flex flex-1 max-w-lg">
                        <SearchInput/>
                    </div>

                    {/* Account Links */}
                    <div className="flex-shrink-0">
                        <AccountLinks/>
                    </div>
                </div>

                {/* Mobile Search - Shown only on mobile */}
                <div className="md:hidden pb-2 sm:pb-3">
                    <SearchInput/>
                </div>
            </div>
        </header>
    )
}

export default Header 