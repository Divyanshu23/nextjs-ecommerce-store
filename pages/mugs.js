import mongoose from "mongoose"

import Product from "../models/product"
import ProductIcon from "../components/ProductIcon"

const Mugs = (props) => {
    const { mugs } = props

    return (
        <section className="text-gray-600 body-font">
            <div className="container py-14 mx-auto">
                <div className="flex flex-wrap justify-between -m-4">
                    {mugs.map((mug) => {
                        return <ProductIcon key={mug._id} name={mug.name} slug={mug.slug} category={mug.category} size={mug.sizes[0].size ? mug.sizes[0].size : null} color={mug.sizes[0].colors.length != 0 ? mug.sizes[0].colors[0].charAt(0).toUpperCase() + mug.sizes[0].colors[0].slice(1) : null} image={mug.sizes[0].images[0]} price={mug.sizes[0].price[0]} />
                    })}
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    let mugs = []
    if (!mongoose.connections[0].readyState) {
        try {
            mongoose.set("strictQuery", false)
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        } catch (error) {
            console.log(error)
            return {
                props: { mugs },
            }
        }
    }
    mugs = await Product.find({ category: "Mug" })
    return {
        props: { mugs: JSON.parse(JSON.stringify(mugs)) },
        revalidate: 30
    }
}

export default Mugs