import { ProductDto } from "@/lib/definitions";
import useAlert from "@/components/alert/AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProductList } from "@/redux/actions/productActions";
import { ProductState, StateI } from "@/redux/types/types";
import i18n from "@/i18n/i18n-es.json";
import { useEffect } from "react";

const ViewModel = () => {
  const dispatch = useDispatch();
  const { AlertComponent, openSnackbar } = useAlert();
  const getProducts = async () => {
    dispatch<any>(fetchGetProductList());
  };
  const products: ProductState = useSelector<StateI>((state) => state.products) as ProductState;
  useEffect(() => {
    getProducts();
  });

  return {
    AlertComponent,
    products,
  };
};

export default ViewModel;
