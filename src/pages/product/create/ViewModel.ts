import { ProductDto } from "@/lib/definitions";
import useAlert from "@/components/alert/AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateProduct } from "@/redux/actions/productActions";
import { ProductState, StateI } from "@/redux/types/types";
import i18n from "@/i18n/i18n-es.json";
import { useEffect } from "react";

const ViewModel = () => {
  const dispatch = useDispatch();
  const { AlertComponent, openSnackbar } = useAlert();
  const createProduct = async (product: ProductDto) => {
    dispatch(fetchCreateProduct(product) as any);
  };
  const products: ProductState = useSelector<StateI>((state) => state.products) as ProductState;
  useEffect(() => {
    if (products.lastProductWasCreated && !products.error) {
      openSnackbar(i18n.titleCreateProductSuccess, i18n.msgCreateProductSuccess, "success");
    } else {
      openSnackbar(i18n.titleCreateProductError, i18n.msgCreateProductError, "error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return {
    AlertComponent,
    createProduct,
  };
};

export default ViewModel;
