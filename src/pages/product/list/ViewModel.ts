import useAlert from "@/components/alert/AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProductList } from "@/redux/actions/productActions";
import { ProductState, StateI } from "@/redux/types/types";
import { useEffect } from "react";

const ViewModel = () => {
  const dispatch = useDispatch();
  const { AlertComponent } = useAlert();
  const products: ProductState = useSelector<StateI>(
    (state) => state.products
  ) as ProductState;

  useEffect(() => {
    dispatch<any>(fetchGetProductList());
  }, [dispatch]);

  return {
    AlertComponent,
    products,
  };
};

export default ViewModel;
