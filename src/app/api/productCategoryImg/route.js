import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
export async function GET(req){
    const {searchParams} = new URL(req.url);
    const productId = searchParams.get("ProductId");
    if(!productId){
        return NextResponse.json({error:"ProductId is required"},{status:400});
    }
    try{
        const db = await getDatabase();
        const productCollection = db.collection('products');

        const product = await productCollection.findOne(
            { productId: productId },
            { projection: { category: 1, image: 1, _id: 0 } }
        )
        if(!product){
            return NextResponse.json({error:"Product not found"},{status:404});
        }
        return NextResponse.json(
            {
                success:true,
                category: product.category,
                image: product.image,
            }
        );

    }
    catch(error){
        console.error("Error fetching product category:", error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}