import React, { cache } from "react";
import { getData } from "../utils/api-helper";
import ProductCount from "../component/ProductCount";
import TotalPrice from "../component/TotalPrice";
import next from "next";

// 2.3 also created generateMetadata component and fetch data using common api
// 2.4 all the component level data fetching is same. Now we run the npm run build and if we go to see the terminal there are 4 same type of network request for data fetching ([generateMetadata()], [Page], [ProductCount], [TotalPrice]). During build time the [generateMetadata()] and [Page] level data fetching network request took longer time but the [TotalPrice] and [ProductCount] level data fetching network request took less time. Why? Because according to 3W 3H rule first it ask the question should i need to data fetch. For the answer of this question, in the build time it cache the  [generateMetadata()] and [Page] level data fetching network request that's why it took longer time. But in the build time [TotalPrice] and [ProductCount] level data fetching took less time because it took the fetched data from the Request Memoization cache during build time of [generateMetadata()] and [Page] level data fetching. Next js same network request is not called every time that's why it's called request deduplication. The advantage of request deduplication is that it save the network request and we also don't need to props drilling i.e if we have nested component then we don't need to pass the data from parent to child component. On the other hand we can call network request every time.
// Note: generateMetadata() is the next js function which produces meta data which is used by search engines for seo.
export async function generateMetadata() {
  const products = await getData(
    "http://localhost:8000/products",
    "generateMetadata()",
    // 2.5.0 Check request Memoization for dynamic pages. as the page is static the request memoization is also worked for dynamic (SSR) pages. By default nextjs cache is "force-cache" but if we use "no-store" then it will also cache the request for the dynamic pages.
    { cache: "no-store" }
  );
  return {
    title: products.reduce(
      (title, product) => title + (title && ", ") + product.title,
      ""
    ),
    description: "Apple iPhone 16",
  };
}
// console.log(generateMetadata());

// 2.0 To understand request memoization in Next.js we create RequestMemoization component and fetch data using common api

export default async function RequestMemoization() {
  const products = await getData(
    "http://localhost:8000/products",
    "Page",
    // 2.5.3 Check request Memoization for dynamic pages.
    { cache: "no-store" }
    // 2.5.4 now run build and u will see the "ƒ /request-memoization" in the terminal which means it is dynamic. Now we go to the Request Memoization then see in the vs code terminal we will see [generateMetadata()] and [Page] level data fetching network request took longer time but the [TotalPrice] and [ProductCount] level data fetching network request took less time for request memoization. Request memoization also works for dynamic pages. But this type of cache is temporary as if we use "no-store". Now if we go to another route and return to the Request Memoization Route we will see only [generateMetadata()] and [Page] level network request for every time route changes due to temporary cache but less network latency for [TotalPrice] and [ProductCount] as it memorize the request. But if we comment the "no-store" i.e is make it "force-cache" and change the data from the db.json it will show the stale data.
    // Note: In request memoization data is not cached, only the promise is cached in Request Memoization. This is the promise which will get the during same network request call for the [TotalPrice] and [ProductCount]. Request memoization works in react tree only -  generateMetadata, generateStaticPrams, layout.js, page.js, etc. But other server components like route handlers or api routes, request memoization doesn't work. It will also not works in next js middleware. Because they are the outside of react tree. Also next.js fetch caching feature is also not worked in middleware of next.js.
  );

  return (
    <div>
      <h3>RequestMemoization</h3>
      <div>
        <div className="mt-6">
          This page is statically rendered in{" "}
          <span className="text-blue-400">build time</span>. 3 components below
          do the same fetch call and deduped. Thanks to Request Memoization.
        </div>
        <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
          <div className="flex flex-col gap-4">
            <ProductCount />
            <div className="flex gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-white text-2xl"
                >
                  {product.title}
                </div>
              ))}
            </div>
            <TotalPrice />
          </div>
        </div>
      </div>
    </div>
  );
}
