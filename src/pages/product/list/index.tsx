import React, { Suspense } from "react";
import { containerStyles } from "@/pages/signup/contants";
import ViewModel from "./ViewModel";
import { ProductDto } from "@/lib/definitions";
import { RequestState } from "@/components/RequestStatus";

const ProductList = () => {
  const { products } = ViewModel();

  return (
    <RequestState status={products.status}>
      <RequestState.Loading>
        <p>Loading products...</p>
      </RequestState.Loading>
      <RequestState.Error>
        <p>Error loading products. Please try again later.</p>
      </RequestState.Error>
      <RequestState.Success>
        {products.products.map((product: ProductDto) => (
          <div key={product.name}>
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <p>Price: ${product.model}</p>
          </div>
        ))}
      </RequestState.Success>
    </RequestState>
  );
};

export default ProductList;
