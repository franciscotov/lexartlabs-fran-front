import React, { Suspense } from "react";
import { containerStyles } from "@/pages/signup/contants";
import ViewModel from "./ViewModel";
import { ProductDto } from "@/lib/definitions";

const ProductList = () => {
  const { products } = ViewModel();

  return (
    <div style={containerStyles}>
      {products.pending && <p>Loading products...</p>}
      {!products.pending &&
        products.products.map((product: ProductDto) => (
          <div key={product.name}>
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <p>Price: ${product.model}</p>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
