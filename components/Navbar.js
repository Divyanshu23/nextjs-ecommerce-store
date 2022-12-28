import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdAccountCircle } from "react-icons/md"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { cartActions } from "../store/cartSlice"
import { userActions } from "../store/userSlice"
import Cart from "./Cart"
import user from "../models/user"

const Navbar = () => {
    const mobileMenuRef = useRef(null)
    const searchBarRef = useRef(null)

    const router = useRouter()

    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.user.isAdmin)

    const handleOpenMobileMenu = (e) => {
        if (mobileMenuRef.current.style.display === "block")
            mobileMenuRef.current.style.display = "none"
        else
            mobileMenuRef.current.style.display = "block"
    }

    const handleOpenSearchBar = (e) => {
        if (searchBarRef.current.style.display === "block")
            searchBarRef.current.style.display = "none"
        else
            searchBarRef.current.style.display = "block"
    }

    const handleToggleCart = (e) => {
        dispatch(cartActions.toggleCart(true))
    }

    const handleOpenAccount = (e) => {
        if(e.currentTarget.tagName === "UL")
            e.currentTarget.style.display = "block"
        else 
        e.currentTarget.nextElementSibling.style.display = "block"
    }
    
    const handleCloseAccount = (e) => {
        if(e.currentTarget.tagName === "UL")
            e.currentTarget.style.display = "none"
        else 
        e.currentTarget.nextElementSibling.style.display = "none"
    }

    const handleSignOut = (e) => {
        localStorage.removeItem("authToken")
        dispatch(userActions.setLogin(false))
        if(isAdmin) {
            dispatch(userActions.toggleAdmin(false))
        }
        router.push("/")
    }

    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="relative flex flex-wrap items-center justify-evenly mx-auto">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.svg" className="h-6 mr-3 sm:h-9" alt="NextFashion logo" width={50} height={50} style={{ height: "auto" }} />
                    <span className="self-center text-sm xs:text-lg font-semibold whitespace-nowrap dark:text-white">NextFashion</span>
                </Link>

                <div className="flex md:order-2">
                    <div className="flex justify-center items-center relative">
                        <button type="button" className=" text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" onMouseOver={handleOpenAccount} onMouseOut={handleCloseAccount}>
                            <MdAccountCircle className="w-6 h-6 text-gray-500" />
                        </button>
                        <ul className="hidden min-w-max absolute top-8 left-1 text-base z-40 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800" onMouseOver={handleOpenAccount} onMouseOut={handleCloseAccount}>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                    href="/myaccount">My Account
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                    href="/orders">My Orders
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                    href="/login">Log In
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                    href="/signup">Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                    href="/" onClick={handleSignOut}>Sign Out
                                </Link>
                            </li>
                        </ul>
                        <button type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" onClick={handleOpenSearchBar} >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </button>
                        <button type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" onClick={handleToggleCart} >
                            <AiOutlineShoppingCart className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                    <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleOpenMobileMenu}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="absolute top-20 hidden w-[100%] shadow-md active:shadow-lg" ref={searchBarRef}>
                    <div className="absolute inset-y-0 left-0 flex items-center mx-3 pointer-events-none">
                        <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" className="block w-full p-2 pl-12 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Search..." />
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" ref={mobileMenuRef}>
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 text-lg font-bold md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/tshirts" className={`${router.pathname === "/tshirts" ? "text-indigo-700" : "text-gray-700"} block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>T Shirts</Link>
                        </li>
                        <li>
                            <Link href="/hoodies" className={`${router.pathname === "/hoodies" ? "text-indigo-700" : "text-gray-700"} block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Hoodies</Link>
                        </li>
                        <li>
                            <Link href="/jeans" className={`${router.pathname === "/jeans" ? "text-indigo-700" : "text-gray-700"} block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Jeans</Link>
                        </li>
                        <li>
                            <Link href="/mugs" className={`${router.pathname === "/mugs" ? "text-indigo-700" : "text-gray-700"} block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Mugs</Link>
                        </li>
                        <li>
                            <Link href="/stickers" className={`${router.pathname === "/stickers" ? "text-indigo-700" : "text-gray-700"} block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Stickers</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Cart />
        </nav>
    )
}

export default Navbar