import { loginUser } from "../services/userService";
import useAlert from "../../components/alert/AlertComponent";
import i18n from "../../i18n/i18n-es.json";
import routes from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { TokenData, UserDto } from "@/lib/definitions";
import { useDispatch } from "react-redux";
import { FetchLoginUserSuccess, } from "@/redux/types/types";
import { fetchLoginUserSuccess } from "../../redux/actions/dataActions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/reducers/rootReducer";

type AppDispatch = ThunkDispatch<RootState, void, FetchLoginUserSuccess>;

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async (data: UserDto) => {
    const res: TokenData | any = await loginUser(data);
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      dispatch(fetchLoginUserSuccess(res.data));
      redirectUser();
      return;
    } else openSnackbar(i18n.errorTitle, i18n.ErrorBadCredentials, "error");
  };

  const redirectUser = () => {
    setTimeout(() => {
      navigate(routes.product);
    }, 500);
  };

  return {
    signin,
    AlertComponent,
  };
};

export default ViewModel;
