import ViewModel from "./ViewModel";
import BasicUserForm from "../../components/basicUserForm";
import { containerStyles } from "../signup/contants";

const initialFormValues = {
  username: "",
  password: "",
};

const Login = () => {
  const { signin, AlertComponent } = ViewModel();
  const submitHandler = (values: typeof initialFormValues) => {
    signin(values);
  };

  return (
    <div style={containerStyles}>
      <BasicUserForm submitHandler={submitHandler} buttonText="Sign in" />
      <AlertComponent />
    </div>
  );
};

export default Login;
