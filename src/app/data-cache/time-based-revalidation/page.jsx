import { getData } from "@/app/utils/api-helper";

/* 3.2.0 Time based revalidation:
As the data cache is saved in build time and cannot get the updated data we use time based revalidation i.e data will be revalidated on the basis of time. */
const REVALIDATE_SECONDS = 20;

export default async function TimeBasedRevalidation() {
  const products = await getData(
    "http://localhost:8000/products",
    "time-based-revalidation path",
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  return (
    <div>
      <h3> Data Cache - time-based revalidation demo</h3>
      <div className="mt-6">
        This page is statically rendered in{" "}
        <span className="text-blue-400">
          build time but supports time-based revalidation (ISR)
        </span>
        .
      </div>
      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div className="flex gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl text-white"
            >
              {product.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
