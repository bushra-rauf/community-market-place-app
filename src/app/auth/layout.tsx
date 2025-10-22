
import Logo from "@/components/Logo"

const AuthLayOut = (  {children}: Readonly<{children: React.ReactNode;}>) => {
    return(
        <>
        <header className= "flex items-center justify-between flex-wrap">
            <Logo/>
        </header>
        {children}
        </>
    )
}

export default AuthLayOut