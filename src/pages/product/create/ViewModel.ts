import { ProductDto } from "@/lib/definitions";
import useAlert from "../../../components/alert/AlertComponent";
// import { create } from "../../../pages/services/productService";
import { useSelector } from "react-redux";
import { DataState } from "@/redux/types/types";
import { create } from "../../../pages/services/productService";

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const createProduct = async (product: ProductDto) => {
    const res: any = await create(product);
    console.log(product, { res });
    // openSnackbar("Product created successfully");
  };
  const data = useSelector<DataState>((state) => state.data);
console.log({data}, 'data')
  return {
    AlertComponent,
    createProduct,
  };
};

export default ViewModel;
