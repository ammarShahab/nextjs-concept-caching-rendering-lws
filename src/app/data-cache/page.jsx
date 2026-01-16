import React, { cache } from "react";
import { getData } from "../utils/api-helper";
import next from "next";
import Link from "next/link";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function DataCache() {
  // 3.0 also created DataCache component and fetch data using common api fetch is used with cache:"force-cache" because in nextjs 16 cache is by default "cache: 'no-store" i.e dynamic we also used tag as we know in nextjs we can give tag for fetch request which will later used for on-demand revalidation. Data cache is ask question, as i have to  perform request call before that the data is saved in cache or i will perform network request? Now run npm run build. Then go to the db.json and change any data now go to the data-cache page and reload u will not get the updated data because the data is force-cached in build time showing the data from the cache i.e stale data.

  // 3.1 Data cache is revalidate in 2 ways.
  // i. Time based revalidation
  // ii. on demand revalidation

  const products = await getData(
    "http://localhost:8000/products",
    "DataCache - Static Page",
    {
      cache: "force-cache",
      next: {
        tags: ["products"],
      },
    },
  );

  //   3.3.0 On demand revalidation:
  //   As the data cache is saved in build time and cannot get the updated data we use also on demand revalidation i.e data will be revalidated on the basis of revalidate tag or path which is based on server action.

  //   3.3.1 On demand revalidation using revalidatePath i.e revalidate only the path. so create a server action using onRevalidatePath function.
  async function onRevalidatePath() {
    "use server";
    const path = "/data-cache";
    console.log(`attempting to revalidate path: ${path}`);
    revalidatePath(path);
    console.log(`revalidate path: ${path} action called`);
  }

  // 3.3.3 On demand revalidate using revalidate tag i.e revalidate by tag. so create a server action using onRevalidateTag function.
  async function onRevalidateTag() {
    "use server";
    const tag = "products";
    console.log(`attempting to revalidate tag: ${tag}`);
    revalidateTag(tag);
    console.log(`revalidate tag: ${tag} action called`);
  }

  return (
    <div>
      <h1 className="font-bold text-4xl">Data Cache - Static page</h1>
      <div className="mt-6">
        This page is statically rendered in {console.log(products)};
        <span className="text-blue-400">build time</span>.
      </div>
      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div className="flex gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-white text-2xl"
              href={`/data-cache/${product.id}`}
            >
              {product.title}
            </Link>
          ))}
        </div>
      </div>
      {/* 3.2.1 Time based revalidation route created then run build command. Now if u hit to that route it will go the time based revalidation page. now change the data in db.json and reload, u will not see the updated data at once but after 30 seconds u will see the updated data.*/}
      <div className="flex gap-6 justify-end mt-10 border rounded border-zinc-900 p-4">
        <Link
          className="border border-zinc-800 p-3 rounded hover:bg-zinc-900 hover:text-white"
          href="/data-cache/time-based-revalidation"
        >
          Time Based Revalidation
        </Link>

        {/* 3.3.2 call the onRevalidatePath function. Now build command run and hit to the On Revalidate Path button, u will see the updated data on clicking the button.*/}
        {
          <form action={onRevalidatePath}>
            <button
              className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900 hover:text-white"
              type="submit"
            >
              On Revalidate Path
            </button>
          </form>
        }
        {/* 3.3.4 call the onRevalidateTag function. Now build command run and hit to the On Revalidate Tag button, u will see the updated data on clicking the button. i.s keeping the page static we will update the data dynamically that's the power of Next.js*/}
        <form action={onRevalidateTag}>
          <button
            className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900 hover:text-white"
            type="submit"
          >
            On Revalidate Tag
          </button>
        </form>

        {/*   <Link
          className="border border-zinc-800 p-3 rounded hover:bg-zinc-900"
          href="/data-cache/time-based-revalidation"
        >
          Time Based Revalidation
        </Link>
        <Link
          className="border border-zinc-800 p-3 rounded hover:bg-zinc-900"
          href="/data-cache/time-based-revalidation"
        >
          Time Based Revalidation
        </Link> */}
      </div>
    </div>
  );
}
