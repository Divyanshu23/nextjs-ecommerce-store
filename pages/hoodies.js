import mongoose from "mongoose"

import Product from "../models/product"
import ProductIcon from "../components/ProductIcon"


const Hoodies = (props) => {
    const { hoodies } = props

    return (
        <section className="text-gray-600 body-font">
            <div className="container py-14 mx-auto">
                <div className="flex flex-wrap justify-between -m-4">
                    {hoodies.map((hood) => {
                        return <ProductIcon key={hood._id} name={hood.name} slug={hood.slug} category={hood.category} size={hood.sizes[0].size ? hood.sizes[0].size : null} color={hood.sizes[0].colors.length != 0 ? hood.sizes[0].colors[0].charAt(0).toUpperCase() + hood.sizes[0].colors[0].slice(1) : null} image={hood.sizes[0].images[0]} price={hood.sizes[0].price[0]} />
                    })}
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    let hoodies = []
    if (!mongoose.connections[0].readyState) {
        try {
            mongoose.set("strictQuery", false)
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        } catch (error) {
            console.log(error)
            return {
                props: { hoodies },
            }
        }
    }
    hoodies = await Product.find({ category: "Hood" })
    return {
        props: { hoodies: JSON.parse(JSON.stringify(hoodies)) },
        revalidate: 30
    }
}

export default Hoodies