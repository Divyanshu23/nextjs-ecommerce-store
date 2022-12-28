import mongoose from "mongoose"

import Product from "../models/product"
import ProductIcon from "../components/ProductIcon"

const TShirts = (props) => {
    const { tShirts } = props

    return (
        <section className="text-gray-600 body-font">
            <div className="container py-14 mx-auto">
                <div className="flex flex-wrap justify-between -m-4">
                    {tShirts.map((tShirt) => {
                        return <ProductIcon key={tShirt._id} name={tShirt.name} slug={tShirt.slug} category={tShirt.category} size={tShirt.sizes[0].size ? tShirt.sizes[0].size : null} color={tShirt.sizes[0].colors.length != 0 ? tShirt.sizes[0].colors[0].charAt(0).toUpperCase() + tShirt.sizes[0].colors[0].slice(1) : null} image={tShirt.sizes[0].images[0]} price={tShirt.sizes[0].price[0]} />
                    })}
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    let tShirts = []
    if (!mongoose.connections[0].readyState) {
        try {
            mongoose.set("strictQuery", false)
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        } catch (error) {
            console.log(error)
            return {
                props: { tShirts },
            }
        }
    }
    tShirts = await Product.find({ category: "T Shirt" })
    return {
        props: { tShirts: JSON.parse(JSON.stringify(tShirts)) },
        revalidate: 30
    }
}

export default TShirts