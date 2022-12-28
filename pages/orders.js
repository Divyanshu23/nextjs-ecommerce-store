import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast, Flip } from "react-toastify"

import OrderIcon from "../components/OrderIcon"
import order from "../models/order";

const Orders = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const router = useRouter()

    const [orders, setOrders] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login")
        } else {
            const fetcOrders = async () => {
                let orders = []
                let user = []
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/fetchOrders`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                            "auth-token": localStorage.getItem("authToken")
                        }
                    })
                    const json = await response.json()
                    if (json.success) {
                        orders = json.orders
                        user = json.user

                        setOrders(orders)
                        setUser(user)
                    }
                } catch (error) {
                    toast.error("Couldn't fetch orders", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        transition: Flip,
                        autoClose: 2000
                    });
                }
            }
            fetcOrders()
        }
    }, [])


    return (
        <>{
            isLoggedIn &&
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Your Orders</h1>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            {
                                orders.map((order) => {
                                    return (
                                        <>
                                            <span className="text-md font-medium text-gray-500">Order: #{order._id}</span>
                                            <span className="text-md font-medium text-gray-500">Order Placed At: {new Date(order.createdAt).toString()}</span>
                                            {
                                                order.products.map((product) => {
                                                    return <OrderIcon key={product._id} name={product.name} size={product.size} qty={product.qty} color={product.color} price={product.price} image={product.image} />
                                                })
                                            }</>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                        <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <div className=" flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-gray-800">{user.name}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 text-gray-800">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Orders