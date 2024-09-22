import { signupUser } from "../services/userService";
import useAlert from "../../components/alert/AlertComponent";
import i18n from "../../i18n/i18n-es.json";
import routes from "../../routes/routes";
import { useNavigate } from 'react-router-dom';
import { ErrorList, UserBase } from "@/lib/definitions";

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const navigate = useNavigate();
  const signup = async (data: any) => {
    const res: ErrorList | any = await signupUser(data.username, data.password);
    if (res?.status === 201) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessSingUp, "success");
      redirectUser(res.data);
      return;
    }
    if (res.error) {
      openSnackbar(i18n.errorTitle, res.error.response?.data?.errors[0], "error");
    }
    else openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
  };

  const redirectUser = (user: UserBase) => {
    setTimeout(() => {
      navigate(routes.login);
    }, 500);
  };

  const handleRedirect = () => {
    navigate(routes.login);
  }

  return {
    signup,
    AlertComponent,
    handleRedirect
  };
};

export default ViewModel;
