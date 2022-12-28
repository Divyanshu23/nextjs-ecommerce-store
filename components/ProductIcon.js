import Image from "next/image"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { toast, Flip } from "react-toastify"

import { cartActions } from "../store/cartSlice"

const ProductIcon = (props) => {
    const router = useRouter()
    const cart = useSelector(state => state.cart.cart)
    const subTotal = useSelector(state => state.cart.subTotal)
    const dispatch = useDispatch()

    const handleBuyNow = (e) => {
        const product = { ...props, qty: 1 }
        dispatch(cartActions.addProduct(product))
        router.push(`/checkout`)
    }

    const handleAddToCart = (e) => {
        const product = { ...props, qty: 1 }
        dispatch(cartActions.addProduct(product))
        toast.info("Added to cart!", {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
        });
    }

    return (
        <div className="lg:w-[24%] md:w-1/2 p-4 w-full shadow-md mb-2 border-2 hover:shadow-inner">
            <Link href={`/product/${props.slug}`} className="block relative rounded w-[200px] h-[320px] mx-auto">
                <Image alt="ecommerce" src={`${props.image}`} width={200} height={300} sizes="100vw" style={{ width: '100%', height: 'auto'}} />
            </Link>
            <div className="flex flex-col justify-center items-center space-x-4 w-full">
                <div className="mt-2">
                    <h2 className="text-gray-900 title-font text-lg font-medium">{props.name}</h2>
                    <div className="flex justify-center items-center space-x-2">
                        <p className="text-gray-500 tracking-wider">{props.category}</p>
                        <p className="text-gray-700 tracking-wider">₹{props.price}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-3 my-2">
                    <button className="flex text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="flex text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm" onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default ProductIcon