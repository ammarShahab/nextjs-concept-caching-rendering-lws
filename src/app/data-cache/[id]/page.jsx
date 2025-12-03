import { getData } from "@/app/utils/api-helper";
import { revalidateTag, updateTag } from "next/cache";

// 3.4.0 We can also use data cache for dynamic page
export default async function DataCacheDynamic({ params }) {
  const { id } = await params;

  //   3.4.1 we will fetch the data using common api and used tag for revalidation and use force cache to for save the data because as it is a dynamic page it will automatically fetch the data by network request. now run npm run build and change data of other Products from the db.json file and reload u will not get the updated data in the other products section. Because the data is cached in build time and showing the data from the cache as being dynamic page. if u select the updated product will get the selected product's updated data.
  const products = await getData(
    `http://localhost:8000/products`,
    "DataCache - Dynamic Page",

    { cache: "force-cache", next: { tags: ["products"] } }
  );

  const otherProducts = products.filter(
    (product) => product.id.toString() !== id
  );

  //   3.4.2 also fetch data using common api for dynamic value
  const product = await getData(
    `http://localhost:8000/products/${id}`,
    "DataCache - Dynamic Page [id]"
  );

  //   3.4.3 u can revalidate it using revalidateTag
  async function onRevalidateTag() {
    "use server";
    const tag = "products";
    console.log(`attempting to revalidate tag: '${tag}'`);
    revalidateTag(tag);
    // updateTag(tag);
    console.log(`revalidate tag action ('${tag}') called.`);
  }

  return (
    <div>
      <h1 className="font-bold text-4xl">Data Cache - Dynamic page</h1>
      <div className="mt-6">
        This page is dynamically rendered in{" "}
        <span className="text-blue-400">run time but uses Data Cache</span>.
      </div>
      <div className="mt-10 flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl">
        <h1 className="text-white">{product.title}</h1>
        <p className="text-white">Price: {product.price}</p>
      </div>
      <div className="flex flex-col gap-10 mt-6 border rounded border-zinc-900 p-10">
        <h2 className="font-bold text-xl">Other products</h2>
        <div className="flex gap-6">
          {otherProducts.map((product) => (
            <div
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl text-white"
            >
              {product.title}
            </div>
          ))}
        </div>
      </div>
      {/* 3.4.4 call the onRevalidateTag function. now run build and u can revalidate by the tag. we can use Data Cache in dynamic page, static page. On demand revalidate i.e time based revalidation, tag base revalidation. */}
      <div className="flex justify-center mt-10">
        <form action={onRevalidateTag}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Revalidate Tag
          </button>
        </form>
      </div>
    </div>
  );
}
