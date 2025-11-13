import ViewModel from "./ViewModel";
import { ProductDto } from "@/lib/definitions";
import { RequestState } from "@/components/RequestStatus";
import { RotatingLines } from "react-loader-spinner";

const ProductList = () => {
  const { products } = ViewModel();

  return (
    <RequestState status={products.status}>
      <RequestState.Loading>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="blue"
          strokeWidth="5"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "120px",
          }}
          wrapperClass=""
        />
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
