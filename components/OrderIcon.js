import Image from "next/image"

const OrderIcon = (props) => {
    return (
        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
            <div className="relative pb-4 md:pb-8 w-full h-52 md:w-40 md:h-40">
                <Image alt="ecommerce" src={props.image} fill sizes="100vw" style={{ objectFit: 'contain' }} />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-4">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{props.name}</h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                        {props.size &&
                            <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-300">Size: </span> {props.size}
                            </p>
                        }
                        {props.color &&
                            <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-300">Color: </span> {props.color}
                            </p>
                        }
                    </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                        ₹{props.price}
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">{props.qty}</p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">₹{props.price}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderIcon