import mongoose from "mongoose"

import Product from "../models/product"
import ProductIcon from "../components/ProductIcon"

const Stickers = (props) => {
    const { stickers } = props
    return (
        <section className="text-gray-600 body-font">
            <div className="container py-14 mx-auto">
                <div className="flex flex-wrap justify-between -m-4">
                    {stickers.map((sticker) => {
                        return <ProductIcon key={sticker._id} name={sticker.name} slug={sticker.slug} category={sticker.category} size={sticker.sizes[0].size ? sticker.sizes[0].size : null} color={sticker.sizes[0].colors.length != 0 ? sticker.sizes[0].colors[0].charAt(0).toUpperCase() + sticker.sizes[0].colors[0].slice(1) : null} image={sticker.sizes[0].images[0]} price={sticker.sizes[0].price[0]} />
                    })}
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    let stickers = []
    if (!mongoose.connections[0].readyState) {
        try {
            mongoose.set("strictQuery", false)
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        } catch (error) {
            console.log(error)
            return {
                props: { stickers },
            }
        }
    }
    stickers = await Product.find({ category: "Sticker" })
    return {
        props: { stickers: JSON.parse(JSON.stringify(stickers)) },
        revalidate: 30
    }
}

export default Stickers