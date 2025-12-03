import React from "react";
import { getData } from "../utils/api-helper";

export default async function ProductCount() {
  // 2.2 also created ProductCount component and fetch data using common api
  const products = await getData(
    "http://localhost:8000/products",
    "ProductCount",
    // 2.5.1 Check request Memoization for dynamic pages.
    { cache: "no-store" }
  );
  return (
    <div>
      <span>Total Product is {products.length}</span>
    </div>
  );
}
