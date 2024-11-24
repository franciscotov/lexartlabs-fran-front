import { ProductDto } from "@/lib/definitions";
import useAlert from "../../../components/alert/AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateProduct } from "../../../redux/actions/productActions";
import { DataState } from "@/redux/types/types";
const ViewModel = () => {
  const dispatch = useDispatch();
  const { AlertComponent, openSnackbar } = useAlert();
  const createProduct = async (product: ProductDto) => {
    dispatch(fetchCreateProduct(product) as any);
  };
  const data = useSelector<DataState>((state) => state.data);
  console.log({data}, 'data')
  return {
    AlertComponent,
    createProduct,
  };
};

export default ViewModel;
