import React from "react";
import { loginUser, signupUser } from "@/app/services/userService";
// import useAlert from "@/components/molecules/alert/AlertComponent";
// import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
// import { setLogin } from "@/utils/utils";
import { ErrorList, UserBase } from "@/lib/definitions";
require("../../firebase");

const ViewModel = () => {
  // const { AlertComponent, openSnackbar } = useAlert();
  // const { push } = useRouter();
  const signup = async (data: any) => {
    const res: ErrorList | any = await signupUser(data.username, data.password);
    if (res?.status === 201) {
      // openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      redirectUser(res.data);
      return;
    }
    if (res.error) {
      // openSnackbar(i18n.errorTitle, res.error.response?.data?.errors[0], "error");
    }
    // else openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
  };

  const redirectUser = (user: UserBase) => {
    setTimeout(() => {
      // push(routes.login);
    }, 500);
  };

  return {
    signup,
    // AlertComponent
  };
};

export default ViewModel;
