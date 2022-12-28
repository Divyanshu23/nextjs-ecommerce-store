import Image from "next/image"
import { useState } from "react"
import mongoose from "mongoose"
import { toast, Flip } from "react-toastify"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"

import { cartActions } from "../../store/cartSlice"
import productModel from "../../models/product"

const Product = (props) => {
    const { product } = props
    const [sizeindex, setSizeindex] = useState(0)
    const [colorindex, setColorindex] = useState(0)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleChangeColor = (e) => {
        setColorindex(e.currentTarget.getAttribute("colorindex"))
    }

    const handleChangeSize = (e) => {
        setSizeindex(e.currentTarget.getAttribute("sizeindex"))
        setColorindex(0)
    }

    const checkServicability = async (e) => {
        const pincode = e.currentTarget.previousElementSibling.value
        if (pincode === null) {
            toast.info("Enter pincode first to check", {
                position: toast.POSITION.BOTTOM_CENTER,
                transition: Flip,
                autoClose: 3000
            });
            return
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/checkPincode`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ pincode: parseInt(pincode) })
            })
            if (response.status === 200) {
                toast.info("Great! We deliver here.", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    transition: Flip,
                    autoClose: 2000
                });
            } else if (response.status === 404) {
                toast.warn("Sorry! We do not serve this location yet", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    transition: Flip,
                    autoClose: 2000
                });
            }
        } catch (error) {
            toast.error("Sorry! Some error occured while checking pincode", {
                position: toast.POSITION.BOTTOM_CENTER,
                transition: Flip,
                autoClose: 3000
            });
        }
    }

    const createNewProduct = () => {
        const newproduct = {};
        newproduct.name = product.name
        newproduct.slug = product.slug
        newproduct.category = product.category
        newproduct.size = product.sizes[sizeindex].size ? product.sizes[sizeindex].size : null
        newproduct.color = product.sizes[sizeindex].colors.length != 0 ? product.sizes[sizeindex].colors[colorindex].charAt(0).toUpperCase() +  product.sizes[sizeindex].colors[colorindex].slice(1) : null
        newproduct.image = product.sizes[sizeindex].images[colorindex]
        newproduct.qty = parseInt(document.getElementById("qty").value)
        newproduct.price = product.sizes[sizeindex].price[colorindex]
        return newproduct
    }

    const handleAddToCart = (e) => {
        dispatch(cartActions.addProduct(createNewProduct()))
        toast.info("Added to cart!", {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
        });
    }

    const handleBuyNow = (e) => {
        dispatch(cartActions.addProduct(createNewProduct()))
        router.push(`/checkout`)
    }

    return (
        <>
            {product && <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    <div className="mx-auto flex flex-wrap justify-center">
                        <div href={`/product/${props.slug}`} className="block relative rounded w-[300px] h-[400px] mx-auto">
                            <Image alt="ecommerce" src={`${product.sizes[sizeindex].images[colorindex]}`} fill sizes="100vw" style={{ objectFit: 'contain' }} />
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                            {product.star && <div className="flex my-2">
                                <span className="flex items-center">
                                    {
                                        [...Array(product.star)].map((ele, i) => {
                                            return (
                                                <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                            )
                                        })
                                    }
                                    {
                                        [...Array(5 - product.star)].map((ele, i) => {
                                            return (
                                                <svg key={i} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                            )
                                        })
                                    }
                                </span>
                            </div>}
                            <p className="leading-relaxed">{product.desc}</p>
                            <div className="flex flex-col sm:flex-row mt-6 items-center justify-between pb-5 border-gray-100">
                                <div className="flex items-center justify-between mb-4 sm:mb-0">
                                    {product.sizes[sizeindex].colors.length != 0 &&
                                        <div className="flex">
                                            <span className="mr-3">Color</span>
                                            {[...Array(product.sizes[sizeindex].colors.length)].map((ele, i) => {
                                                return (
                                                    <button key={i} colorindex={i} className={`border-2 border-gray-300 ml-1 bg-${product.sizes[sizeindex].colors[i]}-600 rounded-full w-6 h-6 focus:outline-none`} onClick={handleChangeColor}></button>
                                                )
                                            })}
                                        </div>}
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Quantity</span>
                                        <div className="relative">
                                            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" id="qty">
                                                {
                                                    [...Array(product.sizes[sizeindex].qty[colorindex])].map((ele, i) => {
                                                        return (
                                                            <option key={i}>{i + 1}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Size</span>
                                        <div className="relative">
                                            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                                {
                                                    product.sizes.map((obj, i) => {
                                                        if (obj.size) {
                                                            return (
                                                                <option key={i} sizeindex={i} onClick={handleChangeSize}>{obj.size}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                            </select>
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 items-center pb-5 border-b-2 mb-5">
                                <input type="text" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Enter Pincode" />
                                <button type="button" className="py-3 px-2 text-xs font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800" onClick={checkServicability}>Check Pincode</button>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center sm:justify-between">
                                <span className="title-font font-medium text-2xl text-gray-900 my-2">₹{product.sizes[sizeindex].price[colorindex]}</span>
                                <div className="flex space-x-2">
                                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleAddToCart}>Add to Cart</button>
                                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleBuyNow}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params
    let product = null
    if (!mongoose.connections[0].readyState) {
        try {
            mongoose.set("strictQuery", false)
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        } catch (error) {
            console.log(error)
            return {
                props: { product },
            }
        }
    }
    product = await productModel.findOne({ slug })
    return {
        props: { product: JSON.parse(JSON.stringify(product)) },
    }
}

export default Product