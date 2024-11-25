import ProductForm from "../ProductForm";
import { containerStyles } from "@/pages/signup/contants";
import ViewModel from "./ViewModel";
import { initialValuesProductForm } from "@/lib/inital";

const CreateProduct = () => {
  const { AlertComponent, createProduct } = ViewModel();
  const submitHandler = (values: typeof initialValuesProductForm) => {
    createProduct(values);
  };

  return (
    <div style={containerStyles}>
      <ProductForm submitHandler={submitHandler} buttonText="Sign in" />
      <AlertComponent />
    </div>
  );
};

export default CreateProduct;
