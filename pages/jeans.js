import mongoose from "mongoose"

import Product from "../models/product"
import ProductIcon from "../components/ProductIcon"

const Jeans = (props) => {
    const { jeans } = props

    return (
        <section className="text-gray-600 body-font">
            <div className="container py-14 mx-auto">
                <div className="flex flex-wrap justify-between -m-4">
                    {jeans.map((jeans) => {
                        return <ProductIcon key={jeans._id} name={jeans.name} slug={jeans.slug} category={jeans.category} size={jeans.sizes[0].size ? jeans.sizes[0].size : null} color={jeans.sizes[0].colors.length != 0 ? jeans.sizes[0].colors[0].charAt(0).toUpperCase() + jeans.sizes[0].colors[0].slice(1) : null} image={jeans.sizes[0].images[0]} price={jeans.sizes[0].price[0]} />
                    })}
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    let jeans = []
    if (!mongoose.connections[0].readyState) {
        try {
            mongoose.set("strictQuery", false)
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        } catch (error) {
            console.log(error)
            return {
                props: { jeans },
            }
        }
    }
    jeans = await Product.find({ category: "Jeans" })
    return {
        props: { jeans: JSON.parse(JSON.stringify(jeans)) },
        revalidate: 30
    }
}

export default Jeans