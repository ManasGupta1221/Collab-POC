import CircularLoader from "@/app/productVideos/loading.js";
export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
        <CircularLoader />
        </div>
    );
}
