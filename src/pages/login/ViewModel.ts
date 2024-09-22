import { loginUser } from "../services/userService";
import useAlert from "../../components/alert/AlertComponent";
import i18n from "../../i18n/i18n-es.json";
import routes from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { ErrorList } from "@/lib/definitions";
import { isAdmin } from "../services/interceptors";

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const navigate = useNavigate();
  const signin = async (data: any) => {
    const res: ErrorList | any = await loginUser(data.username, data.password);
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      redirectUser(res?.data);
      return;
    } else openSnackbar(i18n.errorTitle, i18n.ErrorBadCredentials, "error");
  };

  const redirectUser = (token: string) => {
    if (isAdmin(token)) {
      setTimeout(() => {
        navigate(routes.products);
      }, 500);
    }
  };

  return {
    signin,
    AlertComponent,
  };
};

export default ViewModel;
