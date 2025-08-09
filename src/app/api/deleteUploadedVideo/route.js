import {NextResponse} from "next/server"
import {GridFSBucket,ObjectId} from "mongodb"
import { getDatabase } from "@/lib/mongodb";
export async function DELETE(req){
    const {searchParams}= new URL(req.url);
    const id = searchParams.get("id");
    const productId = searchParams.get("productId");

    if(!id || !productId){
        return NextResponse.json({error:"Missing ids"},{status:400});
    }
const db = await getDatabase();
const bucket = new GridFSBucket(db,{bucketName:`${productId}_Videos`});

let fileId;
try{
    fileId=new ObjectId(id);
}
catch{
    return NextResponse.json({error:"Invalid File id"},{status: 400});
}
const fileDoc= await db.collection(`${productId}_Videos.files`).findOne({_id:fileId});

if(!fileDoc){
    return NextResponse.json({error:"File not found"},{status: 404});
}
await bucket.delete(fileId)

return NextResponse.json({success:true});
}