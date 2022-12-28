import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import Router, { useRouter } from "next/router";

import { cartActions } from "../store/cartSlice";

function Cart() {
    const router = useRouter()
    const showCart = useSelector(state => state.cart.showCart)
    const cart = useSelector(state => state.cart.cart)
    const subTotal = useSelector(state => state.cart.subTotal)
    const dispatch = useDispatch()

    const handleToggleCart = (e) => {
        dispatch(cartActions.toggleCart(!showCart))
    }

    const handleCheckout = (e) => {
        dispatch(cartActions.toggleCart(true))
        router.push(`/checkout`)
    }

    const handleClearCart = (e) => {
        dispatch(cartActions.clearCart(null))
    }

    const handleAdd = (e) => {
        const slug = e.currentTarget.getAttribute("product")
        const product = cart.find((product) => product.slug === slug)
        dispatch(cartActions.addProduct({ ...product, qty: 1 }))
    }

    const handleDecrease = (e) => {
        const slug = e.currentTarget.getAttribute("product")
        const product = cart.find((product) => product.slug === slug)
        dispatch(cartActions.removeProduct({ ...product, qty: 1 }))
    }

    const handleRemove = (e) => {
        const slug = e.currentTarget.getAttribute("product")
        const product = cart.find((product) => product.slug == slug)
        dispatch(cartActions.removeProduct({ ...product}))
    }

    return (
        <div className={`w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed right-0 z-50 ${showCart ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500`} id="chec-div">
            <div className="w-full absolute right-0 z-10 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                <div className="flex md:flex-row flex-col justify-end" id="cart">
                    <div className="lg:w-1/3 w-full md:pl-10 pl-4 pr-4 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                        <div className="text-lg flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={handleToggleCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="15 6 9 12 15 18" />
                            </svg>
                            <p className="pl-2 leading-none">Back</p>
                        </div>
                        <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                        {
                            cart.map((product) => {
                                return (<div key={product.slug} className="md:flex items-center mt-8 py-6 border-t border-gray-200">
                                    <div className="w-1/4 mx-auto">
                                        <Image src={`${product.image}`} alt="product image" width={50} height={200} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                    <div className="md:pl-3 md:w-3/4">
                                        <div className="flex items-center justify-between w-full pt-1 pr-6">
                                            <p className="text-base font-black leading-none text-gray-800">{product.name}</p>
                                            <div className="flex items-center text-lg">
                                                <AiFillMinusCircle onClick={handleDecrease} product={product.slug} />
                                                <span className="px-2">{product.qty}</span>
                                                <AiFillPlusCircle onClick={handleAdd} product={product.slug} />
                                            </div>
                                        </div>
                                        <span className="text-sm leading-3 text-gray-600 pt-2 pr-2">{product.category}</span>
                                        {
                                            product.size && <span className="text-sm leading-3 text-gray-600 pt-2 pr-2">{product.size}</span>
                                        }
                                        {
                                            product.color && <span className="text-sm leading-3 text-gray-600 pt-2 pr-2">{product.color}</span>
                                        }
                                        <div className="flex items-center justify-between pt-5 pr-6">
                                            <div className="flex itemms-center">
                                                <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={handleRemove} product={product.slug}>Remove</p>
                                            </div>
                                            <p className="text-base font-black leading-none text-gray-800">{product.qty * product.price}</p>
                                        </div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    <div className="lg:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                        <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                            <div>
                                <p className="text-4xl text-center font-black leading-9 text-gray-800">Summary</p>
                                <div className="flex items-center justify-between pt-16">
                                    <p className="text-base leading-none text-gray-800">Subtotal</p>
                                    <p className="text-base leading-none text-gray-800">₹{subTotal}</p>
                                </div>
                                <div className="flex items-center justify-between pt-5">
                                    <p className="text-base leading-none text-gray-800">Shipping</p>
                                    <p className="text-base leading-none text-gray-800">₹{subTotal === 0 ? 0 : 100}</p>
                                </div>
                                <div className="flex items-center justify-between pt-5">
                                    <p className="text-base leading-none text-gray-800">Tax</p>
                                    <p className="text-base leading-none text-gray-800">₹{subTotal === 0 ? 0 : 35}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                    <p className="text-xl leading-normal text-gray-800">Total</p>
                                    <p className="text-xl font-bold leading-normal text-right text-gray-800">₹{subTotal === 0 ? 0 : subTotal + 100 + 35}</p>
                                </div>
                                <button onClick={handleCheckout} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                    Checkout
                                </button>
                                <button onClick={handleClearCart} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white mt-4">
                                    Clear Bag
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;