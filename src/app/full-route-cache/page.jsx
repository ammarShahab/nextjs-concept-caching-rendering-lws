import React from "react";
import { getData } from "../utils/api-helper";
import Link from "next/link";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import next from "next";

// 4.2.3 also use "force-dynamic" to make the page dynamic
// export const dynamic = "force-dynamic";

// 4.0 Created a FullRouteCache component and fetch data using common api now run npm run build. Open the network tab u will see the full-route-cache. Now select the full-route-cache then select the preview u will see the log file i.e RSC Payload. Using this log react tree is generated in client side. Full Route cache ask the question should i render it or not. To render it Full Route cache needs RSC Payload and also build time generated html. In build time nextjs cache the RSC Payload and html in Full Route Cache in server. When user come and click the route and comes the RSC Payload and user see the page without render.
export default async function FullRouteCache() {
  const products = await getData(
    "http://localhost:8000/products",
    "full Route Cache path - Static page"
  );

  // 4.1 To revalidate the data we use revalidateTag or revalidatePath function.
  /* async function onRevalidatePath() {
    "use server";
    const path = "/full-route-cache";
    console.log(`attempting to revalidate path: ${path}`);
    revalidatePath(path);
    console.log(`revalidate path: ${path} action called`);
  } */

  /* async function onRevalidateTag() {
    "use server";
    const tag = "products";
    console.log(`attempting to revalidate tag: ${tag}`);
    revalidateTag(tag);
    console.log(`revalidate tag: ${tag} action called`);
  } */

  // 4.2.0 If we want to avoid this page full route cache in build time we have to make the page dynamic [] or using following server side feature. After making the site dynamic now if you go to the full-route-cache page and open network tab u will find empty RSC Payload that means it's dynamic.
  // const cookieData = cookies();
  // const headersData = headers();

  // 4.2.1 also using cache: "no-store" to make the page dynamic in getData function.
  /* const products = await getData(
    "http://localhost:8000/products", {cache: "no-store"},
    "full Route Cache path - Static page"
  ); */

  // 4.2.2 using { next: { revalidate: 0 } } to make the page dynamic in getData function.
  /* const products = await getData(
    "http://localhost:8000/products",
    "full Route Cache path - Static page",
    { next: { revalidate: 0 } }
  );
 */
  return (
    <div>
      <h1 className="font-bold text-4xl">Full Route Cache - Static page</h1>
      <div className="mt-6">
        This page is statically rendered in{" "}
        <span className="text-blue-400">build time</span>.
      </div>
      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div className="flex gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl text-white"
              href={`/data-cache/${product.id}`}
            >
              {product.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
