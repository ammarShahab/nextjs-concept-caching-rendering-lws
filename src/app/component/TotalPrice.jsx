import React from "react";
import { getData } from "../utils/api-helper";

export default async function TotalPrice() {
  // 2.1 also created TotalPrice component and fetch data using common api
  const products = await getData(
    "http://localhost:8000/products",
    "TotalPrice"
    // 2.5.2 Check request Memoization for dynamic pages.
    // { cache: "no-store" }
  );
  return (
    <div>
      <span>
        Total price is{" "}
        {products.reduce((total, product) => product.price + total, 0)} taka.
      </span>
    </div>
  );
}
